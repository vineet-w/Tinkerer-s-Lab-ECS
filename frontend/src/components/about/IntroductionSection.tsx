import Image from "next/image";
import { motion } from "framer-motion";

type IntroductionSectionProps = {
  labImages: string[];
  setIsHovering: (value: string | null) => void;
};

export default function IntroductionSection({ labImages, setIsHovering }: IntroductionSectionProps) {
  return (
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
              onHoverStart={() => setIsHovering(`intro-img-${index}`)}
              onHoverEnd={() => setIsHovering(null)}
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
              onHoverStart={() => setIsHovering(`intro-img-${index+2}`)}
              onHoverEnd={() => setIsHovering(null)}
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
  );
}