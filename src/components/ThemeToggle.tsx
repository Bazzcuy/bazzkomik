"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sparkles, Eclipse } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-all duration-300"
      aria-label="Toggle Theme"
      title="Ubah Tema"
    >
      {theme === "dark" ? <Sparkles size={18} /> : <Eclipse size={18} />}
    </button>
  );
}
