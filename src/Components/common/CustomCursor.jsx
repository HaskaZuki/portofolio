import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable') ||
        target.closest('.clickable') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(isClickable);
    };

    let animationId;
    const animate = () => {
      const ease = 0.15;
      
      cursorX += (mouseX - cursorX) * ease;
      cursorY += (mouseY - cursorY) * ease;
      
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      
      animationId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''}`}
      />
      <div
        ref={cursorDotRef}
        className={`custom-cursor-dot ${isVisible ? 'visible' : ''}`}
      />
      <style>{`
        .custom-cursor,
        .custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 10000;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .custom-cursor.visible,
        .custom-cursor-dot.visible {
          opacity: 1;
        }

        .custom-cursor {
          width: 32px;
          height: 32px;
          border: 2px solid var(--accent-primary);
          border-radius: 50%;
          margin: -16px 0 0 -16px;
          transition: transform 0.2s ease, width 0.2s ease, height 0.2s ease;
        }

        .custom-cursor.hovering {
          width: 48px;
          height: 48px;
          margin: -24px 0 0 -24px;
          background: rgba(79, 70, 229, 0.1);
        }

        .custom-cursor-dot {
          width: 6px;
          height: 6px;
          background: var(--accent-primary);
          border-radius: 50%;
          margin: -3px 0 0 -3px;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
