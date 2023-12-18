/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "storage.googleapis.com",
      "lh3.googleusercontent.com",
      "dominionlending.ca",
    ],
  },
};

module.exports = nextConfig;
