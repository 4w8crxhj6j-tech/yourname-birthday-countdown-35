import React from "react";

export const Bow = ({ size = 48, color = "#ff3d8a", ribbon = "#ffc2dc", className = "", style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id={`bowG-${color.replace('#','')}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={ribbon} />
        <stop offset="100%" stopColor={color} />
      </linearGradient>
    </defs>
    {/* Left loop */}
    <path
      d="M50 50 C 20 30, 10 55, 25 65 C 35 72, 48 60, 50 50 Z"
      fill={`url(#bowG-${color.replace('#','')})`}
      stroke={color}
      strokeWidth="2"
    />
    {/* Right loop */}
    <path
      d="M50 50 C 80 30, 90 55, 75 65 C 65 72, 52 60, 50 50 Z"
      fill={`url(#bowG-${color.replace('#','')})`}
      stroke={color}
      strokeWidth="2"
    />
    {/* Tails */}
    <path
      d="M45 52 C 40 70, 38 82, 42 90 L 50 85 L 58 90 C 62 82, 60 70, 55 52 Z"
      fill={ribbon}
      stroke={color}
      strokeWidth="2"
    />
    {/* Knot */}
    <ellipse cx="50" cy="50" rx="8" ry="10" fill={color} />
    <ellipse cx="48" cy="47" rx="2" ry="3" fill="#fff" opacity="0.7" />
  </svg>
);

export const Sparkle = ({ size = 20, color = "#ff3d8a", className = "", style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <path
      d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
      fill={color}
    />
  </svg>
);

export const Heart = ({ size = 24, color = "#ff3d8a", className = "", style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <path
      d="M12 21s-7-4.5-9.5-9C0.5 8 3 3 7.5 3c2 0 3.5 1.2 4.5 2.5C13 4.2 14.5 3 16.5 3 21 3 23.5 8 21.5 12 19 16.5 12 21 12 21z"
      fill={color}
    />
  </svg>
);
