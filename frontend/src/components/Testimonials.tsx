import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Testimonial } from "@/data/testimonials";

type TestimonialsProps = {
  testimonials: Testimonial[];
};

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <motion.section 
      className="mb-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <h2 className="text-3xl font-bold font-mono text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">
        What Our Members Say
      </h2>
      
      <div className="max-w-5xl mx-auto relative">
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

        <div className="relative h-100">
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
  );
}