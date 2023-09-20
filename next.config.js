/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ["mongoose"],
        webVitalsAttribution: ['CLS', 'LCP'],
        incrementalCacheHandlerPath: require.resolve("./cache-handler.js"),
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
    distDir: 'build',
};

module.exports = nextConfig;
