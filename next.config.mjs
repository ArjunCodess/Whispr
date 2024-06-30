/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
          remotePatterns: [
               {
                    hostname: 'res.cloudinary.com',
               },
               {
                    hostname: 'img.clerk.com',
               },
          ],
     },
};

export default nextConfig;