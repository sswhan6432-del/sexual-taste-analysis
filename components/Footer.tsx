import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-8 mt-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Velvet Compass. All rights reserved.
          </p>
          <nav className="flex items-center gap-6">
            <Link href="/about" className="text-xs text-text-muted transition-colors hover:text-gold">
              About
            </Link>
            <Link href="/privacy" className="text-xs text-text-muted transition-colors hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-xs text-text-muted transition-colors hover:text-gold">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
