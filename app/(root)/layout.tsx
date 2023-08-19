import "../globals.css";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "react-toastify/dist/ReactToastify.css";
// Import Components
import {
  TopBar,
  BottomBar,
  LeftSidebar,
  RightSidebar
} from "@/components/shared";
const inter = Inter({ subsets: ['latin'] })

// Meta Data
export const metadata: Metadata = {
  title: 'HubThreadApp',
  description: 'CommunityApp',
}

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
                <div className="w-full max-w-4xl">
                  {children}
                </div>
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
