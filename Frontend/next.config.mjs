/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_URL: process.env.BACKEND_URL, // pulls from .env file
    },
};

export default nextConfig;
