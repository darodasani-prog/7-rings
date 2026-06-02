import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
  variant?: 'dark' | 'light' | 'dynamic';
}

export default function Logo({ className = '', size = 'md', showText = true, variant = 'dynamic' }: LogoProps) {
  // Compute size-specific width and height using responsive classes so "hero" fits mobile screens brilliantly
  const sizeClasses = {
    sm: 'w-[140px] h-[112px]',
    md: 'w-[200px] h-[160px]',
    lg: 'w-[300px] h-[240px]',
    hero: 'w-[250px] h-[200px] sm:w-[350px] sm:h-[280px] md:w-[450px] md:h-[360px]'
  }[size];

  // Determine actual colors dynamically or bypass CSS variables based on variant context
  const fgColor = {
    dark: '#FFFFFF',
    light: '#0F0F0F',
    dynamic: 'var(--logo-fg-color)'
  }[variant];

  const ringsColor = {
    dark: '#00E5FF',
    light: '#1B52FF',
    dynamic: 'var(--logo-rings-color)'
  }[variant];

  return (
    <div className={`inline-block select-none max-w-full aspect-[1.25] ${sizeClasses} ${className}`}>
      <svg
        viewBox="0 0 500 400"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Silver metallic chain gradient */}
          <linearGradient id="silverRingGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E5E7EB" />
            <stop offset="35%" stopColor="#9CA3AF" />
            <stop offset="70%" stopColor="#D1D5DB" />
            <stop offset="100%" stopColor="#4B5563" />
          </linearGradient>
          
          {/* Drop shadow for the main text to elevate contrast */}
          <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g>
          {/* 1. Highly accurate single-path stylized "7" on the left */}
          {/* Solid fill, sweeps down gracefully to a clean circular teardrop bulb */}
          <path
            d="M 35 190 
               L 50 135 
               H 185 
               C 165 190, 145 245, 130 287 
               A 25 25 0 1 1 110 287 
               C 120 245, 132 205, 142 165 
               H 65 
               Z"
            fill={fgColor}
            className="transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(27,82,255,0.15)]"
          />

          {/* 2. Chain of 7 Overlapping Silver Circles (The 7 Rings) */}
          <g stroke="url(#silverRingGrad)" strokeWidth="3.2" fill="none" opacity="0.95">
            <circle cx="196" cy="175" r="23" />
            <circle cx="218" cy="175" r="23" />
            <circle cx="240" cy="175" r="23" />
            <circle cx="262" cy="175" r="23" />
            <circle cx="284" cy="175" r="23" />
            <circle cx="306" cy="175" r="23" />
            <circle cx="328" cy="175" r="23" />
          </g>

          {/* 3. Detailed White/Dark Eagle perched majestically on the right-most ring */}
          {/* Crown, beak, wings raised back/up and detailed tail feathers */}
          <path
            d="M 334 163
               C 330 156, 321 150, 317 140
               C 316 137, 318 133, 321 130
               C 324 128, 329 128, 332 130
               C 334 132, 336 136, 338 140
               C 340 130, 342 120, 346 110
               C 348 105, 352 100, 356 97
               C 354 103, 352 110, 352 117
               C 358 110, 364 103, 372 98
               C 369 104, 365 111, 362 117
               C 370 112, 379 107, 388 104
               C 382 111, 374 118, 368 124
               C 377 121, 386 119, 394 118
               C 386 126, 376 133, 366 138
               C 374 137, 382 136, 390 136
               C 380 143, 369 150, 358 155
               C 366 156, 373 157, 380 159
               C 370 164, 360 167, 350 169
               C 345 171, 340 173, 336 163
               Z"
            fill={fgColor}
            className="transition-colors duration-300"
          />
          {/* Inner detailing of eagle wing base/head for premium vector look */}
          <path
            d="M 336 163
               C 334 167, 336 173, 339 175
               C 342 177, 346 175, 348 171
               C 350 167, 348 164, 344 164
               Z"
            fill={fgColor}
            className="transition-colors duration-300"
          />

          {showText && (
            <>
              {/* 4. Bold uppercase "RINGS" in Electric Royal Blue or Fluorescent Cyan */}
              {/* Positioned exactly aligned below the chain of rings */}
              <text
                x="172"
                y="256"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="900"
                fontSize="84"
                letterSpacing="-3"
                fill={ringsColor}
                className="font-black select-none transition-colors duration-300"
                style={{ textShadow: `0 0 15px ${ringsColor}` }}
              >
                RINGS
              </text>

              {/* 5. Minimalist wordmark subtitle of "Art & Entertainment" */}
              <text
                x="175"
                y="294"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="600"
                fontSize="22.5"
                letterSpacing="0.4"
                fill={fgColor}
                className="transition-colors duration-300 select-none opacity-90"
              >
                Art & Entertainment
              </text>
            </>
          )}
        </g>
      </svg>
    </div>
  );
}
