/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["images.unsplash.com", "static.ghost.org", "www.gravatar.com", "localhost"]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
