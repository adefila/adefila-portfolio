import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Every visitor's page asks for this, so the CDN answers repeat requests for 30s (and serves a stale
// copy for 60s more while it refreshes) instead of running this function and Spotify each time.
const CACHE = "public, s-maxage=30, stale-while-revalidate=60";
const json = (body: unknown, cache = CACHE) => NextResponse.json(body, { headers: { "Cache-Control": cache } });

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

// Spotify tokens last an hour: reuse one while this instance is warm instead of fetching a new one every call.
let cached: { token: string; expires: number } | null = null;

async function getAccessToken(): Promise<string | undefined> {
  if (cached && Date.now() < cached.expires) return cached.token;
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN!,
    }),
  });
  const { access_token, expires_in } = await res.json();
  if (access_token) cached = { token: access_token, expires: Date.now() + (Number(expires_in) || 3600) * 1000 - 60_000 };
  return access_token;
}

export async function GET() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return json({ configured: false });
  }

  try {
    const access_token = await getAccessToken();

    const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (res.status === 204 || res.status > 400) {
      const recent = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      const recentData = await recent.json();
      const track = recentData.items?.[0]?.track;
      if (!track) return json({ configured: true, isPlaying: false });
      return json({
        configured: true,
        isPlaying: false,
        title: track.name,
        artist: track.artists.map((a: { name: string }) => a.name).join(", "),
        albumImage: track.album.images[0]?.url,
        songUrl: track.external_urls.spotify,
      });
    }

    const data = await res.json();
    const track = data.item;
    return json({
      configured: true,
      isPlaying: data.is_playing,
      title: track.name,
      artist: track.artists.map((a: { name: string }) => a.name).join(", "),
      albumImage: track.album.images[0]?.url,
      songUrl: track.external_urls.spotify,
    });
  } catch {
    return json({ configured: false }, "public, s-maxage=10");
  }
}
