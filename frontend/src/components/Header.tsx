import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Section } from "@/data/sections";

type HeaderProps = {
  sections: Section[];
  isHovering: string | null;
  setIsHovering: (value: string | null) => void;
};

export default function Header({ sections, isHovering, setIsHovering }: HeaderProps) {
  return (
    <header className="py-6 px-8 sm:px-20 fixed top-0 left-0 w-full z-50"> {/* Changed z-10 to z-50 */}
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <Image
            src="/icons/tinku.jpg"
            alt="Logo"
            width={60}
            height={60}
            className="rounded-full border-2 border-[#9F70FD]/50"
          />
          <span className="text-xl font-mono font-bold text-white">Tinkerer's Lab ECS</span>
        </Link>
        <nav className="hidden md:flex gap-6 font-mono">
          <Link href="/">
            <span className="text-gray-300 hover:text-[#00F5D4] transition-colors">Home</span>
          </Link>
          {sections.slice(0, 4).map((section) => (
            <Link key={section.title} href={section.href}>
              <motion.div
                className="text-gray-300 hover:text-[#00F5D4] transition-colors relative"
                onHoverStart={() => setIsHovering(section.title)}
                onHoverEnd={() => setIsHovering(null)}
                whileHover={{ scale: 1.1 }}
              >
                {section.title}
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00F5D4]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovering === section.title ? 1 : 0 }}
                  style={{ transformOrigin: 'left' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}