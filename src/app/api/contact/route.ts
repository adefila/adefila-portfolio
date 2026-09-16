import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Rate limiting (in-memory, per serverless instance) ───────────────────────
const ipLog = new Map<string, { count: number; reset: number }>();
const LIMIT = 3;
const WINDOW = 60 * 60 * 1000; // 1 hour

function allowed(ip: string): boolean {
  const now = Date.now();
  const entry = ipLog.get(ip);
  if (!entry || now > entry.reset) { ipLog.set(ip, { count: 1, reset: now + WINDOW }); return true; }
  if (entry.count >= LIMIT) return false;
  entry.count++;
  return true;
}

const FROM_NAME = "Samuel Adefila";
const FROM_ADDRESS = process.env.RESEND_FROM_ADDRESS ?? "onboarding@resend.dev";
const TO_ADDRESS = "adefilasamuel929@gmail.com";

const SITE = "https://adefilasamuel.com";
const UPWORK = "https://upwork.com/freelancers/adefilasamuel";
const LINKEDIN = "https://www.linkedin.com/in/adefila-samuel-144448201/";
const CALENDLY = "https://calendly.com/adefilasamuel929/30min";

const linkBtn = (href: string, label: string) =>
  `<td style="padding-right:8px;padding-bottom:8px;">
    <a href="${href}" target="_blank" style="display:inline-block;padding:10px 20px;border:1px solid rgba(255,255,255,0.18);color:#ffffff;font-family:Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;text-decoration:none;white-space:nowrap;">
      ${label}
    </a>
  </td>`;

const row = (label: string, val: string) =>
  `<tr>
    <td style="padding:14px 0;border-bottom:1px solid #f3f3f3;">
      <p style="margin:0 0 3px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#b0b0b0;">${label}</p>
      <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#0f0f0f;font-weight:500;line-height:1.4;">${val}</p>
    </td>
  </tr>`;

