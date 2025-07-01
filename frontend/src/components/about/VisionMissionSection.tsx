import { motion } from "framer-motion";
import { FiArrowRight } from 'react-icons/fi';

export default function VisionMissionSection() {
  return (
    <motion.section 
      className="mb-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Vision */}
        <div className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-8">
          <h2 className="text-3xl font-bold font-mono mb-6 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">Vision</span>
          </h2>
          <p className="text-lg text-gray-300">
            To foster a culture of innovation where students turn ideas into reality and bridge the gap between theory & practice, helping students grow into skilled, industry-ready engineers through hands-on learning and exploration.
          </p>
        </div>
        
        {/* Mission */}
        <div className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-8">
          <h2 className="text-3xl font-bold font-mono mb-6 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">Mission</span>
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <FiArrowRight className="text-[#00F5D4] mr-3 mt-1 flex-shrink-0" />
              <span className="text-lg text-gray-300">To encourage hands-on learning through practical projects and activities.</span>
            </li>
            <li className="flex items-start">
              <FiArrowRight className="text-[#00F5D4] mr-3 mt-1 flex-shrink-0" />
              <span className="text-lg text-gray-300">To organize workshops on emerging technologies in Electronics and Computer Science.</span>
            </li>
            <li className="flex items-start">
              <FiArrowRight className="text-[#00F5D4] mr-3 mt-1 flex-shrink-0" />
              <span className="text-lg text-gray-300">To inspire students to explore and experiment with new technologies.</span>
            </li>
            <li className="flex items-start">
              <FiArrowRight className="text-[#00F5D4] mr-3 mt-1 flex-shrink-0" />
              <span className="text-lg text-gray-300">To build a vibrant technical community driven by curiosity, passion, and innovation.</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
}