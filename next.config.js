/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["nodemailer"],
    // runtime: "edge",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unsplash.com',

      },
    ],
  },
};

module.exports = nextConfig;
