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
import { LightNetworkAnimation } from "@/components/ui/floating-elements";

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
    color: "from-purple-500 to-pink-600",
    iconBg: "bg-gradient-to-r from-purple-500 to-pink-600",
    textColor: "text-purple-600",
  },
  {
    icon: Database,
    title: "CMS Integration",
    description:
      "Easily manage your content with secure and scalable content management solutions.",
    features: [
      "Headless CMS Setup",
      "Custom Admin Panels",
      "Content Strategy Consulting",
    ],
    color: "from-blue-800 to-cyan-600",
    iconBg: "bg-gradient-to-r from-blue-800 to-cyan-600",
    textColor: "text-blue-800",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description:
      "Scalable, feature-rich e-commerce platforms tailored to convert visitors into loyal customers.",
    features: [
      "Custom Storefronts",
      "Payment Gateway Integration",
      "Inventory Management",
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
    <section
      id="services"
      ref={ref}
      className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <LightNetworkAnimation nodeCount={6} />

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
              {/* <button
                className={`${service.textColor} font-semibold hover:opacity-70 transition-all duration-200 group-hover:translate-x-2`}
              >
                Learn More →
              </button> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
