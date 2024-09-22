"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { signInWithGoogle, logout, checkAuth } from '@/auth/auth';
import { User } from "firebase/auth";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    useEffect(() => {
        checkAuth((authUser) => {
            setUser(authUser);
        });
    }, []);

    const handleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <header className="px-4 sm:px-6 py-4 bg-white bg-opacity-15 backdrop-blur-sm mx-5 mt-2 rounded-xl sticky top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link className="flex items-center justify-center" href="/">
                    <span className="text-2xl font-bold text-orange-500">Foozi</span>
                </Link>

                <nav className="hidden md:flex gap-6">
                    <Link className="text-base font-medium text-orange-500 hover:text-orange-500" href="/">
                        Home
                    </Link>
                </nav>

                <div className="hidden md:block">
                    {user ? (
                        <Button
                            onClick={handleSignOut}
                            className="bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors px-6 py-2"
                        >
                            Sign Out
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSignIn}
                            className="bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors px-6 py-2"
                        >
                            Sign In
                        </Button>
                    )}
                </div>

                <button className="md:hidden text-white" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden mt-4">
                    <nav className="flex flex-col gap-4">
                        <Link className="text-base text-center font-medium text-orange-500 hover:text-orange-500 transition-colors" href="/">
                            Home
                        </Link>
                        {user ? (
                            <Button
                                onClick={handleSignOut}
                                className="bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors px-6 py-2 w-full"
                            >
                                Sign Out
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSignIn}
                                className="bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors px-6 py-2 w-full"
                            >
                                Sign In
                            </Button>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
