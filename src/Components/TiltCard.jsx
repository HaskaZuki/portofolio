import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard = ({ 
  children, 
  className = '',
  tiltAmount = 10,
  glareEnabled = true,
  scale = 1.02
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [tiltAmount, -tiltAmount]), {
    stiffness: 300,
    damping: 30
  });
  
  const rotateY = useSpring(useTransform(x, [0, 1], [-tiltAmount, tiltAmount]), {
    stiffness: 300,
    damping: 30
  });

  const glareX = useTransform(x, [0, 1], ['0%', '100%']);
  const glareY = useTransform(y, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${className}`}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? scale : 1,
          transformStyle: 'preserve-3d',
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
        
        {glareEnabled && (
          <motion.div
            className="glare-effect"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.15) 0%, transparent 60%)`,
              opacity: isHovered ? 1 : 0,
              pointerEvents: 'none',
              borderRadius: 'inherit',
              transition: 'opacity 0.3s',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export const MagneticButton = ({ 
  children, 
  className = '',
  strength = 0.3
}) => {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.button>
  );
};

export const FloatingCard = ({ 
  children, 
  className = '',
  delay = 0
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export const GlowCard = ({ 
  children, 
  className = '',
  glowColor = 'rgba(0, 255, 204, 0.5)'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        boxShadow: isHovered 
          ? `0 0 30px ${glowColor}, 0 0 60px ${glowColor}`
          : '0 0 0px transparent'
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default TiltCard;
