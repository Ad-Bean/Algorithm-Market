/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["source.unsplash.com", "avatars.githubusercontent.com"],
    loader: "akamai",
    path: "",
  },
};

module.exports = nextConfig;
