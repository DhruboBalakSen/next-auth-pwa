// app/layout.tsx
import GlassmorphicHeader from "@/components/Header";
import type { Metadata } from "next";
import "../globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "ThrottleTribe",
  description: "A biker community platform",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ThrottleTribe",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="md:hidden">
        <GlassmorphicHeader />
      </div>
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
        {/* Left section with image and overlay */}
        <div className="relative flex-1 hidden md:flex items-center justify-center bg-orange-500 rounded-r-3xl shadow-slate-600 shadow-2xl">
          <div className="absolute inset-0 bg-orange-500 opacity-80 rounded-r-3xl"></div>
          <Image
            src="/auth.jpg"
            alt="ThrottleTribe Welcome"
            fill={true}
            className="mix-blend-darken object-cover rounded-r-3xl"
          />
          <h1 className="relative z-10 text-5xl font-bold text-amber-100 text-center">
            Welcome to ThrottleTribe
          </h1>
        </div>

        {/* Right section with login form */}
        <div className="flex flex-1 items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
