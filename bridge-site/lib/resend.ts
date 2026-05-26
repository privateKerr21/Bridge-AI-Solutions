import { Resend } from "resend";

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "hello@aibridgedsolutions.com";
export const FROM_NAME = process.env.RESEND_FROM_NAME || "Bridge AI Solutions";

export function fromHeader(): string {
  return `${FROM_NAME} <${FROM_EMAIL}>`;
}

// Lazy init so a missing key doesn't throw at import time (Next collects page
// data eagerly during build, which would otherwise fail the build).
let _client: Resend | null = null;
function getClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  if (!_client) _client = new Resend(apiKey);
  return _client;
}

interface SendArgs {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: Array<{ filename: string; content: Buffer | string }>;
}

export async function sendEmail({ to, subject, html, text, replyTo, attachments }: SendArgs) {
  const { data, error } = await getClient().emails.send({
    from: fromHeader(),
    to,
    subject,
    html,
    text,
    replyTo,
    attachments,
  });

  if (error) {
    throw new Error(`Resend send failed: ${error.message}`);
  }

  return data;
}
