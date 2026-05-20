import Link from "next/link";

const links = [
  { href: "/work", label: "Selected work" },
  { href: "/use-cases", label: "Use cases" },
  { href: "/insights", label: "Insights" },
  { href: "/pricing", label: "How we work" },
  { href: "/about", label: "About" },
  { href: "/#quiz", label: "Take the quiz" },
  { href: "https://calendly.com/h-kerr711/30min", label: "Book a discovery call" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">
              Bridge <span>AI</span>
            </div>
            <p className="footer-tagline">
              A small studio building custom AI-powered software for small B2B
              service businesses in the United States.
            </p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            {links.map(({ href, label }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-copy">
          &copy; 2026 Bridge AI Solutions
        </div>
      </div>
    </footer>
  );
}
