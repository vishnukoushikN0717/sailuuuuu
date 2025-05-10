"use client";

import { useState, useEffect } from 'react';
import './FloatingHearts.css';

interface Heart {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
}

interface FloatingHeartsProps {
  trigger: boolean;
  onComplete: () => void;
}

export default function FloatingHearts({ trigger, onComplete }: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    if (trigger) {
      createHearts();
      // Reset trigger after animation completes
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  const createHearts = () => {
    const newHearts: Heart[] = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Create 20 hearts with different sizes and animations
    for (let i = 0; i < 20; i++) {
      // Random starting position near the center
      const x = centerX + (Math.random() * 200 - 100);
      const y = centerY + (Math.random() * 200 - 100);

      // Random ending position (floating in different directions)
      const tx = (Math.random() - 0.5) * 400;
      const ty = (Math.random() - 0.5) * 400;

      newHearts.push({
        id: Date.now() + i,
        x,
        y,
        tx,
        ty
      });
    }

    setHearts(newHearts);

    // Clear hearts after animation
    setTimeout(() => {
      setHearts([]);
    }, 2000);
  };

  return (
    <div className="hearts-container">
      {hearts.map((heart) => {
        // Random size for each heart
        const size = 16 + Math.random() * 24; // Between 16px and 40px

        return (
          <div
            key={heart.id}
            className="floating-heart"
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`,
              '--tx': `${heart.tx}px`,
              '--ty': `${heart.ty}px`,
              fontSize: `${size}px`,
              // Add a slight random rotation
              transform: `rotate(${Math.random() * 60 - 30}deg)`
            } as React.CSSProperties}
          >
            ❤️
          </div>
        );
      })}
    </div>
  );
}
