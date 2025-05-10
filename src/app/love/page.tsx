"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import LoveEntryOverlay from "../../components/LoveEntryOverlay";
import AudioControls from "../../components/AudioControls";
import ShootingStars from "../../components/ShootingStars";
import "../../styles/love-entry.css";

export default function Love() {
  // State to store uploaded photos
  const [uploadedPhotos, setUploadedPhotos] = useState<Array<{ id: number, src: string, alt: string, caption: string }>>([]);
  const [showEntry, setShowEntry] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // This effect runs only on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load saved photos from localStorage when component mounts
  useEffect(() => {
    const savedPhotos = localStorage.getItem('uploadedPhotos');
    if (savedPhotos) {
      setUploadedPhotos(JSON.parse(savedPhotos));
    }

    // Initialize audio
    if (!audioRef.current) {
      audioRef.current = new Audio("/love-song.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle entering the love world
  const handleEnterLoveWorld = () => {
    // Start playing audio
    if (audioRef.current) {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setAudioPlaying(true);
          })
          .catch(error => {
            console.log('Autoplay prevented. User interaction required:', error);
          });
      }
    }

    // Show content with animation
    setContentVisible(true);

    // Hide entry overlay after animation completes
    setTimeout(() => {
      setShowEntry(false);
    }, 1500);
  };

  // Toggle audio play/pause
  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  // Real photos for the gallery
  const photos = [
    {
      id: 1,
      src: "/WhatsApp Image 2025-05-03 at 3.12.54 PM.jpeg",
      alt: "Our special moment 1",
      caption: "Together Forever"
    },
    {
      id: 2,
      src: "/sk1.jpeg",
      alt: "Our special moment 2",
      caption: "My World"
    },
    {
      id: 3,
      src: "/sk19.jpg",
      alt: "Our special moment 3",
      caption: "Beautiful Memories"
    },
    {
      id: 4,
      src: "/WhatsApp Image 2025-05-03 at 1.17.09 PM.jpeg",
      alt: "Our special moment 4",
      caption: "Love You"
    },
    {
      id: 5,
      src: "/sk11.jpeg",
      alt: "Our special moment 5",
      caption: "Precious Moments"
    },
    {
      id: 6,
      src: "/sk12.jpeg",
      alt: "Our special moment 6",
      caption: "Forever Yours"
    },
    {
      id: 7,
      src: "/sk13.jpeg",
      alt: "Our special moment 7",
      caption: "Our Journey"
    },
    {
      id: 8,
      src: "/sk14.jpeg",
      alt: "Our special moment 8",
      caption: "Endless Love"
    },
    {
      id: 9,
      src: "/sk15.jpeg",
      alt: "Our special moment 9",
      caption: "Perfect Together"
    },
    {
      id: 10,
      src: "/sk16.jpeg",
      alt: "Our special moment 10",
      caption: "Soulmates"
    },
    {
      id: 11,
      src: "/sk17.jpeg",
      alt: "Our special moment 11",
      caption: "My Everything"
    },
    {
      id: 12,
      src: "/sk18.jpg",
      alt: "Our special moment 11",
      caption: "My world"
    }

  ];

  return (
    <div className="flex flex-col items-center relative min-h-screen py-10">
      {/* Add the ShootingStars component */}
      <ShootingStars count={5} />

      <div className="text-center mb-12">
        <h1 className="cosmic-title" data-text="Our Love Story">Our Love Story</h1>
        <p className="cosmic-subtitle">A journey of two hearts becoming one</p>
      </div>

      {/* Main content container */}
      <div className="story-container-wrapper relative">
        {/* Audio Controls - only render on client */}
        {isClient && !showEntry && (
          <AudioControls
            audioRef={audioRef}
            isPlaying={audioPlaying}
            onPlayPause={toggleAudio}
          />
        )}

        {/* Our Story section - only this will be blurred */}
        <div className="bg-black p-10 rounded-2xl shadow-2xl our-story-container max-w-5xl w-full mx-auto mb-16 relative">
          {/* Story Entry Overlay - positioned absolutely over the story paragraph container only */}
          {isClient && showEntry && (
            <div className="absolute inset-0 z-50 rounded-2xl overflow-hidden">
              <LoveEntryOverlay onEnter={handleEnterLoveWorld} />
            </div>
          )}

          {/* Story content that will be blurred - only apply blur classes on client */}
          <div className={`transition-all duration-1500 ${isClient ? (contentVisible ? 'content-visible' : 'content-blur') : ''}`}>
            {/* Floating hearts animation - only render on client side */}
            {isClient && (
              <div className="floating-hearts">
                {Array.from({ length: 20 }).map((_, index) => (
                  <div
                    key={index}
                    className="floating-heart"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDuration: `${15 + Math.random() * 10}s`,
                      animationDelay: `${Math.random() * 5}s`,
                      fontSize: `${1 + Math.random() * 1.5}rem`,
                      opacity: 0.1 + Math.random() * 0.3
                    }}
                  >
                    ❤
                  </div>
                ))}
              </div>
            )}

            <h2 className="text-3xl font-semibold text-pink-300 mb-6 text-center relative">
              Our Story
              <span className="block h-1 w-24 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-2"></span>
            </h2>

            <p className="text-pink-100 mb-6 story-quote">
              <em>"Some love stories begin with a spark... ours began with a sparkle in her eyes."</em>
            </p>

            <p className="text-pink-100 mb-6 leading-relaxed">
              From the moment I saw her in sixth standard, dressed in black on her birthday, I knew something changed inside me.
              I didn't know what love truly was back then — but when I looked into Lakshmi Sahithi's eyes, I saw the beginning of everything I'd ever want.
            </p>

            <div className="w-full flex justify-center my-6">
              <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            </div>

            <p className="text-pink-100 mb-6 leading-relaxed">
              She wasn't just beautiful; she was mesmerizing. The kind of beauty that didn't shout, but whispered softly — straight to the soul.
              Every glance from her felt like poetry written in silence. And from that day, even as the seasons passed, I couldn't look at another
              person the same way. Because no matter where I went, it was always <em className="text-pink-200">her</em>.
            </p>

            <div className="w-full flex justify-center my-6">
              <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            </div>

            <p className="text-pink-100 mb-6 leading-relaxed">
              Our story has never been a fairytale. We're not perfect — we're two different worlds, two different universes colliding.
              We've had our share of storms, misunderstandings, and moments that tested everything we believed in. There were times I hurt her —
              unintentionally, and regrettably — yet she never gave up on me. She never raised her voice when I was wrong. Instead, she became my calm when I was chaos.
            </p>

            <p className="text-pink-100 mb-6 story-quote">
              <em>"In a world full of noise, she was the quiet that made sense."</em>
            </p>

            <p className="text-pink-100 mb-6 leading-relaxed">
              Sahithi is more than love to me. She is my strength, my anchor, my constant. She stood beside me not just when it was easy,
              but when it was toughest — never with conditions, never with blame. Her love never gossiped behind my back. It only held me tighter when I was falling apart.
            </p>

            <div className="w-full flex justify-center my-6">
              <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            </div>

            <p className="text-pink-100 mb-6 leading-relaxed">
              We may be walking through a road filled with hurdles. But I don't see them as obstacles anymore — I see them as chapters in our story.
              Because love isn't about how easy the journey is. It's about <em className="text-pink-200">choosing</em> each other, again and again, even when the sky isn't always blue.
            </p>

            <p className="text-pink-100 mb-6 story-quote">
              <em>"I come from a world of logic and reason, but for her... I'd rewrite all my rules."</em>
            </p>

            <p className="text-pink-100 mb-6 leading-relaxed">
              Yes, we are different. But I would change my world just to fit into hers. Because when it comes to her, there's nothing I wouldn't do.
            </p>

            <div className="w-full flex justify-center my-6">
              <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            </div>

            <p className="text-pink-100 mb-6 leading-relaxed">
              This space, this digital sanctuary, is our storybook — a tribute to a love that defies odds, a bond that grows even when life tries to pull it apart.
            </p>

            <p className="text-pink-100 mb-6 leading-relaxed">
              And if anyone ever asks what love looks like...
            </p>

            <p className="text-pink-100 mb-6 story-quote">
              <em>"It looks like the way she cared when no one else did.<br />
                It sounds like her silence that never judged me.<br />
                It feels like home — and home, for me, has always been her."</em>
            </p>

            <div className="w-full flex justify-center my-6">
              <div className="h-px w-1/2 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            </div>

            <p className="text-pink-100 mb-4 text-center">
              Here's to our journey — raw, real, and unforgettable.<br />
              And to Lakshmi Sahithi, the girl who stole my heart in sixth grade and never gave it back.<br />
              I'm so glad it's <em className="text-pink-200 font-semibold">you</em>.
            </p>
          </div>
        </div>

        {/* Photo Gallery section - this will always be visible and centered */}
        <div className="bg-black p-8 rounded-lg shadow-lg max-w-6xl w-full mx-auto mb-12 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-pink-500/20 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-radial from-purple-500/20 to-transparent"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-semibold text-pink-300 mb-4 text-center">
              Our Photo Gallery
              <span className="block h-1 w-32 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-2"></span>
            </h2>

            <p className="text-pink-100 mb-8 text-center max-w-2xl mx-auto">
              Memories captured in time, moments we'll cherish forever. Each photo tells a story of our journey together,
              a beautiful chapter in our love story.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Display original photos */}
              {photos.map((photo) => (
                <div key={`original-${photo.id}`} className="photo-container group">
                  <div className="relative h-64 w-full overflow-hidden rounded-lg">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-lg transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                      <p className="text-white p-4 font-medium text-center w-full text-shadow">{photo.caption}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Display uploaded photos */}
              {uploadedPhotos.map((photo) => (
                <div key={`uploaded-${photo.id}`} className="photo-container group">
                  <div className="relative h-64 w-full overflow-hidden rounded-lg">
                    {/* For uploaded photos, we use img tag instead of Image component since they're data URLs */}
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between">
                      <button
                        className="remove-photo-btn"
                        onClick={() => {
                          // Ask for confirmation before deleting
                          if (confirm("Are you sure you want to remove this photo from our gallery?")) {
                            // Filter out the photo to remove
                            const updatedPhotos = uploadedPhotos.filter(p => p.id !== photo.id);

                            // Update state
                            setUploadedPhotos(updatedPhotos);

                            // Update localStorage
                            localStorage.setItem('uploadedPhotos', JSON.stringify(updatedPhotos));

                            // Show confirmation
                            alert("Photo removed successfully.");
                          }
                        }}
                        title="Delete this photo"
                      >
                        ✕
                      </button>
                      <p className="text-white p-4 font-medium text-center w-full text-shadow">{photo.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center relative">
            <div className="add-photo-container mx-auto max-w-xl relative z-10 p-8 rounded-2xl">
              {/* Decorative background elements */}
              <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
              </div>

              <h3 className="text-2xl font-semibold text-pink-300 mb-4 relative">
                Add Your Special Moments
                <span className="block h-0.5 w-24 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-2"></span>
              </h3>

              <p className="text-pink-100 mb-6 leading-relaxed">
                My darling Sahithi, I'd love to see the moments that are special to you.
                Add your favorite photos to our gallery and let's build our story together.
              </p>

              <div className="relative mb-8 mt-8">
                <label htmlFor="photo-upload" className="upload-photo-button group">
                  <span className="heart-icon group-hover:animate-ping">❤️</span>
                  <span className="relative z-10">Share Your Memories</span>
                  <span className="heart-icon group-hover:animate-ping">❤️</span>

                  {/* Animated glow effect */}
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 blur-md -z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></span>
                </label>

                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Create a FileReader to read the file as a data URL
                      const reader = new FileReader();

                      reader.onload = (event) => {
                        if (event.target?.result) {
                          // Create a new photo object
                          const newPhoto = {
                            id: Date.now(), // Use timestamp as unique ID
                            src: event.target.result as string,
                            alt: "Your Special Moment",
                            caption: file.name.split('.')[0] // Use filename without extension as caption
                          };

                          // Update state with the new photo
                          const updatedPhotos = [...uploadedPhotos, newPhoto];
                          setUploadedPhotos(updatedPhotos);

                          // Save to localStorage
                          localStorage.setItem('uploadedPhotos', JSON.stringify(updatedPhotos));

                          // Show a sweet confirmation message
                          alert(`Thank you for sharing "${file.name}"! Your special moment has been added to our collection. ❤️`);
                        }
                      };

                      // Read the file as a data URL (base64 encoded string)
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              <p className="text-pink-200 mt-6 text-sm italic relative">
                "Every photo you share becomes another beautiful chapter in our love story."
              </p>

              {/* Decorative hearts */}
              <div className="absolute -top-4 -left-4 text-pink-500/30 text-3xl">❤</div>
              <div className="absolute -bottom-4 -right-4 text-pink-500/30 text-3xl">❤</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12 mb-8">
          <Link
            href="/"
            className="text-pink-300 hover:text-pink-200 flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-900/30 to-purple-900/30 hover:from-pink-800/40 hover:to-purple-800/40 transition-all duration-300 border border-pink-500/30 hover:border-pink-400/50 shadow-lg hover:shadow-pink-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
