import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useState } from "react";
import {
  ChevronDown,
  MessageCircle,
  Clock,
  Shield,
  Lightbulb,
} from "lucide-react";

const faqs = [
  {
    icon: MessageCircle,
    question: "What services does Nexulsly offer?",
    answer:
      "We specialize in full-stack web development, UI/UX design, performance optimization, and digital consulting. Our services include custom web applications, e-commerce platforms, healthcare portals, fintech solutions, and enterprise dashboards.",
  },
  {
    icon: Clock,
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity and scope. Simple websites typically take 4-6 weeks, while complex applications can take 3-8 months. We provide detailed project timelines during our initial consultation and keep you updated throughout the development process.",
  },
  {
    icon: Shield,
    question: "Do you ensure security and compliance?",
    answer:
      "Absolutely. We implement industry-standard security practices including HTTPS, data encryption, secure authentication, and compliance with regulations like HIPAA, GDPR, and SOC 2. Security is built into every layer of our applications.",
  },
  {
    icon: Lightbulb,
    question: "What makes Nexulsly different from other agencies?",
    answer:
      "Our focus on data-driven results, technical excellence, and long-term partnerships sets us apart. We combine cutting-edge technology with strategic business insights to deliver solutions that not only look great but drive measurable business growth.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes, we offer comprehensive post-launch support including 24/7 monitoring, regular updates, security patches, performance optimization, and feature enhancements. Our support packages are tailored to your specific needs and budget.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "We work with modern technologies including React, Next.js, Vue.js, Node.js, Python, PostgreSQL, AWS, and more. We choose the best technology stack for each project based on your specific requirements, scalability needs, and long-term goals.",
  },
  {
    question: "How do you handle project communication?",
    answer:
      "We believe in transparent communication throughout the project lifecycle. You'll have a dedicated project manager, regular progress updates, weekly demos, and access to our project management tools to track progress in real-time. ",
  },
  {
    question: "Can you help with existing projects or only new ones?",
    answer:
      "We can definitely help with existing projects! Whether you need performance improvements, feature additions, bug fixes, or a complete redesign, our team can audit your current system and provide solutions to enhance your digital presence.",
  },
];

export function FAQsSection() {
  const { ref, hasIntersected } = useIntersectionObserver();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={
            hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
          }
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Frequently Asked
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Got questions? We've got answers. Here are the most common questions
            we receive about our services and process.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={
                hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <button
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors duration-200"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center space-x-4">
                  {faq.icon && (
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                      <faq.icon className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                  <span className="text-lg font-semibold text-slate-900">
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6">
                  <div className={`flex ${faq.icon ? "ml-14" : ""}`}>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={
            hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our team is here to help! Get in touch and we'll answer any
              questions you have about your project.
            </p>
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Contact Our Team
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