export async function POST(req: Request) {
  try {
    // ── Spam checks ────────────────────────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (!allowed(ip)) {
      return NextResponse.json({ error: "Too many submissions. Try again later." }, { status: 429 });
    }

    const { name, email, service, budget, message, _h, _t } = await req.json();

    // Honeypot: bots fill the hidden field, humans leave it empty
    if (_h) {
      return NextResponse.json({ ok: true }); // silent accept so bots don't retry
    }

    // Timing check: reject if submitted in under 3 seconds (bot speed)
    if (typeof _t === "number" && Date.now() - _t < 3000) {
      return NextResponse.json({ ok: true }); // silent accept
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const firstName = name.split(" ")[0];

    // ── 1. Notify Samuel ────────────────────────────────────────────────────
    await resend.emails.send({
      from: `"${FROM_NAME}" <${FROM_ADDRESS}>`,
      to: TO_ADDRESS,
      replyTo: email,
      subject: `New enquiry · ${name}${service ? ` · ${service}` : ""}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>New Enquiry</title></head>
<body style="margin:0;padding:0;background:#efefef;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#efefef;padding:48px 20px;">
<tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">

  <!-- Top rule -->
  <tr><td style="background:#0f0f0f;height:4px;font-size:0;line-height:0;">&nbsp;</td></tr>

  <!-- Header -->
  <tr>
    <td style="background:#0f0f0f;padding:40px 48px 36px;">
      <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.4);">PORTFOLIO · CONTACT FORM</p>
      <h1 style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:32px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;line-height:1.1;">NEW ENQUIRY</h1>
      <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.45);letter-spacing:0.3px;">from <strong style="color:rgba(255,255,255,0.75);font-weight:600;">${name}</strong></p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="background:#ffffff;padding:40px 48px 8px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${row("Name", name)}
        ${row("Email", `<a href="mailto:${email}" style="color:#0f0f0f;text-decoration:underline;">${email}</a>`)}
        ${service ? row("Service", service) : ""}
        ${budget  ? row("Budget",  budget)  : ""}
        <tr>
          <td style="padding:20px 0 0;">
            <p style="margin:0 0 10px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#b0b0b0;">Message</p>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#333333;line-height:1.75;white-space:pre-wrap;">${message}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- CTA -->
  <tr>
    <td style="background:#ffffff;padding:32px 48px 48px;">
      <a href="mailto:${email}?subject=Re%3A Your project enquiry" style="display:inline-block;background:#0f0f0f;color:#ffffff;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:16px 32px;text-decoration:none;">
        REPLY TO ${name.toUpperCase()} &rarr;
      </a>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#0f0f0f;padding:32px 48px;">
      <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#ffffff;letter-spacing:0.3px;">Samuel Adefila</p>
      <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:0.5px;text-transform:uppercase;">Framer Developer &amp; UI/UX Designer</p>
      <table cellpadding="0" cellspacing="0"><tr>
        ${linkBtn(SITE, "Website")}
        ${linkBtn(UPWORK, "Upwork")}
        ${linkBtn(LINKEDIN, "LinkedIn")}
      </tr></table>
    </td>
  </tr>

  <!-- Bottom rule -->
  <tr><td style="background:#0f0f0f;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>

</table>
</td></tr>
</table>
</body></html>`,
    });

    // ── 2. Confirm to client ─────────────────────────────────────────────────
    try {
      await resend.emails.send({
        from: `"${FROM_NAME}" <${FROM_ADDRESS}>`,
        to: email,
        replyTo: TO_ADDRESS,
        subject: `Got it, ${firstName}. I'll be in touch.`,
        html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Thanks for reaching out</title></head>
<body style="margin:0;padding:0;background:#efefef;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#efefef;padding:48px 20px;">
<tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">

  <!-- Top rule -->
  <tr><td style="background:#0f0f0f;height:4px;font-size:0;line-height:0;">&nbsp;</td></tr>

  <!-- Header -->
  <tr>
    <td style="background:#0f0f0f;padding:40px 48px 36px;">
      <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.4);">SAMUEL ADEFILA · FRAMER DEVELOPER</p>
      <h1 style="margin:0 0 10px;font-family:Arial,sans-serif;font-size:32px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;line-height:1.1;">THANKS FOR<br>REACHING OUT.</h1>
      <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.45);">Your message has been received.</p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="background:#ffffff;padding:44px 48px 12px;">
      <p style="margin:0 0 10px;font-family:Arial,sans-serif;font-size:22px;font-weight:700;color:#0f0f0f;letter-spacing:-0.3px;">Hey ${firstName},</p>
      <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:15px;color:#555555;line-height:1.75;">
        I've received your message and will review it shortly. I typically get back within <strong style="color:#0f0f0f;">24–48 hours</strong> on business days.
      </p>
      <p style="margin:0 0 36px;font-family:Arial,sans-serif;font-size:15px;color:#555555;line-height:1.75;">
        If your project is time-sensitive, booking a call is the fastest path — I can give you a clear direction in 30 minutes.
      </p>

      <!-- Calendly CTA -->
      <table cellpadding="0" cellspacing="0" style="margin-bottom:44px;">
        <tr>
          <td style="background:#0f0f0f;padding:16px 36px;">
            <a href="${CALENDLY}" style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#ffffff;text-decoration:none;white-space:nowrap;">
              BOOK A FREE 30-MIN CALL &rarr;
            </a>
          </td>
        </tr>
      </table>

      <!-- Submission summary -->
      <table width="100%" cellpadding="0" cellspacing="0" style="border-top:2px solid #0f0f0f;padding-top:0;">
        <tr>
          <td style="padding:20px 0 0;">
            <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#b0b0b0;">Your submission</p>
          </td>
        </tr>
        ${service ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f3f3f3;">
          <p style="margin:0 0 2px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#c0c0c0;">Service</p>
          <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#0f0f0f;font-weight:500;">${service}</p>
        </td></tr>` : ""}
        ${budget ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f3f3f3;">
          <p style="margin:0 0 2px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#c0c0c0;">Budget</p>
          <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#0f0f0f;font-weight:500;">${budget}</p>
        </td></tr>` : ""}
        <tr><td style="padding:14px 0 0;">
          <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#c0c0c0;">Message</p>
          <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#666666;line-height:1.7;white-space:pre-wrap;">${message.length > 300 ? message.slice(0, 300) + "…" : message}</p>
        </td></tr>
      </table>
    </td>
  </tr>

  <!-- Spacer -->
  <tr><td style="background:#ffffff;height:44px;font-size:0;line-height:0;">&nbsp;</td></tr>

  <!-- Footer -->
  <tr>
    <td style="background:#0f0f0f;padding:32px 48px;">
      <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#ffffff;letter-spacing:0.3px;">Samuel Adefila</p>
      <p style="margin:0 0 22px;font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:0.5px;text-transform:uppercase;">Framer Developer &amp; UI/UX Designer</p>
      <table cellpadding="0" cellspacing="0"><tr>
        ${linkBtn(SITE, "Website")}
        ${linkBtn(UPWORK, "Upwork")}
        ${linkBtn(LINKEDIN, "LinkedIn")}
      </tr></table>
    </td>
  </tr>

  <!-- Bottom rule -->
  <tr><td style="background:#0f0f0f;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>

</table>
</td></tr>
</table>
</body></html>`,
      });
    } catch (clientEmailErr) {
      console.warn("[contact] client confirmation skipped:", clientEmailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] email error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
