import React, { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { dark } from "@clerk/themes"

import { Toaster } from "@/components/ui/toaster";

// Styles
import "../globals.css";
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    applicationName: 'HubThreads',
    title: 'AuthHubThread',
    description: 'CommunityApp',
    robots: {
        follow: true,
        index: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
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
                    <Suspense>
                        {children}
                        <Toaster />
                    </Suspense>
                </body>
            </html>
        </ClerkProvider>
    );
};
