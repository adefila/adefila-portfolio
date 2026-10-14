import { NextResponse } from "next/server";
import { checkLeadFinder, sendToLeadFinder } from "@/lib/leadfinder";

// Page views from VisitBeacon. Forwarded to Lead Finder with the visitor's IP, so it can tell
// when a company (not a home or phone connection) is looking at the site. No cookies.
export async function POST(req: Request) {
  let body: { path?: unknown; referrer?: unknown } = {};
  try { body = JSON.parse(await req.text()); } catch { /* empty beacon */ }
  await sendToLeadFinder("/api/visit", {
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? req.headers.get("x-real-ip") ?? "",
    ua: req.headers.get("user-agent") ?? "",
    path: typeof body.path === "string" ? body.path.slice(0, 200) : "/",
    referrer: typeof body.referrer === "string" ? body.referrer.slice(0, 200) : "",
  });
  return new NextResponse(null, { status: 204 });
}

// Health check: /api/visit?check=1 shows whether enquiries can reach Lead Finder.
export async function GET(req: Request) {
  if (new URL(req.url).searchParams.get("check") !== "1") return new NextResponse(null, { status: 404 });
  return NextResponse.json(await checkLeadFinder());
}
