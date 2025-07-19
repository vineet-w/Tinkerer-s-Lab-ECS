"use client";

import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

// Define the type for the section prop
interface Section {
  title: string;
  href: string;
}

interface HeaderProps {
  sections: Section[];
  isHovering: string | null;
  setIsHovering: (id: string | null) => void;
}

export default function Header({ sections, isHovering, setIsHovering }: HeaderProps) {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      const destination = await logout();
      router.push(destination);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

const getInitials = (user: any) => {
  if (!user) return '?';
  if (user.displayName) {
    return user.displayName.charAt(0).toUpperCase();
  }
  if (user.email) {
    return user.email.charAt(0).toUpperCase();
  }
  return '?';
};


  return (
<header className="py-4 px-8 sm:px-20 fixed top-0 left-0 w-full z-50 
  bg-gradient-to-b from-black/30 to-black/10 
  backdrop-blur-md border-b border-white/10">

      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <Image
            src="/icons/tinku.jpg"
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full border-2 border-[#9F70FD]/50"
          />
          <span className="text-xl font-mono font-bold text-white">Tinkerer's Lab ECS</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 font-mono">
          <Link href="/">
            <span className="text-gray-300 hover:text-[#00F5D4] transition-colors">Home</span>
          </Link>
          {sections.slice(0, 4).map((section) => (
            <Link key={section.title} href={section.href}>
              <motion.div
                className="text-gray-300 hover:text-[#00F5D4] transition-colors relative cursor-pointer"
                onHoverStart={() => setIsHovering(section.title)}
                onHoverEnd={() => setIsHovering(null)}
              >
                {section.title}
                {isHovering === section.title && (
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00F5D4]"
                    layoutId="underline"
                  />
                )}
              </motion.div>
            </Link>
          ))}

          {/* Profile Button and Dropdown */}
          <div className="relative ml-4">
            {currentUser ? (
              <div ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-lg hover:bg-[#9F70FD] transition-colors duration-300"
                >
                  {getInitials(currentUser)}
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-64 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-xl origin-top-right"
                    >
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center space-x-3">
                           <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
                            {getInitials(currentUser)}
                          </div>
                           <div>
                            <p className="text-sm font-medium text-white truncate">
                              {currentUser.displayName || 'Student'}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {currentUser.email}
                            </p>

                           </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-200"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
               <button onClick={() => router.push('/login')} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                 Login
               </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
