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

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Meta Data
export const metadata: Metadata = {
  applicationName: 'HubThreads',
  title: 'HubThreadApp',
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
              {/* @ts-ignore */}
              <RightSidebar />
          </main>

          <BottomBar/>
        </body>
      </html>
    </ClerkProvider>
  );
};
