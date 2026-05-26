// Email template: audit-report delivery.
// Sent when a Shadow Work Audit completes (free or paid path).
// Plain inline-styled HTML for max email-client compatibility — no React Email.

interface AuditReportEmailArgs {
  recipientName?: string | null;
  dashboardUrl: string;
  hasPdf: boolean;
}

interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

const INK = "#1a1a1a";
const INK_WARM = "#2a2520";
const MUTED = "#6b645c";
const PAPER = "#f7f3ec";
const RULE = "#e5ddd1";
const CTA = "#c1542a";
const CTA_INK = "#ffffff";

export function renderAuditReportEmail({
  recipientName,
  dashboardUrl,
  hasPdf,
}: AuditReportEmailArgs): RenderedEmail {
  const greeting = recipientName ? `Hi ${recipientName.split(" ")[0]},` : "Hi,";
  const subject = "Your Shadow Work Audit is ready";
  const preheader =
    "Your personalized AI Roadmap — the one automation worth building first, and how to get it shipped.";

  const pdfLine = hasPdf
    ? "The PDF is attached to this email. The link above is the live, permalinked version."
    : "Open it at the link above — your live, permalinked roadmap.";

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:${PAPER};color:${INK_WARM};font-family:Georgia,'Times New Roman',serif;">
    <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${escapeHtml(preheader)}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PAPER};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;border:1px solid ${RULE};">
            <tr>
              <td style="padding:32px 32px 8px 32px;">
                <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};">
                  // Bridge AI Solutions
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 0 32px;">
                <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:28px;line-height:1.2;color:${INK};">
                  Your Strategic Roadmap is ready.
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 0 32px;font-size:16px;line-height:1.55;color:${INK_WARM};">
                <p style="margin:0 0 16px 0;">${escapeHtml(greeting)}</p>
                <p style="margin:0 0 16px 0;">
                  Your audit responses just ran through the diagnostic. The roadmap names where AI creates the most leverage in your operation — and which one build is worth shipping first.
                </p>
                <p style="margin:0 0 24px 0;">
                  ${escapeHtml(pdfLine)}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 8px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td bgcolor="${CTA}" style="border-radius:2px;">
                      <a href="${escapeAttr(dashboardUrl)}"
                         style="display:inline-block;padding:14px 24px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:600;letter-spacing:0.02em;color:${CTA_INK};text-decoration:none;">
                        Open your roadmap →
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 0 32px;font-size:13px;line-height:1.5;color:${MUTED};">
                <p style="margin:0;word-break:break-all;">
                  Or paste this in your browser:<br/>
                  <a href="${escapeAttr(dashboardUrl)}" style="color:${MUTED};text-decoration:underline;">${escapeHtml(dashboardUrl)}</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px 0 32px;">
                <hr style="border:none;border-top:1px solid ${RULE};margin:0;" />
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px 32px;font-size:15px;line-height:1.55;color:${INK_WARM};">
                <p style="margin:0 0 16px 0;">
                  If the recommendation doesn&rsquo;t fit your situation, hit reply. I read every response, and the audit gets sharper every time someone pushes back on it.
                </p>
                <p style="margin:0;">
                  &mdash; Hayden<br/>
                  <span style="color:${MUTED};font-size:13px;">Bridge AI Solutions</span>
                </p>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:${MUTED};">
            Bridge AI Solutions &middot; <a href="https://aibridgedsolutions.com" style="color:${MUTED};text-decoration:underline;">aibridgedsolutions.com</a>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    greeting,
    "",
    "Your Shadow Work Audit responses ran through the diagnostic. The roadmap names where AI creates the most leverage in your operation — and which one build is worth shipping first.",
    "",
    hasPdf
      ? "The PDF is attached. The link below is the live, permalinked version:"
      : "Open it here — your live, permalinked roadmap:",
    dashboardUrl,
    "",
    "If the recommendation doesn't fit, hit reply. I read every response.",
    "",
    "— Hayden",
    "Bridge AI Solutions · aibridgedsolutions.com",
  ].join("\n");

  return { subject, html, text };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(s: string): string {
  return escapeHtml(s);
}
