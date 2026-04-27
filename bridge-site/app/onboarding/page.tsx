import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Build Discovery",
  description:
    "Let's find out where a custom AI-powered tool would create the most leverage in your business. Takes about 5–7 minutes.",
};

export default function OnboardingPage() {
  return (
    <>
      {/* TODO Phase 6: JSON-LD schema */}

      <div className={styles.onboardingPage}>
        <div className={styles.onboardingContainer}>
          <div className={styles.onboardingHeader}>
            <h1>Custom Build Discovery</h1>
            <p>Let&apos;s find out where a custom AI-powered tool would create the most leverage in your business.</p>
            <span className={styles.timeEstimate}>Takes about 5–7 minutes</span>
          </div>

          {/* ATLAS AI Agent */}
          <div className={styles.atlasContainer}>
            <iframe
              src="https://atlasaionboarding-10034115.chipp.ai"
              height="800"
              width="100%"
              title="ATLAS | AI Onboarding"
              allow="microphone; camera"
            />
          </div>

          {/* Alternative CTA */}
          <div className={styles.alternativeCta}>
            <h3>Have questions?</h3>
            <p>ATLAS will guide you through the discovery process, identify your biggest bottleneck, and help you schedule a call at the end.</p>
            <Link href="/#process" className="btn btn-dark">
              Learn More About How We Build &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
