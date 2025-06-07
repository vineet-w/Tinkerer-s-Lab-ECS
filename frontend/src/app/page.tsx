'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FiCpu, FiCode, FiBookOpen, FiAward, FiMessageSquare, FiArrowRight, FiTwitter, FiGithub, FiLinkedin, FiInstagram, FiMail, FiMapPin } from 'react-icons/fi';
import ContactSection from "@/components/Form";

export default function Home() {
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const galleryRef = useRef(null);
  const [galleryWidth, setGalleryWidth] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleResize = () => {
      if (galleryRef.current) {
        setGalleryWidth((galleryRef.current as HTMLDivElement).offsetWidth);
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    
    handleResize();
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
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
  const newsItems = [
    "New workshop on AI fundamentals starting next week!",
    "Annual tech fest registration now open",
    "Student project wins national innovation award",
    "New equipment added to the lab: 3D printers and VR sets",
    "Collaboration with TechCorp for internship opportunities"
  ];

  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Robotics Team Lead",
      content: "Tinkerer's Lab gave me the resources and mentorship to turn my prototype into a market-ready product. The community here is unparalleled!",
      avatar: "/avatar1.jpg"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "AI Research Intern",
      content: "The workshops here transformed my understanding of machine learning. I went from beginner to building complex models in just 3 months.",
      avatar: "/avatar2.jpg"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Senior Developer",
      content: "As an alumni, I still collaborate with the lab on projects. The facilities and expert guidance continue to inspire innovation.",
      avatar: "/avatar3.jpg"
    }
  ];

 const galleryImages = Array(12).fill(0).map((_, i) => `/events/event${i % 4 + 1}.jpg`);
  const particles = Array.from({ length: 50 });

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

      <header className="py-6 px-8 sm:px-20 relative z-10 backdrop-blur-md bg-[#0D0D0D]/30">
        <motion.div className="flex justify-between items-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-3">
            <Image src="/icons/tinku.jpg" alt="Logo" width={48} height={48} className="rounded-full border-2 border-[#9F70FD]/50" />
            <span className="text-xl font-mono font-bold text-white">Tinkerer's Lab ECS</span>
          </div>
          <nav className="hidden md:flex gap-6 font-mono">
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

      <main className="flex-1 px-8 sm:px-20  flex flex-col relative z-10">
        {/* ==================== HERO SECTION ==================== */}

        
        <motion.section className="min-h-[80vh] flex flex-col justify-center items-center text-center mb-24" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <motion.div 
          className="flex items-start gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo on left */}
          <Image 
            src="/icons/vesit.png" 
            alt="VESIT Logo" 
            width={50} 
            height={50} 
            className="object-contain mt-1 "  // mt-1 for minor vertical alignment adjustment
          />
          
          {/* Text content stacked vertically on right */}
          <div className="flex flex-col">
            
            <motion.h2 
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4] mb-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              V.E.S. Institute of Technology
            </motion.h2>
            <hr className="px-1 py-1"/>
            <motion.p 
              className="text-sm text-gray-400 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Department of Electronics and Computer Science
            </motion.p>
          </div>
        </motion.div>
        <br /><br />
          <motion.div className="inline-block bg-[#9F70FD]/20 border border-[#9F70FD]/50 rounded-full px-4 py-2 text-sm font-mono text-[#00F5D4] mb-6" whileHover={{ scale: 1.05, y: -5, boxShadow: '0 0 20px #00F5D4' }}>
            Innovate, Integrate, Dominate 🔧
          </motion.div>
          
          <motion.h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-mono mb-6 text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            Tinkerer's Lab <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">ECS</span>
          </motion.h1>
          
          <motion.p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
            Where technology meets creativity. Discover workshops, study materials, project showcases, and upcoming tech competitions—all in one place.
          </motion.p>
  
          <motion.button 
            className="px-8 py-3 bg-gradient-to-r from-[#9F70FD] to-[#7a4be6] text-white rounded-full font-bold shadow-lg transition-all" 
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px #9F70FD" }} 
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const gridSection = document.getElementById('sections-grid');
              if (gridSection) {
                gridSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Explore Now <FiArrowRight className="inline-block ml-2" />
              </motion.button>
              </motion.section>

        {/* ==================== NEWS TICKER ==================== */}
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

        {/* ==================== SECTIONS GRID ==================== */}
            <motion.section 
              className="mb-24"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              id="sections-grid"  // Add this line
            >
          <h2 className="text-3xl font-bold font-mono text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">Explore Our Offerings</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sections.map(({ title, href, icon, description }) => (
              <Link key={title} href={href}>
                <motion.div
                  className="group relative h-full bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 overflow-hidden p-8 text-center"
                  whileHover={{ y: -10, boxShadow: '0 0 30px rgba(159, 112, 253, 0.3)' }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-[#00F5D4] mb-4 text-4xl mx-auto flex justify-center">{icon}</div>
                  <h2 className="text-2xl font-bold font-mono mb-3 text-white">{title}</h2>
                  <p className="text-gray-400">{description}</p>
                  <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent group-hover:border-[#00F5D4] rounded-2xl transition-all duration-300" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}/>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* ==================== TESTIMONIALS ==================== */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-bold font-mono text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">What Our Members Say</h2>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Navigation Arrows */}
            <button 
              onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 p-2 rounded-full bg-[#1A1A1A]/80 hover:bg-[#9F70FD]/20 transition-all border border-[#9F70FD]/30"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00F5D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 p-2 rounded-full bg-[#1A1A1A]/80 hover:bg-[#9F70FD]/20 transition-all border border-[#9F70FD]/30"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00F5D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="relative h-80">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className={`absolute inset-0 bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#9F70FD]/30 rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-500 ${activeTestimonial === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: activeTestimonial === index ? 1 : 0,
                    y: activeTestimonial === index ? 0 : 20
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#9F70FD]/30 mx-auto">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  
                  <blockquote className="text-xl italic text-gray-300 mb-6 max-w-2xl">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div>
                    <p className="font-bold text-white font-mono">{testimonial.name}</p>
                    <p className="text-[#00F5D4]">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === index ? 'bg-[#00F5D4] scale-125' : 'bg-[#9F70FD]/30'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* ==================== GALLERY ==================== */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-bold font-mono text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">Our Lab in Action</h2>
          
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

        {/* ==================== CONTACT SECTION ==================== */}
        <ContactSection/>
      </main>

      {/* ==================== FOOTER ==================== */}
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
}