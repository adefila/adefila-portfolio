import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
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
  return res.json();
}

export async function GET() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return NextResponse.json({ configured: false });
  }

  try {
    const { access_token } = await getAccessToken();

    const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${access_token}` },
      next: { revalidate: 0 },
    });

    if (res.status === 204 || res.status > 400) {
      const recent = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      const recentData = await recent.json();
      const track = recentData.items?.[0]?.track;
      if (!track) return NextResponse.json({ configured: true, isPlaying: false });
      return NextResponse.json({
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
    return NextResponse.json({
      configured: true,
      isPlaying: data.is_playing,
      title: track.name,
      artist: track.artists.map((a: { name: string }) => a.name).join(", "),
      albumImage: track.album.images[0]?.url,
      songUrl: track.external_urls.spotify,
    });
  } catch {
    return NextResponse.json({ configured: false });
  }
}
