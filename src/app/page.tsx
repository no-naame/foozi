"use client";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import Link from "next/link";

export default function LandingPage() {
  return (
      <div className="min-h-screen text-white relative">
        <ParticleBackground />
        <div className="relative z-10">
          <main className="flex-1 flex flex-col md:flex-row items-center justify-center py-10 gap-12">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2 space-y-6 bg-black bg-opacity-15 backdrop-blur-sm p-8 rounded-lg">
                <h1 className="text-5xl md:text-[80px] lg:text-[80px] font-medium leading-[1.1]">
                  <span className="block tracking-tight">No one craves</span>
                  <span className="block text-gray-400 tracking-tight">the same food</span>
                  <span className="block text-orange-500 tracking-[0.1em]">All The Time</span>
                </h1>
                <p className="text-3xl text-gray-300">
                  Our AI understands your mood and recommends the perfect meal, anytime, anywhere.
                </p>
                <Link href="/chat">
                <Button  className="mt-2 bg-orange-500 text-black hover:bg-orange-600 rounded-3xl transition-colors text-lg px-6 py-6">
                  Talk to Foozi
                </Button>
                </Link>
              </div>

              <div className="w-full md:w-1/2 h-[40rem] flex items-center justify-center">
                <DirectionAwareHover imageUrl="https://images.unsplash.com/photo-1559622214-f8a9850965bb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRhc3R5JTIwZm9vZCUyMHdpdGglMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D">
                  <p className="font-bold text-xl">Experience the food that you never had.</p>
                </DirectionAwareHover>
              </div>
            </div>
          </main>
        </div>
      </div>
  )
}
