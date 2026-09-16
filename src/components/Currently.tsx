"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { BookOpen, Music } from "lucide-react";

// ── Update this whenever you start a new book ──
const currentBook = {
  title: "The Design of Everyday Things",
  author: "Don Norman",
  cover: "https://covers.openlibrary.org/b/isbn/9780465050659-M.jpg",
  status: "Reading now",
  url: "https://www.goodreads.com/book/show/840.The_Design_of_Everyday_Things",
};

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

  return (
    <section
      id="currently"
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px 80px",
      }}
    >
      <div
        style={{
          borderTop: "1px solid rgba(0,0,0,0.08)",
          paddingTop: 56,
        }}
      >
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
            marginBottom: 24,
          }}
        >
          {t("currently.label")}
        </motion.p>

        <div
          className="currently-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1,
            background: "rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          {/* Book card */}
          <motion.a
            href={currentBook.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            style={{
              display: "flex",
              gap: 20,
              padding: "28px 24px",
              background: "var(--bg)",
              textDecoration: "none",
              alignItems: "flex-start",
              transition: "background 0.2s",
            }}
            whileHover={{ background: "var(--white)" } as never}
          >
            {/* Cover */}
            <div
              style={{
                width: 64,
                height: 88,
                flexShrink: 0,
                background: "rgba(0,0,0,0.05)",
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "4px 4px 12px rgba(0,0,0,0.12)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentBook.cover}
                alt={currentBook.title}
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <BookOpen size={11} color="var(--accent-purple)" strokeWidth={2.5} />
                <span style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "var(--accent-purple)",
                }}>
                  READING
                </span>
              </div>
              <p style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: "-0.3px",
                color: "var(--fg)",
                marginBottom: 5,
                lineHeight: 1.3,
              }}>
                {currentBook.title}
              </p>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                color: "var(--fg-secondary)",
                marginBottom: 12,
                letterSpacing: "-0.1px",
              }}>
                {currentBook.author}
              </p>
              <span style={{
                fontFamily: "var(--font-inter)",
                fontSize: 11,
                color: "var(--fg-muted)",
                letterSpacing: "0.3px",
                borderBottom: "1px dashed rgba(0,0,0,0.15)",
                paddingBottom: 1,
              }}>
                {currentBook.status}
              </span>
            </div>
          </motion.a>

          {/* Spotify card */}
          <motion.a
            href={spotify?.songUrl || "https://open.spotify.com"}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
            style={{
              display: "flex",
              gap: 20,
              padding: "28px 24px",
              background: "var(--bg)",
              textDecoration: "none",
              alignItems: "flex-start",
              transition: "background 0.2s",
            }}
            whileHover={{ background: "var(--white)" } as never}
          >
            {/* Album art */}
            <div style={{
              width: 64,
              height: 64,
              flexShrink: 0,
              background: "rgba(0,0,0,0.05)",
              border: "1px solid rgba(0,0,0,0.08)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "4px 4px 12px rgba(0,0,0,0.12)",
            }}>
              {spotify?.albumImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={spotify.albumImage}
                  alt="Album"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <Music size={22} color="rgba(0,0,0,0.18)" strokeWidth={1.5} />
              )}
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
                {spotify?.isPlaying ? (
                  <>
                    <span style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 12 }}>
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ scaleY: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                          style={{
                            display: "block",
                            width: 3,
                            height: 12,
                            background: "#1db954",
                            borderRadius: 2,
                            transformOrigin: "bottom",
                          }}
                        />
                      ))}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 700,
                      fontSize: 10,
                      letterSpacing: "2.5px",
                      textTransform: "uppercase",
                      color: "#1db954",
                    }}>
                      NOW PLAYING
                    </span>
                  </>
                ) : (
                  <>
                    <Music size={11} color="var(--fg-muted)" strokeWidth={2.5} />
                    <span style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 700,
                      fontSize: 10,
                      letterSpacing: "2.5px",
                      textTransform: "uppercase",
                      color: "var(--fg-muted)",
                    }}>
                      {spotify?.configured === false ? "LISTENING" : "RECENTLY PLAYED"}
                    </span>
                  </>
                )}
              </div>

              <p style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: "-0.3px",
                color: "var(--fg)",
                marginBottom: 5,
                lineHeight: 1.3,
              }}>
                {spotify?.title || "Spotify not connected"}
              </p>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                color: "var(--fg-secondary)",
                letterSpacing: "-0.1px",
              }}>
                {spotify?.artist || "Add keys to .env.local to connect"}
              </p>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
