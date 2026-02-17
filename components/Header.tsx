"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuizStore } from "@/store/quizStore";
import { t } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const locale = useQuizStore((s) => s.locale);
  const pathname = usePathname();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const navLinkClass = (href: string) =>
    `text-[13px] tracking-wider transition-colors duration-200 hover:text-gold ${
      pathname === href ? "text-gold" : "text-text-secondary"
    }`;

  return (
    <header className="glass fixed top-0 left-0 w-full z-[9990]">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-wide text-gold transition-opacity hover:opacity-80"
        >
          Velvet Compass
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 sm:flex">
          {/* Dropdown: List */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-[13px] tracking-wider text-text-secondary transition-colors duration-200 hover:text-gold"
            >
              {t("header.list", locale)}
              <svg
                className={`h-3 w-3 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="glass absolute top-full right-0 mt-2 min-w-[160px] rounded-sm py-1">
                <Link
                  href="/community"
                  className="block px-4 py-2 text-[12px] tracking-wider text-text-secondary transition-colors hover:bg-white/[0.03] hover:text-gold"
                >
                  {t("header.community", locale)}
                </Link>
              </div>
            )}
          </div>

          <Link href="/contact" className={navLinkClass("/contact")}>
            {t("header.contact", locale)}
          </Link>

          <LanguageSwitcher />
        </nav>

        {/* Mobile: hamburger + language switcher */}
        <div className="flex items-center gap-3 sm:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center text-text-secondary transition-colors hover:text-gold"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="glass flex flex-col gap-1 border-t border-white/[0.04] px-4 py-3 sm:hidden">
          <Link href="/community" className="py-2 text-[13px] tracking-wider text-text-secondary hover:text-gold">
            {t("header.community", locale)}
          </Link>
          <Link href="/contact" className="py-2 text-[13px] tracking-wider text-text-secondary hover:text-gold">
            {t("header.contact", locale)}
          </Link>
        </nav>
      )}
    </header>
  );
}
