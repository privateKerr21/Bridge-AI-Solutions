import type { Metadata } from "next";
import { Space_Grotesk, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bridge AI Solutions",
  url: "https://aibridgedsolutions.com",
  logo: "https://aibridgedsolutions.com/brand/logos/bridge_ai_logo4.png",
  description:
    "Custom AI-powered software consultancy for small B2B service businesses. We build and hand off real solutions — you own the code.",
  founder: {
    "@type": "Person",
    name: "Hayden Kerr",
    sameAs: "https://www.linkedin.com/in/haydenkerr-bridged",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "h.kerr@aibridgedsolutions.com",
    contactType: "sales",
  },
  sameAs: ["https://www.linkedin.com/in/haydenkerr-bridged"],
  areaServed: "US",
  knowsAbout: [
    "AI software development",
    "business process automation",
    "custom software for small businesses",
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Bridge AI Solutions — Custom AI Software for Small B2B Businesses",
    template: "%s — Bridge AI Solutions",
  },
  description:
    "Bridge AI Solutions builds custom AI-powered tools and automations for small B2B service businesses. We identify your biggest operational bottleneck and build a real solution you own.",
  metadataBase: new URL("https://aibridgedsolutions.com"),
  openGraph: {
    siteName: "Bridge AI Solutions",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body>
        {/* JSON-LD: static hardcoded object, no user input — dangerouslySetInnerHTML is safe here */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
