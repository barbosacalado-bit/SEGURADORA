import React from 'react';

export default function Logo({ variant = 'light', className = '' }) {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Brand Icon Shield */}
      <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          <defs>
            <linearGradient id={isDark ? "shieldGradDark" : "shieldGradLight"} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={isDark ? "#08A9E6" : "#062653"} />
              <stop offset="100%" stopColor={isDark ? "#0866C9" : "#0866C9"} />
            </linearGradient>
            <linearGradient id={isDark ? "accentGradDark" : "accentGradLight"} x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={isDark ? "#FFFFFF" : "#08A9E6"} />
              <stop offset="100%" stopColor={isDark ? "#F3F6FD" : "#0866C9"} />
            </linearGradient>
          </defs>

          {/* Outer Protective Shield */}
          <path
            d="M24 3L8 9V21.5C8 31.8 14.8 41.3 24 45C33.2 41.3 40 31.8 40 21.5V9L24 3Z"
            fill={`url(#${isDark ? "shieldGradDark" : "shieldGradLight"})`}
          />

          {/* Inner Geometric Shield Facet */}
          <path
            d="M24 6.5L11.5 11.2V21.5C11.5 29.8 16.9 37.5 24 41.2V6.5Z"
            fill="white"
            fillOpacity="0.12"
          />

          {/* Monogram M Geometric Construction */}
          <path
            d="M16 32V18L24 24.8L32 18V32H28V23.2L24 26.8L20 23.2V32H16Z"
            fill={isDark ? "#062653" : "#FFFFFF"}
          />

          {/* Top Apex Dot of Trust */}
          <circle
            cx="24"
            cy="13.5"
            r="2.2"
            fill={isDark ? "#FFFFFF" : "#08A9E6"}
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-tight">
        <span className={`text-[22px] font-extrabold tracking-tight font-['Poppins'] ${
          isDark ? 'text-white' : 'text-[#062653]'
        }`}>
          MESSA
        </span>
        <span className={`text-[9.5px] font-semibold tracking-[0.22em] uppercase font-['Poppins'] ${
          isDark ? 'text-[#08A9E6]' : 'text-[#0866C9]'
        }`}>
          CORRETORA DE SEGUROS
        </span>
      </div>
    </div>
  );
}
