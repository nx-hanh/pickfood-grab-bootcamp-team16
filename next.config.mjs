// const database = require('./src/lib/Backend/database/Database.js');

import * as database from './src/lib/Backend/database/Database.js';

database.connect()

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

// module.exports = nextConfig;
