import { NextRequest } from "next/server";
import { Resend } from "resend";
import { ok, fail } from "@/lib/api";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    let name: string | undefined;
    let email: string | undefined;
    let subject: string | undefined;
    let message: string | undefined;

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      name = body.name;
      email = body.email;
      subject = body.subject;
      message = body.message;
    } else if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      name = formData.get("name")?.toString();
      email = formData.get("email")?.toString();
      subject = formData.get("subject")?.toString();
      message = formData.get("message")?.toString();
    } else {
      // try json as fallback
      try {
        const body = await req.json();
        name = body.name;
        email = body.email;
        subject = body.subject;
        message = body.message;
      } catch {
        const formData = await req.formData();
        name = formData.get("name")?.toString();
        email = formData.get("email")?.toString();
        subject = formData.get("subject")?.toString();
        message = formData.get("message")?.toString();
      }
    }

    if (!name || !email || !message) {
      return fail("name, email and message required", 400);
    }

    if (!process.env.RESEND_API_KEY) {
      return fail("RESEND_API_KEY not configured", 500);
    }

    const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const to = process.env.CONTACT_TO_EMAIL || process.env.RESEND_TO_EMAIL || from;

    await resend.emails.send({
      from,
      to,
      subject: subject || `Contact from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return ok({ success: true });
  } catch (e) {
    console.error(e);
    return fail("Failed to send message", 500);
  }
}
