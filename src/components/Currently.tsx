"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Currently() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
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

  return (
    <section
      id="currently"
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 20px 80px" }}
    >
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 56 }}>

        {/* Section label */}
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
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
            gridTemplateColumns: "1fr 1fr",
            gap: 1,
            background: "rgba(0,0,0,0.07)",
          }}
        >

          {/* LEFT — dark Spotify panel */}
          <motion.a
            href={spotify?.songUrl || "https://open.spotify.com"}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
            style={{
              background: "#0f0f0f",
              padding: "40px 36px",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 320,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle grain overlay */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.035,
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "160px",
            }} />

            {/* Top row: status badge */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
                  <Music size={11} color="rgba(255,255,255,0.35)" strokeWidth={2} />
                )}
                <span style={{
                  fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 10,
                  letterSpacing: "2.5px", textTransform: "uppercase",
                  color: isPlaying ? "#1db954" : "rgba(255,255,255,0.35)",
                }}>
                  {isPlaying ? "NOW PLAYING" : (spotify?.configured === false ? "LISTENING" : "RECENTLY PLAYED")}
                </span>
              </div>
              <ExternalLink size={13} color="rgba(255,255,255,0.2)" strokeWidth={1.5} />
            </div>

            {/* Middle: album art + info */}
            <div>
              {/* Album art */}
              <div style={{
                width: 112, height: 112, marginBottom: 24,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                overflow: "hidden", flexShrink: 0,
                boxShadow: "8px 12px 32px rgba(0,0,0,0.5)",
              }}>
                {spotify?.albumImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={spotify.albumImage}
                    alt="Album"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Music size={32} color="rgba(255,255,255,0.15)" strokeWidth={1.2} />
                  </div>
                )}
              </div>

              <p style={{
                fontFamily: "var(--font-poppins)", fontWeight: 700,
                fontSize: "clamp(18px, 2vw, 26px)", letterSpacing: "-0.5px",
                color: "#ffffff", lineHeight: 1.15, marginBottom: 6,
              }}>
                {spotify?.title || "..."}
              </p>
              <p style={{
                fontFamily: "var(--font-inter)", fontSize: 13,
                color: "rgba(255,255,255,0.5)", letterSpacing: "-0.1px",
              }}>
                {spotify?.artist || "Spotify"}
              </p>
            </div>

            {/* Bottom: Spotify wordmark */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#1db954">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.371-.721.49-1.101.241-3.021-1.858-6.832-2.278-11.322-1.237-.435.101-.87-.17-.971-.601-.1-.44.17-.87.6-.971 4.91-1.121 9.122-.63 12.512 1.43.38.25.489.73.241 1.101l.041.037zm1.47-3.27c-.301.47-.921.62-1.391.311-3.461-2.131-8.732-2.75-12.822-1.5-.53.16-1.081-.14-1.241-.67-.16-.54.14-1.081.67-1.241 4.671-1.42 10.471-.731 14.452 1.71.47.301.62.921.311 1.391l.021-.001zm.13-3.41c-4.151-2.47-11.002-2.7-14.972-1.491-.631.19-1.301-.17-1.49-.801-.19-.63.17-1.301.8-1.49 4.552-1.381 12.122-1.111 16.893 1.721.571.341.761 1.071.421 1.641-.341.581-1.071.761-1.651.42z"/>
              </svg>
              <span style={{
                fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.5px", color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
              }}>
                Spotify
              </span>
            </div>
          </motion.a>

          {/* RIGHT — reading panel */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.14, ease: EASE }}
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
              CURRENTLY READING
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
