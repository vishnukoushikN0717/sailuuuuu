"use client";

import React, { useEffect, useRef } from 'react';

interface StarProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const StarryBackground: React.FC<StarProps> = ({ containerRef }) => {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starsRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const stars = starsRef.current;

    // Clear any existing stars
    stars.innerHTML = '';

    // Get container dimensions
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Create stars
    const starCount = Math.floor((width * height) / 300); // Higher density for more stars

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');

      // Random star properties
      const size = Math.random();
      let sizeClass = 'star-small';

      if (size > 0.85) {
        sizeClass = 'star-large';
      } else if (size > 0.65) {
        sizeClass = 'star-medium';
      }

      star.className = `star ${sizeClass}`;

      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;

      // Random animation properties
      star.style.setProperty('--delay', `${Math.random() * 5}s`);
      star.style.setProperty('--duration', `${2 + Math.random() * 3}s`); // Faster animation
      star.style.setProperty('--intensity', `${0.6 + Math.random() * 0.4}`); // Brighter stars

      stars.appendChild(star);
    }

    // Add glitter effect
    const glitter = document.createElement('div');
    glitter.className = 'glitter';
    stars.appendChild(glitter);

  }, [containerRef]);

  return <div ref={starsRef} className="stars"></div>;
};

export default StarryBackground;
