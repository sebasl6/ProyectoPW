/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol : 'https',
                hostname : 'www.oracle.com',
                port: '',
                pathname : '/**'
            }
        ]
    }
}

module.exports = nextConfig
