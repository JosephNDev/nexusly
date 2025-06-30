import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Connection {
  from: number;
  to: number;
  opacity: number;
}

interface NetworkAnimationProps {
  nodeCount?: number;
  connectionDistance?: number;
  className?: string;
}

export function NetworkAnimation({ 
  nodeCount = 12, 
  connectionDistance = 150,
  className = '' 
}: NetworkAnimationProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  useEffect(() => {
    // Initialize nodes with random positions and velocities
    const initialNodes: Node[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
    setNodes(initialNodes);

    let animationId: number;
    
    const animate = () => {
      setNodes(prevNodes => {
        const newNodes = prevNodes.map(node => {
          let newX = node.x + node.vx;
          let newY = node.y + node.vy;
          let newVx = node.vx;
          let newVy = node.vy;

          // Bounce off edges
          if (newX <= 0 || newX >= window.innerWidth) {
            newVx = -newVx;
            newX = Math.max(0, Math.min(window.innerWidth, newX));
          }
          if (newY <= 0 || newY >= window.innerHeight) {
            newVy = -newVy;
            newY = Math.max(0, Math.min(window.innerHeight, newY));
          }

          return { ...node, x: newX, y: newY, vx: newVx, vy: newVy };
        });

        // Calculate connections
        const newConnections: Connection[] = [];
        for (let i = 0; i < newNodes.length; i++) {
          for (let j = i + 1; j < newNodes.length; j++) {
            const dx = newNodes[i].x - newNodes[j].x;
            const dy = newNodes[i].y - newNodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              const opacity = Math.max(0, 1 - distance / connectionDistance) * 0.3;
              newConnections.push({
                from: i,
                to: j,
                opacity
              });
            }
          }
        }
        setConnections(newConnections);

        return newNodes;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [nodeCount, connectionDistance]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg 
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: -1 }}
      >
        {/* Render connections */}
        {connections.map((connection, index) => {
          const fromNode = nodes[connection.from];
          const toNode = nodes[connection.to];
          if (!fromNode || !toNode) return null;
          
          return (
            <motion.line
              key={`${connection.from}-${connection.to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="rgba(59, 130, 246, 0.4)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: connection.opacity }}
              transition={{ duration: 0.3 }}
            />
          );
        })}
        
        {/* Render nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="3"
            fill="rgba(59, 130, 246, 0.6)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: node.id * 0.1 }}
          />
        ))}
      </svg>
    </div>
  );
}

// Gradient animation background for sections
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

// Light-themed network animation for bright sections
export function LightNetworkAnimation({ 
  nodeCount = 8, 
  connectionDistance = 140,
  className = '' 
}: NetworkAnimationProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  useEffect(() => {
    // Initialize nodes with random positions and velocities
    const initialNodes: Node[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3, // Slower movement for subtlety
      vy: (Math.random() - 0.5) * 0.3,
    }));
    setNodes(initialNodes);

    let animationId: number;
    
    const animate = () => {
      setNodes(prevNodes => {
        const newNodes = prevNodes.map(node => {
          let newX = node.x + node.vx;
          let newY = node.y + node.vy;
          let newVx = node.vx;
          let newVy = node.vy;

          // Bounce off edges
          if (newX <= 0 || newX >= window.innerWidth) {
            newVx = -newVx;
            newX = Math.max(0, Math.min(window.innerWidth, newX));
          }
          if (newY <= 0 || newY >= window.innerHeight) {
            newVy = -newVy;
            newY = Math.max(0, Math.min(window.innerHeight, newY));
          }

          return { ...node, x: newX, y: newY, vx: newVx, vy: newVy };
        });

        // Calculate connections
        const newConnections: Connection[] = [];
        for (let i = 0; i < newNodes.length; i++) {
          for (let j = i + 1; j < newNodes.length; j++) {
            const dx = newNodes[i].x - newNodes[j].x;
            const dy = newNodes[i].y - newNodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              const opacity = Math.max(0, 1 - distance / connectionDistance) * 0.15; // More subtle
              newConnections.push({
                from: i,
                to: j,
                opacity
              });
            }
          }
        }
        setConnections(newConnections);

        return newNodes;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [nodeCount, connectionDistance]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg 
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: -1 }}
      >
        {/* Render connections with light theme colors */}
        {connections.map((connection, index) => {
          const fromNode = nodes[connection.from];
          const toNode = nodes[connection.to];
          if (!fromNode || !toNode) return null;
          
          return (
            <motion.line
              key={`${connection.from}-${connection.to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: connection.opacity }}
              transition={{ duration: 0.5 }}
            />
          );
        })}
        
        {/* Render nodes with light theme colors */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="2"
            fill="rgba(59, 130, 246, 0.3)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: node.id * 0.15 }}
          />
        ))}
      </svg>
    </div>
  );
}

// Legacy component for backward compatibility
export function FloatingElements() {
  return <LightNetworkAnimation nodeCount={6} connectionDistance={120} />;
}
