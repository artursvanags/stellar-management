/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
    ],
  },
};

module.exports = nextConfig;

console.log("next.config.js", JSON.stringify(module.exports, null, 2));
