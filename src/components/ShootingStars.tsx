"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ShootingStarsProps {
  count?: number;
}

const ShootingStars: React.FC<ShootingStarsProps> = ({ count = 4 }) => { // Reduced default count for better performance
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeStarsRef = useRef<Set<number>>(new Set());
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // Memoize the createShootingStar function to prevent unnecessary re-creations
  const createShootingStar = useCallback((container: HTMLDivElement, index: number) => {
    // Skip if this star index is already active
    if (activeStarsRef.current.has(index)) return;

    // Mark this star index as active
    activeStarsRef.current.add(index);

    // Create the star container
    const starContainer = document.createElement('div');
    starContainer.className = `shooting-star-container shooting-star-${index}`;

    // Use will-change to hint the browser about the animation
    starContainer.style.willChange = 'transform, opacity';

    // Create the star head
    const starHead = document.createElement('div');
    starHead.className = 'shooting-star-head';

    // Create the star tail
    const starTail = document.createElement('div');
    starTail.className = 'shooting-star-tail';

    // Position stars at the top-right area with more variation
    const startPositionX = 85 + Math.random() * 15; // 85% to 100% of the width (right side)
    const startPositionY = Math.random() * 10; // 0% to 10% from the top

    // Animation duration - slower for more realistic effect
    const duration = 2 + Math.random() * 3; // 2-5 seconds

    // Size variation - slightly larger for better visibility
    const size = 2 + Math.random() * 2;

    // Trail length - longer for more dramatic effect
    const tailLength = 120 + Math.random() * 180;

    // Brightness variation - brighter for better visibility
    const brightness = 90 + Math.random() * 10;

    // Distance variation - how far the star travels
    const distance = 0.8 + Math.random() * 0.4;

    // Color variation - mostly white with some pink/blue hues
    const hue = Math.random() > 0.8
      ? Math.random() > 0.5 ? '330' : '210'  // Pink or blue
      : '60'; // Slight yellow-white

    const saturation = hue === '60' ? '5%' : '60%';

    // Set custom properties
    starContainer.style.setProperty('--start-x', `${startPositionX}%`);
    starContainer.style.setProperty('--start-y', `${startPositionY}%`);
    starContainer.style.setProperty('--duration', `${duration}s`);
    starContainer.style.setProperty('--size', `${size}px`);
    starContainer.style.setProperty('--tail-length', `${tailLength}px`);
    starContainer.style.setProperty('--brightness', `${brightness}%`);
    starContainer.style.setProperty('--distance', `${distance}`);
    starContainer.style.setProperty('--hue', hue);
    starContainer.style.setProperty('--saturation', saturation);

    // Add elements to the DOM
    starContainer.appendChild(starHead);
    starContainer.appendChild(starTail);
    container.appendChild(starContainer);

    // Remove the star after animation completes
    setTimeout(() => {
      if (starContainer.parentNode === container) {
        container.removeChild(starContainer);
      }
      // Remove this star index from active set
      activeStarsRef.current.delete(index);
    }, duration * 1000 + 100); // Add a small buffer to ensure animation completes
  }, []);

  useEffect(() => {
    // Skip if not on client yet or if container ref is not available
    if (!isClient || !containerRef.current) return;

    const container = containerRef.current;

    // Clear any existing stars
    container.innerHTML = '';

    // Create initial shooting stars with staggered delays
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        createShootingStar(container, i);
      }, i * 2500); // Increased stagger for more natural appearance and better performance
    }

    // Set up interval to continuously create new shooting stars
    // Use a more efficient approach with fewer stars and longer intervals
    intervalRef.current = setInterval(() => {
      // Only create a new star if we're below the maximum count
      if (activeStarsRef.current.size < count) {
        const availableIndices = Array.from(
          { length: count },
          (_, i) => i
        ).filter(i => !activeStarsRef.current.has(i));

        if (availableIndices.length > 0) {
          const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
          createShootingStar(container, randomIndex);
        }
      }
    }, 3000); // Longer interval for better performance

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [count, isClient, createShootingStar]);

  return (
    <div ref={containerRef} className="shooting-stars-container">
      {/* Only render on client side to prevent hydration errors */}
    </div>
  );
};

export default ShootingStars;
