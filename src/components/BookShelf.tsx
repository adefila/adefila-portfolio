"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  status: "Reading now" | "Up next" | "Read";
  coverGradient: string;
  spineColor: string;
  accentColor: string;
  height: number;
  thickness: number;
  url: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "Keep Going",
    author: "Austin Kleon",
    genre: "Creativity",
    status: "Reading now",
    coverGradient: "linear-gradient(160deg, #3b82f6 0%, #2563eb 60%, #1d4ed8 100%)",
    spineColor: "#1e40af",
    accentColor: "#ffffff",
    height: 210,
    thickness: 20,
    url: "https://www.goodreads.com/book/show/40591677",
  },
  {
    id: 2,
    title: "Show Your Work!",
    author: "Austin Kleon",
    genre: "Creative",
    status: "Reading now",
    coverGradient: "linear-gradient(160deg, #facc15 0%, #eab308 60%, #ca8a04 100%)",
    spineColor: "#a16207",
    accentColor: "#1a1a1a",
    height: 210,
    thickness: 20,
    url: "https://www.goodreads.com/book/show/18290401",
  },
  {
    id: 3,
    title: "Steal Like an Artist",
    author: "Austin Kleon",
    genre: "Creativity",
    status: "Reading now",
    coverGradient: "linear-gradient(160deg, #27272a 0%, #18181b 60%, #09090b 100%)",
    spineColor: "#000000",
    accentColor: "#ffffff",
    height: 210,
    thickness: 20,
    url: "https://www.goodreads.com/book/show/13099738",
  },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function BookShelf() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const COVER_WIDTH = isMobile ? 82 : 106;

  return (
    <div ref={ref} style={{ width: "100%", position: "relative", overflow: "visible" }}>
      {/* Ambient light bg */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: 80,
          background: "radial-gradient(ellipse, rgba(109,40,217,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Scrollable scene */}
      <div style={{ overflowX: "auto", overflowY: "visible", paddingTop: isMobile ? 48 : 64, paddingBottom: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 6,
            padding: "0 28px",
            width: "max-content",
            minWidth: "100%",
          }}
        >
          {books.map((book, i) => {
            const isHovered = hovered === book.id;
            const spineW = Math.round(book.thickness * 0.45);

            return (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.05 + i * 0.07, ease: EASE }}
                style={{ position: "relative", flexShrink: 0 }}
                onHoverStart={() => setHovered(book.id)}
                onHoverEnd={() => setHovered(null)}
              >
                {/* Tooltip */}
                <motion.div
                  initial={false}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
                  transition={{ duration: 0.22 }}
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 16px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#0f0f0f",
                    padding: "10px 12px",
                    width: isMobile ? 148 : 172,
                    pointerEvents: "none",
                    zIndex: 30,
                    boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: 11,
                      fontWeight: 700,
                      lineHeight: 1.4,
                      color: "#fff",
                      marginBottom: 4,
                      letterSpacing: "0.2px",
                    }}
                  >
                    {book.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.5)",
                      marginBottom: 8,
                    }}
                  >
                    {book.author}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div
                      style={{
                        display: "inline-block",
                        padding: "2px 7px",
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: 2,
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "1.2px",
                        textTransform: "uppercase",
                        color: book.accentColor,
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {book.genre}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background:
                            book.status === "Reading now"
                              ? "#4ade80"
                              : book.status === "Up next"
                              ? "#fbbf24"
                              : "rgba(255,255,255,0.3)",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: 9,
                          color: "rgba(255,255,255,0.4)",
                          letterSpacing: "0.5px",
                          textTransform: "uppercase",
                        }}
                      >
                        {book.status}
                      </span>
                    </div>
                  </div>
                  {/* Arrow */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: -5,
                      left: "50%",
                      transform: "translateX(-50%) rotate(45deg)",
                      width: 10,
                      height: 10,
                      background: "#0f0f0f",
                    }}
                  />
                </motion.div>

                {/* Book link */}
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", textDecoration: "none" }}
                  tabIndex={0}
                >
                  {/* 3D Book */}
                  <motion.div
                    animate={{
                      rotateY: isHovered ? -32 : -10,
                      y: isHovered ? -20 : 0,
                    }}
                    transition={{ duration: 0.48, ease: EASE }}
                    style={{
                      width: COVER_WIDTH,
                      height: isMobile ? Math.round(book.height * 0.76) : book.height,
                      position: "relative",
                      transformStyle: "preserve-3d",
                      perspective: "900px",
                    }}
                  >
                    {/* Spine strip */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: spineW,
                        height: "100%",
                        background: book.spineColor,
                        zIndex: 2,
                        borderRadius: "1px 0 0 1px",
                      }}
                    >
                      {/* Spine texture */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(255,255,255,0.025) 5px, rgba(255,255,255,0.025) 6px)",
                        }}
                      />
                    </div>

                    {/* Cover face */}
                    <div
                      style={{
                        position: "absolute",
                        left: spineW,
                        top: 0,
                        right: 0,
                        height: "100%",
                        background: book.coverGradient,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "12px 10px 10px",
                        overflow: "hidden",
                        boxShadow: isHovered
                          ? "inset -2px 0 0 rgba(255,255,255,0.12)"
                          : "inset -1px 0 0 rgba(255,255,255,0.07)",
                        transition: "box-shadow 0.3s",
                      }}
                    >
                      {/* Genre badge */}
                      <div
                        style={{
                          display: "inline-block",
                          padding: "2px 6px",
                          background: book.id === 2 ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.3)",
                          borderRadius: 2,
                          alignSelf: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: 8,
                            fontWeight: 700,
                            letterSpacing: "1.5px",
                            textTransform: "uppercase",
                            color: book.accentColor,
                          }}
                        >
                          {book.genre}
                        </span>
                      </div>

                      {/* Title + author */}
                      <div>
                        <p
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: 11,
                            fontWeight: 700,
                            lineHeight: 1.4,
                            color: book.accentColor,
                            marginBottom: 5,
                            letterSpacing: "0.1px",
                          }}
                        >
                          {book.title}
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: 9,
                            color: book.id === 2 ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.55)",
                            letterSpacing: "0.2px",
                          }}
                        >
                          {book.author}
                        </p>
                      </div>

                      {/* Gloss overlay */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "45%",
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
                          pointerEvents: "none",
                        }}
                      />
                    </div>

                    {/* Top face (pages) */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "100%",
                        left: spineW,
                        right: 0,
                        height: 6,
                        background:
                          "linear-gradient(90deg, #e5e5e5 0%, #f5f5f5 40%, #e0e0e0 100%)",
                        transformOrigin: "bottom center",
                        transform: "rotateX(-80deg)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Page lines */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.04) 1px, rgba(0,0,0,0.04) 2px)",
                        }}
                      />
                    </div>
                  </motion.div>
                </a>

                {/* Ground shadow */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 0.55 : 0.18,
                    scaleX: isHovered ? 1.15 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute",
                    bottom: -3,
                    left: "15%",
                    width: "70%",
                    height: 6,
                    background: "rgba(0,0,0,0.7)",
                    filter: "blur(5px)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Wood shelf plank */}
        <div>
          <div
            style={{
              height: 14,
              background:
                "linear-gradient(180deg, #dbb070 0%, #c09050 40%, #a07040 100%)",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.2)",
              position: "relative",
            }}
          >
            {/* Wood grain */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "repeating-linear-gradient(90deg, transparent, transparent 70px, rgba(0,0,0,0.035) 70px, rgba(0,0,0,0.035) 72px)",
              }}
            />
          </div>
          {/* Drop shadow */}
          <div
            style={{
              height: 10,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.14) 0%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
