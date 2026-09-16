import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_NAME = "Samuel Adefila";
// Use your verified domain once set up in Resend, e.g. "samuel@adefilasamuel.com"
// Until then, onboarding@resend.dev works for testing
const FROM_ADDRESS = process.env.RESEND_FROM_ADDRESS ?? "onboarding@resend.dev";
const TO_ADDRESS = "adefilasamuel929@gmail.com";

export async function POST(req: Request) {
  try {
    const { name, email, service, budget, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ── 1. Notify Samuel ─────────────────────────────────────────────────
    await resend.emails.send({
      from: `${FROM_NAME} Portfolio <${FROM_ADDRESS}>`,
      to: TO_ADDRESS,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f7f7f7;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#0f0f0f;padding:32px 40px;">
            <p style="margin:0;font-family:'Inter',Arial,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#6d28d9;margin-bottom:8px;">PORTFOLIO CONTACT</p>
            <h1 style="margin:0;font-family:'Inter',Arial,sans-serif;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">New Enquiry</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${[
                ["Name", name],
                ["Email", email],
                service ? ["Service", service] : null,
                budget  ? ["Budget", budget]  : null,
              ]
                .filter(Boolean)
                .map(([label, val]) => `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                  <p style="margin:0;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9ca3af;margin-bottom:4px;">${label}</p>
                  <p style="margin:0;font-size:15px;color:#0f0f0f;font-weight:500;">${val}</p>
                </td>
              </tr>`)
                .join("")}
              <tr>
                <td style="padding:24px 0 0;">
                  <p style="margin:0;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9ca3af;margin-bottom:8px;">Message</p>
                  <p style="margin:0;font-size:15px;color:#374151;line-height:1.7;white-space:pre-wrap;">${message}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- CTA -->
        <tr>
          <td style="background:#ffffff;padding:0 40px 40px;">
            <a href="mailto:${email}?subject=Re: Your project enquiry" style="display:inline-block;background:#6d28d9;color:#ffffff;font-size:13px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;padding:14px 28px;text-decoration:none;">
              Reply to ${name}
            </a>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">Sent from your portfolio contact form · adefilasamuel.com</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });

    // ── 2. Confirm to client ──────────────────────────────────────────────
    await resend.emails.send({
      from: `${FROM_NAME} <${FROM_ADDRESS}>`,
      to: email,
      replyTo: TO_ADDRESS,
      subject: `Got it, ${name.split(" ")[0]}! I'll be in touch soon.`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f7f7f7;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#0f0f0f;padding:32px 40px;">
            <p style="margin:0;font-family:'Inter',Arial,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#6d28d9;margin-bottom:8px;">SAMUEL ADEFILA</p>
            <h1 style="margin:0;font-family:'Inter',Arial,sans-serif;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">Thanks for reaching out!</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:40px;">
            <p style="margin:0 0 20px;font-size:16px;color:#0f0f0f;font-weight:600;">Hey ${name.split(" ")[0]},</p>
            <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7;">
              I've received your message and I'll review it shortly. I typically respond within <strong>24–48 hours</strong> on business days.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#374151;line-height:1.7;">
              If your project is time-sensitive, feel free to book a call directly — it's the fastest way to get started.
            </p>
            <a href="https://calendly.com/adefilasamuel929/30min" style="display:inline-block;background:#6d28d9;color:#ffffff;font-size:13px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;padding:14px 28px;text-decoration:none;margin-bottom:40px;">
              Book a Free 30-min Call
            </a>

            <!-- Summary -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #f0f0f0;padding-top:24px;margin-top:8px;">
              <tr>
                <td>
                  <p style="margin:0 0 16px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9ca3af;">Your submission summary</p>
                  ${service ? `<p style="margin:0 0 8px;font-size:14px;color:#6b7280;"><strong style="color:#0f0f0f;">Service:</strong> ${service}</p>` : ""}
                  ${budget  ? `<p style="margin:0 0 8px;font-size:14px;color:#6b7280;"><strong style="color:#0f0f0f;">Budget:</strong>  ${budget}</p>`  : ""}
                  <p style="margin:16px 0 0;font-size:14px;color:#6b7280;line-height:1.6;white-space:pre-wrap;">${message.length > 300 ? message.slice(0, 300) + "…" : message}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;">
            <p style="margin:0 0 4px;font-size:13px;color:#0f0f0f;font-weight:600;">Samuel Adefila</p>
            <p style="margin:0 0 12px;font-size:12px;color:#9ca3af;">Framer Developer &amp; UI/UX Designer</p>
            <p style="margin:0;font-size:12px;color:#9ca3af;">
              <a href="https://adefilasamuel.com" style="color:#6d28d9;text-decoration:none;">adefilasamuel.com</a> &nbsp;·&nbsp;
              <a href="https://upwork.com/freelancers/adefilasamuel" style="color:#6d28d9;text-decoration:none;">Upwork</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] email error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
