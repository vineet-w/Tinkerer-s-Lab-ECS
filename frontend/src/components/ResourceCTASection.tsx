import { motion } from "framer-motion";

type ResourceCTASectionProps = {
  setIsHovering: (value: string | null) => void;
};

export default function ResourceCTASection({ setIsHovering }: ResourceCTASectionProps) {
  return (
    <motion.section 
      className="mt-24 bg-gradient-to-r from-[#9F70FD]/10 to-[#00F5D4]/10 border border-[#9F70FD]/30 rounded-2xl p-8 md:p-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={() => setIsHovering('resource-cta')}
      onHoverEnd={() => setIsHovering(null)}
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
            className="px-8 py-3 bg-gradient-to-r from-[#0D0D0D] to-[#0D0D2D] text-[#9F70FD] rounded-full font-bold"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px #9F70FD" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open("https://forms.gle/NwAu4stDChX6Qvmm7", "_blank")}
            onHoverStart={() => setIsHovering('resource-cta-button')}
            onHoverEnd={() => setIsHovering(null)}
          >
            Component Request Form
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}