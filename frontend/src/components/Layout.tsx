import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const bgRef = useRef<HTMLDivElement>(null);
    // location hook kept for potential future use or router context, though currently unused in logic
    useLocation();

    useEffect(() => {
        // Background animation
        if (bgRef.current) {
            gsap.to(bgRef.current, {
                backgroundPosition: '200% center',
                duration: 20,
                repeat: -1,
                ease: 'linear',
            });
        }
    }, []);

    return (
        <div className="min-h-screen bg-premium-dark text-white font-sans overflow-hidden relative">
            {/* Animated Background */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-cover"
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 opacity-90" />

            {/* Decorative Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-pink-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 py-6 min-h-screen flex flex-col">
                <header className="flex justify-between items-center mb-8 glass-panel p-4">
                    <Link to="/">
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400 cursor-pointer">
                            TeSoportamos <span className="text-xs text-slate-400 font-normal">MLOps</span>
                        </h1>
                    </Link>
                    <nav className="hidden md:flex gap-4 text-sm font-medium text-slate-300">
                        {/* Simple Nav for Demo */}
                        <span className="hover:text-white cursor-pointer transition-colors">v2.0 Demo</span>
                    </nav>
                </header>

                <main className="flex-grow flex flex-col">
                    {children}
                </main>

                <footer className="mt-8 text-center text-slate-500 text-xs">
                    &copy; 2025 TeSoportamos Inc. - Galaxy S22 Optimized
                </footer>
            </div>
        </div>
    );
};

export default Layout;
