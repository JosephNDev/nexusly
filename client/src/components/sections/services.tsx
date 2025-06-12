import { motion } from "framer-motion";
import {
  Monitor,
  Palette,
  Zap,
  Database,
  ShoppingCart,
  Workflow,
} from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const services = [
  {
    icon: Monitor,
    title: "Web Development",
    description:
      "Custom web applications built with cutting-edge technologies for optimal performance and user experience.",
    features: [
      "React & Next.js Development",
      "Progressive Web Apps",
      "API Integration",
    ],
    color: "from-slate-900 to-indigo-600",
    iconBg: "bg-gradient-to-r from-slate-900 to-indigo-600",
    textColor: "text-slate-900",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive designs that create meaningful connections between your brand and users.",
    features: [
      "User Research & Testing",
      "Prototyping & Wireframing",
      "Design Systems",
    ],
    color: "from-green-500 to-teal-600",
    iconBg: "bg-gradient-to-r from-green-500 to-teal-600",
    textColor: "text-green-600",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Lightning-fast websites that convert visitors into customers with superior performance metrics.",
    features: [
      "Core Web Vitals Optimization",
      "SEO Implementation",
      "Speed Optimization",
    ],
    color: "from-blue-600 to-cyan-500",
    iconBg: "bg-gradient-to-r from-blue-600 to-cyan-500",
    textColor: "text-blue-600",
  },
  {
    icon: Database,
    title: "Backend Solutions",
    description:
      "Robust, scalable backend architectures that handle high traffic and complex data operations seamlessly.",
    features: [
      "Database Design & Optimization",
      "Cloud Infrastructure",
      "Security Implementation",
    ],
    color: "from-purple-600 to-pink-500",
    iconBg: "bg-gradient-to-r from-purple-600 to-pink-500",
    textColor: "text-purple-600",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Development",
    description:
      "Complete e-commerce solutions that drive sales and provide exceptional shopping experiences.",
    features: [
      "Payment Gateway Integration",
      "Inventory Management",
      "Mobile Commerce",
    ],
    color: "from-yellow-500 to-orange-600",
    iconBg: "bg-gradient-to-r from-yellow-500 to-orange-600",
    textColor: "text-yellow-600",
  },
  {
    icon: Workflow,
    title: "Automation & Workflows",
    description:
      "Streamline operations and save time by automating complex workflows and repetitive tasks.",
    features: [
      "Power Automate & Zapier",
      "CRM Integrations",
      "Data Sync & Processing",
    ],
    color: "from-gray-800 to-zinc-600",
    iconBg: "bg-gradient-to-r from-gray-800 to-zinc-600",
    textColor: "text-gray-800",
  },
];

export function ServicesSection() {
  const { ref, hasIntersected } = useIntersectionObserver();

  return (
    <section id="services" ref={ref} className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={
              hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 1 }}
          >
            Our Premium Services
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={
              hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 1, delay: 0.2 }}
          >
            We deliver cutting-edge solutions that transform your business and
            drive sustainable growth through innovation and excellence.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              animate={
                hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="mb-6">
                <div
                  className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`${service.textColor} font-semibold hover:opacity-70 transition-all duration-200 group-hover:translate-x-2`}
              >
                Learn More →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}