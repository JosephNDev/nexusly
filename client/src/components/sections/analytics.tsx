import { motion } from "framer-motion";
import { BarChart, TrendingUp } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useEffect, useRef } from "react";

export function AnalyticsSection() {
  const { ref, hasIntersected } = useIntersectionObserver();
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (hasIntersected && chartRef.current) {
      import("chart.js/auto").then((Chart) => {
        const ctx = chartRef.current?.getContext("2d");
        if (ctx) {
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
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={
              hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
            }
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Data-Driven Results That Matter
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Our strategic approach delivers measurable outcomes that drive
              business growth and user engagement across all digital
              touchpoints.
            </p>

            <div className="space-y-6">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-100 via-white to-blue-50 shadow-md flex items-center justify-center mr-4 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <BarChart className="w-7 h-7 text-primary-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    Performance Analytics
                  </h3>
                  <p className="text-gray-600">
                    Real-time insights into user behavior and conversion metrics
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-100 via-white to-green-50 shadow-md flex items-center justify-center mr-4 transition-all duration-300">
                  <TrendingUp className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    Growth Optimization
                  </h3>
                  <p className="text-gray-600">
                    Continuous improvements based on data-driven insights
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={
              hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
            }
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Project Success Rate
              </h3>
              <div className="relative h-80">
                <canvas ref={chartRef} className="w-full h-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
