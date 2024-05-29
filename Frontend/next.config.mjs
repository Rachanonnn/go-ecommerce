/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_URL: process.env.BACKEND_URL, // pulls from .env file
        FIREBASE_CONFIG: process.env.FIREBASE_CONFIG,
    },
};

export default nextConfig;
