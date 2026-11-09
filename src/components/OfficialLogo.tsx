import React from 'react';

interface OfficialLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showTagline?: boolean;
  className?: string;
}

export const OfficialLogo: React.FC<OfficialLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const dims = {
    sm: { w: 180, h: 64, iconScale: 0.5, textScale: 'text-xs' },
    md: { w: 260, h: 88, iconScale: 0.7, textScale: 'text-sm' },
    lg: { w: 340, h: 110, iconScale: 0.9, textScale: 'text-base' },
    hero: { w: 440, h: 140, iconScale: 1.2, textScale: 'text-lg' },
  }[size];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* 3D-Styled Logo Crest Lockup */}
      <div className="relative flex items-center justify-center">
        {/* Ambient Pulsing Aura Behind Shield */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/20 to-red-600/30 blur-xl rounded-full scale-110 pointer-events-none" />

        <svg
          viewBox="0 0 400 130"
          className="w-full max-w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
          style={{ width: `${dims.w}px`, height: 'auto' }}
        >
          <defs>
            {/* Energy Gradients */}
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            <linearGradient id="metalRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="25%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#64748b" />
              <stop offset="75%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            <linearGradient id="gold3d" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            <linearGradient id="blueEnergy" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>

            <linearGradient id="redEnergy" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>

            <filter id="neonGlowBlue" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="neonGlowRed" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Left Sword Behind Shield */}
          <g transform="translate(48, 55) rotate(-42)">
            {/* Sword Blade */}
            <path d="M-4,-48 L4,-48 L2,44 L-2,44 Z" fill="url(#metalRim)" stroke="#38bdf8" strokeWidth="0.8" />
            {/* Fuller line */}
            <line x1="0" y1="-46" x2="0" y2="40" stroke="#0284c7" strokeWidth="1" filter="url(#neonGlowBlue)" />
            {/* Crossguard */}
            <rect x="-14" y="24" width="28" height="6" rx="2" fill="url(#gold3d)" stroke="#d97706" strokeWidth="0.8" />
            {/* Grip & Pommel */}
            <rect x="-3" y="30" width="6" height="18" fill="#1e293b" />
            <circle cx="0" cy="51" r="5" fill="url(#gold3d)" />
          </g>

          {/* Right Sword Behind Shield */}
          <g transform="translate(48, 55) rotate(42)">
            {/* Sword Blade */}
            <path d="M-4,-48 L4,-48 L2,44 L-2,44 Z" fill="url(#metalRim)" stroke="#f43f5e" strokeWidth="0.8" />
            {/* Fuller line */}
            <line x1="0" y1="-46" x2="0" y2="40" stroke="#e11d48" strokeWidth="1" filter="url(#neonGlowRed)" />
            {/* Crossguard */}
            <rect x="-14" y="24" width="28" height="6" rx="2" fill="url(#gold3d)" stroke="#d97706" strokeWidth="0.8" />
            {/* Grip & Pommel */}
            <rect x="-3" y="30" width="6" height="18" fill="#1e293b" />
            <circle cx="0" cy="51" r="5" fill="url(#gold3d)" />
          </g>

          {/* Electric Lightning Arcs */}
          <path
            d="M 12 25 L 26 42 L 20 45 L 34 68"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            filter="url(#neonGlowBlue)"
            strokeLinecap="round"
          />
          <path
            d="M 84 25 L 70 42 L 76 45 L 62 68"
            fill="none"
            stroke="#fb7185"
            strokeWidth="2"
            filter="url(#neonGlowRed)"
            strokeLinecap="round"
          />

          {/* Metallic Shield Body */}
          <path
            d="M 20 18 Q 48 10 76 18 Q 78 58 48 94 Q 18 58 20 18 Z"
            fill="url(#shieldGrad)"
            stroke="url(#metalRim)"
            strokeWidth="3.5"
          />

          {/* Inner Shield Bevel Accent */}
          <path
            d="M 26 23 Q 48 16 70 23 Q 72 54 48 85 Q 24 54 26 23 Z"
            fill="none"
            stroke="#1e293b"
            strokeWidth="1.5"
          />

          {/* Futuristic Warrior Helmet Inside Shield */}
          {/* Brow plate */}
          <path
            d="M 33 32 L 63 32 L 61 44 L 35 44 Z"
            fill="url(#metalRim)"
            stroke="#475569"
            strokeWidth="0.8"
          />
          {/* Glowing Visor (Half Cyan Blue, Half Red) */}
          <path
            d="M 34 44 L 48 48 L 48 53 L 36 50 Z"
            fill="url(#blueEnergy)"
            filter="url(#neonGlowBlue)"
          />
          <path
            d="M 48 48 L 62 44 L 60 50 L 48 53 Z"
            fill="url(#redEnergy)"
            filter="url(#neonGlowRed)"
          />
          {/* Faceplate Jaw */}
          <polygon
            points="37,52 59,52 54,66 48,70 42,66"
            fill="#0f172a"
            stroke="url(#metalRim)"
            strokeWidth="1.2"
          />
          {/* Center Helmet Fin */}
          <path
            d="M 46 20 L 50 20 L 49 34 L 47 34 Z"
            fill="url(#gold3d)"
          />

          {/* Glowing Central "ZP" Monogram Emblem */}
          <g transform="translate(48, 62)">
            <circle cx="0" cy="0" r="10" fill="#020617" stroke="url(#gold3d)" strokeWidth="1.2" />
            <text
              x="0"
              y="3.5"
              fill="#fbbf24"
              fontSize="8"
              fontWeight="900"
              fontFamily="'Orbitron', sans-serif"
              textAnchor="middle"
              filter="drop-shadow(0 0 3px #f59e0b)"
            >
              ZP
            </text>
          </g>

          {/* BRAND TYPOGRAPHY: RIGHT SIDE */}
          {/* Brand Name: ZOHAIB PK OFFICIAL */}
          <g transform="translate(100, 30)">
            <rect x="0" y="-12" width="168" height="16" rx="3" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            <circle cx="10" cy="-4" r="3" fill="#ef4444" className="animate-pulse" />
            <text
              x="20"
              y="-1"
              fill="#94a3b8"
              fontSize="9"
              fontWeight="700"
              fontFamily="'Orbitron', sans-serif"
              letterSpacing="2.5"
            >
              ZOHAIB PK OFFICIAL
            </text>
          </g>

          {/* Title Line 1: ULTIMATE LEGENDARY */}
          <text
            x="100"
            y="54"
            fill="url(#metalRim)"
            fontSize="18"
            fontWeight="900"
            fontFamily="'Orbitron', sans-serif"
            letterSpacing="2"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.9))"
          >
            ULTIMATE
            <tspan dx="10" fill="url(#gold3d)">LEGENDARY</tspan>
          </text>

          {/* Title Line 2: 100 GAMES CHALLENGE */}
          <g transform="translate(100, 84)">
            {/* Glowing 100 Badge */}
            <rect x="0" y="-19" width="46" height="24" rx="4" fill="#ef4444" stroke="#fecdd3" strokeWidth="1" />
            <text
              x="23"
              y="-3"
              fill="#ffffff"
              fontSize="16"
              fontWeight="900"
              fontFamily="'Orbitron', sans-serif"
              textAnchor="middle"
            >
              100
            </text>

            <text
              x="54"
              y="-3"
              fill="#f8fafc"
              fontSize="17"
              fontWeight="900"
              fontFamily="'Orbitron', sans-serif"
              letterSpacing="2"
              filter="drop-shadow(0 0 8px rgba(56,189,248,0.5))"
            >
              GAMES CHALLENGE
            </text>
          </g>

          {/* Stage Progress Energy Bar */}
          <g transform="translate(100, 102)">
            <rect x="0" y="0" width="280" height="4" rx="2" fill="#1e293b" />
            <rect x="0" y="0" width="140" height="4" rx="2" fill="url(#blueEnergy)" />
            <rect x="140" y="0" width="140" height="4" rx="2" fill="url(#redEnergy)" />
          </g>
        </svg>
      </div>

      {showTagline && (
        <div className="mt-1 flex items-center gap-2">
          <span className="h-px w-4 bg-red-500/60" />
          <span className="font-['Orbitron'] text-[10px] md:text-xs tracking-[0.25em] text-cyan-400 font-bold uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
            100 GAMES · 100 LEVELS · NO EASY VICTORIES
          </span>
          <span className="h-px w-4 bg-cyan-500/60" />
        </div>
      )}
    </div>
  );
};
