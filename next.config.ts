
import type {NextConfig} from 'next';
            
const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    qualities: [100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
          protocol: 'https',
          hostname: 'i.imgur.com',
          port: '',
          pathname: '/**',
      },
      {
          protocol: 'https',
          hostname: 'i.cdn.newsbytesapp.com',
          port: '',
          pathname: '/**',
      },
      {
          protocol: 'https',
          hostname: 'images.travelandleisureasia.com',
          port: '',
          pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
