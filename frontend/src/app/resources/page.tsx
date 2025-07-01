'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BackgroundGrid from "@/components/BackgroundGrid";
import MouseTrailer from "@/components/MouseTrailer";
import Header from "@/components/Header";
import ResourceCategorySection from "@/components/ResourceCategorySection";
import ResourceCTASection from "@/components/ResourceCTASection";
import Footer from "@/components/Footer";
import { sections } from "@/data/sections";
import { resourceCategories } from "@/data/resourceCategories";

export default function Resources() {
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen pt-20 flex flex-col bg-[#0D0D0D] text-gray-300 font-sans overflow-hidden relative">
      <BackgroundGrid />
      <MouseTrailer mousePosition={mousePosition} isHovering={isHovering} />
      
      <Header 
        sections={sections} 
        isHovering={isHovering} 
        setIsHovering={setIsHovering} 
      />

      <main className="flex-1 px-8 sm:px-20 py-12 flex flex-col relative z-10">
        {/* Hero Section */}
        <motion.section 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onHoverStart={() => setIsHovering('resources-hero')}
          onHoverEnd={() => setIsHovering(null)}
        >
          <motion.div 
            className="inline-block bg-[#9F70FD]/20 border border-[#9F70FD]/50 rounded-full px-4 py-2 text-sm font-mono text-[#00F5D4] mb-6"
            whileHover={{ scale: 1.05, y: -5, boxShadow: '0 0 20px #00F5D4' }}
            onHoverStart={() => setIsHovering('resources-tag')}
            onHoverEnd={() => setIsHovering(null)}
          >
            Curated Tools & Components
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono mb-6 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">Resources</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Essential hardware components, software tools, and learning materials to support your projects. 
            Check availability and location for physical components.
          </p>
        </motion.section>

        {/* Resource Categories */}
        <div className="space-y-16">
          {resourceCategories.map((category, index) => (
            <ResourceCategorySection 
              key={category.title}
              category={category}
              index={index}
              setIsHovering={setIsHovering}
            />
          ))}
        </div>

        <ResourceCTASection setIsHovering={setIsHovering} />
      </main>

        <Footer sections={sections} />
    </div>
  );
}