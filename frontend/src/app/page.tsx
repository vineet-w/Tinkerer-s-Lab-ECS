'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BackgroundParticles from "@/components/BackgroundParticles";
import MouseTrailer from "@/components/MouseTrailer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsTicker from "@/components/NewsTicker";
import SectionsGrid from "@/components/SectionsGrid";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import ContactSection from "@/components/Form";
import Footer from "@/components/Footer";
import { sections } from "@/data/sections";
import { newsItems } from "@/data/newsItems";
import { testimonials } from "@/data/testimonials";

export default function Home() {
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
    <div className="min-h-screen flex flex-col bg-[#0D0D0D] text-gray-300 font-sans overflow-hidden relative">
      <BackgroundParticles />
      <MouseTrailer mousePosition={mousePosition} isHovering={isHovering} />
      
      <Header 
        sections={sections} 
        isHovering={isHovering} 
        setIsHovering={setIsHovering} 
      />

      <main className="flex-1 px-8 sm:px-20 flex flex-col relative z-10">
        <HeroSection />
        <NewsTicker newsItems={newsItems} />
        <SectionsGrid sections={sections} />
        <Testimonials testimonials={testimonials} />
        <Gallery />
        <ContactSection />
      </main>

      <Footer sections={sections} />
    </div>
  );
}