import type { Metadata } from "next";
import SqueezeContent from "@/components/SqueezeContent";

export const metadata: Metadata = {
  title: "The Shadow Work Audit + Call",
  description:
    "Personalized Strategic Roadmap plus a 30-minute walkthrough call with Hayden. The diagnostic and the conversation, together.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "The Shadow Work Audit + Call — Bridge AI Solutions",
    description:
      "Personalized roadmap PDF + a 30-minute call within five business days. $97.",
    url: "https://aibridgesolutions.com/shadow-audit-97",
  },
};

export default function ShadowAudit97Page() {
  return <SqueezeContent tier="audit_97" variant="b" />;
}
