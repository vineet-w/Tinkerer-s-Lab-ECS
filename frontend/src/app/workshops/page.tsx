'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiArrowRight, FiCheckCircle, FiTwitter, FiGithub, FiInstagram, FiLinkedin, FiAward, FiBookOpen, FiCode, FiCpu, FiMessageSquare } from 'react-icons/fi';
import { useState } from "react";

const Workshops = () => {
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const currentDate = new Date();
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
  
  const workshops = [
    {
      id: 1,
      title: "Introduction to Arduino",
      description: "Learn the fundamentals of Arduino programming and circuit design through hands-on projects.",
      date: "2023-12-15",
      time: "2:00 PM - 5:00 PM",
      location: "Lab 201, 2nd Floor",
      capacity: 20,
      instructor: "Prof. Rajesh Kumar",
      image: "/images/workshops/arduino.jpg",
      tags: ["Electronics", "Beginner"]
    },
    {
      id: 2,
      title: "Machine Learning Basics",
      description: "Get started with Python and scikit-learn to build your first machine learning models.",
      date: "2023-12-22",
      time: "10:00 AM - 1:00 PM",
      location: "Lab 205, 2nd Floor",
      capacity: 15,
      instructor: "Dr. Priya Sharma",
      image: "/images/workshops/ml.jpg",
      tags: ["AI", "Python", "Intermediate"]
    },
    {
      id: 3,
      title: "3D Printing Workshop",
      description: "From design to print - learn how to create 3D models and operate our lab's 3D printers.",
      date: "2023-11-29",
      time: "3:00 PM - 6:00 PM",
      location: "Maker Space, 1st Floor",
      capacity: 10,
      instructor: "Ankit Patel",
      image: "/images/workshops/3dprinting.jpg",
      tags: ["Maker", "Hardware"]
    },
    {
      id: 4,
      title: "Web Development Bootcamp",
      description: "Build responsive websites using HTML, CSS, and JavaScript in this intensive 3-day workshop.",
      date: "2023-11-20",
      time: "9:00 AM - 4:00 PM",
      location: "Computer Lab 3",
      capacity: 25,
      instructor: "Neha Gupta",
      image: "/images/workshops/webdev.jpg",
      tags: ["Programming", "Beginner"]
    },
    {
      id: 5,
      title: "IoT with Raspberry Pi",
      description: "Connect sensors and build smart devices using Raspberry Pi and cloud services.",
      date: "2023-12-13",
      time: "1:00 PM - 5:00 PM",
      location: "Lab 201, 2nd Floor",
      capacity: 12,
      instructor: "Vikram Joshi",
      image: "/images/workshops/iot.jpg",
      tags: ["Electronics", "Intermediate"]
    },
    {
      id: 6,
      title: "Advanced PCB Design",
      description: "Learn professional PCB design techniques using industry-standard software.",
      date: "2023-11-15",
      time: "10:00 AM - 3:00 PM",
      location: "Electronics Lab",
      capacity: 8,
      instructor: "Sanjay Mehta",
      image: "/images/workshops/pcb.jpg",
      tags: ["Hardware", "Advanced"]
    }
  ];

  // Separate workshops into upcoming and past
  const upcomingWorkshops = workshops.filter(workshop => new Date(workshop.date) >= currentDate);
  const pastWorkshops = workshops.filter(workshop => new Date(workshop.date) < currentDate);

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
            {sections.slice(0, 3).map((section) => (
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
            Hands-on Learning Experiences
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono mb-6 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">Workshops</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Expand your skills with our interactive workshops led by industry experts and faculty members. 
            From beginner to advanced levels, we've got something for everyone.
          </p>
        </motion.section>

        {/* Upcoming Workshops */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center mb-8">
            <h2 className="text-3xl font-bold font-mono text-white mr-4">Upcoming Workshops</h2>
            <span className="px-3 py-1 text-sm font-mono rounded-full bg-[#00F5D4]/20 text-[#00F5D4]">
              {upcomingWorkshops.length} available
            </span>
          </div>

          {upcomingWorkshops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingWorkshops.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} isPast={false} />
              ))}
            </div>
          ) : (
            <div className="bg-[#1A1A1A]/50 border border-[#9F70FD]/30 rounded-2xl p-12 text-center">
              <p className="text-xl text-gray-400 mb-6">No upcoming workshops scheduled yet.</p>
              <p className="text-gray-500">Check back later or subscribe to our newsletter for updates.</p>
            </div>
          )}
        </motion.section>

        {/* Past Workshops */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center mb-8">
            <h2 className="text-3xl font-bold font-mono text-white mr-4">Past Workshops</h2>
            <span className="px-3 py-1 text-sm font-mono rounded-full bg-[#9F70FD]/20 text-[#9F70FD]">
              {pastWorkshops.length} completed
            </span>
          </div>

          {pastWorkshops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastWorkshops.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} isPast={true} />
              ))}
            </div>
          ) : (
            <div className="bg-[#1A1A1A]/50 border border-[#9F70FD]/30 rounded-2xl p-12 text-center">
              <p className="text-gray-500">No past workshops to display.</p>
            </div>
          )}
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="mb-24 bg-gradient-to-r from-[#9F70FD]/10 to-[#00F5D4]/10 border border-[#9F70FD]/30 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-mono mb-6 text-white">
              Want to conduct your own workshop?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We're always looking for passionate individuals to share their knowledge with our community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-[#9F70FD] to-[#7a4be6] text-white rounded-full font-bold"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px #9F70FD" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("https://docs.google.com/forms/d/1TpRhNPhQGNSSjlbgx7pmNWeqHzL2Sech7tt1Oq4uSpk/preview", "_blank")}

              >
                Propose a Workshop
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

