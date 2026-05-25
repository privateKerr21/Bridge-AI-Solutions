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
      "Your personalized Strategic Roadmap. $1.",
    url: "https://aibridgedsolutions.com/shadow-audit-1",
  },
};

export default function ShadowAudit1Page() {
  return <SqueezeContent tier="audit_paid" variant="b" />;
}
