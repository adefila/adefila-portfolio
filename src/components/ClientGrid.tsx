"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

// logo: one-colour SVG under /public/clients; aspect is its width / height.
// The brand-colour version sits next to it as "<name>-color.svg" and fades in on hover.
// Without a logo, the client's name is shown as a wordmark.
type Client = { name: string; logo?: string; aspect?: number };

// 12 clients = 3 per cell. Cell i shows CLIENTS[i], then [i + 4], then [i + 8].
const CLIENTS: Client[] = [
  { name: "Calder Health" },
  { name: "BookedEZ", logo: "/clients/bookedez.svg", aspect: 5.08 },
  { name: "Upside ESG", logo: "/clients/upside-esg.svg", aspect: 1.82 },
  { name: "The Initial", logo: "/clients/the-initial.svg", aspect: 3.37 },
  { name: "HitPay", logo: "/clients/hitpay.svg", aspect: 4.16 },
  { name: "Leadopo", logo: "/clients/leadopo.svg", aspect: 7.37 },
  { name: "VPA London" },
  { name: "Talon Tyres", logo: "/clients/talon-tyres.svg", aspect: 5.95 },
  { name: "BindHQ", logo: "/clients/bindhq.svg", aspect: 4.55 },
  { name: "The Prime Media", logo: "/clients/the-prime-media.svg", aspect: 1.56 },
  { name: "Rusty Wears", logo: "/clients/rusty-wears.svg", aspect: 5.57 },
  { name: "Emalbu", logo: "/clients/emalbu.svg", aspect: 3.33 },
];

// Give every logo roughly the same visual area, so wide wordmarks don't
// dwarf stacked or square ones. Height in px at desktop size.
const LOGO_AREA = 3920;
const LOGO_MAX_HEIGHT = 46;
const logoHeight = (aspect: number) => Math.round(Math.min(LOGO_MAX_HEIGHT, Math.sqrt(LOGO_AREA / aspect)));

const CELLS = 4;
const SETS = CLIENTS.length / CELLS;
// Every few seconds all four cells change in a wave, first to last, each a
// beat after the one before it.
const WAVE_EVERY_MS = 3200;
const WAVE_STAGGER_MS = 160;
const SPRING = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function ClientGrid() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const [sets, setSets] = useState<number[]>(() => Array(CELLS).fill(0));
  // The cell under the cursor holds its logo so the colour hover isn't swapped away
  const hoveredCell = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const id = setInterval(() => {
      timers.length = 0; // the last wave's timers have all fired by now
      for (let cell = 0; cell < CELLS; cell++) {
        timers.push(setTimeout(() => {
          if (cell === hoveredCell.current) return;
          setSets((prev) => prev.map((s, i) => (i === cell ? (s + 1) % SETS : s)));
        }, cell * WAVE_STAGGER_MS));
      }
    }, WAVE_EVERY_MS);
    return () => {
      clearInterval(id);
      timers.forEach(clearTimeout);
    };
  }, [reducedMotion]);

  return (
    <section aria-labelledby="clients-label" style={{ width: "100%", paddingBottom: 32 }} className="clients-section">
      <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: 20, paddingRight: 20 }}>
        <p
          id="clients-label"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--fg-muted)",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          {t("clients.label")}
        </p>

        <ul className="clients-grid" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {sets.map((set, cell) => {
            const client = CLIENTS[cell + set * CELLS];
            return (
              <li
                key={cell}
                className="clients-cell"
                data-reveal
                onMouseEnter={() => { hoveredCell.current = cell; }}
                onMouseLeave={() => { hoveredCell.current = null; }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={client.name}
                    initial={{ y: "60%", opacity: 0, filter: "blur(6px)" }}
                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-60%", opacity: 0, filter: "blur(6px)" }}
                    transition={{ duration: 0.6, ease: SPRING }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}
                  >
                    {client.logo && client.aspect ? (
                      <span className="clients-logo-wrap">
                        <Image
                          src={client.logo}
                          alt={client.name}
                          unoptimized
                          className="clients-logo"
                          width={Math.round(logoHeight(client.aspect) * client.aspect)}
                          height={logoHeight(client.aspect)}
                        />
                        <Image
                          src={client.logo.replace(/\.svg$/, "-color.svg")}
                          alt=""
                          aria-hidden="true"
                          unoptimized
                          className="clients-logo-color"
                          width={Math.round(logoHeight(client.aspect) * client.aspect)}
                          height={logoHeight(client.aspect)}
                        />
                      </span>
                    ) : (
                      <span className="clients-wordmark">{client.name}</span>
                    )}
                  </motion.span>
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
