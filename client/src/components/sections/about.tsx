import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/ui/animated-counter';

const aboutStats = [
  { value: 150, label: 'Projects Delivered', suffix: '+' },
  { value: 98, label: 'Client Satisfaction', suffix: '%' },
  { value: 24, label: 'Support Available', suffix: '/7' },
  { value: 5, label: 'Years Experience', suffix: '+' },
];

export function AboutSection() {
  const { ref, hasIntersected } = useIntersectionObserver();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" ref={ref} className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-primary-900 opacity-90"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Professional consulting team collaborating" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Crafting Digital Excellence Since 2019
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              We're a team of passionate designers, developers, and strategists dedicated to creating exceptional digital experiences that drive business growth and user engagement.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {aboutStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-2xl font-bold text-white mb-2"
                  />
                  <p className="text-blue-200">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            
            <Button
              size="lg"
              className="bg-white text-primary-600 hover:bg-blue-50 text-lg px-8 py-4 rounded-full font-semibold"
              onClick={() => scrollToSection('contact')}
            >
              Meet Our Team
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
