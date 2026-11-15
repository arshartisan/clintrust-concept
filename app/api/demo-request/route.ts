import { NextResponse } from "next/server";

/**
 * Contact / demo request endpoint (still a stub).
 *
 * It validates the submission and writes it to the server log. It does NOT
 * yet deliver the request anywhere a person will see it: connect a CRM, an
 * email provider or a database here before launch.
 * Tracked in docs/sop/04-sprint-log.md.
 */

const REQUIRED = ["firstName", "lastName", "email", "organization", "role"] as const;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send the form as JSON." }, { status: 400 });
  }

  const missing = REQUIRED.filter((field) => {
    const value = body[field];
    return typeof value !== "string" || value.trim() === "";
  });
  if (missing.length > 0) {
    return NextResponse.json({ error: `Missing: ${missing.join(", ")}.` }, { status: 422 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email))) {
    return NextResponse.json({ error: "Enter a valid work email." }, { status: 422 });
  }

  // TODO(sprint 2): deliver to CRM / email. Logging only for now.
  console.info("[demo-request]", {
    subject: body.subject ?? null,
    organization: body.organization,
    role: body.role,
    volume: body.volume ?? null,
    hasMessage: typeof body.message === "string" && body.message.trim() !== "",
  });

  return NextResponse.json({ ok: true });
}
