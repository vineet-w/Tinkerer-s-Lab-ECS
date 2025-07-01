import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiTwitter, FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { Section } from "@/data/sections";

export default function Footer({ sections }: { sections: Section[] }) {
  return (
    <footer className="py-12 px-8 sm:px-20 border-t border-[#9F70FD]/20 relative z-10 backdrop-blur-md bg-[#0D0D0D]/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* Adjusted w- and h- classes and Image props */}
              <div className="relative w-16 h-16"> 
               <Image
                   src="/icons/tinku.jpg"
                   alt="Tinkerer's Lab ECS Logo"
                   width={100} // Increased width
                   height={100} // Increased height
                   className="object-contain rounded-lg border border-[#9F70FD]/30"/>
               </div>
              <span className="font-bold text-white font-mono">Tinkerer's Lab ECS</span>
            </div>
            <p className="text-gray-400 mb-4 font-mono">
              Fostering innovation and creativity through hands-on learning and collaboration.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <FiTwitter className="h-5 w-5" />, color: "hover:text-[#1DA1F2]" },
                { icon: <FiGithub className="h-5 w-5" />, color: "hover:text-gray-300" },
                { icon: <FiLinkedin className="h-5 w-5" />, color: "hover:text-[#0077B5]" },
                { icon: <FiInstagram className="h-5 w-5" />, color: "hover:text-[#E1306C]" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className={`text-gray-400 ${social.color} transition-colors`}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-[#9F70FD]/30">
                    {social.icon}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4 font-mono">Quick Links</h3>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.title}>
                  <Link href={section.href}>
                    <motion.div
                      className="text-gray-400 hover:text-[#00F5D4] transition-colors font-mono"
                      whileHover={{ x: 5 }}
                    >
                      {section.title}
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="flex-shrink-0">
              <Image
                src="/icons/vesit.png"
                alt="VESIT Logo"
                width={100}
                height={20}
                className="object-contain rounded-lg border border-[#9F70FD]/30"
              />
            </div>

            <div>
              <h4 className="text-white font-bold text-center md:text-left font-mono">
                Vivekanand Education Society's Institute Of Technology
              </h4>
              <p className="text-gray-400 text-sm mt-1 text-center md:text-left font-mono">
                Hashu Adwani Memorial Complex, Collector's Colony, Chembur, Mumbai, Maharashtra, 400074
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#9F70FD]/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm font-mono">
            &copy; {new Date().getFullYear()} Tinkerer's Lab ECS. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-4 md:mt-0 font-mono">
            Built with ❤️ by the Dreamers for Dreamers.
          </p>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#9F70FD] via-[#7a4be6] to-[#00F5D4]"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
        style={{
          backgroundSize: '200% 200%'
        }}
      />
    </footer>
  );
}