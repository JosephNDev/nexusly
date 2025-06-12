import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Trophy, Users, TrendingUp, Award } from 'lucide-react';

const stats = [
  { 
    value: 150, 
    label: 'Projects Completed', 
    suffix: '+',
    icon: Trophy,
    description: 'Successfully delivered projects',
    gradient: 'from-blue-600 to-purple-600'
  },
  { 
    value: 98, 
    label: 'Client Satisfaction', 
    suffix: '%',
    icon: Award,
    description: 'Client retention rate',
    gradient: 'from-green-500 to-emerald-600'
  },
  { 
    value: 5, 
    label: 'Years Experience', 
    suffix: '+',
    icon: TrendingUp,
    description: 'In digital transformation',
    gradient: 'from-orange-500 to-red-600'
  },
  { 
    value: 24, 
    label: 'Team Members', 
    suffix: '',
    icon: Users,
    description: 'Expert professionals',
    gradient: 'from-purple-600 to-pink-600'
  },
];

export function StatsSection() {
  const { ref, hasIntersected } = useIntersectionObserver();

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Driving Excellence Through
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Numbers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our track record speaks for itself. Every metric reflects our commitment to delivering exceptional results.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group relative"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={hasIntersected ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.8, delay: index * 0.15, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Card Background */}
              <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-500 group-hover:bg-white/90">
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={hasIntersected ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ duration: 0.8, delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Counter */}
                <div className="text-center">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3"
                  />
                  
                  {/* Label */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors duration-300">
                    {stat.label}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {stat.description}
                  </p>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={hasIntersected ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/60 backdrop-blur-lg rounded-full border border-white/50 shadow-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700">Live metrics updated daily</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
