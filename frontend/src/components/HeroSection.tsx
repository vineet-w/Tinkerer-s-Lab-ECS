import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";

export default function HeroSection() {
  return (
    <motion.section
   
      className="min-h-[80vh] flex flex-col justify-center items-center text-center pt-20 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="flex items-start gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src="/icons/vesit.png"
          alt="VESIT Logo"
          width={50}
          height={50}
          className="object-contain mt-1"
        />
        <div className="flex flex-col">
          <motion.h2
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4] mb-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            V.E.S. Institute of Technology
          </motion.h2>
          <hr className="px-1 py-1"/>
          <motion.p
            className="text-sm text-gray-400 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Department of Electronics and Computer Science
          </motion.p>
        </div>
      </motion.div>
      <br /><br />
      <motion.div
        className="inline-block bg-[#9F70FD]/20 border border-[#9F70FD]/50 rounded-full px-4 py-2 text-sm font-mono text-[#00F5D4] mb-6"
        whileHover={{ scale: 1.05, y: -5, boxShadow: '0 0 20px #00F5D4' }}
      >
        Innovate, Integrate, Dominate 🔧
      </motion.div>

      <motion.h1
        className="text-5xl sm:text-6xl md:text-7xl font-bold font-mono mb-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Tinkerer's Lab <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">ECS</span>
      </motion.h1>

      <motion.p
        className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Where technology meets creativity. Discover workshops, study materials, project showcases, and upcoming tech competitions—all in one place.
      </motion.p>

      <motion.button
        className="px-8 py-3 bg-gradient-to-r from-[#9F70FD] to-[#7a4be6] text-white rounded-full font-bold shadow-lg transition-all"
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px #9F70FD" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          const gridSection = document.getElementById('sections-grid');
          if (gridSection) {
            gridSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        Explore Now <FiArrowRight className="inline-block ml-2" />
      </motion.button>
    </motion.section>
  );
}