"use client";

import { useState, useEffect } from 'react';

interface LoveEntryOverlayProps {
  onEnter: () => void;
}

export default function LoveEntryOverlay({ onEnter }: LoveEntryOverlayProps) {
  const [hearts, setHearts] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  // Generate floating hearts around the button
  useEffect(() => {
    const heartCount = 15;
    const newHearts = [];

    for (let i = 0; i < heartCount; i++) {
      newHearts.push({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          fontSize: `${1 + Math.random() * 1.5}rem`,
          animationDuration: `${3 + Math.random() * 4}s`,
          animationDelay: `${Math.random() * 2}s`,
          opacity: 0.3 + Math.random() * 0.7
        }
      });
    }

    setHearts(newHearts);
  }, []);

  return (
    <div className="love-entry-overlay">
      <div className="love-entry-hearts">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="entry-heart"
            style={heart.style}
          >
            ❤
          </div>
        ))}
      </div>
      <button
        className="love-entry-button"
        onClick={onEnter}
      >
        <span className="shine"></span>
        ENTER TO THE WORLD OF LOVE
      </button>
    </div>
  );
}
