import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// The visitor's country, from the network the request came from (Vercel adds the header at the edge).
// Used to pick the site's language on a first visit. Only the country code is returned; the IP address
// is not read here and nothing is stored.
export function GET(req: NextRequest) {
  let country = req.headers.get("x-vercel-ip-country");
  // For testing on localhost: /api/geo?country=NL
  if (process.env.NODE_ENV !== "production") country = req.nextUrl.searchParams.get("country") ?? country;
  return NextResponse.json(
    { country: country ? country.toUpperCase().slice(0, 2) : null },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
