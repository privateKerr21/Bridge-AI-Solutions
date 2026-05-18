import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  // Don't throw at import time — emails are best-effort. Throw when sending.
  console.warn("[resend] RESEND_API_KEY is not set; emails will fail to send");
}

export const resend = new Resend(apiKey || "");

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "hello@aibridgesolutions.com";
export const FROM_NAME = process.env.RESEND_FROM_NAME || "Bridge AI Solutions";

export function fromHeader(): string {
  return `${FROM_NAME} <${FROM_EMAIL}>`;
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
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const { data, error } = await resend.emails.send({
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
