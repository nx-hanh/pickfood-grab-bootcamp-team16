/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port:'',
                pathname: '/**',
            }
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
