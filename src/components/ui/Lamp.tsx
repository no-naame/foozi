"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const VerticalLampEffect = ({ side }: { side: "left" | "right" }) => {
    return (
        <div className={`absolute top-0 bottom-0 ${side}-0 w-1/4 overflow-hidden`}>
            <motion.div
                initial={{ opacity: 0.5, height: "30vh" }}
                whileInView={{ opacity: 1, height: "100vh" }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                style={{
                    backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                }}
                className={cn(
                    "absolute inset-0 w-full bg-gradient-conic from-cyan-500 via-transparent to-transparent",
                    side === "left"
                        ? "[--conic-position:from_0deg_at_center_left]"
                        : "[--conic-position:from_180deg_at_center_right]"
                )}
            >
                <div className="absolute h-[100%] w-40 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
                <div className="absolute h-[100%] w-full bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            </motion.div>
            <motion.div
                initial={{ width: "4rem" }}
                whileInView={{ width: "8rem" }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className={cn(
                    "absolute z-30 h-screen w-32 rounded-full bg-cyan-400 blur-2xl",
                    side === "left" ? "-left-16" : "-right-16"
                )}
            ></motion.div>
            <div className="absolute inset-0 z-20 bg-slate-950 opacity-80"></div>
        </div>
    );
};

const VanishingInput = ({ onSubmit }: { onSubmit: (value: string) => void }) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (value) {
            onSubmit(value);
            setValue("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full relative max-w-xl mx-auto bg-black/30 h-12 rounded-full overflow-hidden shadow-[0_0_10px_rgba(0,255,255,0.3)] transition duration-200"
        >
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full relative text-sm sm:text-base z-50 border-none text-white bg-transparent h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20"
                placeholder="Ask Foozi anything about food..."
            />
            <button
                type="submit"
                disabled={!value}
                className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-800 bg-cyan-500 disabled:opacity-50 transition duration-200 flex items-center justify-center"
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
                        initial={{ strokeDasharray: "50%", strokeDashoffset: "50%" }}
                        animate={{ strokeDashoffset: value ? 0 : "50%" }}
                        transition={{ duration: 0.3, ease: "linear" }}
                    />
                    <path d="M13 18l6 -6" />
                    <path d="M13 6l6 6" />
                </motion.svg>
            </button>
        </form>
    );
};

export function ChatbotPage() {
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);

    const handleSendMessage = (text: string) => {
        setMessages([...messages, { text, isUser: true }]);
        setTimeout(() => {
            setMessages(prev => [...prev, { text: "Thanks for your message! How can I assist you with your food cravings today?", isUser: false }]);
        }, 1000);
    };

    return (
        <div className="relative min-h-screen w-full bg-slate-950 overflow-hidden flex items-center justify-center">
            <VerticalLampEffect side="left" />
            <VerticalLampEffect side="right" />
            <div className="z-10 w-full max-w-4xl px-4 py-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-2xl mx-auto"
                >
                    <Button variant="ghost" className="text-cyan-500 hover:text-cyan-600 mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                    </Button>
                    <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 h-[60vh] overflow-y-auto mb-4 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                        <AnimatePresence>
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className={cn(
                                        "mb-2 p-2 rounded-lg",
                                        message.isUser ? "bg-cyan-500/20 text-white ml-auto" : "bg-black/30 text-white"
                                    )}
                                    style={{ maxWidth: "80%" }}
                                >
                                    {message.text}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    <VanishingInput onSubmit={handleSendMessage} />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center text-cyan-500/50 mt-4"
                >
                    Powered by Foozi AI - Your personal food assistant
                </motion.div>
            </div>
        </div>
    );
}