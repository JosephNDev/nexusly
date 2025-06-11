import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const stats = [
  { value: 150, label: 'Projects Completed', suffix: '+' },
  { value: 98, label: 'Client Satisfaction', suffix: '%' },
  { value: 5, label: 'Years Experience', suffix: '+' },
  { value: 24, label: 'Team Members', suffix: '' },
];

export function StatsSection() {
  const { ref, hasIntersected } = useIntersectionObserver();

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                duration={3}
                className="text-4xl md:text-5xl font-bold text-primary-600 mb-2"
              />
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
