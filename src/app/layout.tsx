import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico, Dancing_Script, Noto_Sans_Devanagari, Noto_Sans_Telugu } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import "@/styles/space-text.css";
import "@/styles/smooth-transitions.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  weight: "400",
  variable: "--font-pacifico",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  weight: ["400", "500", "700"],
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
});

const notoSansTelugu = Noto_Sans_Telugu({
  weight: ["400", "500", "700"],
  variable: "--font-noto-telugu",
  subsets: ["telugu"],
});

export const metadata: Metadata = {
  title: "SAILUUUUU - Our World",
  description: "A special place just for us",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} ${dancingScript.variable} ${notoSansDevanagari.variable} ${notoSansTelugu.variable} antialiased relative animate-gpu`}
      >
        {/* Global background heart image */}
        <div className="fixed inset-0 z-[-1] opacity-10 pointer-events-none">
          <Image
            src="/WhatsApp Image 2025-05-03 at 1.17.09 PM.jpeg"
            alt="Love You Heart Background"
            fill
            style={{ objectFit: 'cover' }}
            quality={85} /* Reduced quality for better performance while maintaining good appearance */
            priority
            loading="eager"
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+Pz9nz9nPwn8Qvgz4o8X6xqHiO11jw98QNZ8Lx2+l3lnHp50q28P+G9Rhla3uLG5nkuHutRvHaSSdwjGNFRFCkn6Mw/8ABPf4UzRJKvjj4iKsiK6hvEWnEgMoYA/8S3oQDX9XdFfxFnfHnFWZ5xmWZYbG4OjhcbjcXiqVCODpSjTpV69StCEXKnJtRjJJNtvTVn+h+S+FnA+W5JlOV4vA46tXxOBwWFw1WvLG1YyqVaFClTqTkoVIpOUottpJXeyCiiiv/9k="
          />
        </div>
        <Navbar />
        <main className="container mx-auto p-4 animate-gpu">
          {children}
        </main>
        <footer className="bg-black p-4 text-center text-pink-400 mt-8">
          <p>Made with ❤️ for us</p>
        </footer>
      </body>
    </html>
  );
}
