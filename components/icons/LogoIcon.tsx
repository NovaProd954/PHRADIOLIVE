import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="90 115 332 218" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
  >
    <defs>
      <linearGradient id="silverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#cccccc"/>
        <stop offset="50%" stopColor="#ffffff"/>
        <stop offset="100%" stopColor="#999999"/>
      </linearGradient>

      <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#999"/>
        <stop offset="50%" stopColor="#e0e0e0"/>
        <stop offset="100%" stopColor="#666"/>
      </linearGradient>

      <linearGradient id="screenGloss" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.18"/>
        <stop offset="40%" stopColor="white" stopOpacity="0.07"/>
        <stop offset="100%" stopColor="white" stopOpacity="0"/>
      </linearGradient>

      <clipPath id="screenClip">
        <rect x="113" y="143" width="286" height="166" rx="28" ry="28"/>
      </clipPath>
    </defs>

    <rect x="150" y="125" width="30" height="15" rx="4" fill="#333"/>

    <g clipPath="url(#screenClip)">
      <rect x="113" y="143" width="286" height="83" fill="#0038A8"/>
      <rect x="113" y="226" width="286" height="83" fill="#CE1126"/>

      <path d="M113 143 L113 309 L256 226 Z" fill="#FFFFFF"/>

      <g transform="translate(160, 226)">
        <circle cx="0" cy="0" r="20" fill="#FCD116"/>
        <g fill="#FCD116">
          <polygon points="0,-36 4,-20 -4,-20"/>
          <polygon points="0,36 4,20 -4,20"/>
          <polygon points="36,0 20,4 20,-4"/>
          <polygon points="-36,0 -20,4 -20,-4"/>
          <polygon points="26,-26 16,-16 20,-12"/>
          <polygon points="-26,-26 -16,-16 -20,-12"/>
          <polygon points="26,26 16,16 20,12"/>
          <polygon points="-26,26 -16,16 -20,12"/>
        </g>
      </g>

      <g fill="#FCD116">
        <path transform="translate(132,176) scale(0.63)"
          d="M0,-10 L3,-3 L10,-3 L4,1 L6,8 L0,4 L-6,8 L-4,1 L-10,-3 L-3,-3 Z"/>
        <path transform="translate(132,276) scale(0.63)"
          d="M0,-10 L3,-3 L10,-3 L4,1 L6,8 L0,4 L-6,8 L-4,1 L-10,-3 L-3,-3 Z"/>
        <path transform="translate(220,226) rotate(90) scale(0.63)"
          d="M0,-10 L3,-3 L10,-3 L4,1 L6,8 L0,4 L-6,8 L-4,1 L-10,-3 L-3,-3 Z"/>
      </g>

      <path d="
        M113,143 H399
        Q405,143 405,150
        V226
        Q405,233 399,233
        H113 Z
      " fill="url(#screenGloss)" opacity="0.6"/>
    </g>

    <g transform="translate(328, 226)">
      <circle cx="0" cy="0" r="48" fill="url(#rimGrad)" stroke="#555" strokeWidth="1"/>
      <circle cx="0" cy="0" r="42" fill="#333"/>

      <g fill="url(#silverGrad)">
        <rect x="-35" y="-30" width="70" height="6" rx="2"/>
        <rect x="-39" y="-18" width="78" height="6" rx="2"/>
        <rect x="-41" y="-6" width="82" height="6" rx="2"/>
        <rect x="-41" y="6" width="82" height="6" rx="2"/>
        <rect x="-39" y="18" width="78" height="6" rx="2"/>
        <rect x="-35" y="30" width="70" height="6" rx="2"/>
      </g>
    </g>

    <rect x="106" y="136" width="300" height="180" rx="35" ry="35"
          fill="none" stroke="#333" strokeWidth="14"/>
  </svg>
);
