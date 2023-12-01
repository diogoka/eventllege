/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '3001',
        pathname: '/img/**',
      }
    ]
  }
}

module.exports = nextConfig
