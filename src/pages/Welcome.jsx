import React, { useState, useEffect } from "react";

const Welcome = ({ onEnter }) => {
  const [bootStep, setBootStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullText = "Welcome to my portfolio, Enjoy";

  useEffect(() => {
    if (bootStep === 1) {
      let index = 0;
      const interval = setInterval(() => {
        setTypedText(fullText.slice(0, index + 1));
        index++;
        if (index >= fullText.length) {
          clearInterval(interval);
          setTimeout(() => setBootStep(2), 500);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [bootStep]);

  useEffect(() => {
    const timer1 = setTimeout(() => setBootStep(1), 500); // Start typing
    return () => clearTimeout(timer1);
  }, []);

  return (
    <div className="welcome-screen fade-in">
      <div className="boot-container glass-card">
        
        {bootStep === 0 && (
          <div className="loader-ring"></div>
        )}

        
        {(bootStep >= 1) && (
          <div className="boot-text-container">
             <h1 className="boot-title glitch-text" data-text="HASKA_ZUKI">Portfolio</h1>
             <p className="boot-status">{typedText}<span className="cursor-block">█</span></p>
          </div>
        )}

        
        {bootStep >= 2 && (
          <div className="boot-actions fade-in">
            <div className="boot-bar">
              <div className="boot-progress" style={{ width: "100%" }}></div>
            </div>
            <p className="access-granted">ACCESS GRANTED</p>
            <button className="btn-enter" onClick={onEnter}>
              ENTER SYSTEM
            </button>
          </div>
        )}
      </div>

      <div className="scanlines"></div>
      
      <style>{`
        .welcome-screen {
          position: fixed; inset: 0;
          background: #000;
          display: flex; align-items: center; justify-content: center;
          z-index: 9999;
        }
        .boot-container {
          width: 90%; max-width: 500px;
          text-align: center;
          border: 1px solid var(--accent-primary);
          background: rgba(0,0,0,0.8);
          padding: 3rem;
          position: relative;
        }
        .boot-title {
          font-family: var(--font-mono);
          font-size: 3rem;
          margin-bottom: 1rem;
          letter-spacing: -2px;
          font-weight: 800;
        }
        .boot-status {
          font-family: var(--font-mono);
          color: var(--accent-primary);
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          margin-top: -0.5rem;
        }
        .cursor-block { animation: blink 1s infinite; }
        .boot-bar {
          width: 100%; height: 4px; background: #333;
          margin-bottom: 1rem;
        }
        .boot-progress {
          height: 100%; background: var(--accent-primary);
          box-shadow: 0 0 10px var(--accent-primary);
          animation: loadBar 1s ease forwards;
        }
        .access-granted {
          color: #fff; letter-spacing: 5px; font-size: 0.8rem; margin-bottom: 2rem;
        }
        .btn-enter {
          background: transparent;
          border: 1px solid var(--accent-primary);
          color: var(--accent-primary);
          padding: 1rem 3rem;
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-enter:hover {
          background: var(--accent-primary);
          color: #000;
          box-shadow: 0 0 20px var(--accent-primary);
        }
        .loader-ring {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(0, 255, 204, 0.1);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes loadBar { from { width: 0; } to { width: 100%; } }
        .scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default Welcome;