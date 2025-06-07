'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiUsers, FiAward, FiBookOpen, FiCode, FiCpu, FiGithub, FiInstagram, FiLinkedin, FiTwitter, FiMessageSquare } from 'react-icons/fi';
import { useState } from "react";

const About = () => {
  const [isHovering, setIsHovering] = useState<string | null>(null);
  
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
  const faculty = [
    {
      name: " Mr. Yogesh Pandit",
      role: "Faculty In-Charge",
      department: "Electronics & Computer Science  ",
      image: "/team/yp.jpg"
    },

  ];



  const labImages = [
    "/images/lab1.jpg",
    "/images/lab2.jpg",
    "/images/lab3.jpg",
    "/images/lab4.jpg"
  ];

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
            Where Ideas Become Reality
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono mb-6 text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">Tinkerer's Lab</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Discover our mission, vision, and the team behind this innovative space for electronics and computer science enthusiasts.
          </p>
        </motion.section>

        {/* Introduction Section */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold font-mono mb-6 text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">Introduction</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Tinkerer's Lab, ECS Department, VESIT was established with the vision of transforming innovative ideas into tangible realities, embodying the true spirit of engineering. The lab serves as a bridge between academic knowledge and practical application, fostering a strong connection between the theoretical syllabus and real-world technology.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                One of its primary objectives is to enhance the technical competence of budding engineers, thereby increasing their value in core industries. By encouraging efficient utilization of institutional resources and providing a dynamic platform for hands-on learning, Tinkerer's Lab aims to cultivate an environment where passion, purpose, and practical skills converge to create a holistic and enriching educational experience.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              {labImages.slice(0, 2).map((img, index) => (
                <motion.div 
                  key={index}
                  className="relative h-64 rounded-2xl overflow-hidden border border-[#9F70FD]/30"
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src={img}
                    alt="Lab Image"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
              {labImages.slice(2, 4).map((img, index) => (
                <motion.div 
                  key={index+2}
                  className="relative h-64 rounded-2xl overflow-hidden border border-[#9F70FD]/30"
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src={img}
                    alt="Lab Image"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Vision & Mission Section */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-8">
              <h2 className="text-3xl font-bold font-mono mb-6 text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">Vision</span>
              </h2>
              <p className="text-lg text-gray-300">
                To foster a culture of innovation where students turn ideas into reality and bridge the gap between theory & practice, helping students grow into skilled, industry-ready engineers through hands-on learning and exploration.
              </p>
            </div>
            
            {/* Mission */}
            <div className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-8">
              <h2 className="text-3xl font-bold font-mono mb-6 text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">Mission</span>
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FiArrowRight className="text-[#00F5D4] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-300">To encourage hands-on learning through practical projects and activities.</span>
                </li>
                <li className="flex items-start">
                  <FiArrowRight className="text-[#00F5D4] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-300">To organize workshops on emerging technologies in Electronics and Computer Science.</span>
                </li>
                <li className="flex items-start">
                  <FiArrowRight className="text-[#00F5D4] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-300">To inspire students to explore and experiment with new technologies.</span>
                </li>
                <li className="flex items-start">
                  <FiArrowRight className="text-[#00F5D4] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-300">To build a vibrant technical community driven by curiosity, passion, and innovation.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* What Makes Us Unique Section */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-bold font-mono text-center mb-12 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">What Makes Us Unique</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-8 text-center"
              whileHover={{ y: -10, boxShadow: '0 0 30px rgba(159, 112, 253, 0.3)' }}
            >
              <div className="text-[#00F5D4] text-4xl mb-4 flex justify-center">
                <FiUsers />
              </div>
              <h3 className="text-xl font-bold font-mono mb-3 text-white">Student-Driven</h3>
              <p className="text-gray-300">
                Our lab is primarily run by students, for students, ensuring that activities and resources meet actual student needs and interests.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-8 text-center"
              whileHover={{ y: -10, boxShadow: '0 0 30px rgba(159, 112, 253, 0.3)' }}
            >
              <div className="text-[#00F5D4] text-4xl mb-4 flex justify-center">
                <FiAward />
              </div>
              <h3 className="text-xl font-bold font-mono mb-3 text-white">Project-Based Learning</h3>
              <p className="text-gray-300">
                We emphasize learning by doing, with students working on real projects that solve practical problems.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-8 text-center"
              whileHover={{ y: -10, boxShadow: '0 0 30px rgba(159, 112, 253, 0.3)' }}
            >
              <div className="text-[#00F5D4] text-4xl mb-4 flex justify-center">
                <FiCode />
              </div>
              <h3 className="text-xl font-bold font-mono mb-3 text-white">Cutting-Edge Tech</h3>
              <p className="text-gray-300">
                We provide access to the latest technologies and tools in electronics and computer science.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-bold font-mono text-center mb-12 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">Our Team</span>
          </h2>
          
          {/* Faculty In-Charge */}
<div className="mb-16">
  <h3 className="text-2xl font-bold font-mono mb-8 text-white text-center">
    Faculty In-Charge
  </h3>

  <div
    className={`${
      faculty.length === 1
        ? "flex justify-center"
        : "grid grid-cols-1 md:grid-cols-2 gap-8"
    } max-w-4xl mx-auto`}
  >
    {faculty.map((person, index) => (
      <motion.div 
        key={index}
        className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-6 flex items-center gap-6"
        whileHover={{ y: -5, boxShadow: '0 0 20px rgba(159, 112, 253, 0.2)' }}
      >
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#9F70FD]/50">
            <Image
                src={person.image}
                alt={person.name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
            />
            </div>

        <div>
          <h4 className="text-xl font-bold font-mono text-white">{person.name}</h4>
          <p className="text-[#00F5D4] mb-1">{person.role}</p>
          <p className="text-gray-400">{person.department}</p>
        </div>
      </motion.div>
    ))}
  </div>
</div>

          
          {/* Student Coordinators */}
<div className="mb-16">
  <h3 className="text-2xl font-bold font-mono mb-8 text-white text-center">
    Student's Core Team 2025-26
  </h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Head */}
    <motion.div 
      className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-6 text-center"
      whileHover={{ y: -5, boxShadow: '0 0 20px rgba(159, 112, 253, 0.2)' }}
    >
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#9F70FD]/50 mx-auto mb-4">
        <Image
          src="/team/srushti.jpg"
          alt="Srushti Pawar"
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>
      <h4 className="text-xl font-bold font-mono text-white mb-1">Srushti Pawar</h4>
      <p className="text-gray-400 mb-2">Final Year | ECS</p>
      <div className="px-4 py-1 bg-[#9F70FD]/20 text-[#00F5D4] rounded-full text-sm font-mono inline-block">
        Head
      </div>
    </motion.div>

    {/* Deputy Head */}
    <motion.div 
      className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-6 text-center"
      whileHover={{ y: -5, boxShadow: '0 0 20px rgba(159, 112, 253, 0.2)' }}
    >
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#9F70FD]/50 mx-auto mb-4">
        <Image
          src="/team/vineet.jpeg"
          alt="Vineet Wagh"
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>
      <h4 className="text-xl font-bold font-mono text-white mb-1">Vineet Wagh</h4>
      <p className="text-gray-400 mb-2">Final Year | ECS</p>
      <div className="px-4 py-1 bg-[#9F70FD]/20 text-[#00F5D4] rounded-full text-sm font-mono inline-block">
        Deputy Head
      </div>
    </motion.div>

        {/* Technical Head - Anushka Shinde */}
    <motion.div 
      className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-6 text-center"
      whileHover={{ y: -5, boxShadow: '0 0 20px rgba(159, 112, 253, 0.2)' }}
    >
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#9F70FD]/50 mx-auto mb-4">
        <Image
          src="/team/anushka.jpg"
          alt="Anushka Shinde"
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>
      <h4 className="text-xl font-bold font-mono text-white mb-1">Anushka Shinde</h4>
      <p className="text-gray-400 mb-2">Final Year | ECS</p>
      <div className="px-4 py-1 bg-[#9F70FD]/20 text-[#00F5D4] rounded-full text-sm font-mono inline-block">
        Technical Head
      </div>
    </motion.div>

    {/* Technical Head - Prajwal Kudapane */}
    <motion.div 
      className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-6 text-center"
      whileHover={{ y: -5, boxShadow: '0 0 20px rgba(159, 112, 253, 0.2)' }}
    >
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#9F70FD]/50 mx-auto mb-4">
        <Image
          src="/team/prajwal.jpg"
          alt="Prajwal Kudapane"
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>
      <h4 className="text-xl font-bold font-mono text-white mb-1">Prajwal Kudapane</h4>
      <p className="text-gray-400 mb-2">Final Year | ECS</p>
      <div className="px-4 py-1 bg-[#9F70FD]/20 text-[#00F5D4] rounded-full text-sm font-mono inline-block">
        Technical Head
      </div>
    </motion.div>

    {/* Operations Head - Riddhi Buva */}
    <motion.div 
      className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-6 text-center"
      whileHover={{ y: -5, boxShadow: '0 0 20px rgba(159, 112, 253, 0.2)' }}
    >
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#9F70FD]/50 mx-auto mb-4">
        <Image
          src="/team/riddhi.jpg"
          alt="Riddhi Buva"
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>
      <h4 className="text-xl font-bold font-mono text-white mb-1">Riddhi Buva</h4>
      <p className="text-gray-400 mb-2">Final Year | ECS</p>
      <div className="px-4 py-1 bg-[#9F70FD]/20 text-[#00F5D4] rounded-full text-sm font-mono inline-block">
        Operations Head
      </div>
    </motion.div>

    {/* Operations Head - Ritika Zare */}
    <motion.div 
      className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-6 text-center"
      whileHover={{ y: -5, boxShadow: '0 0 20px rgba(159, 112, 253, 0.2)' }}
    >
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#9F70FD]/50 mx-auto mb-4">
        <Image
          src="/team/ritika.jpg"
          alt="Ritika Zare"
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>
      <h4 className="text-xl font-bold font-mono text-white mb-1">Ritika Zare</h4>
      <p className="text-gray-400 mb-2">Final Year | ECS</p>
      <div className="px-4 py-1 bg-[#9F70FD]/20 text-[#00F5D4] rounded-full text-sm font-mono inline-block">
        Operations Head
      </div>
    </motion.div>

    {/* Creative Head */}
    <motion.div 
      className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-6 text-center"
      whileHover={{ y: -5, boxShadow: '0 0 20px rgba(159, 112, 253, 0.2)' }}
    >
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#9F70FD]/50 mx-auto mb-4">
        <Image
          src="/team/purvi.jpg"
          alt="Purvi Prasad"
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>
      <h4 className="text-xl font-bold font-mono text-white mb-1">Purvi Prasad</h4>
      <p className="text-gray-400 mb-2">Final Year | ECS</p>
      <div className="px-4 py-1 bg-[#9F70FD]/20 text-[#00F5D4] rounded-full text-sm font-mono inline-block">
        Creative Head
      </div>
    </motion.div>
     
    {/* Finance Head */}
    <motion.div 
      className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-6 text-center"
      whileHover={{ y: -5, boxShadow: '0 0 20px rgba(159, 112, 253, 0.2)' }}
    >
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#9F70FD]/50 mx-auto mb-4">
        <Image
          src="/team/sneha.jpg"
          alt="Sneha Patil"
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>
      <h4 className="text-xl font-bold font-mono text-white mb-1">Sneha Patil</h4>
      <p className="text-gray-400 mb-2">Final Year | ECS</p>
      <div className="px-4 py-1 bg-[#9F70FD]/20 text-[#00F5D4] rounded-full text-sm font-mono inline-block">
        Finance Head
      </div>
    </motion.div>

    {/* Public Relations Head */}
    <motion.div 
      className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-6 text-center"
      whileHover={{ y: -5, boxShadow: '0 0 20px rgba(159, 112, 253, 0.2)' }}
    >
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#9F70FD]/50 mx-auto mb-4">
        <Image
          src="/team/kalpesh.jpg"
          alt="Kalpesh Rathod"
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>
      <h4 className="text-xl font-bold font-mono text-white mb-1">Kalpesh Rathod</h4>
      <p className="text-gray-400 mb-2">Final Year | ECS</p>
      <div className="px-4 py-1 bg-[#9F70FD]/20 text-[#00F5D4] rounded-full text-sm font-mono inline-block">
        Public Relations Head
      </div>
    </motion.div>
  </div>
</div>
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

export default About;