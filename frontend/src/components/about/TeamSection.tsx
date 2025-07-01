import { useState } from "react";
import { FacultyMember } from "@/data/faculty";
import { StudentMember } from "@/data/studentTeam";
import { motion, AnimatePresence } from "framer-motion";

// Removed Next.js Image import to prevent compilation issues in this environment
// import Image from "next/image"; 

type TeamSectionProps = {
  faculty: FacultyMember[];
  studentTeam: StudentMember[];
};

export default function TeamSection({ faculty = [], studentTeam = [] }: TeamSectionProps) { // Added default empty arrays for props
  const [activeTeam, setActiveTeam] = useState<"BE" | "TE">("BE");

  // Filter students based on team type
  const beTeam = studentTeam.filter(member => member.teamType === "BE");
  const teTeam = studentTeam.filter(member => member.teamType === "TE");
  const currentTeam = activeTeam === "BE" ? beTeam : teTeam;

  // Animation variants for the container of team members
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Stagger children animations by 0.08 seconds
        delayChildren: 0.1,    // Delay start of children animations by 0.1 seconds
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3 // Fade out the container quickly on exit
      }
    }
  };

  // Animation variants for individual team member cards (the flip effect)
  const item = {
    hidden: { rotateY: 90, opacity: 0, scale: 0.9 }, // Start rotated 90 degrees on Y-axis, invisible, slightly smaller
    show: {
      rotateY: 0, // Rotate to 0 degrees (front-facing)
      opacity: 1, // Become fully visible
      scale: 1,   // Return to original size
      transition: {
        type: "spring",   // Use a spring animation for a natural bounce
        damping: 15,      // Controls how quickly the spring comes to rest
        stiffness: 200    // Controls the stiffness of the spring
      }
    },
    exit: {
      rotateY: -90, // Rotate -90 degrees on Y-axis (flip out in opposite direction)
      opacity: 0,   // Fade out
      scale: 0.9,   // Shrink slightly
      transition: { duration: 0.2 } // Quick exit transition
    }
  };

  // Variants for the team selection tabs
  const tabVariants = {
    inactive: {
      scale: 1,
      background: "transparent",
      color: "#D1D5DB"
    },
    active: {
      scale: 1.05,
      background: "linear-gradient(90deg, #9F70FD, #00F5D4)",
      color: "#0D0D0D",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    hover: {
      scale: 1.03,
      color: "#FFFFFF",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.section
      className="mb-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Faculty In-Charge Section */}
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
              whileHover={{
                y: -5,
                boxShadow: '0 0 30px rgba(159, 112, 253, 0.2)',
                transition: { duration: 0.3 }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#9F70FD]/50">
                {/* Using standard <img> tag */}
                <img
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

      {/* Student Coordinators Section */}
      <div className="mb-16">
        <div className="flex justify-center mb-8">
          <motion.div
            className="bg-[#1A1A1A] rounded-full p-1 border border-[#9F70FD]/30 flex"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              className={`px-6 py-2 rounded-full text-sm font-mono font-bold`}
              variants={tabVariants}
              initial="inactive"
              animate={activeTeam === "BE" ? "active" : "inactive"}
              whileHover={activeTeam !== "BE" ? "hover" : {}}
              onClick={() => setActiveTeam("BE")}
            >
              B.E. Team
            </motion.button>
            <motion.button
              className={`px-6 py-2 rounded-full text-sm font-mono font-bold`}
              variants={tabVariants}
              initial="inactive"
              animate={activeTeam === "TE" ? "active" : "inactive"}
              whileHover={activeTeam !== "TE" ? "hover" : {}}
              onClick={() => setActiveTeam("TE")}
            >
              T.E. Team
            </motion.button>
          </motion.div>
        </div>

        <motion.h3
          className="text-2xl font-bold font-mono mb-8 text-white text-center"
          key={`title-${activeTeam}`} // Key changes on activeTeam to re-trigger animation
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Student's Core Team 2025-26
        </motion.h3>

        {/* Student Team Members Grid with Perspective for 3D Flip */}
        {/* AnimatePresence now wraps the motion.div that represents the changing grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTeam} // This key ensures AnimatePresence tracks the change between BE and TE teams
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto [perspective:1200px]" // Added perspective
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit" // Ensure exit variant is applied to the container
          >
            {currentTeam.map((member) => (
              <motion.div
                key={member.name} // Unique key for each member for AnimatePresence
                variants={item}   // Apply item variants for flip animation
                className="bg-[#1A1A1A]/50 backdrop-blur-lg rounded-2xl border border-[#9F70FD]/30 p-6 text-center"
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  boxShadow: '0 10px 30px rgba(159, 112, 253, 0.3)',
                  transition: { type: "spring", stiffness: 300 }
                }}
                layout // Enable layout animations for smooth position changes
                style={{ backfaceVisibility: 'hidden' }} // Crucial for 3D flip effect
              >
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#9F70FD]/50 mx-auto mb-4">
                  {/* Using standard <img> tag */}
                  <img
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h4 className="text-xl font-bold font-mono text-white mb-1">{member.name}</h4>
                <p className="text-gray-400 mb-2">{member.year} | {member.department}</p>
                <div className="px-4 py-1 bg-[#9F70FD]/20 text-[#00F5D4] rounded-full text-sm font-mono inline-block">
                  {member.role}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}