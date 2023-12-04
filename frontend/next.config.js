/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backendee.onrender.com',
        port: '5000',
      }
    ]
  }
}

module.exports = nextConfig
