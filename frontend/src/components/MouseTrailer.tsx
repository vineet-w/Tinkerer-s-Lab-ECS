import { motion } from "framer-motion";

type MouseTrailerProps = {
  mousePosition: { x: number; y: number };
  isHovering: string | null;
};

export default function MouseTrailer({ mousePosition, isHovering }: MouseTrailerProps) {
  return (
    <motion.div
      className="fixed w-48 h-48 rounded-full bg-[#9F70FD] pointer-events-none z-0"
      style={{ filter: 'blur(100px)' }}
      animate={{ 
        x: mousePosition.x - 96, 
        y: mousePosition.y - 96, 
        scale: isHovering ? 1.2 : 1, 
        opacity: isHovering ? 0.3 : 0.15 
      }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
    />
  );
}