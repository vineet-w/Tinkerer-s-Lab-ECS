'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiCpu, FiCode, FiBookOpen, FiAward, FiMessageSquare, FiDownload, FiExternalLink, FiTool, FiGithub, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';
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

interface ResourceCategory {
  title: string;
  icon?: React.ReactNode;
  items: (BaseResourceItem | HardwareResourceItem)[];
}
const Resources = () => {
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particles = Array.from({ length: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

    const sections = [
      { 
        title: "Workshops", 
        href: "/workshops", 
        icon: <FiCpu size={28} />,
        description: "Hands-on sessions to boost your skills",
        color: "from-purple-500 to-pink-500"
      },
      { 
        title: "Resources", 
        href: "/resources", 
        icon: <FiCode size={28} />,
        description: "Curated tools and references",
        color: "from-blue-500 to-teal-500"
      },
      { 
        title: "Study Materials", 
        href: "/materials", 
        icon: <FiBookOpen size={28} />,
        description: "Learning resources for all levels",
        color: "from-green-500 to-emerald-500"
      },
      { 
        title: "About Us", 
        href: "/about-us", 
        icon: <FiBookOpen size={28} />,
        description: "Get to know us",
        color: "from-green-500 to-emerald-500"
      },
      { 
        title: "Projects", 
        href: "/projects", 
        icon: <FiAward size={28} />,
        description: "Innovative creations from our community",
        color: "from-yellow-500 to-orange-500"
      },
      { 
        title: "Competitions", 
        href: "/competitions", 
        icon: <FiMessageSquare size={28} />,
        description: "Upcoming challenges and events",
        color: "from-red-500 to-pink-500"
      },
    ];

  const resourceCategories = [
    {
      title: "Hardware Components",
      icon: <FiTool className="mr-2" />,
      items: [
        {
          name: "Arduino Starter Kit",
          description: "Complete kit with Uno board, sensors, and components",
          link: "/resources/arduino-kit-list.pdf",
          type: "download",
          icon: "/icons/arduino-kit.png",
          available: 15,
          location: "Cabinet A1"
        },
        {
          name: "Raspberry Pi 4",
          description: "Model B with 4GB RAM - perfect for IoT projects",
          link: "/resources/pi-specs.pdf",
          type: "download",
          icon: "/icons/raspberry-pi.png",
          available: 8,
          location: "Cabinet B2"
        },
        {
          name: "Sensor Collection",
          description: "Temperature, humidity, motion, and light sensors",
          link: "/resources/sensors-guide.pdf",
          type: "download",
          icon: "/icons/sensor-kit.png",
          available: 12,
          location: "Drawer C3"
        },
        {
          name: "3D Printer Filaments",
          description: "PLA, ABS, and PETG in various colors",
          link: "/resources/filament-chart.pdf",
          type: "download",
          icon: "/icons/filament-spool.png",
          available: 20,
          location: "Storage Room"
        },
        {
          name: "Basic Electronics Kit",
          description: "Resistors, capacitors, LEDs, and breadboards",
          link: "/resources/electronics-kit.pdf",
          type: "download",
          icon: "/icons/electronics-kit.png",
          available: 10,
          location: "Cabinet A2"
        },
        {
          name: "Motor & Driver Set",
          description: "DC motors, servos, and motor drivers",
          link: "/resources/motors-guide.pdf",
          type: "download",
          icon: "/icons/motor-kit.png",
          available: 6,
          location: "Cabinet B3"
        }
      ]
    },
    {
      title: "Software Tools",
      items: [
        {
          name: "Arduino IDE",
          description: "Official IDE for Arduino development",
          link: "https://www.arduino.cc/en/software",
          type: "external",
          icon: "/icons/arduino.png"
        },
        {
          name: "VS Code",
          description: "Popular code editor with extensive extensions",
          link: "https://code.visualstudio.com/download",
          type: "external",
          icon: "/icons/vscode.png"
        },
        {
          name: "Fusion 360",
          description: "Professional 3D CAD/CAM design tool",
          link: "https://www.autodesk.com/products/fusion-360",
          type: "external",
          icon: "/icons/fusion360.png"
        }
      ]
    },
    {
      title: "Learning Resources",
      items: [
        {
          name: "Python Crash Course",
          description: "Quick reference for Python programming",
          link: "/resources/python-guide.pdf",
          type: "download",
          icon: "/icons/python.png"
        },
        {
          name: "Electronics Fundamentals",
          description: "Basic circuits and components guide",
          link: "/resources/electronics.pdf",
          type: "download",
          icon: "/icons/electronics.png"
        },
        {
          name: "Git & GitHub Tutorial",
          description: "Version control for collaborative projects",
          link: "https://guides.github.com/activities/hello-world/",
          type: "external",
          icon: "/icons/github.png"
        }
      ]
    },
    {
      title: "Templates",
      items: [
        {
          name: "Project Proposal",
          description: "Template for new project submissions",
          link: "/resources/project-proposal.docx",
          type: "download",
          icon: "/icons/proposal.png"
        },
        {
          name: "Lab Report",
          description: "Standard format for experiment documentation",
          link: "/resources/lab-report.docx",
          type: "download",
          icon: "/icons/report.png"
        },
        {
          name: "Poster Template",
          description: "Conference poster design template",
          link: "/resources/poster-template.pptx",
          type: "download",
          icon: "/icons/poster.png"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D0D] text-gray-300 font-sans overflow-hidden relative">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#9F70FD 1px, transparent 1px), linear-gradient(to right, #9F70FD 1px, transparent 1px)', backgroundSize: '3rem 3rem' }} />

      {/* Animated Background Particles */}
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
            animate={{ y: [0, Math.random() * 200 - 100, 0], x: [0, Math.random() * 200 - 100, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration: 15 + Math.random() * 15, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 5 }}
          />
        );
      })}

      {/* Mouse Trailer */}
      <motion.div
        className="fixed w-48 h-48 rounded-full bg-[#9F70FD] pointer-events-none z-0"
        style={{ filter: 'blur(100px)' }}
        animate={{ x: mousePosition.x - 96, y: mousePosition.y - 96, scale: isHovering ? 1.2 : 1, opacity: isHovering ? 0.3 : 0.15 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Header */}
      <header className="py-6 px-8 sm:px-20 relative z-10 backdrop-blur-md bg-[#0D0D0D]/30">
        <motion.div className="flex justify-between items-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <Image 
            src="/icons/tinku.jpg" 
            alt="Logo" 
            width={48} 
            height={48} 
            className="rounded-full border-2 border-[#9F70FD]/50" 
          />
          <span className="text-xl font-mono font-bold text-white">Tinkerer's Lab ECS</span>
        </Link>
          <nav className="hidden md:flex gap-6 font-mono">
                        <Link href="/">
              <span className="text-gray-300 hover:text-[#00F5D4] transition-colors">Home</span>
            </Link>
            {sections.slice(0, 4).map((section) => (
              <Link key={section.title} href={section.href}>
                <motion.div className="text-gray-300 hover:text-[#00F5D4] transition-colors relative" onHoverStart={() => setIsHovering(section.title)} onHoverEnd={() => setIsHovering(null)} whileHover={{ scale: 1.1 }}>
                  {section.title}
                  <motion.div className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00F5D4]" initial={{ scaleX: 0 }} animate={{ scaleX: isHovering === section.title ? 1 : 0 }} style={{ transformOrigin: 'left' }} transition={{ duration: 0.3 }} />
                </motion.div>
              </Link>
            ))}
          </nav>
        </motion.div>
      </header>

      <main className="flex-1 px-8 sm:px-20 py-12 flex flex-col relative z-10">
        {/* Hero Section */}
        <motion.section 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-block bg-[#9F70FD]/20 border border-[#9F70FD]/50 rounded-full px-4 py-2 text-sm font-mono text-[#00F5D4] mb-6"
            whileHover={{ scale: 1.05, y: -5, boxShadow: '0 0 20px #00F5D4' }}
          >
            Curated Tools & Components
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono mb-6 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">Resources</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Essential hardware components, software tools, and learning materials to support your projects. 
            Check availability and location for physical components.
          </p>
        </motion.section>

        {/* Resource Categories */}
        <div className="space-y-16">
          {resourceCategories.map((category, index) => (
            <motion.section
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h2 className="text-2xl font-bold font-mono mb-8 text-white border-b border-[#9F70FD]/30 pb-2 flex items-center">
                {category.icon || <FiTool className="mr-2" />}
                {category.title}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((resource) => {
                  const isHardware = category.title === "Hardware Components";
                  return (
                    <motion.div
                      key={resource.name}
                      className="group bg-[#1A1A1A]/50 backdrop-blur-lg rounded-xl border border-[#9F70FD]/30 p-6"
                      whileHover={{ y: -5, boxShadow: '0 0 20px rgba(159, 112, 253, 0.2)' }}
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
                      >
                        {resource.type === "download" ? (
                          <>
                            <FiDownload /> {category.title === "Hardware Components" ? "View Details" : "Download"}
                          </>
                        ) : (
                          <>
                            <FiExternalLink /> Visit Site
                          </>
                        )}
                      </motion.a>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Additional Resources Section */}
        <motion.section 
          className="mt-24 bg-gradient-to-r from-[#9F70FD]/10 to-[#00F5D4]/10 border border-[#9F70FD]/30 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-mono mb-6 text-white">
              Need help with components?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Our lab assistants can help you find and use the right components for your project.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-[#9F70FD] to-[#7a4be6] text-white rounded-full font-bold"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px #9F70FD" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("https://docs.google.com/forms/d/1TpRhNPhQGNSSjlbgx7pmNWeqHzL2Sech7tt1Oq4uSpk/preview", "_blank")}
              >
                Book Lab Assistance
              </motion.button>
              <motion.button
                className="px-8 py-3 border border-[#9F70FD] text-[#9F70FD] rounded-full font-bold"
                whileHover={{ scale: 1.05, backgroundColor: "#9F70FD", color: "#0D0D0D" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("https://docs.google.com/forms/d/1TpRhNPhQGNSSjlbgx7pmNWeqHzL2Sech7tt1Oq4uSpk/preview", "_blank")}

              >
                Component Request Form
              </motion.button>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-8 sm:px-20 border-t border-[#9F70FD]/20 relative z-10 backdrop-blur-md bg-[#0D0D0D]/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Logo and Social Links */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10">
                  <Image
                    src="/icons/tinku.jpg"
                    alt="Tinkerer's Lab ECS Logo"
                    width={40}
                    height={40}
                    className="object-contain rounded-lg border border-[#9F70FD]/30"
                  />
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
            
            {/* Quick Links */}
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
            
            {/* VESIT Information */}
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
          
          {/* Copyright */}
          <div className="border-t border-[#9F70FD]/20 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm font-mono">
              &copy; {new Date().getFullYear()} Tinkerer's Lab ECS. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-4 md:mt-0 font-mono">
              Built with ❤️ by the Dreamers for Dreamers.
            </p>
          </div>
        </div>
        
        {/* Floating animated elements */}
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
    </div>
  );
};

export default Resources;