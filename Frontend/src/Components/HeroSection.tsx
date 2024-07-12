"use client";

import React from "react";
import videoBG from "../../public/bg/videoBG.mp4";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        src={videoBG}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-50">
        <div className="hero-content text-center text-white">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Welcome to our e-commerce project, where we&apos;ve merged the
              power of Go Fiber for the backend with React and Next.js for the
              frontend. Explore our site to discover a curated selection of
              products and enjoy hassle-free shopping at your fingertips!
            </p>
            <button
              className="btn btn-primary"
              onClick={() => router.push("/website/home")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
