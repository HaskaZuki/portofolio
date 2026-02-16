import React from "react";

const Logo = ({ className, style }) => {
  return (
    <svg 
      className={className} 
      style={style}
      width="200" 
      height="80" 
      viewBox="0 0 200 80" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="metal-chrome" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="20%" stopColor="#eeeeee" />
          <stop offset="50%" stopColor="#999999" />
          <stop offset="80%" stopColor="#cccccc" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        <linearGradient id="bevel-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        <filter id="bev-3d" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
          <feOffset in="blur" dx="2" dy="2" result="offsetBlur" />
          <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1.5" specularExponent="40" lightingColor="#ffffff" result="spec">
            <fePointLight x="-50" y="-50" z="200" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn" />
          <feComposite in="SourceGraphic" in2="specIn" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="final" />
          <feDropShadow dx="3" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.7"/>
        </filter>
      </defs>

      <g filter="url(#bev-3d)" transform="translate(10, 0)">
        <path d="M40 25 L15 40 L40 55" fill="none" stroke="url(#metal-chrome)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M40 25 L15 40 L40 55" fill="none" stroke="url(#bevel-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" transform="translate(1,1)" />

        <path d="M60 20 H75 V38 H100 V20 H115 V65 H100 V48 H75 V65 H60 Z" fill="url(#metal-chrome)" />
        <path d="M60 20 H75 V38 H100 V20 H115 V65 H100 V48 H75 V65 H60 Z" fill="url(#bevel-light)" opacity="0.3" />

        <path d="M140 15 L120 70" fill="none" stroke="url(#metal-chrome)" strokeWidth="10" strokeLinecap="round" />
        <path d="M140 15 L120 70" fill="none" stroke="url(#bevel-light)" strokeWidth="2" strokeLinecap="round" opacity="0.5" transform="translate(1,1)" />

        <path d="M160 25 L185 40 L160 55" fill="none" stroke="url(#metal-chrome)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M160 25 L185 40 L160 55" fill="none" stroke="url(#bevel-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" transform="translate(1,1)" />
      </g>
    </svg>
  );
};

export default Logo;
