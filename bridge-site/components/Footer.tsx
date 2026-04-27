import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/#quiz", label: "Take the Quiz" },
  { href: "/#process", label: "How It Works" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/insights", label: "Insights" },
  { href: "/pricing", label: "Pricing" },
  { href: "mailto:h.kerr@aibridgedsolutions.com", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo-wrap">
          <Image
            src="/brand/logos/bridge_ai_banner10.png"
            alt="Bridge AI Solutions logo"
            width={220}
            height={58}
            className="footer-logo"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>
        <div className="footer-inner">
          <div>
            <div className="footer-brand">
              Bridge <span>AI</span>
            </div>
            <p
              style={{
                marginTop: 14,
                fontSize: "0.9rem",
                color: "var(--muted)",
                maxWidth: 320,
                lineHeight: 1.6,
              }}
            >
              Custom software and AI-powered tools for small businesses ready to
              stop patching and start building.
            </p>
          </div>
          <nav className="footer-links">
            {links.map(({ href, label }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-copy">
          &copy; 2026 Bridge AI Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
