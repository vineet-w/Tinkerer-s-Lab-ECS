'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiCpu, FiCode, FiBookOpen, FiAward, FiMessageSquare, FiDownload, FiExternalLink, FiTool, FiSearch, FiGithub, FiInstagram, FiLinkedin, FiTwitter, FiX } from 'react-icons/fi';

const Materials = () => {
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");






  // Original Materials Page Content (only shown when verified)
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

  const studyCategories = [
    {
      title: "Electronics & Circuits",
      icon: "/icons/circuit.png",
      resources: [
        {
          name: "Basic Electronics Handbook",
          description: "Fundamentals of electronic components and circuit design",
          link: "/materials/electronics-handbook.pdf",
          type: "download",
          level: "Beginner",
          pages: 120,
          year: 2023
        },
        {
          name: "Advanced Circuit Analysis",
          description: "In-depth guide to complex circuit analysis techniques",
          link: "/materials/circuit-analysis.pdf",
          type: "download",
          level: "Advanced",
          pages: 210,
          year: 2022
        },
        {
          name: "PCB Design Guide",
          description: "Complete reference for professional PCB design",
          link: "https://www.pcbdesignguide.com",
          type: "external",
          level: "Intermediate",
          year: 2023
        }
      ]
    },
    {
      title: "Programming & CS",
      icon: "/icons/programming.png",
      resources: [
        {
          name: "Python Crash Course",
          description: "Quick reference for Python programming basics",
          link: "/materials/python-guide.pdf",
          type: "download",
          level: "Beginner",
          pages: 85,
          year: 2023
        },
        {
          name: "Data Structures Handbook",
          description: "Comprehensive guide to algorithms and data structures",
          link: "/materials/dsa-handbook.pdf",
          type: "download",
          level: "Intermediate",
          pages: 150,
          year: 2022
        },
        {
          name: "Machine Learning Basics",
          description: "Introduction to ML concepts with Python examples",
          link: "/materials/ml-basics.pdf",
          type: "download",
          level: "Intermediate",
          pages: 95,
          year: 2023
        }
      ]
    },
    {
      title: "Mathematics for Engineers",
      icon: "/icons/maths.png",
      resources: [
        {
          name: "Engineering Mathematics I",
          description: "Complete course notes for first year engineering math",
          link: "/materials/eng-math-1.pdf",
          type: "download",
          level: "Beginner",
          pages: 180,
          year: 2023
        },
        {
          name: "Discrete Mathematics",
          description: "Essential concepts for computer science students",
          link: "/materials/discrete-math.pdf",
          type: "download",
          level: "Intermediate",
          pages: 145,
          year: 2022
        },
        {
          name: "Probability & Statistics",
          description: "Applied statistics for engineering problems",
          link: "https://www.probability-course.com",
          type: "external",
          level: "Intermediate",
          year: 2023
        }
      ]
    },
    {
      title: "Project Guides",
      icon: "/icons/project.png",
      resources: [
        {
          name: "IoT Project Handbook",
          description: "Step-by-step guide to building IoT systems",
          link: "/materials/iot-guide.pdf",
          type: "download",
          level: "Intermediate",
          pages: 110,
          year: 2023
        },
        {
          name: "Robotics Starter Kit",
          description: "Beginner's guide to building simple robots",
          link: "/materials/robotics-guide.pdf",
          type: "download",
          level: "Beginner",
          pages: 75,
          year: 2023
        },
        {
          name: "3D Printing Projects",
          description: "Collection of 3D printing project ideas",
          link: "/materials/3d-printing-projects.pdf",
          type: "download",
          level: "All Levels",
          pages: 60,
          year: 2022
        }
      ]
    }
  ];

  // Filter resources based on search query
  const filteredCategories = studyCategories.map(category => ({
    ...category,
    resources: category.resources.filter(resource => 
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.resources.length > 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D0D] text-gray-300 font-sans overflow-hidden relative">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#9F70FD 1px, transparent 1px), linear-gradient(to right, #9F70FD 1px, transparent 1px)', backgroundSize: '3rem 3rem' }} />

      {/* Header */}
      <header className="py-6 px-8 sm:px-20 relative z-10 backdrop-blur-md bg-[#0D0D0D]/30">
        <div className="flex justify-between items-center">


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
        </div>
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
            Exclusive ECS Resources
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono mb-6 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">Study Materials</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Comprehensive collection of textbooks, guides, and reference materials exclusively for ECS students. 
            Filter by category or search for specific topics.
          </p>
          
          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search study materials..."
                className="w-full bg-[#1A1A1A]/50 border border-[#9F70FD]/30 rounded-full py-3 pl-12 pr-6 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9F70FD]/50 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </motion.section>

        {/* Study Materials Categories */}
        <div className="space-y-16">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <motion.section
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="flex items-center mb-8">
                  <div className="w-10 h-10 rounded-lg bg-[#9F70FD]/10 p-2 mr-4 flex-shrink-0">
                    <Image
                      src={category.icon}
                      alt={category.title}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <h2 className="text-2xl font-bold font-mono text-white">{category.title}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.resources.map((resource) => (
                    <motion.div
                      key={resource.name}
                      className="group bg-[#1A1A1A]/50 backdrop-blur-lg rounded-xl border border-[#9F70FD]/30 p-6 h-full flex flex-col"
                      whileHover={{ y: -5, boxShadow: '0 0 20px rgba(159, 112, 253, 0.2)' }}
                    >
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold font-mono text-white mb-2">{resource.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{resource.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-2 py-1 text-xs font-mono rounded-full bg-[#9F70FD]/20 text-[#00F5D4]">
                            {resource.level}
                          </span>
                          {'pages' in resource && (
                            <span className="px-2 py-1 text-xs font-mono rounded-full bg-[#9F70FD]/10 text-gray-400">
                              {resource.pages} pages
                            </span>
                          )}
                          <span className="px-2 py-1 text-xs font-mono rounded-full bg-[#9F70FD]/10 text-gray-400">
                            {resource.year}
                          </span>
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
                            <FiDownload /> Download PDF
                          </>
                        ) : (
                          <>
                            <FiExternalLink /> Visit Resource
                          </>
                        )}
                      </motion.a>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-gray-400 mb-4">No study materials found matching your search.</p>
              <button 
                className="text-[#9F70FD] hover:text-[#00F5D4] font-mono"
                onClick={() => setSearchQuery("")}
              >
                Clear search and show all
              </button>
            </motion.div>
          )}
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
              Looking for something specific?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Can't find what you're looking for? Request study materials or contribute your own resources.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-[#9F70FD] to-[#7a4be6] text-white rounded-full font-bold"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px #9F70FD" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("https://forms.gle/TEYZTBgN2EymmbDVA", "_blank")}

              >
                Request Materials
              </motion.button>
              <motion.button
                className="px-8 py-3 border border-[#9F70FD] text-[#9F70FD] rounded-full font-bold"
                whileHover={{ scale: 1.05, backgroundColor: "#9F70FD", color: "#0D0D0D" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("https://forms.gle/M2bs3nU91Aaz64WT6", "_blank")}

              >
                Contribute Resources
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

export default Materials;