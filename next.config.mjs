/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        MONGODB_URI: process.env.MONGODB_URI
    },
    
    images: {
        remotePatterns: [
            {
                protocol:"https",
                hostname:"cdn.pixabay.com",
            }, 
            {
                protocol:"https",
                hostname:"image.tmdb.org"
            }
        ]
    }
};

export default nextConfig;
