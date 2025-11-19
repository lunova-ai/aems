"use client";

import React, { useEffect, useState } from "react";

type ProgressRingProps = {
  value: number;        // Prozentwert 0–100
  size?: number;        // Durchmesser in px
  strokeWidth?: number; // Ring-Dicke
  color?: string;       // Farbe (Default: AEMS Neon)
};

export default function ProgressRing({
  value,
  size = 80,
  strokeWidth = 8,
  color = "#00E7B3",
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Für smoothe Animation
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(Math.max(0, Math.min(100, value)));
  }, [value]);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="block">
      {/* Hintergrund */}
      <circle
        stroke="rgba(255,255,255,0.1)"
        fill="transparent"
        strokeWidth={strokeWidth}
        cx={size / 2}
        cy={size / 2}
        r={radius}
      />

      {/* Progress */}
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        style={{
          transition: "stroke-dashoffset 0.6s ease, stroke 0.3s ease",
        }}
      />

      {/* Prozentzahl */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={size * 0.28}
        fill="#FFFFFF"
        style={{ fontWeight: 600 }}
      >
        {Math.round(progress)}%
      </text>
    </svg>
  );
}
