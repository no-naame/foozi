"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function PlaceholdersAndVanishInput({
                                             onSubmit,
                                           }: {
  onSubmit: (text: string) => void;
}) {
  const placeholders = [
    "What's your favorite cuisine?",
    "Looking for a quick recipe?",
    "Need restaurant recommendations?",
    "Craving something sweet?",
    "Want to learn about food pairings?",
  ];
  type Particle = {
    x: number;
    y: number;
    r: number;
    color: string;
  };


  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newDataRef = useRef<Particle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const draw = useCallback(() => {
    if (!inputRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 80;
    ctx.clearRect(0, 0, 800, 80);
    const computedStyles = getComputedStyle(inputRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 80);
    const pixelData = imageData.data;
    const newData: Particle[] = [];

    for (let y = 0; y < 80; y++) {
      for (let x = 0; x < 800; x++) {
        const i = (y * 800 + x) * 4;
        if (pixelData[i] !== 0 || pixelData[i + 1] !== 0 || pixelData[i + 2] !== 0) {
          newData.push({ x, y, r: 1, color: `rgba(${pixelData[i]}, ${pixelData[i + 1]}, ${pixelData[i + 2]}, ${pixelData[i + 3]})` });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({ x, y, r: 1, color }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = useCallback((start: number) => {
    const animateFrame = (pos: number = 0) => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, 800, 80);
      const newArr = newDataRef.current.filter(particle => {
        if (particle.x < pos) return false;
        particle.x += (Math.random() - 0.5) * 2;
        particle.y += (Math.random() - 0.5) * 2;
        particle.r -= 0.05;
        return particle.r > 0;
      });

      newArr.forEach(({ x, y, r, color }) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
      });

      newDataRef.current = newArr;

      if (newArr.length > 0) {
        requestAnimationFrame(() => animateFrame(pos + 5));
      } else {
        setAnimating(false);
        onSubmit(value.trim());
        setValue("");
      }
    };
    animateFrame(start);
  }, [onSubmit, value]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!animating && value.trim()) {
      setAnimating(true);
      draw();
      animate(0);
    }
  };

  return (
      <form
          className={cn(
              "w-full relative max-w-xl mx-auto bg-zinc-800 h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
              value && "bg-zinc-700"
          )}
          onSubmit={handleSubmit}
      >
        <canvas
            className={cn(
                "absolute pointer-events-none text-base top-0 left-0 w-full h-full",
                !animating ? "opacity-0" : "opacity-100"
            )}
            ref={canvasRef}
        />
        <input
            ref={inputRef}
            value={value}
            onChange={(e) => !animating && setValue(e.target.value)}
            type="text"
            className={cn(
                "w-full relative text-sm sm:text-base z-10 border-none text-white bg-transparent h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20",
                animating && "text-transparent"
            )}
            placeholder={placeholders[currentPlaceholder]}
        />
        <button
            disabled={!value.trim() || animating}
            type="submit"
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-zinc-700 bg-orange-500 transition duration-200 flex items-center justify-center"
        >
          <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white h-4 w-4"
          >
            <motion.path
                d="M5 12l14 0"
                initial={{ strokeDasharray: "100%", strokeDashoffset: "100%" }}
                animate={{ strokeDashoffset: value ? "0%" : "100%" }}
                transition={{ duration: 0.3 }}
            />
            <path d="M13 18l6 -6" />
            <path d="M13 6l6 6" />
          </motion.svg>
        </button>
      </form>
  );
}