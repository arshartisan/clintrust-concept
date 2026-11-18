import { NextResponse } from "next/server";
import { Resend } from "resend";
import { brand } from "@/content/landing";

/**
 * Contact / demo request endpoint.
 *
 * Validates the submission, emails it to the team through Resend, and (when
 * CRM_WEBHOOK_URL is set) posts the same data as JSON to the CRM.
 *
 * Environment (see .env.example):
 *   RESEND_API_KEY      required
 *   CONTACT_TO_EMAIL    required; comma-separate several addresses
 *   CONTACT_FROM_EMAIL  sender; must be on a domain verified in Resend.
 *                       Defaults to Resend's test sender, which only delivers
 *                       to the Resend account owner's address.
 *   CRM_WEBHOOK_URL     optional
 */

const REQUIRED = ["firstName", "lastName", "email", "organization", "role"] as const;
const OPTIONAL = ["subject", "volume", "message", "source"] as const;
const MAX_LENGTH = 2000;

type Field = (typeof REQUIRED)[number] | (typeof OPTIONAL)[number];
type Submission = Record<Field, string>;

const LABELS: Record<Field, string> = {
  subject: "Subject",
  firstName: "First name",
  lastName: "Last name",
  email: "Work email",
  organization: "Organization",
  role: "Role",
  volume: "Annual trial payment volume",
  message: "Message",
  source: "Sent from",
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send the form as JSON." }, { status: 400 });
  }

  // Honeypot: a field people never see. Bots that fill it get a quiet success.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const read = (field: Field) => (typeof body[field] === "string" ? (body[field] as string).trim().slice(0, MAX_LENGTH) : "");
  const data = Object.fromEntries([...REQUIRED, ...OPTIONAL].map((field) => [field, read(field)])) as Submission;

  const missing = REQUIRED.filter((field) => data[field] === "");
  if (missing.length > 0) {
    return NextResponse.json({ error: `Missing: ${missing.join(", ")}.` }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ error: "Enter a valid work email." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL?.split(",").map((address) => address.trim()).filter(Boolean) ?? [];
  if (!apiKey || to.length === 0) {
    console.error("[demo-request] RESEND_API_KEY or CONTACT_TO_EMAIL is not set; the request was not delivered.");
    return NextResponse.json({ error: "The form is not configured yet." }, { status: 503 });
  }

  const fields = ([...REQUIRED, ...OPTIONAL] as Field[]).filter((field) => data[field] !== "");
  const name = `${data.firstName} ${data.lastName}`;
  const subject = `${data.subject || "Website inquiry"}: ${name}, ${data.organization}`;
  const text = fields.map((field) => `${LABELS[field]}: ${data[field]}`).join("\n");
  const html = `<table cellpadding="6" style="border-collapse:collapse;font:14px/1.5 sans-serif">${fields
    .map(
      (field) =>
        `<tr><td style="color:#666;vertical-align:top;white-space:nowrap">${LABELS[field]}</td><td style="white-space:pre-wrap">${escapeHtml(data[field])}</td></tr>`,
    )
    .join("")}</table>`;

  const resend = new Resend(apiKey);
  const [email, crm] = await Promise.allSettled([
    resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || `${brand.name} website <onboarding@resend.dev>`,
      to,
      replyTo: data.email,
      subject,
      text,
      html,
    }),
    process.env.CRM_WEBHOOK_URL
      ? fetch(process.env.CRM_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
          signal: AbortSignal.timeout(8000),
        }).then((response) => {
          if (!response.ok) throw new Error(`CRM webhook responded ${response.status}`);
        })
      : Promise.resolve(),
  ]);

  if (crm.status === "rejected") console.error("[demo-request] CRM delivery failed:", crm.reason);

  const emailError = email.status === "rejected" ? email.reason : email.value.error;
  if (emailError) {
    console.error("[demo-request] Resend delivery failed:", emailError);
    // The CRM still has it, so the request is not lost.
    if (process.env.CRM_WEBHOOK_URL && crm.status === "fulfilled") return NextResponse.json({ ok: true });
    return NextResponse.json({ error: "We could not send your message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
