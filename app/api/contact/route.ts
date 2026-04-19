import { NextResponse, type NextRequest } from "next/server";
import { sendContactEmail } from "@/lib/actions/contact";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const formData = new FormData();
  for (const key of ["name", "email", "message"] as const) {
    const value = (body as Record<string, unknown>)[key];
    if (typeof value === "string") formData.append(key, value);
  }

  const result = await sendContactEmail(formData);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
