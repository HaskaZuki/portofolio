import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="scroll-progress"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'var(--accent-primary)',
          transformOrigin: '0%',
          scaleX,
          zIndex: 9999,
        }}
      />

      {/* Back to Top Button */}
      <motion.button
        className="back-to-top"
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0,
          y: showBackToTop ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'var(--bg-card)',
          border: '1px solid var(--glass-border)',
          color: 'var(--accent-primary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          zIndex: 999,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
        whileHover={{ 
          scale: 1.1,
          borderColor: 'var(--accent-primary)',
          boxShadow: '0 0 20px rgba(0, 255, 204, 0.3)'
        }}
        whileTap={{ scale: 0.95 }}
      >
        ↑
      </motion.button>
    </>
  );
};

export default ScrollProgress;
