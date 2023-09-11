import "../globals.css";
import React, { Suspense } from "react";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

// Import Components
import {
  TopBar,
  BottomBar,
  LeftSidebar,
  RightSidebar
} from "@/components/shared";

import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Meta Data
export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: 'HubThreads',
  title: 'HubThreadApp',
  bookmarks: "ThreadApp",
  description: 'CommunityApp is the best community to share your post',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [
    { name: 'Bao Nguyen', url: 'https://nextjs.org', },
  ],
  creator: 'CodeNode',
  publisher: 'Bao Nguyen',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    follow: true,
    index: true,
  },
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
        <body className={inter.className}>
          <TopBar />

          <main className="flex flex-row">
              <LeftSidebar />

              <section className="main-container">
                <Suspense>
                  <div className="w-full max-w-4xl">
                    {children}
                  </div>
                </Suspense>
              </section>

              <Toaster />
              {/* @ts-ignore */}
              <RightSidebar />
          </main>

          <BottomBar/>
        </body>
      </html>
    </ClerkProvider>
  );
};
