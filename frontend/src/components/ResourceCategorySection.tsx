import { motion } from "framer-motion";
import { FiTool } from 'react-icons/fi';
import ResourceCard from "./ResourceCard";
import { ResourceCategory } from "@/data/resourceCategories";

type ResourceCategorySectionProps = {
  category: ResourceCategory;
  index: number;
  setIsHovering: (value: string | null) => void;
};

export default function ResourceCategorySection({ 
  category, 
  index, 
  setIsHovering 
}: ResourceCategorySectionProps) {
  const isHardware = category.title === "Hardware Components";
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      onHoverStart={() => setIsHovering(`category-${category.title}`)}
      onHoverEnd={() => setIsHovering(null)}
    >
      <h2 className="text-2xl font-bold font-mono mb-8 text-white border-b border-[#9F70FD]/30 pb-2 flex items-center">
        {category.icon || <FiTool className="mr-2" />}
        {category.title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.items.map((resource) => (
          <ResourceCard 
            key={resource.name} 
            resource={resource} 
            isHardware={isHardware}
            setIsHovering={setIsHovering}
          />
        ))}
      </div>
    </motion.section>
  );
}