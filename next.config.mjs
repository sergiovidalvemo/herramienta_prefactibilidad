/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configuración para Docker
  output: 'standalone',
  // Optimización para producción
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
}

export default nextConfig
