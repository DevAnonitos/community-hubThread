import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { dark } from "@clerk/themes";

import { TopBar, Providers } from "@/components/shared";

// Styles
import "../globals.css";
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: 'Next.js AI Chatbot',
        template: `%s - Next.js AI Chatbot`
    },
    description: 'An AI-powered chatbot template built with Next.js and Vercel.',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' }
    ],
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png'
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode,
}) {

    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
            }}
        >
            <html lang="en">
                <body
                    className={`${inter.className}
                        bg-dark-1`
                    }
                >
                    <Providers attribute="class" defaultTheme="system" enableSystem> 
                        <TopBar />
                        {children}
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    );
};
