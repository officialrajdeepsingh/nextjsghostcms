/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    domains: ["images.unsplash.com", "static.ghost.org"]

  },
}

module.exports = nextConfig
