/** @type {import('next').NextConfig} */
export default {
  images: {
    // Serve image sources directly so Vercel's exhausted transformation quota
    // cannot make new images fail. Keep Next/Image sizing and lazy loading.
    // All images are pre-sized WebP files in /public, so nothing is lost.
    unoptimized: true,
  },
  // Old hash-less URLs from the single-page site.
  async redirects() {
    return [{ source: '/index.html', destination: '/', permanent: true }];
  },
};
