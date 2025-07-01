'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BackgroundGrid from "@/components/BackgroundGrid";
import MouseTrailer from "@/components/MouseTrailer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/about/HeroSection";
import IntroductionSection from "@/components/about/IntroductionSection";
import VisionMissionSection from "@/components/about/VisionMissionSection";
import UniqueFeaturesSection from "@/components/about/UniqueFeaturesSection";
import TeamSection from "@/components/about/TeamSection";
import AboutCTASection from "@/components/about/AboutCTASection";
import { sections } from "@/data/sections";
import { faculty } from "@/data/faculty";
import { studentTeam } from "@/data/studentTeam";
import { uniqueFeatures } from "@/data/uniqueFeatures";

export default function About() {
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const labImages = [
    "/images/lab1.jpg",
    "/images/lab2.jpg",
    "/images/lab3.jpg",
    "/images/lab4.jpg"
  ];

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
        <HeroSection setIsHovering={setIsHovering} />
        <IntroductionSection labImages={labImages} setIsHovering={setIsHovering} />
        <VisionMissionSection />
        <UniqueFeaturesSection features={uniqueFeatures} />
        <TeamSection faculty={faculty} studentTeam={studentTeam} />
        <AboutCTASection />
      </main>

      <Footer sections={sections} />
    </div>
  );
}