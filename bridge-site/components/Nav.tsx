"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/#quiz", label: "Take the Quiz" },
  { href: "/#process", label: "How It Works" },
  { href: "/work", label: "Selected work" },
  { href: "/use-cases", label: "Use cases" },
  { href: "/insights", label: "Insights" },
  { href: "/pricing", label: "How we work" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <Link href="/" className="navbar-logo">
        <Image
          src="/brand/logos/bridge_ai_banner10.png"
          alt="Bridge AI Solutions"
          width={160}
          height={42}
          priority
        />
      </Link>

      <ul className="navbar-links">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={pathname === href ? "active" : undefined}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="navbar-cta">
        <a
          href="https://calendly.com/h-kerr711/30min"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a call
        </a>
      </div>

      <button
        className={`navbar-hamburger${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        <span />
        <span />
        <span />
      </button>

      {menuOpen && (
        <div id="mobile-menu" className="navbar-mobile-menu">
          <ul>
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className={pathname === href ? "active" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="https://calendly.com/h-kerr711/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ink navbar-mobile-cta"
          >
            Book a discovery call
          </a>
        </div>
      )}
    </nav>
  );
}
