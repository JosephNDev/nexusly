import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface NetworkAnimationProps {
  nodeCount?: number;
  className?: string;
  theme?: 'dark' | 'light';
}

interface NetworkNode {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

// Dark-themed network animation with connected nodes and lines
export function NetworkAnimation({ 
  nodeCount = 20, 
  className = '',
  theme = 'dark'
}: NetworkAnimationProps) {
  const [nodes, setNodes] = useState<NetworkNode[]>([]);

  useEffect(() => {
    // Initialize nodes across the screen
    const initialNodes: NetworkNode[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      targetX: Math.random() * 100,
      targetY: Math.random() * 100
    }));
    setNodes(initialNodes);

    // Continuously move nodes to create network effect
    const interval = setInterval(() => {
      setNodes(prevNodes => 
        prevNodes.map(node => ({
          ...node,
          targetX: Math.random() * 100,
          targetY: Math.random() * 100
        }))
      );
    }, 12000);

    return () => clearInterval(interval);
  }, [nodeCount]);

  const connectionDistance = 25;
  
  // Dark theme colors - bright blue for visibility on dark background
  const nodeColor = theme === 'dark' ? '#60A5FA' : '#3B82F6';
  const lineColor = theme === 'dark' ? '#3B82F6' : '#1E40AF';
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Dark overlay for network visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-slate-800/20 to-slate-900/30" />
      
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Connection lines between nearby nodes */}
        {nodes.map((node1, i) => 
          nodes.slice(i + 1).map((node2, j) => {
            const distance = Math.sqrt(
              Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2)
            );
            if (distance < connectionDistance) {
              const opacity = Math.max(0.3, (1 - distance / connectionDistance) * 0.8);
              return (
                <motion.line
                  key={`line-${i}-${j}`}
                  x1={node1.x}
                  y1={node1.y}
                  x2={node2.x}
                  y2={node2.y}
                  stroke={lineColor}
                  strokeWidth="0.3"
                  opacity={opacity}
                  animate={{
                    x1: node1.targetX,
                    y1: node1.targetY,
                    x2: node2.targetX,
                    y2: node2.targetY,
                    opacity: [opacity * 0.5, opacity, opacity * 0.5]
                  }}
                  transition={{
                    x1: { duration: 12, ease: "easeInOut" },
                    y1: { duration: 12, ease: "easeInOut" },
                    x2: { duration: 12, ease: "easeInOut" },
                    y2: { duration: 12, ease: "easeInOut" },
                    opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              );
            }
            return null;
          })
        )}
        
        {/* Network nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={`node-${node.id}`}
            cx={node.x}
            cy={node.y}
            r="0.4"
            fill={nodeColor}
            animate={{
              cx: node.targetX,
              cy: node.targetY,
              opacity: [0.6, 1, 0.6],
              r: [0.3, 0.5, 0.3]
            }}
            transition={{
              cx: { duration: 12, ease: "easeInOut" },
              cy: { duration: 12, ease: "easeInOut" },
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: node.id * 0.2 },
              r: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: node.id * 0.2 }
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