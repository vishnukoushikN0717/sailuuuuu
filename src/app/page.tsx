"use client";
import Image from "next/image";
import InfiniteScroller from "@/components/InfiniteScroller";
import ShootingStars from "@/components/ShootingStars";



import { useState, useEffect } from 'react';

export default function Home() {
  const [imageIndex, setImageIndex] = useState(0);
  const [poemIndex, setPoemIndex] = useState(0);

  const carouselImages = [
    "/WhatsApp Image 2025-05-03 at 3.12.54 PM.jpeg",
    "/sk1.jpeg",
    "/sk2.jpeg"
  ];

  const poems = [
    {
      language: "English",
      title: "SAILUUUU Love",
      content: [
        "In a universe of endless fights,",
        "You shine the brightest by far.",
        "Your smile, a constellation of joy,",
        "Your eyes, galaxies I could forever explore.",
        "",
        "Like cosmic bodies drawn together,",
        "Our souls were destined to find each other.",
        "Through space and time, across the void,",
        "My heart to yours, eternally deployed.",
        "",
        "In your embrace, I've found my home,",
        "A sanctuary where love has grown.",
        "With you, my darling, my beautiful Sai,",
        "Our love will flourish until stars die."
      ]
    },
    {
      language: "Hindi",
      title: "अनंत प्रेम",
      content: [
        "तारों से भरे इस ब्रह्मांड में,",
        "तुम सबसे अधिक चमकती हो।",
        "तुम्हारी मुस्कान, खुशी का एक तारामंडल,",
        "तुम्हारी आँखें, आकाशगंगाएँ जिन्हें मैं हमेशा खोज सकता हूँ।",
        "",
        "जैसे ब्रह्मांडीय पिंड एक-दूसरे की ओर खिंचते हैं,",
        "हमारी आत्माएँ एक-दूसरे को पाने के लिए नियत थीं।",
        "अंतरिक्ष और समय के पार, शून्य के पार,",
        "मेरा दिल तुम्हारे लिए, हमेशा के लिए समर्पित।",
        "",
        "तुम्हारे आलिंगन में, मैंने अपना घर पाया है,",
        "एक ऐसा आश्रय जहाँ प्यार बढ़ा है।",
        "तुम्हारे साथ, मेरी प्यारी, मेरी सुंदर साई,",
        "हमारा प्यार तब तक फलेगा-फूलेगा जब तक तारे नहीं मरते।"
      ]
    },
    {
      language: "Telugu",
      title: "నువ్వే నా ప్రపంచం",
      content: [
        "నిన్ను చూసిన క్షణం నుండి,",
        "నా లోకం మారిపోయింది.",
        "నీ మాటలు, నీ నవ్వు,",
        "నా రోజు మొత్తాన్నీ మార్చేశాయి.",
        "",
        "నీవుంటే చాలు అనిపిస్తోందే,",
        "ప్రతి క్షణం నీతో మధురమే.",
        "బయట ప్రపంచం ఎలా ఉన్నా,",
        "నీతో ఉంటే ప్రశాంతంగా ఉంటుంది మనసు.",
        "",
        "నన్ను అర్థం చేసుకున్న ఏకైక వ్యక్తి నువ్వే,",
        "నీ ప్రేమలోనే నాకు అమ్మ కనిపిస్తుంది.",
        "",
        "నిన్ను ఎంతగా ప్రేమిస్తున్నానో,",
        "ఆ విషయం మాటల్లో పట్టలేను.",
        "కానీ ప్రతి రోజు, ప్రతి క్షణం,",
        "నీకు అది చూపిస్తూనే ఉంటాను."
      ]
    }
  ];

  // Use useEffect to set up an interval for automatic poem cycling
  useEffect(() => {
    // Function to change the poem with fade effect
    const changePoem = () => {
      const poemContainer = document.querySelector('.poem-text');
      if (poemContainer) {
        poemContainer.classList.add('poem-fade-out');

        // After the fade-out animation completes, change the poem
        setTimeout(() => {
          setPoemIndex((prevIndex) => (prevIndex + 1) % poems.length);

          // After the poem changes, start the fade-in animation
          setTimeout(() => {
            poemContainer.classList.remove('poem-fade-out');
            poemContainer.classList.add('poem-fade-in');
          }, 50);
        }, 1000);
      } else {
        // Fallback if element not found
        setPoemIndex((prevIndex) => (prevIndex + 1) % poems.length);
      }
    };

    // Set up an interval to change the poem every 20 seconds
    const poemIntervalId = setInterval(changePoem, 20000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(poemIntervalId);
  }, []);

  // Use useEffect to set up an interval for automatic image cycling
  useEffect(() => {
    // Function to change the image with smooth dissolve/fade effect
    const changeImage = () => {
      const imageElement = document.querySelector('.couple-image');
      if (imageElement) {
        // Add the fade-out animation
        imageElement.classList.remove('image-fade-in');
        imageElement.classList.add('image-fade-out');

        // After the fade-out animation completes, change the image
        setTimeout(() => {
          setImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);

          // After the image changes, start the fade-in animation
          setTimeout(() => {
            imageElement.classList.remove('image-fade-out');
            imageElement.classList.add('image-fade-in');
          }, 50);
        }, 1000); // This should match the fadeOut animation duration
      } else {
        // Fallback if element not found
        setImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
      }
    };

    // Set up an interval to change the image every 4 seconds
    // This gives enough time for the full fade-out and fade-in animations
    const intervalId = setInterval(changeImage, 4000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount

  // Images for the horizontal infinite scroller
  const scrollerImages = [
    { src: '/sk31.jpeg', alt: 'Our special moment' },
    { src: '/sk32.jpeg', alt: 'Our special moment' },
    { src: '/sk33.jpeg', alt: 'Our special moment' },
    { src: '/sk34.jpeg', alt: 'Our special moment' },
    { src: '/sk35.jpeg', alt: 'Our special moment' },
    { src: '/sk36.jpeg', alt: 'Our special moment' },
    { src: '/sk37.jpeg', alt: 'Our special moment' },
    { src: '/sk38.jpeg', alt: 'Our special moment' },
    { src: '/sk39.jpeg', alt: 'Our special moment' },
    { src: '/sk40.jpeg', alt: 'Our special moment' },
  ];

  return (
    <div className="flex flex-col items-center relative">
      {/* Add the ShootingStars component - realistic anime style shooting stars */}
      <ShootingStars count={5} />

      <div className="text-center mb-12">
        <h1 className="cosmic-title" data-text="Welcome to Our World">Welcome to Our World</h1>
        <p className="cosmic-subtitle">A special place just for us to share our journey together</p>
      </div>

      <div className="heart-container">
        <div className="image-carousel-container">
          <div className="image-container">
            <div className="image-wrapper">
              <Image
                src={carouselImages[imageIndex]}
                alt={`Love You Heart ${imageIndex + 1}`}
                width={350}
                height={350}
                className="rounded-lg shadow-lg couple-image image-fade-in"
                priority
              />
            </div>
          </div>
        </div>
        <div className="heart-text">
          <div className="love-you-text">Love You</div>
          <div className="my-world-text">
            my world
            <span className="world-icon-container">
              <svg className="world-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="globe-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff69b4" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#da70d6" />
                  </linearGradient>
                  <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feFlood floodColor="#ffffff" result="glow-color" />
                    <feComposite in="glow-color" in2="blur" operator="in" result="glow-blur" />
                    <feComposite in="SourceGraphic" in2="glow-blur" operator="over" />
                  </filter>
                </defs>
                <circle cx="12" cy="12" r="10" fill="url(#globe-gradient)" filter="url(#glow)" />
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 17.93a8 8 0 0 1-6.95-6.93h2.92a14.5 14.5 0 0 0 1.03 4.5 8.5 8.5 0 0 0 3 2.43zm0-2.93c-.8-1.3-1.39-3.09-1.62-5h3.24c-.23 1.91-.82 3.7-1.62 5zm0-7c.8-1.3 1.39-3.09 1.62-5h-3.24c.23 1.91.82 3.7 1.62 5zm1 9.93a8.5 8.5 0 0 0 3-2.43 14.5 14.5 0 0 0 1.03-4.5h2.92a8 8 0 0 1-6.95 6.93zm3-9.93h2.95a8 8 0 0 0-2.95-6.93 14.5 14.5 0 0 1 0 6.93zm-8 0h2.95a14.5 14.5 0 0 1 0-6.93 8 8 0 0 0-2.95 6.93z" fill="#ffffff" stroke="#ff69b4" strokeWidth="0.3" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="poem-container" data-language={poems[poemIndex].language}>
        <h2 className="poem-title">{poems[poemIndex].title}</h2>
        <div className="poem-text poem-fade-in">
          {poems[poemIndex].content.map((line, index) => (
            line === "" ? <br key={index} /> : <p key={index}>{line}</p>
          ))}
        </div>
      </div>

      <InfiniteScroller images={scrollerImages} />



      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <div className="bg-black border border-pink-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-pink-400 mb-3">Career Goals</h3>
          <p className="text-pink-100 mb-4">
            Explore my professional aspirations and the journey I'm on to achieve them.
          </p>
          <a href="/career" className="text-pink-400 hover:text-pink-300 font-medium">
            Learn more →
          </a>
        </div>

        <div className="bg-black border border-pink-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-pink-400 mb-3">Our Love</h3>
          <p className="text-pink-100 mb-4">
            A gallery of our special moments and memories we've created together.
          </p>
          <a href="/love" className="text-pink-400 hover:text-pink-300 font-medium">
            View our photos →
          </a>
        </div>
      </div>
    </div>
  );
}
