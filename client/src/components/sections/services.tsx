import { motion } from 'framer-motion';
import { Monitor, Palette, Zap, Cloud, BarChart3, Shield, ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const services = [
  {
    icon: Monitor,
    title: 'Web Development',
    description: 'Custom web applications built with cutting-edge technologies for optimal performance and user experience.',
    features: [
      'React & Next.js Development',
      'Progressive Web Apps',
      'API Integration',
      'Full-Stack Solutions'
    ],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive designs that create meaningful connections between your brand and users.',
    features: [
      'User Research & Testing',
      'Prototyping & Wireframing',
      'Design Systems',
      'Brand Identity'
    ],
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Lightning-fast websites that convert visitors into customers with superior performance metrics.',
    features: [
      'Core Web Vitals Optimization',
      'SEO Implementation',
      'Speed Optimization',
      'Conversion Rate Optimization'
    ],
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and deployment strategies for modern applications.',
    features: [
      'AWS & Azure Deployment',
      'DevOps & CI/CD',
      'Microservices Architecture',
      'Container Orchestration'
    ],
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Transform your data into actionable business insights with advanced analytics solutions.',
    features: [
      'Business Intelligence',
      'Data Visualization',
      'Predictive Analytics',
      'Custom Dashboards'
    ],
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Comprehensive security solutions to protect your digital assets and ensure compliance.',
    features: [
      'Security Audits',
      'GDPR Compliance',
      'SSL & Encryption',
      'Vulnerability Testing'
    ],
    color: 'from-gray-500 to-gray-700'
  }
];

export function ServicesSection() {
  const { ref, hasIntersected } = useIntersectionObserver();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" ref={ref} className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="h-4 w-4 text-primary-400" />
            <span className="text-sm text-slate-300">Our Expertise</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Comprehensive Digital
            <br />
            <span className="bg-gradient-to-r from-primary-400 to-purple-500 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            We offer end-to-end digital transformation services to help your business thrive in the modern digital landscape.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={hasIntersected ? "show" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/80 transition-all duration-300"
              variants={item}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative mb-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <service.icon className="h-8 w-8 text-white stroke-2" />
                </div>
                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${service.color} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-slate-400 mb-4 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                className="flex items-center text-primary-400 hover:text-primary-300 font-medium transition-colors duration-200 group-hover:translate-x-2"
                whileHover={{ x: 5 }}
              >
                Learn More
                <ArrowRight className="h-4 w-4 ml-2" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="bg-gradient-to-r from-primary-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-primary-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 mx-auto shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
