import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiMail, FiMapPin } from 'react-icons/fi';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);


  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace with your Google Apps Script Web App URL
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbwmNs6P_p3UDQ6u5OhF1xS-vF-EyU7JBDIAJtm4QJHZ3ZxGuIpdNUwsetWyon_iWG7qUw/exec';
      
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // Since we're using no-cors mode, we can't read the response directly
      // But we can assume success if the request completes
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section 
      className="mb-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#9F70FD]/30 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold font-mono text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">
          Get In Touch
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4 font-mono">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-[#9F70FD]/20 p-3 rounded-xl mr-4">
                  <FiInstagram className="h-6 w-6 text-[#00F5D4]" />
                </div>
                <div>
                  <p className="text-gray-400 font-mono">Instagram</p>
                  <a href="https://instagram.com/tinkerers_lab_ecs" className="text-white hover:text-[#00F5D4] transition-colors font-mono" target="_blank" rel="noopener noreferrer">
                    @tinkerers_lab_ecs
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-[#9F70FD]/20 p-3 rounded-xl mr-4">
                  <FiMail className="h-6 w-6 text-[#00F5D4]" />
                </div>
                <div>
                  <p className="text-gray-400 font-mono">Email</p>
                  <a href="mailto:tinkerers_lab@ves.ac.in" className="text-white hover:text-[#00F5D4] transition-colors font-mono">
                    tinkerers_lab@ves.ac.in
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-[#9F70FD]/20 p-3 rounded-xl mr-4">
                  <FiMapPin className="h-6 w-6 text-[#00F5D4]" />
                </div>
                <div>
                  <p className="text-gray-400 font-mono">Location</p>
                  <p className="text-white font-mono">Lab 201, 2nd Floor,<br /> VESIT, Chembur</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-4 font-mono">Send Us a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name" 
                  className="w-full bg-[#1A1A1A]/50 border border-[#9F70FD]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#9F70FD] font-mono"
                  required
                />
              </div>
              <div>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email" 
                  className="w-full bg-[#1A1A1A]/50 border border-[#9F70FD]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#9F70FD] font-mono"
                  required
                />
              </div>
              <div>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message" 
                  rows={4}
                  className="w-full bg-[#1A1A1A]/50 border border-[#9F70FD]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#9F70FD] font-mono"
                  required
                />
              </div>
              <div>
                <motion.button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#9F70FD] to-[#00F5D4] text-white rounded-lg font-bold font-mono relative"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </div>
              {submitStatus === 'success' && (
                <div className="text-green-400 font-mono text-center">
                  Message sent successfully!
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="text-red-400 font-mono text-center">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;