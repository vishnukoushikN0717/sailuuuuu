"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface InfiniteScrollerProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export default function InfiniteScroller({ images }: InfiniteScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Use the images passed from the parent component
  const placeholderImages = [...images];

  // Duplicate the images to create the infinite scrolling effect
  const allImages = [...placeholderImages, ...placeholderImages];

  return (
    <div className="relative w-full overflow-hidden py-8 my-12">
      <h2 className="text-2xl font-semibold text-pink-400 mb-6 text-center">Our Beautiful Moments</h2>

      {/* Gradient overlays for fade effect on sides */}
      <div className="absolute top-0 left-0 w-1/6 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/6 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

      <div
        ref={scrollerRef}
        className="flex animate-scroll gap-6 w-max px-4"
      >
        {allImages.map((image, index) => (
          <div
            key={index}
            className="w-72 h-72 flex-shrink-0 rounded-lg overflow-hidden scroller-image-container"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={300}
              height={300}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
