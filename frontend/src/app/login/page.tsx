"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import BackgroundParticles from "@/components/BackgroundParticles";
import MouseTrailer from "@/components/MouseTrailer";
import Header from "@/components/Header"; 
import { sections } from "@/data/sections";
import { motion } from 'framer-motion';

export default function LoginPage() {
    const { login, signup } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');  
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [isHovering, setIsHovering] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Track mouse for the animated trailer
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Admin shortcut
            if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
                router.push('/admin');
                return;
            }

            let destination: string;

            if (isLoginMode) {
                destination = await login(email, password);
            } else {
                destination = await signup(email, password, name);
            }

            router.push(destination);
        } catch (err: any) {
            if (err.code === 'auth/email-already-in-use') {
                setError('An account with this email already exists.');
            } else if (err.code === 'auth/invalid-credential') {
                setError('Login failed. Please check your credentials.');
            } else if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col bg-[#0D0D0D] text-gray-300 font-sans overflow-hidden">
            {/* ✅ Background Particles for a futuristic vibe */}
            <BackgroundParticles />
            
            {/* ✅ Mouse Trailer for interactive animation */}
            <MouseTrailer mousePosition={mousePosition} isHovering={isHovering} />

            {/* ✅ Optional: Header so login feels like part of the site */}
            <Header 
                sections={sections} 
                isHovering={isHovering} 
                setIsHovering={setIsHovering} 
            />

            {/* ✅ Centered login/signup form */}
            <main className="flex-1 flex items-center justify-center relative z-10 px-4">
                <motion.div 
                    className="bg-[#1a1a1a]/80 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-extrabold mb-6 text-center text-white tracking-wide">
                        {isLoginMode ? 'Welcome Back' : 'Create an Account'}
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && <p className="bg-red-900 text-white p-3 rounded mb-4 text-center">{error}</p>}

                        {/* Show Name field only during signup */}
                        {!isLoginMode && (
                            <div>
                                <label className="block text-sm font-medium mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                    className="w-full p-3 bg-[#2a2a2a] rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full p-3 bg-[#2a2a2a] rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full p-3 bg-[#2a2a2a] rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:bg-gray-500"
                        >
                            {loading ? 'Processing...' : (isLoginMode ? 'Log In' : 'Sign Up')}
                        </motion.button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsLoginMode(!isLoginMode)}
                            className="text-sm text-blue-400 hover:underline transition-colors duration-300"
                        >
                            {isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                        </button>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
