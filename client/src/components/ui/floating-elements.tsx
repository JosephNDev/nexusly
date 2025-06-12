import { motion } from 'framer-motion';

interface FloatingElementProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  delay?: number;
  className?: string;
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-20 h-20',
  xl: 'w-24 h-24'
};

export function FloatingElement({ 
  size = 'md', 
  delay = 0, 
  className = '' 
}: FloatingElementProps) {
  return (
    <motion.div
      className={`bg-white bg-opacity-10 rounded-full ${sizeClasses[size]} ${className}`}
      animate={{
        y: [-10, 10, -10],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
    />
  );
}

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <FloatingElement 
        size="lg" 
        delay={0} 
        className="absolute top-20 left-10" 
      />
      <FloatingElement 
        size="md" 
        delay={2} 
        className="absolute top-40 right-20" 
      />
      <FloatingElement 
        size="sm" 
        delay={4} 
        className="absolute bottom-40 left-20" 
      />
      <FloatingElement 
        size="xl" 
        delay={1} 
        className="absolute bottom-20 right-10" 
      />
    </div>
  );
}
