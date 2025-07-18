import { motion } from "framer-motion";
import Image from "next/image";
import { FiCalendar, FiClock, FiMapPin, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { useState } from "react";

type Workshop = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  tags: string[];
};

type WorkshopCardProps = {
  workshop: Workshop;
  isPast: boolean;
};

export default function WorkshopCard({ workshop, isPast }: WorkshopCardProps) {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <motion.div
      className={`group relative bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border overflow-hidden ${isPast ? 'border-[#9F70FD]/10' : 'border-[#9F70FD]/30'}`}
      whileHover={{ y: -10, boxShadow: '0 0 30px rgba(159, 112, 253, 0.3)' }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div
        className="relative h-48 w-full overflow-hidden"
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
      >
        <Image
          src={workshop.image}
          alt={workshop.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
        {isPast && (
          <div className="absolute top-4 right-4 bg-[#9F70FD]/80 text-white px-3 py-1 rounded-full text-xs font-mono flex items-center">
            <FiCheckCircle className="mr-1" /> Completed
          </div>
        )}
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" style={{ cursor: 'zoom-out' }} onClick={() => setShowPopup(false)}>
            <img
              src={workshop.image}
              alt={workshop.title}
              className="w-auto h-auto max-w-full max-h-full rounded-lg shadow-2xl border-4 border-white"
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {workshop.tags.map((tag, index) => (
            <span 
              key={index}
              className={`px-3 py-1 text-xs font-mono rounded-full ${isPast ? 'bg-[#9F70FD]/10 text-[#9F70FD]' : 'bg-[#9F70FD]/20 text-[#00F5D4]'}`}
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h2 className="text-2xl font-bold font-mono mb-3 text-white">{workshop.title}</h2>
        <p className={`mb-4 ${isPast ? 'text-gray-500' : 'text-gray-400'}`}>{workshop.description}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-300">
            <FiCalendar className={`mr-3 ${isPast ? 'text-[#9F70FD]' : 'text-[#00F5D4]'}`} />
            <span>{new Date(workshop.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <FiClock className={`mr-3 ${isPast ? 'text-[#9F70FD]' : 'text-[#00F5D4]'}`} />
            <span>{workshop.time}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <FiMapPin className={`mr-3 ${isPast ? 'text-[#9F70FD]' : 'text-[#00F5D4]'}`} />
            <span>{workshop.location}</span>
          </div>
        </div>
        
        {isPast ? (
          <button
            className="w-full px-6 py-3 bg-[#9F70FD]/10 text-[#9F70FD] rounded-lg font-bold font-mono flex items-center justify-center cursor-not-allowed"
            disabled
          >
            Workshop Completed
          </button>
        ) : (
          <motion.button
            className="w-full px-6 py-3 bg-gradient-to-r from-[#9F70FD] to-[#00F5D4] text-white rounded-lg font-bold font-mono flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Register Now <FiArrowRight className="ml-2" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}