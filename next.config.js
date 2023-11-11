/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => [
    {
      source: "/api/:path*",
      // destination: "http://localhost:8000/api/:path*", // For development
      destination: "https://freecodez-api.onrender.com/api/:path*", // For production
    },
  ],
};

module.exports = nextConfig;
