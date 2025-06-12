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
    color: "from-gray-500 to-gray-400",
    iconBg: "bg-gradient-to-r from-gray-600 to-gray-500",
    textColor: "text-gray-300",
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
    color: "from-gray-500 to-gray-400",
    iconBg: "bg-gradient-to-r from-gray-600 to-gray-500",
    textColor: "text-gray-300",
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
    color: "from-gray-500 to-gray-400",
    iconBg: "bg-gradient-to-r from-gray-600 to-gray-500",
    textColor: "text-gray-300",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description:
      "Comprehensive security solutions to protect your digital assets and ensure regulatory compliance.",
    features: ["Security Audits", "GDPR Compliance", "Data Protection"],
    color: "from-gray-500 to-gray-400",
    iconBg: "bg-gradient-to-r from-gray-600 to-gray-500",
    textColor: "text-gray-300",
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
    color: "from-gray-500 to-gray-400",
    iconBg: "bg-gradient-to-r from-gray-600 to-gray-500",
    textColor: "text-gray-300",
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
    color: "from-gray-500 to-gray-400",
    iconBg: "bg-gradient-to-r from-gray-600 to-gray-500",
    textColor: "text-gray-300",
  },
];

export function ServicesSection() {
  const { ref, hasIntersected } = useIntersectionObserver();

  return (
    <section id="services" ref={ref} className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={
              hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 1 }}
          >
            Our Premium Services
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
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
              className="bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              animate={
                hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <div
                className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
              >
                <service.icon className="w-8 h-8 text-white stroke-2" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-sm text-gray-400"
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
