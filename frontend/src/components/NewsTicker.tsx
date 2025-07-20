"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "../../firebase"; // adjust the path if needed
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const NewsTicker: React.FC = () => {
  const [newsItems, setNewsItems] = useState<string[]>([]);

  useEffect(() => {
    const q = query(collection(db, "news"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const latestNews: string[] = snapshot.docs.map(
        (doc) => doc.data().title as string
      );
      setNewsItems(latestNews);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  if (newsItems.length === 0) {
    return null; // Hide ticker if no news
  }

  return (
    <motion.section
      className="mb-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="relative overflow-hidden py-4 bg-[#1A1A1A]/50 rounded-lg border border-[#9F70FD]/30">
        <motion.div
          className="flex whitespace-nowrap items-center"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...newsItems, ...newsItems].map((item, i) => (
            <div key={i} className="flex items-center px-12">
              <span className="text-[#00F5D4] mr-4 text-3xl">*</span>
              <span className="text-gray-300 text-xl font-mono font-medium tracking-wide">
                {item}
              </span>
              <div className="w-4 h-0.5 bg-[#9F70FD]/50 mx-8"></div>
            </div>
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
      </div>
    </motion.section>
  );
};

export default NewsTicker;
