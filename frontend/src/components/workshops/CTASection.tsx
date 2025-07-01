import { motion } from "framer-motion";

export default function CTASection() {
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
            onClick={() => window.open("https://forms.gle/JTJHw5q1D2pcYcuh6", "_blank")}
          >
            Propose a Workshop
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}