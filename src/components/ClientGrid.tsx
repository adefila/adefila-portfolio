"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

// logo: optional path under /public (e.g. "/clients/calder-health.svg").
// Without one, the client's name is shown as a wordmark.
type Client = { name: string; logo?: string };

// 12 clients = 3 per cell. Cell i shows CLIENTS[i], then [i + 4], then [i + 8].
const CLIENTS: Client[] = [
  { name: "Calder Health" },
  { name: "BookedEZ" },
  { name: "Upside ESG" },
  { name: "The Initial" },
  { name: "HitPay" },
  { name: "Leadopo" },
  { name: "VPA London" },
  { name: "Talon Tyres" },
  { name: "BindHQ" },
  { name: "The Prime Media" },
  { name: "Rusty Wears" },
  { name: "Emalbu" },
];

const CELLS = 4;
const SETS = CLIENTS.length / CELLS;
// Cells swap one at a time in this order so the grid never changes all at once
const SWAP_ORDER = [0, 2, 1, 3];
const SWAP_EVERY_MS = 1800;
const SPRING = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function ClientGrid() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const [sets, setSets] = useState<number[]>(() => Array(CELLS).fill(0));

  useEffect(() => {
    if (reducedMotion) return;
    let step = 0;
    const id = setInterval(() => {
      const cell = SWAP_ORDER[step % CELLS];
      step++;
      setSets((prev) => prev.map((s, i) => (i === cell ? (s + 1) % SETS : s)));
    }, SWAP_EVERY_MS);
    return () => clearInterval(id);
  }, [reducedMotion]);

  return (
    <section aria-labelledby="clients-label" style={{ width: "100%", paddingBottom: 24 }} className="clients-section">
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
              <li key={cell} className="clients-cell">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={client.name}
                    initial={{ y: "60%", opacity: 0, filter: "blur(6px)" }}
                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-60%", opacity: 0, filter: "blur(6px)" }}
                    transition={{ duration: 0.6, ease: SPRING }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}
                  >
                    {client.logo ? (
                      <Image src={client.logo} alt={client.name} width={140} height={40} style={{ objectFit: "contain", maxHeight: 40, width: "auto" }} />
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
