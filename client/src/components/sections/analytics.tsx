import { motion } from "framer-motion";
import { ExternalLink, Calendar, Users, Globe } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const projects = [
  {
    title: 'TechFlow Solutions',
    category: 'E-commerce Platform',
    description: 'Complete digital transformation with modern React architecture, increasing conversion rates by 340% and reducing load times by 60%.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    tags: ['React', 'Node.js', 'AWS', 'Stripe'],
    metrics: {
      conversion: '+340%',
      performance: '60% faster',
      users: '50K+ monthly'
    },
    year: '2024',
    duration: '4 months'
  },
  {
    title: 'MedCare Connect',
    category: 'Healthcare Portal',
    description: 'HIPAA-compliant patient management system serving 10,000+ patients with real-time appointment scheduling and telemedicine integration.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    tags: ['Next.js', 'PostgreSQL', 'WebRTC', 'HIPAA'],
    metrics: {
      patients: '10K+',
      satisfaction: '98%',
      efficiency: '+45%'
    },
    year: '2024',
    duration: '6 months'
  },
  {
    title: 'FinanceHub Pro',
    category: 'Fintech Dashboard',
    description: 'Real-time financial analytics platform processing $50M+ in transactions with advanced security and compliance features.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    tags: ['Vue.js', 'Python', 'Redis', 'Blockchain'],
    metrics: {
      transactions: '$50M+',
      uptime: '99.9%',
      security: 'SOC 2'
    },
    year: '2023',
    duration: '8 months'
  }
];

export function ProjectsSection() {
  const { ref, hasIntersected } = useIntersectionObserver();

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Featured Projects
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              That Drive Results
            </span>
          </h2>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Discover how we've transformed businesses across industries with innovative solutions that deliver measurable impact.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Project Image */}
              <motion.div
                className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Project Content */}
              <motion.div
                className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
              >
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-blue-400 font-semibold text-sm uppercase tracking-wide">
                      {project.category}
                    </span>
                    <div className="flex items-center space-x-2 text-blue-200 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{project.year}</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
                  <p className="text-blue-100 leading-relaxed text-lg">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-blue-200 text-sm border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                      <div className="text-2xl font-bold text-white mb-1">{value}</div>
                      <div className="text-blue-200 text-sm capitalize">{key.replace('_', ' ')}</div>
                    </div>
                  ))}
                </div>

                {/* Project Details */}
                <div className="flex items-center space-x-6 text-blue-200">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{project.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">Live Project</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Let's discuss how we can create a custom solution that drives results for your business.
            </p>
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
