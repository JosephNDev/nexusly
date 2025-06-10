import { motion } from 'framer-motion';
import { Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl font-bold mb-4">Nexulsly</div>
            <p className="text-blue-200 mb-4">
              Transforming businesses through exceptional digital experiences.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-blue-200">
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Web Development
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors duration-200"
                >
                  UI/UX Design
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Performance Optimization
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Consulting
                </button>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-blue-200">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors duration-200"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Our Team
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Blog
                </a>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-blue-200">
              <li>hello@nexulsly.com</li>
              <li>+1 (555) 123-4567</li>
              <li>San Francisco, CA</li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div
          className="border-t border-gray-700 mt-8 pt-8 text-center text-blue-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2024 Nexulsly. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
