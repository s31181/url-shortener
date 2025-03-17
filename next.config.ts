import type { NextConfig } from "next";
import os from "os";

const getLocalIP = (): string => {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const i of iface!) {
      if (i.family === "IPv4" && !i.internal) {
        return i.address;
      }
    }
  }
  return "localhost";
};

const localIP = getLocalIP();

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_LOCAL_IP: `http://${localIP}:3000`,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow images from any domain
      },
    ],
  },
};

export default nextConfig;
