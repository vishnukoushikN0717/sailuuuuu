"use client";

import { useRef, useEffect, useState } from 'react';

interface BackgroundMusicProps {
  audioSrc: string;
  isPlaying: boolean;
}

export default function BackgroundMusic({ audioSrc, isPlaying }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Create audio element
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5; // Set initial volume to 50%
    }

    // Handle play/pause based on isPlaying prop
    if (isPlaying && !initialized) {
      // First time playing - needs user interaction
      setInitialized(true);
      const playPromise = audioRef.current.play();
      
      // Handle autoplay restrictions
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Autoplay prevented. User interaction required:', error);
        });
      }
    } else if (isPlaying) {
      // Resume playing
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Play prevented:', error);
        });
      }
    } else if (audioRef.current) {
      // Pause the audio
      audioRef.current.pause();
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc, isPlaying, initialized]);

  return null; // This component doesn't render anything visible
}
