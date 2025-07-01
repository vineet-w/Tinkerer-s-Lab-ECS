'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import BackgroundGrid from "@/components/BackgroundGrid";
import Header from "@/components/Header";
import WorkshopCard from "@/components/workshops/WorkshopCard";
import CTASection from "@/components/workshops/CTASection";
import Footer from "@/components/Footer";
import { sections } from "@/data/sections";
import { workshops } from "@/data/workshops";

export default function Workshops() {
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const currentDate = new Date();
  const upcomingWorkshops = workshops.filter(workshop => new Date(workshop.date) >= currentDate);
  const pastWorkshops = workshops.filter(workshop => new Date(workshop.date) < currentDate);

  return (
    <div className="min-h-screen pt-20 flex flex-col bg-[#0D0D0D] text-gray-300 font-sans overflow-hidden relative">
      <BackgroundGrid />
      
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
        >
          <motion.div 
            className="inline-block bg-[#9F70FD]/20 border border-[#9F70FD]/50 rounded-full px-4 py-2 text-sm font-mono text-[#00F5D4] mb-6"
            whileHover={{ scale: 1.05, y: -5, boxShadow: '0 0 20px #00F5D4' }}
          >
            Hands-on Learning Experiences
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono mb-6 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">Workshops</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Expand your skills with our interactive workshops led by industry experts and faculty members. 
            From beginner to advanced levels, we've got something for everyone.
          </p>
        </motion.section>

        {/* Upcoming Workshops */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center mb-8">
            <h2 className="text-3xl font-bold font-mono text-white mr-4">Upcoming Workshops</h2>
            <span className="px-3 py-1 text-sm font-mono rounded-full bg-[#00F5D4]/20 text-[#00F5D4]">
              {upcomingWorkshops.length} available
            </span>
          </div>

          {upcomingWorkshops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingWorkshops.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} isPast={false} />
              ))}
            </div>
          ) : (
            <div className="bg-[#1A1A1A]/50 border border-[#9F70FD]/30 rounded-2xl p-12 text-center">
              <p className="text-xl text-gray-400 mb-6">No upcoming workshops scheduled yet.</p>
              <p className="text-gray-500">Check back later or subscribe to our newsletter for updates.</p>
            </div>
          )}
        </motion.section>

        {/* Past Workshops */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center mb-8">
            <h2 className="text-3xl font-bold font-mono text-white mr-4">Past Workshops</h2>
            <span className="px-3 py-1 text-sm font-mono rounded-full bg-[#9F70FD]/20 text-[#9F70FD]">
              {pastWorkshops.length} completed
            </span>
          </div>

          {pastWorkshops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastWorkshops.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} isPast={true} />
              ))}
            </div>
          ) : (
            <div className="bg-[#1A1A1A]/50 border border-[#9F70FD]/30 rounded-2xl p-12 text-center">
              <p className="text-gray-500">No past workshops to display.</p>
            </div>
          )}
        </motion.section>

        <CTASection />
      </main>

      <Footer sections={sections} />
    </div>
  );
}