import type { Metadata } from "next";
import SqueezeContent from "@/components/SqueezeContent";

export const metadata: Metadata = {
  title: "The Shadow Work Audit",
  description:
    "Ten questions. Five to seven minutes. A personalized Strategic Roadmap that names the one automation worth shipping first.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "The Shadow Work Audit — Bridge AI Solutions",
    description:
      "The diagnostic that finds your highest-leverage automation. Free.",
    url: "https://aibridgesolutions.com/shadow-audit-free",
  },
};

export default function ShadowAuditFreePage() {
  return <SqueezeContent tier="audit_free" variant="a" />;
}
