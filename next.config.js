/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ["source.unsplash.com"],
    loader: "akamai",
    path: "",
  },
};

module.exports = nextConfig;
