"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import XPBadge from "@/components/gamification/XPBadge";
import { useTheme } from "@/components/theme/ThemeProvider";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/analysis", label: "Analyse" },
  { href: "/executive", label: "Executive" },
  { href: "/control", label: "Steuerung" },
  { href: "/simulation", label: "Simulation" },
  { href: "/glossary", label: "Glossar" },
];

export default function AEMSTopbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#031f1f]/90 border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          {/* Branding */}
          <div className="flex items-center gap-2">
            <div className="text-aems-neon font-bold text-xl tracking-wide">
              AEMS
            </div>
            <div className="hidden sm:block text-xs text-gray-400">
              Antifragiles Energiemanagement
            </div>
          </div>

          {/* Desktop Navi */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  isActive(item.href)
                    ? "text-aems-neon font-semibold"
                    : "text-gray-300 hover:text-aems-soft"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Theme + XP + Mobile-Button */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-black/20 text-xs text-gray-200 hover:bg-black/40 transition-colors"
              aria-label="Theme umschalten"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>

            {/* XP Badge (Desktop + Tablet) */}
            <div className="hidden sm:block">
              <XPBadge />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/20 text-gray-100"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Navigation öffnen"
            >
              <span className="sr-only">Menü</span>
              <div className="space-y-1">
                <span className="block h-[2px] w-4 bg-gray-100 rounded" />
                <span className="block h-[2px] w-4 bg-gray-100 rounded" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-64 bg-[#031f1f] border-l border-white/10 p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm text-gray-100">
                Navigation
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-gray-300 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm ${
                    isActive(item.href)
                      ? "text-aems-neon font-semibold"
                      : "text-gray-200 hover:text-aems-soft"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-4 border-t border-white/10">
              <div className="mb-2 text-xs text-gray-400">Lernstatus</div>
              <XPBadge />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
