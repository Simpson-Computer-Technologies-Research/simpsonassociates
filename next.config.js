/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  generateRobotsTxt: true,
  images: {
    domains: [
      "storage.googleapis.com",
      "lh3.googleusercontent.com",
      "dominionlending.ca",
    ],
  },
};

module.exports = nextConfig;
