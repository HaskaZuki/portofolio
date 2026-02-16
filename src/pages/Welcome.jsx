import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Welcome = ({ onEnter }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-core)',
      color: 'var(--text-primary)',
      padding: '2rem',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: 'center',
          maxWidth: '600px',
        }}
      >
        <div style={{
          width: '80px',
          height: '80px',
          background: 'var(--accent-primary)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          fontSize: '2rem',
          fontWeight: '700',
          color: 'white',
        }}>
          O
        </div>

        <h1 style={{
          fontSize: '3rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: 'var(--text-primary)',
        }}>
          Welcome
        </h1>

        <p style={{
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.7',
          marginBottom: '2rem',
        }}>
          Full Stack Developer & Discord Bot Creator
        </p>

        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem 2rem',
            background: 'var(--accent-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          Enter Portfolio
          <ChevronRight size={20} />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
        }}
      >
        Press any key to continue
      </motion.div>
    </div>
  );
};

export default Welcome;
