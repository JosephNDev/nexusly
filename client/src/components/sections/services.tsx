import { motion } from "framer-motion";
import { Monitor, Palette, Zap, Shield, Smartphone, Cloud } from "lucide-react";
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
    color: "from-primary-500 to-purple-600",
    iconBg: "bg-gradient-to-r from-blue-500 to-indigo-600",
    textColor: "text-primary-600",
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
    color: "from-purple-500 to-pink-600",
    iconBg: "bg-gradient-to-r from-purple-500 to-pink-600",
    textColor: "text-purple-600",
  },
  ,
  {
    icon: Shield,
    title: "Security & Compliance",
    description:
      "Comprehensive security solutions to protect your digital assets and ensure regulatory compliance.",
    features: ["Security Audits", "GDPR Compliance", "Data Protection"],
    color: "from-red-500 to-orange-600",
    iconBg: "bg-gradient-to-r from-red-500 to-orange-600",
    textColor: "text-red-600",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile applications that deliver exceptional user experiences on all devices.",
    features: [
      "React Native Development",
      "iOS & Android Apps",
      "Cross-platform Solutions",
    ],
    color: "from-cyan-500 to-blue-600",
    iconBg: "bg-gradient-to-r from-cyan-500 to-blue-600",
    textColor: "text-cyan-600",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure and deployment solutions for modern applications and businesses.",
    features: [
      "AWS & Azure Integration",
      "DevOps & CI/CD",
      "Serverless Architecture",
    ],
    color: "from-amber-500 to-yellow-600",
    iconBg: "bg-gradient-to-r from-amber-500 to-yellow-600",
    textColor: "text-amber-600",
  },
];

export function ServicesSection() {
  const { ref, hasIntersected } = useIntersectionObserver();

  return (
    <section id="services" ref={ref} className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            We deliver comprehensive digital solutions that transform businesses
            and create lasting impact in the digital landscape.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              animate={
                hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div
                className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
              >
                <service.icon className="w-8 h-8 text-white stroke-2" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-3 ${service.iconBg}`}
                    ></div>
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
