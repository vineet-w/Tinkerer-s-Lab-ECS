import { motion } from "framer-motion";

export default function BackgroundParticles() {
  const particles = Array.from({ length: 50 });

  return (
    <>
      <div className="absolute inset-0 z-0 opacity-20" style={{ 
        backgroundImage: 'linear-gradient(#9F70FD 1px, transparent 1px), linear-gradient(to right, #9F70FD 1px, transparent 1px)', 
        backgroundSize: '3rem 3rem' 
      }} />
      
      {particles.map((_, i) => {
        const size = Math.random() * 2 + 1;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ 
              y: [0, Math.random() * 200 - 100, 0], 
              x: [0, Math.random() * 200 - 100, 0], 
              opacity: [0, 0.6, 0] 
            }}
            transition={{ 
              duration: 15 + Math.random() * 15, 
              repeat: Infinity, 
              ease: "easeInOut", 
              delay: Math.random() * 5 
            }}
          />
        );
      })}
    </>
  );
}