// Workshop Card Component
const WorkshopCard = ({ workshop, isPast }: { workshop: any, isPast: boolean }) => {
  return (
    <motion.div
      className={`group relative bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border overflow-hidden ${isPast ? 'border-[#9F70FD]/10' : 'border-[#9F70FD]/30'}`}
      whileHover={{ y: -10, boxShadow: '0 0 30px rgba(159, 112, 253, 0.3)' }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={workshop.image}
          alt={workshop.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
        {isPast && (
          <div className="absolute top-4 right-4 bg-[#9F70FD]/80 text-white px-3 py-1 rounded-full text-xs font-mono flex items-center">
            <FiCheckCircle className="mr-1" /> Completed
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {workshop.tags.map((tag: string, index: number) => (
            <span 
              key={index}
              className={`px-3 py-1 text-xs font-mono rounded-full ${isPast ? 'bg-[#9F70FD]/10 text-[#9F70FD]' : 'bg-[#9F70FD]/20 text-[#00F5D4]'}`}
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h2 className="text-2xl font-bold font-mono mb-3 text-white">{workshop.title}</h2>
        <p className={`mb-4 ${isPast ? 'text-gray-500' : 'text-gray-400'}`}>{workshop.description}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-300">
            <FiCalendar className={`mr-3 ${isPast ? 'text-[#9F70FD]' : 'text-[#00F5D4]'}`} />
            <span>{new Date(workshop.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <FiClock className={`mr-3 ${isPast ? 'text-[#9F70FD]' : 'text-[#00F5D4]'}`} />
            <span>{workshop.time}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <FiMapPin className={`mr-3 ${isPast ? 'text-[#9F70FD]' : 'text-[#00F5D4]'}`} />
            <span>{workshop.location}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <FiUsers className={`mr-3 ${isPast ? 'text-[#9F70FD]' : 'text-[#00F5D4]'}`} />
            <span>{workshop.capacity} seats {isPast ? 'were' : 'are'} available | Instructor: {workshop.instructor}</span>
          </div>
        </div>
        
        {isPast ? (
          <button
            className="w-full px-6 py-3 bg-[#9F70FD]/10 text-[#9F70FD] rounded-lg font-bold font-mono flex items-center justify-center cursor-not-allowed"
            disabled
          >
            Workshop Completed
          </button>
        ) : (
          <motion.button
            className="w-full px-6 py-3 bg-gradient-to-r from-[#9F70FD] to-[#00F5D4] text-white rounded-lg font-bold font-mono flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Register Now <FiArrowRight className="ml-2" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Workshops;