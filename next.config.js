/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add your custom package name here
  // This forces Next.js to process and transpile the contents (including the CSS)
  transpilePackages: ['ikoncomponents'], 
  
  // Other configuration options should remain here if you have them, 
  // like reactStrictMode, etc.
  reactStrictMode: true,
};

module.exports = nextConfig;