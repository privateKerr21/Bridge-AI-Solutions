import type { Metadata } from "next";
import StartForm from "./StartForm";

export const metadata: Metadata = {
  title: "Start your Shadow Work Audit",
  description: "Enter your email to begin your free AI roadmap.",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{
    variant?: string;
    utm_source?: string;
    utm_campaign?: string;
    utm_content?: string;
  }>;
}

export default async function StartPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const variant = params.variant === "b" ? "b" : "a";

  return (
    <main className="squeeze-page">
      <div className="squeeze-container">
        <p className="squeeze-eyebrow">// Step 1 of 2</p>
        <h1 className="squeeze-h1">Where should we send your roadmap?</h1>
        <p className="squeeze-sub">
          One email gets you into the audit. Your roadmap is generated the
          moment you finish — typically five to seven minutes.
        </p>
        <StartForm
          variant={variant}
          utmSource={params.utm_source}
          utmCampaign={params.utm_campaign}
          utmContent={params.utm_content}
        />
      </div>
    </main>
  );
}
