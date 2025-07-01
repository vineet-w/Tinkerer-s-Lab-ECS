import Image from "next/image";
import { motion } from "framer-motion";
import { FiDownload, FiExternalLink } from 'react-icons/fi';

interface BaseResourceItem {
  name: string;
  description: string;
  link: string;
  type: 'download' | 'external';
  icon: string;
}

interface HardwareResourceItem extends BaseResourceItem {
  available: number;
  location: string;
}

type ResourceItem = BaseResourceItem | HardwareResourceItem;

type ResourceCardProps = {
  resource: ResourceItem;
  isHardware: boolean;
  setIsHovering: (value: string | null) => void;
};

export default function ResourceCard({ resource, isHardware, setIsHovering }: ResourceCardProps) {
  return (
    <motion.div
      className="group bg-[#1A1A1A]/50 backdrop-blur-lg rounded-xl border border-[#9F70FD]/30 p-6"
      whileHover={{ y: -5, boxShadow: '0 0 20px rgba(159, 112, 253, 0.2)' }}
      onHoverStart={() => setIsHovering(`resource-${resource.name}`)}
      onHoverEnd={() => setIsHovering(null)}
    >
      <div className="flex items-start mb-4">
        <div className="w-12 h-12 rounded-lg bg-[#9F70FD]/10 p-2 mr-4 flex-shrink-0">
          <Image
            src={resource.icon}
            alt={resource.name}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold font-mono text-white">{resource.name}</h3>
          <p className="text-gray-400 text-sm">{resource.description}</p>
          
          {isHardware && (
            <div className="mt-2 text-xs text-gray-500">
              <p>Available: <span className="text-[#00F5D4]">{(resource as HardwareResourceItem).available} units</span></p>
              <p>Location: <span className="text-[#9F70FD]">{(resource as HardwareResourceItem).location}</span></p>
            </div>
          )}
        </div>
      </div>
      
      <motion.a
        href={resource.link}
        target={resource.type === "external" ? "_blank" : ""}
        rel="noopener noreferrer"
        className={`mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-mono text-sm ${
          resource.type === "download" 
            ? "bg-[#9F70FD]/20 text-[#9F70FD] hover:bg-[#9F70FD]/30" 
            : "bg-[#00F5D4]/10 text-[#00F5D4] hover:bg-[#00F5D4]/20"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovering(`resource-link-${resource.name}`)}
        onHoverEnd={() => setIsHovering(null)}
      >
        {resource.type === "download" ? (
          <>
            <FiDownload /> {isHardware ? "View Details" : "Download"}
          </>
        ) : (
          <>
            <FiExternalLink /> Visit Site
          </>
        )}
      </motion.a>
    </motion.div>
  );
}