// const database = require('./src/lib/Backend/database/Database.js');

import * as database from './src/lib/Backend/database/Database.js';
import * as session from './src/lib/Backend/session/SessionStore.js';

global.sessions = session.sessions;
global.sessionTimeouts = session.sessionTimeouts;
database.connect()

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'food-cms.grab.com',
                port:'',
                pathname: '/**',
            }
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;

// module.exports = nextConfig;
