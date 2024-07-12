import withVideos from 'next-videos';

/** @type {import('next').NextConfig} */
const nextConfig = {
    important: true,
    basePath: "/go-ecommerce",
    assetPrefix: "/go-ecommerce",
  output: "export",  // Enables static exports
  reactStrictMode: true,
distDir: "build",
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    FIREBASE_CONFIG: process.env.FIREBASE_CONFIG,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
  },
};

export default withVideos(nextConfig);
