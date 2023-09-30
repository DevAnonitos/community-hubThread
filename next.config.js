/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ["mongoose"],
        webVitalsAttribution: ['CLS', 'LCP'],
        // incrementalCacheHandlerPath: require.resolve('./cache-handler.js'),
        optimizePackageImports: [
            '@liveblocks/react', 
            '@uploadthing/react', 
            'react-hook-form',
            'uploadthing',
            'mongoose',
        ],
        mdxRs: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
            protocol: "https",
            hostname: "img.clerk.com",
            },
            {
            protocol: "https",
            hostname: "images.clerk.dev",
            },
            {
                protocol: "https",
                hostname: "uploadthing.com",
            },
            {
                protocol: "https",
                hostname: "placehold.co",
            },
        ],
    },
    pageExtensions: [
        'mdx', 'md', 'jsx', 'js', 'tsx', 'ts',
    ],
    productionBrowserSourceMaps: true,
    trailingSlash: true,
    onDemandEntries: {
        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 25 * 1000,
        // number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 2,
    },
};

const withMDX = require('@next/mdx')()

module.exports = withMDX(nextConfig)
