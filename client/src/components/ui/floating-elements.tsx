import { motion } from 'framer-motion';

interface NetworkAnimationProps {
  nodeCount?: number;
  className?: string;
  theme?: 'dark' | 'light';
}

// Professional network animation for dark themes
export function NetworkAnimation({ 
  nodeCount = 12, 
  className = '',
  theme = 'dark'
}: NetworkAnimationProps) {
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 15 + Math.random() * 10
  }));

  const strokeColor = theme === 'dark' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.2)';
  const fillColor = theme === 'dark' ? 'rgba(59, 130, 246, 0.6)' : 'rgba(59, 130, 246, 0.3)';
  const nodeRadius = theme === 'dark' ? '0.3' : '0.2';
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg 
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: -1 }}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Connection lines */}
        {nodes.map((node1, i) => 
          nodes.slice(i + 1).map((node2, j) => {
            const distance = Math.sqrt(
              Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2)
            );
            if (distance < 25) {
              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={node1.x}
                  y1={node1.y}
                  x2={node2.x}
                  y2={node2.y}
                  stroke={strokeColor}
                  strokeWidth="0.1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: (i + j) * 0.5,
                    ease: "easeInOut"
                  }}
                />
              );
            }
            return null;
          })
        )}
        
        {/* Animated nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={nodeRadius}
            fill={fillColor}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              delay: node.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// Light-themed network animation for bright sections
export function LightNetworkAnimation({ 
  nodeCount = 8, 
  className = '' 
}: NetworkAnimationProps) {
  return (
    <NetworkAnimation 
      nodeCount={nodeCount} 
      className={className} 
      theme="light" 
    />
  );
}

// Gradient animation background for dark sections
export function GradientAnimation({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/30 to-purple-900/50"
        animate={{
          background: [
            'linear-gradient(135deg, rgba(15, 23, 42, 0.5) 0%, rgba(30, 58, 138, 0.3) 50%, rgba(88, 28, 135, 0.5) 100%)',
            'linear-gradient(135deg, rgba(30, 58, 138, 0.5) 0%, rgba(88, 28, 135, 0.3) 50%, rgba(15, 23, 42, 0.5) 100%)',
            'linear-gradient(135deg, rgba(88, 28, 135, 0.5) 0%, rgba(15, 23, 42, 0.3) 50%, rgba(30, 58, 138, 0.5) 100%)',
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />
    </div>
  );
}

// Legacy component for backward compatibility
export function FloatingElements() {
  return <LightNetworkAnimation nodeCount={6} />;
}