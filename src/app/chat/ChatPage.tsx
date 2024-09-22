"use client"
import React, { useState, useRef, useEffect } from 'react';
import LampDemo from "@/components/ui/ChatPage";
import { motion, AnimatePresence } from 'framer-motion';

const ChatPage = () => {
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
    const [isChatting, setIsChatting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = (text: string) => {
        if (text.trim() === '') return;

        setMessages(prev => [...prev, { text, isUser: true }]);
        setIsChatting(true);
        setIsLoading(true);

        setTimeout(() => {
            setMessages(prev => [...prev, { text: "Thanks for your message! How can I assist you with your food cravings today?", isUser: false }]);
            setIsLoading(false);
        }, 2000);
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
            <AnimatePresence>
                {!isChatting && (
                    <motion.h1
                        initial={{opacity: 0.5, y: 100}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -100}}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="mt-7 bg-gradient-to-br from-white to-[#F97316B2] py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                    >
                        Hey Foozi <br/>  What&apos;s on your mind today?
                    </motion.h1>
                )}
            </AnimatePresence>
            <div className="flex-grow flex items-end">
                <LampDemo
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    isChatting={isChatting}
                    isLoading={isLoading}
                    chatContainerRef={chatContainerRef}
                />
            </div>

        </div>
    );
};

export default ChatPage;