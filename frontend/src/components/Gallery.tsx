import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { galleryImages } from "@/data/galleryImages";

export default function Gallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryWidth, setGalleryWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (galleryRef.current) {
        setGalleryWidth(galleryRef.current.offsetWidth);
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.section 
      className="mb-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <h2 className="text-3xl font-bold font-mono text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">
        Our Lab in Action
      </h2>
      
      <div 
        ref={galleryRef}
        className="relative h-96 overflow-hidden rounded-2xl border border-[#9F70FD]/30"
      >
        <motion.div
          className="absolute inset-0 flex"
          animate={{ x: [-galleryWidth * 0.5, 0] }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[...galleryImages, ...galleryImages].map((img, i) => (
            <div key={i} className="relative h-96 w-80 flex-shrink-0 mx-2">
              <Image
                src={img}
                alt={`Gallery image ${i + 1}`}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}