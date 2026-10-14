"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Music, ExternalLink } from "lucide-react";
import { useLang } from "@/context/LangContext";
import BookShelf from "./BookShelf";

interface SpotifyData {
  configured: boolean;
  isPlaying?: boolean;
  title?: string;
  artist?: string;
  albumImage?: string;
  songUrl?: string;
}


export default function Currently() {
  const [spotify, setSpotify] = useState<SpotifyData | null>(null);
  const { t } = useLang();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/spotify");
        const data = await res.json();
        setSpotify(data);
      } catch {
        setSpotify({ configured: false });
      }
    };
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, []);

  const isPlaying = spotify?.isPlaying;
  const loading = spotify === null;
  // Show the panel while loading and once a track arrives; drop it if Spotify fails
  const showSpotify = loading || Boolean(spotify?.configured && spotify.title);

  return (
    <section
      id="currently"
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 20px 80px" }}
    >
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 56 }}>

        {/* Section label */}
        <motion.p
          data-reveal
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "var(--accent-purple)",
            marginBottom: 32,
          }}
        >
          {t("currently.label")}
        </motion.p>

        {/* ── Two equal panels ── */}
        <div
          className="currently-panels"
          style={{
            display: "grid",
            gridTemplateColumns: showSpotify ? "1fr 1fr" : "1fr",
            gap: 1,
            background: "rgba(0,0,0,0.07)",
          }}
        >

          {/* LEFT — Spotify panel. Hidden entirely if Spotify can't be reached,
              so there's never an empty box; a placeholder shows while it loads. */}
          {showSpotify && (
          <motion.a
            href={spotify?.songUrl || "https://open.spotify.com"}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            className="spotify-panel"
            aria-busy={loading}
            style={{
              background: "#0f0f0f",
              padding: "36px",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 28,
              minHeight: 360,
              position: "relative",
              overflow: "hidden",
              isolation: "isolate",
            }}
          >
            {/* The album cover, blurred, tints the panel in the album's own colours */}
            {spotify?.albumImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={spotify.albumImage}
                alt=""
                aria-hidden="true"
                style={{
                  position: "absolute", inset: "-20%", width: "140%", height: "140%",
                  objectFit: "cover", filter: "blur(48px) saturate(1.3)", opacity: 0.45, zIndex: -1,
                }}
              />
            )}
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.45)", zIndex: -1 }} />

            {/* Top row: status */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {isPlaying ? (
                <span style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 13 }}>
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ scaleY: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                      style={{
                        display: "block", width: 3, height: 13,
                        background: "#1db954", borderRadius: 2, transformOrigin: "bottom",
                      }}
                    />
                  ))}
                </span>
              ) : (
                <Music size={12} color="rgba(255,255,255,0.6)" strokeWidth={2} />
              )}
              <span style={{
                fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 10,
                letterSpacing: "2.5px", textTransform: "uppercase",
                color: isPlaying ? "#1db954" : "rgba(255,255,255,0.6)",
              }}>
                {isPlaying ? t("currently.nowPlaying") : t("currently.recent")}
              </span>
            </div>

            {/* Middle: cover + track */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
              <div
                className={loading ? "skeleton" : undefined}
                style={{
                  width: 148, height: 148, flexShrink: 0, overflow: "hidden",
                  background: "rgba(255,255,255,0.06)",
                  boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
                }}
              >
                {spotify?.albumImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={spotify.albumImage}
                    alt={spotify.title ? `${spotify.title} cover` : "Album cover"}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                )}
              </div>
              <div style={{ flex: "1 1 160px", minWidth: 0 }}>
                {loading ? (
                  <>
                    <span className="skeleton" style={{ display: "block", width: "70%", height: 22, marginBottom: 10 }} />
                    <span className="skeleton" style={{ display: "block", width: "45%", height: 14 }} />
                  </>
                ) : (
                  <>
                    <p style={{
                      fontFamily: "var(--font-poppins)", fontWeight: 700,
                      fontSize: "clamp(20px, 2.2vw, 28px)", letterSpacing: "-0.5px",
                      color: "#ffffff", lineHeight: 1.15, marginBottom: 6,
                      overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {spotify?.title}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-inter)", fontSize: 14,
                      color: "rgba(255,255,255,0.7)", letterSpacing: "-0.1px",
                    }}>
                      {spotify?.artist}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Bottom: listen link */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1db954" aria-hidden="true">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.371-.721.49-1.101.241-3.021-1.858-6.832-2.278-11.322-1.237-.435.101-.87-.17-.971-.601-.1-.44.17-.87.6-.971 4.91-1.121 9.122-.63 12.512 1.43.38.25.489.73.241 1.101l.041.037zm1.47-3.27c-.301.47-.921.62-1.391.311-3.461-2.131-8.732-2.75-12.822-1.5-.53.16-1.081-.14-1.241-.67-.16-.54.14-1.081.67-1.241 4.671-1.42 10.471-.731 14.452 1.71.47.301.62.921.311 1.391l.021-.001zm.13-3.41c-4.151-2.47-11.002-2.7-14.972-1.491-.631.19-1.301-.17-1.49-.801-.19-.63.17-1.301.8-1.49 4.552-1.381 12.122-1.111 16.893 1.721.571.341.761 1.071.421 1.641-.341.581-1.071.761-1.651.42z"/>
                </svg>
                <span style={{
                  fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 700,
                  letterSpacing: "1.5px", color: "rgba(255,255,255,0.85)",
                  textTransform: "uppercase",
                }}>
                  {t("currently.listen")}
                </span>
              </span>
              <ExternalLink size={14} color="rgba(255,255,255,0.6)" strokeWidth={1.5} />
            </div>
          </motion.a>
          )}

          {/* RIGHT — reading panel */}
          <motion.div
            data-reveal
            style={{
              background: "var(--card-bg)",
              padding: "40px 36px 32px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Label */}
            <p style={{
              fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11,
              letterSpacing: "4px", textTransform: "uppercase",
              color: "var(--fg-secondary)", marginBottom: 8,
            }}>
              {t("currently.reading")}
            </p>

            {/* Bookshelf fills remaining space */}
            <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
              <BookShelf />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
