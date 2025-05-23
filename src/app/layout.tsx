import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/ui/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast"; // ✅ Import Toaster

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "R7 e-commerce",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="min-h-screen">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <div className="sticky top-0 z-50">
            <Navbar />
          </div>
          <Toaster position="top-right" />
          <main className="flex-grow w-full mx-auto text-2xl">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
