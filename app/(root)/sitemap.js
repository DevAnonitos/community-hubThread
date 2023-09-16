export default function sitemap() {
    return [
        {
            url: 'https://community-hub-thread.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://community-hub-thread.vercel.app/activity',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://community-hub-thread.vercel.app/create-thread',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: 'https://community-hub-thread.vercel.app/search',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.4,
        },
    ]
};