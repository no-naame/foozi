"use client"
import React, { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="px-4 sm:px-6 py-4 bg-white bg-opacity-10 backdrop-blur-sm mx-5 mt-2 rounded-xl sticky top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link className="flex items-center justify-center" href="/">
                    <span className="text-2xl font-bold text-white">Foozi</span>
                </Link>

                <nav className="hidden md:flex gap-6">
                    <Link className="text-base font-medium text-white hover:text-orange-500 " href="#">
                        Home
                    </Link>
                    <Link className="text-base font-medium text-white hover:text-orange-500" href="#">
                        About Us
                    </Link>
                </nav>

                <div className="hidden md:block">
                    <Link href="/chat">
                        <Button className="bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors px-6 py-2">
                            Talk to Foozi
                        </Button>
                    </Link>
                </div>

                <button className="md:hidden text-white" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden mt-4">
                    <nav className="flex flex-col gap-4">
                        <Link className="text-base font-medium text-white hover:text-orange-500 transition-colors" href="#">
                            Home
                        </Link>
                        <Link className="text-base font-medium text-white hover:text-orange-500 transition-colors" href="#">
                            About Us
                        </Link>
                        <Link href="/chat">
                            <Button className="bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors px-6 py-2 w-full">
                                Talk to Foozi
                            </Button>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;