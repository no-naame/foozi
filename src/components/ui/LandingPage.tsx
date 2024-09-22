"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { signInWithGoogle, checkAuth } from "@/auth/auth";

export default function LandingPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            checkAuth((user) => {
                if (user) {
                    router.push("/chat");
                } else {
                    signInWithGoogle()
                        .then(() => {
                            router.push("/chat");
                        })
                        .catch((error) => {
                            console.error("Google sign-in error:", error);
                        });
                }
            });
        } catch (error) {
            console.error("Error during authentication:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-white relative">
            <ParticleBackground />
            <div className="relative z-10">
                <main className="flex-1 flex flex-col md:flex-row items-center justify-center py-6 md:py-10 gap-8 md:gap-12">
                    <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        <div className="w-full md:w-1/2 space-y-4 md:space-y-6 bg-black bg-opacity-45 backdrop-blur-sm p-6 md:p-8 rounded-lg">
                            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-[80px] font-medium leading-tight md:leading-[1.1]">
                                <span className="block tracking-tight">No one craves</span>
                                <span className="block text-gray-400 tracking-tight">the same food</span>
                                <span className="block text-orange-500 tracking-[0.1em]">All The Time</span>
                            </h1>
                            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300">
                                Our AI understands your mood and recommends the perfect meal, anytime, anywhere.
                            </p>
                            <Button
                                onClick={handleGoogleSignIn}
                                className="mt-2 bg-orange-500 text-black hover:bg-orange-600 rounded-3xl transition-colors text-base md:text-lg px-4 py-3 md:px-6 md:py-6"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Talk to Foozi"}
                            </Button>
                        </div>

                        <div
                            className="w-full md:w-1/2 h-[16rem] sm:h-[20rem] md:h-[30rem] lg:h-[40rem] flex items-center justify-center">
                            <DirectionAwareHover
                                imageUrl="https://images.unsplash.com/photo-1559622214-f8a9850965bb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRhc3R5JTIwZm9vZCUyMHdpdGglMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
                                className="w-full h-full max-w-[256px] sm:max-w-[256px] md:max-w-[320px] lg:max-w-[384px]"
                            >
                                <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">Experience the food
                                    that you never had.</p>
                            </DirectionAwareHover>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}