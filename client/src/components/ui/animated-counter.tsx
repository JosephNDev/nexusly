import { useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ 
  value, 
  duration = 2, 
  suffix = '', 
  className = '' 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * value));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {count}{suffix}
    </motion.div>
  );
}
