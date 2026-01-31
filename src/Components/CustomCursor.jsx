import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = ({ theme = 'dark' }) => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device has pointer (not touch)
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(true);
        const text = target.closest('[data-cursor-text]')?.dataset.cursorText;
        if (text) setCursorText(text);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  const isLight = theme === 'light';

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          borderRadius: '50%',
          border: `2px solid ${isLight ? '#1a1a1a' : '#00ffcc'}`,
          backgroundColor: isHovering 
            ? (isLight ? 'rgba(26, 26, 26, 0.1)' : 'rgba(0, 255, 204, 0.1)')
            : 'transparent',
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s',
          mixBlendMode: isLight ? 'normal' : 'difference',
        }}
        animate={{
          scale: isClicking ? 0.9 : 1,
        }}
      >
        {cursorText && (
          <span style={{
            fontSize: '10px',
            fontWeight: 'bold',
            color: isLight ? '#1a1a1a' : '#00ffcc',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        ref={cursorDotRef}
        style={{
          x: cursorX,
          y: cursorY,
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: isLight ? '#1a1a1a' : '#00ffcc',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: isLight ? 'normal' : 'difference',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
        
        @media (pointer: coarse) {
          .custom-cursor,
          .custom-cursor-dot {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
