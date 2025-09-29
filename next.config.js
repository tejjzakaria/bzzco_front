/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bzzcobucket.s3.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
