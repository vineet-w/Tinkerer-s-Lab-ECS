import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutCTASection() {
  return (
    <motion.section 
      className="mb-24 bg-gradient-to-r from-[#9F70FD]/10 to-[#00F5D4]/10 border border-[#9F70FD]/30 rounded-2xl p-8 md:p-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold font-mono mb-6 text-white">
          Ready to Join Our Community?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Whether you're looking to learn, create, or collaborate, Tinkerer's Lab has something for everyone.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/workshops">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-[#9F70FD] to-[#7a4be6] text-white rounded-full font-bold"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px #9F70FD" }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Workshops
            </motion.button>
          </Link>
          <Link href="/projects">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-[#00F5D4] to-[#00B5A1] text-[#0D0D0D] rounded-full font-bold"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px #00F5D4" }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}