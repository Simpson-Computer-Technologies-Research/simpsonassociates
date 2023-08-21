/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  generateRobotsTxt: true,
  images: {
    domains: ["storage.googleapis.com"],
  },
};

module.exports = nextConfig;
