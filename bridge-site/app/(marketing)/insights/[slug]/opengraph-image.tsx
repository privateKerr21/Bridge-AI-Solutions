import { ImageResponse } from "next/og";
import { getArticleMeta } from "@/lib/articles";

export const alt = "Bridge AI Solutions — Insights";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFraunces(): Promise<ArrayBuffer | null> {
  // Static-size 400-weight TTF from Google Fonts CSS endpoint.
  const cssUrl =
    "https://fonts.googleapis.com/css2?family=Fraunces:wght@400&display=swap";
  const css = await fetch(cssUrl, {
    headers: { "User-Agent": "Mozilla/5.0" },
  }).then((r) => (r.ok ? r.text() : ""));
  const match = css.match(/src:\s*url\(([^)]+)\)\s*format\('truetype'\)/);
  if (!match) return null;
  const fontRes = await fetch(match[1]);
  return fontRes.ok ? fontRes.arrayBuffer() : null;
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getArticleMeta(slug);
  const fraunces = await loadFraunces().catch(() => null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#EDE7DD",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: fraunces ? "Fraunces" : "serif",
          color: "#161310",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#8C6F3F",
            fontFamily: "sans-serif",
          }}
        >
          <span>Bridge AI Solutions</span>
          <span>·</span>
          <span>{meta.tag}</span>
        </div>

        <div
          style={{
            fontSize: meta.title.length > 80 ? 60 : 76,
            lineHeight: 1.08,
            fontWeight: 400,
            letterSpacing: -1,
            maxWidth: 1040,
          }}
        >
          {meta.title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#3B302A",
            fontFamily: "sans-serif",
          }}
        >
          <span>aibridgedsolutions.com/insights</span>
          <span
            style={{
              borderTop: "2px solid #B89968",
              paddingTop: 8,
              color: "#8C6F3F",
            }}
          >
            {meta.readTime}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fraunces
        ? [{ name: "Fraunces", data: fraunces, style: "normal", weight: 400 }]
        : undefined,
    }
  );
}
