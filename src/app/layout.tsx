import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { BookOpen, Search } from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Bazzkomik - Baca Komik Lengkap",
  description: "Bazzkomik adalah website baca komik terlengkap dengan fitur terbaik dan UI premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <ThemeProvider>
          {/* Navbar */}
          <header className="fixed top-0 w-full z-50 glass">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-primary text-white p-1.5 rounded-lg group-hover:scale-105 transition-transform">
                  <BookOpen size={24} strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  Bazz<span className="text-primary">komik</span>
                </span>
              </Link>
              
              <nav className="hidden md:flex gap-6 font-medium text-sm">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <Link href="/search" className="hover:text-primary transition-colors">Search</Link>
              </nav>

              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Link href="/search" className="p-2 rounded-full hover:bg-card transition-colors">
                  <Search size={20} />
                </Link>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 mt-16 pb-12">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-card border-t border-border py-8 mt-auto">
            <div className="container mx-auto px-4 text-center">
              <div className="flex justify-center items-center gap-2 mb-4">
                <BookOpen size={24} className="text-primary" />
                <span className="text-xl font-bold">
                  Bazz<span className="text-primary">komik</span>
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Tempat baca komik manga, manhwa, dan manhua bahasa Indonesia terlengkap dengan UI premium dan fitur terbaik.
              </p>
              <p className="text-xs text-gray-500 mt-6">
                © {new Date().getFullYear()} Bazzkomik. All rights reserved.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
