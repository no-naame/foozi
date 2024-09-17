"use client"
import { motion, AnimatePresence } from "framer-motion";
import React, { RefObject } from "react";
import { LampContainer } from "@/components/ui/Lamp";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import {Pizza} from 'lucide-react';

interface LampDemoProps {
    messages: { text: string; isUser: boolean }[];
    onSendMessage: (text: string) => void;
    isChatting: boolean;
    isLoading: boolean;
    chatContainerRef: RefObject<HTMLDivElement>;
}

export default function LampDemo({ messages, onSendMessage, isChatting, isLoading, chatContainerRef }: LampDemoProps) {
    return (
        <LampContainer>
            <motion.div
                initial={{ opacity: 0.5, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="w-full max-w-4xl mx-auto flex flex-col justify-end"
            >
                <AnimatePresence>
                    {isChatting && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-zinc-900/50 mt-20 backdrop-blur-sm rounded-lg p-4 mb-4 overflow-y-auto max-h-[50vh]"
                            ref={chatContainerRef}
                        >
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`mb-2 p-2 rounded-lg ${
                                        message.isUser ? 'bg-orange-500 text-white ml-auto' : 'bg-zinc-800 text-white'
                                    }`}
                                    style={{ maxWidth: '80%' }}
                                >
                                    {message.text}
                                </motion.div>
                            ))}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex items-center justify-center p-4"
                                >
                                    <Pizza className="w-6 h-6 text-white animate-spin" />
                                    <span className="ml-2 text-orange-500">Cooking up a response...</span>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
                <PlaceholdersAndVanishInput onSubmit={onSendMessage} />
            </motion.div>
        </LampContainer>
    );
}