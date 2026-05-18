import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Squeeze route group — no Nav, no Footer.
// All routes inside (squeeze)/ are conversion-focused and noindex'd by default.
export default function SqueezeLayout({ children }: { children: React.ReactNode }) {
  return <div className="squeeze-shell">{children}</div>;
}
