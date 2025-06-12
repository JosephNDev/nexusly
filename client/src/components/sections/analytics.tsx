import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Target, Zap, Eye, Users, ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useEffect, useRef, useState } from "react";

const metrics = [
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Real-time insights into user behavior and conversion metrics',
    value: '99.9%',
    label: 'Uptime',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50'
  },
  {
    icon: TrendingUp,
    title: 'Growth Optimization',
    description: 'Continuous improvements based on data-driven insights',
    value: '340%',
    label: 'ROI Increase',
    gradient: 'from-emerald-500 to-green-500',
    bgGradient: 'from-emerald-50 to-green-50'
  },
  {
    icon: Target,
    title: 'Conversion Tracking',
    description: 'Advanced analytics to maximize your business outcomes',
    value: '2.8x',
    label: 'Better Results',
    gradient: 'from-purple-500 to-indigo-500',
    bgGradient: 'from-purple-50 to-indigo-50'
  }
];

export function AnalyticsSection() {
  const { ref, hasIntersected } = useIntersectionObserver();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    if (hasIntersected && chartRef.current) {
      import("chart.js/auto").then((Chart) => {
        const ctx = chartRef.current?.getContext("2d");
        if (ctx) {
          // Clear any existing chart
          Chart.default.getChart(ctx)?.destroy();
          
          new Chart.default(ctx, {
            type: "doughnut",
            data: {
              labels: ["Completed", "In Progress", "Planning"],
              datasets: [
                {
                  data: [85, 10, 5],
                  backgroundColor: [
                    "hsl(213, 94%, 59%)",
                    "hsl(142, 71%, 45%)",
                    "hsl(38, 92%, 50%)",
                  ],
                  borderWidth: 0,
                  cutout: '70%'
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    padding: 20,
                    usePointStyle: true,
                    font: {
                      size: 14,
                      weight: '500'
                    }
                  },
                },
              },
            },
          });
        }
      });
    }
  }, [hasIntersected]);

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
            Data-Driven Results
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              That Matter
            </span>
          </h2>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Our strategic approach delivers measurable outcomes that drive business growth and user engagement across all digital touchpoints.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
          >
            {/* Metrics Cards */}
            <div className="space-y-6 mb-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.title}
                  className={`group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 cursor-pointer ${
                    activeMetric === index ? 'ring-2 ring-blue-400' : ''
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  onMouseEnter={() => setActiveMetric(index)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${metric.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <metric.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">
                          {metric.title}
                        </h3>
                        <div className="text-right">
                          <div className={`text-2xl font-bold bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}>
                            {metric.value}
                          </div>
                          <div className="text-sm text-blue-200">
                            {metric.label}
                          </div>
                        </div>
                      </div>
                      <p className="text-blue-100 leading-relaxed group-hover:text-white transition-colors duration-300">
                        {metric.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover Arrow */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5 text-blue-400" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Stats */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-100 text-sm">Tracking</span>
                </div>
                <div className="text-2xl font-bold text-white">24/7</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <span className="text-blue-100 text-sm">Active Users</span>
                </div>
                <div className="text-2xl font-bold text-white">10K+</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Chart */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              {/* Chart Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Project Success Rate</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-100 text-sm">Live data</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">85%</div>
                  <div className="text-sm text-green-400">+12% this month</div>
                </div>
              </div>

              {/* Chart Container */}
              <div className="relative h-80 mb-6">
                <canvas ref={chartRef} className="w-full h-full" />
                
                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-1">95%</div>
                    <div className="text-blue-200 text-sm">Success Rate</div>
                  </div>
                </div>
              </div>

              {/* Chart Legend Enhancement */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
                  <div className="text-white font-semibold">85%</div>
                  <div className="text-blue-200 text-xs">Completed</div>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <div className="text-white font-semibold">10%</div>
                  <div className="text-blue-200 text-xs">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mx-auto mb-2"></div>
                  <div className="text-white font-semibold">5%</div>
                  <div className="text-blue-200 text-xs">Planning</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
