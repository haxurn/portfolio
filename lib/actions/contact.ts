"use server";

import { z } from "zod";
import { resend, CONTACT_FROM, CONTACT_TO } from "@/lib/resend";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please share your name.").max(80),
  email: z.string().trim().email("That email doesn't look valid."),
  message: z.string().trim().min(10, "A little more context helps.").max(4000),
});

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export async function sendContactEmail(formData: FormData): Promise<ContactResult> {
  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors };
  }

  if (!resend) {
    console.error("[contact] Resend not configured — missing RESEND_API_KEY");
    return { ok: false, error: "Email service is not configured." };
  }

  const { name, email, message } = parsed.data;
  const { error } = await resend.emails.send({
    from: CONTACT_FROM,
    to: CONTACT_TO,
    subject: `Portfolio contact — ${name}`,
    replyTo: email,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `
      <div style="font-family: ui-sans-serif, system-ui, sans-serif; max-width: 560px; margin: 0 auto; color:#111;">
        <h2 style="margin:0 0 12px;">New message from ${escapeHtml(name)}</h2>
        <p style="margin:0 0 16px;color:#555;">Reply-to: <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <pre style="white-space:pre-wrap;background:#f6f6f6;padding:16px;border-radius:8px;font-family:inherit;font-size:14px;line-height:1.5;">${escapeHtml(message)}</pre>
      </div>
    `,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return { ok: false, error: "Couldn't deliver the message. Try again?" };
  }

  return { ok: true };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
