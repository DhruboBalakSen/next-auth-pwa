// app/layout.tsx
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ThrottleTribe",
  description: "A biker community platform",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ThrottleTribe",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* iOS Splash and Icon Setup */}
        <link rel="apple-touch-icon" href="/splashscreens/Throttletribe.png" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-startup-image"
          href="/splashscreens/Throttletribe.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
        />
        {/* These are now also set via metadata.appleWebApp, but redundant is okay for wide compatibility */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white" />
      </head>
      <body className="antialiased">
        <SessionProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </SessionProvider>
      </body>
    </html>
  );
}
