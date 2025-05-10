"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRef, memo } from 'react';
import '../styles/starry-navbar.css';

// Memoize the navbar links to prevent unnecessary re-renders
const NavLinks = memo(() => {
  return (
    <div className="flex space-x-5 items-center">
      <Link href="/" className="nav-link">
        Home
      </Link>
      <Link href="/career" className="nav-link">
        Career Goals
      </Link>
      <Link href="/love" className="nav-link">
        Our Love
      </Link>
    </div>
  );
});

NavLinks.displayName = 'NavLinks';

// Memoize the logo component to prevent unnecessary re-renders
const Logo = memo(() => {
  return (
    <div className="mb-2 md:mb-0 flex items-center">
      <Link href="/">
        <div className="w-[70px] h-[70px] overflow-hidden relative rounded-full border-2 border-pink-600 flex items-center justify-center bg-transparent">
          <Image
            src="/love22.jpg"
            alt="SAIL Logo"
            width={105}
            height={105}
            className="object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            priority
          />
        </div>
      </Link>
      <span className="ml-3 text-1xl font-bold text-pink-200 brand-text romantic-font">SAI MY WORLD</span>
    </div>
  );
});

Logo.displayName = 'Logo';

export default function Navbar() {
  const navbarRef = useRef<HTMLDivElement>(null);

  // We're keeping the ref for future use if needed, but removing the unused state
  // since we're not currently using the StarryBackground component

  return (
    <nav className="py-2 px-4 shadow-md relative z-10 starry-navbar" ref={navbarRef}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center relative z-10">
        <Logo />
        <NavLinks />
      </div>
    </nav>
  );
}
