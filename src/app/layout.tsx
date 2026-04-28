import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Zap, Telescope, Crown, Bookmark } from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Bazzkomik - Premium Comic Experience",
  description: "Bazzkomik - Baca komik dengan pengalaman premium, cepat, dan antarmuka interaktif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary`}>
        <ThemeProvider>
          {/* Floating Pill Navbar */}
          <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <header className="glass-pill rounded-full px-6 py-3 flex items-center justify-between w-full max-w-3xl gap-4">
              
              <Link href="/" className="flex items-center gap-2 group">
                <div className="text-primary group-hover:rotate-12 transition-transform duration-300">
                  <Zap size={22} strokeWidth={2.5} fill="currentColor" />
                </div>
                <span className="text-lg font-extrabold tracking-tight hidden sm:block">
                  Bazz<span className="text-primary">komik</span>
                </span>
              </Link>
              
              <nav className="flex items-center gap-2 sm:gap-6 font-medium text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary flex items-center gap-1.5 transition-colors">
                  <Crown size={16} />
                  <span className="hidden md:inline">Eksplor</span>
                </Link>
                <Link href="/search" className="hover:text-primary flex items-center gap-1.5 transition-colors">
                  <Telescope size={16} />
                  <span className="hidden md:inline">Cari</span>
                </Link>
                <Link href="/bookmarks" className="hover:text-primary flex items-center gap-1.5 transition-colors">
                  <Bookmark size={16} />
                  <span className="hidden md:inline">Koleksi</span>
                </Link>
              </nav>

              <div className="flex items-center">
                <ThemeToggle />
              </div>
              
            </header>
          </div>

          {/* Main Content */}
          <main className="flex-1 mt-32 pb-24">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-border py-12 mt-auto bg-card/50">
            <div className="container mx-auto px-4 text-center flex flex-col items-center">
              <div className="flex justify-center items-center gap-2 mb-4 text-muted-foreground">
                <Zap size={20} className="text-primary" fill="currentColor" />
                <span className="font-bold text-foreground tracking-tight">
                  Bazz<span className="text-primary">komik</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Platform baca komik dengan pengalaman luar biasa. Dirancang simpel, bersih, dan memanjakan mata Anda.
              </p>
              <p className="text-xs text-muted-foreground/60 mt-8 font-medium tracking-wider">
                © {new Date().getFullYear()} BAZZKOMIK.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
