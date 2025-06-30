import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface NetworkAnimationProps {
  nodeCount?: number;
  className?: string;
  theme?: 'dark' | 'light';
}

interface AnimatedNode {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
}

// Professional network animation with moving nodes and connections
export function NetworkAnimation({ 
  nodeCount = 15, 
  className = '',
  theme = 'dark'
}: NetworkAnimationProps) {
  const [nodes, setNodes] = useState<AnimatedNode[]>([]);

  useEffect(() => {
    // Initialize nodes with random positions
    const initialNodes: AnimatedNode[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      targetX: Math.random() * 100,
      targetY: Math.random() * 100,
      size: 0.4 + Math.random() * 0.6
    }));
    setNodes(initialNodes);

    // Update node positions periodically
    const interval = setInterval(() => {
      setNodes(prevNodes => 
        prevNodes.map(node => ({
          ...node,
          targetX: Math.random() * 100,
          targetY: Math.random() * 100
        }))
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [nodeCount]);

  const connectionDistance = 35;
  const strokeColor = theme === 'dark' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.4)';
  const fillColor = theme === 'dark' ? 'rgba(59, 130, 246, 1)' : 'rgba(59, 130, 246, 0.7)';
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg 
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Dynamic connection lines */}
        {nodes.map((node1, i) => 
          nodes.slice(i + 1).map((node2, j) => {
            const distance = Math.sqrt(
              Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2)
            );
            if (distance < connectionDistance) {
              const opacity = (1 - distance / connectionDistance) * 0.6;
              return (
                <motion.line
                  key={`${i}-${j}-${node1.x}-${node1.y}`}
                  x1={node1.x}
                  y1={node1.y}
                  x2={node2.x}
                  y2={node2.y}
                  stroke={strokeColor}
                  strokeWidth="0.3"
                  opacity={opacity}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut"
                  }}
                />
              );
            }
            return null;
          })
        )}
        
        {/* Moving animated nodes */}
        {nodes.map((node) => (
          <motion.g key={node.id}>
            {/* Node glow effect */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size * 1.5}
              fill={fillColor}
              opacity="0.3"
              animate={{
                cx: node.targetX,
                cy: node.targetY,
                scale: [1, 1.2, 1]
              }}
              transition={{
                cx: { duration: 8, ease: "easeInOut" },
                cy: { duration: 8, ease: "easeInOut" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            {/* Main node */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={fillColor}
              animate={{
                cx: node.targetX,
                cy: node.targetY,
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                cx: { duration: 8, ease: "easeInOut" },
                cy: { duration: 8, ease: "easeInOut" },
                opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </motion.g>
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