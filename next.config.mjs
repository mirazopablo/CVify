/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Allow local network connections for testing on mobile
  allowedDevOrigins: ["192.168.100.24"],
}

export default nextConfig
