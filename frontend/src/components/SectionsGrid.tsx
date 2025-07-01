import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/data/sections";

type SectionsGridProps = {
  sections: Section[];
};

export default function SectionsGrid({ sections }: SectionsGridProps) {
  return (
    <motion.section 
      className="mb-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      id="sections-grid"
    >
      <h2 className="text-3xl font-bold font-mono text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">
        Explore Our Offerings
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {sections.map(({ title, href, icon, description }) => (
          <Link key={title} href={href}>
            <motion.div
              className="group relative h-full bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 overflow-hidden p-8 text-center"
              whileHover={{ y: -10, boxShadow: '0 0 30px rgba(159, 112, 253, 0.3)' }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-[#00F5D4] mb-4 text-4xl mx-auto flex justify-center">{icon}</div>
              <h2 className="text-2xl font-bold font-mono mb-3 text-white">{title}</h2>
              <p className="text-gray-400">{description}</p>
              <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent group-hover:border-[#00F5D4] rounded-2xl transition-all duration-300" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}/>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}