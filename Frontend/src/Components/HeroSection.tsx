import React from "react";

const HeroSection = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Welcome to our e-commerce project, where we've merged the power of
              Go Fiber for the backend with React and Next.js for the frontend.
              Explore our site to discover a curated selection of products and
              enjoy hassle-free shopping at your fingertips!
            </p>
            <a className="btn btn-primary" href="/products">
              Get Product All
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
