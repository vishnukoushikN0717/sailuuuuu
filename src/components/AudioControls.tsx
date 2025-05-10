"use client";

import { useState, useRef, useEffect } from 'react';

interface AudioControlsProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export default function AudioControls({ audioRef, isPlaying, onPlayPause }: AudioControlsProps) {
  const [volume, setVolume] = useState(50);

  // Update audio volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="audio-controls">
      <button
        className="audio-button"
        onClick={onPlayPause}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? "⏸️" : "▶️"}
      </button>
      <span className="audio-label">Volume</span>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
        className="volume-slider"
        aria-label="Volume control"
      />
    </div>
  );
}
