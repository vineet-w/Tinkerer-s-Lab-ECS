import { motion } from "framer-motion";
import { FiUsers, FiAward, FiCode } from 'react-icons/fi';
import { UniqueFeature } from "@/data/uniqueFeatures";

type UniqueFeaturesSectionProps = {
  features: UniqueFeature[];
};

export default function UniqueFeaturesSection({ features }: UniqueFeaturesSectionProps) {
  return (
    <motion.section 
      className="mb-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <h2 className="text-3xl font-bold font-mono text-center mb-12 text-white">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">What Makes Us Unique</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-8 text-center"
            whileHover={{ y: -10, boxShadow: '0 0 30px rgba(159, 112, 253, 0.3)' }}
          >
            <div className="text-[#00F5D4] text-4xl mb-4 flex justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold font-mono mb-3 text-white">{feature.title}</h3>
            <p className="text-gray-300">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}