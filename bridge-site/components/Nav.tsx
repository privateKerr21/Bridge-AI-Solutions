"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/#quiz", label: "Take the Quiz" },
  { href: "/#process", label: "How It Works" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/insights", label: "Insights" },
  { href: "/pricing", label: "Pricing" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          Let&apos;s Talk
        </a>
      </div>
    </nav>
  );
}
