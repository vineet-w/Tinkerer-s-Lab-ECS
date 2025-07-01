import { motion } from "framer-motion";
import { useState } from "react";

type HeroSectionProps = {
  setIsHovering: (value: string | null) => void;
};

export default function HeroSection({ setIsHovering }: HeroSectionProps) {
  return (
    <motion.section 
      className="mb-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      onHoverStart={() => setIsHovering('about-hero')}
      onHoverEnd={() => setIsHovering(null)}
    >
      <motion.div 
        className="inline-block bg-[#9F70FD]/20 border border-[#9F70FD]/50 rounded-full px-4 py-2 text-sm font-mono text-[#00F5D4] mb-6"
        whileHover={{ scale: 1.05, y: -5, boxShadow: '0 0 20px #00F5D4' }}
        onHoverStart={() => setIsHovering('about-tag')}
        onHoverEnd={() => setIsHovering(null)}
      >
        Where Ideas Become Reality
      </motion.div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono mb-6 text-white">
        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">Tinkerer's Lab</span>
      </h1>
      <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
        Discover our mission, vision, and the team behind this innovative space for electronics and computer science enthusiasts.
      </p>
    </motion.section>
  );
}