import { MessageSquareText, Phone, Star } from "lucide-react";

// UI-style illustrations for /local-business. Pure markup + CSS animation (lbPop in
// globals.css), so they render on the server and cost no JavaScript.

const card = { background: "var(--white)", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 12px 32px rgba(15,15,15,0.08)" } as const;
const tiny = { fontFamily: "var(--font-inter)", fontSize: 11, lineHeight: 1.35, color: "var(--fg-secondary)", margin: 0 } as const;
const strong = { fontFamily: "var(--font-inter)", fontSize: 12, fontWeight: 600, lineHeight: 1.3, color: "var(--fg)", margin: 0 } as const;
const pop = (delay: number) => ({ animation: `lbPop .6s ${delay}s cubic-bezier(0.22, 1, 0.36, 1) both` });

function IconTile({ children, bg }: { children: React.ReactNode; bg: string }) {
  return (
    <span style={{ width: 30, height: 30, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", background: bg, color: "#fff" }}>
      {children}
    </span>
  );
}

function PhoneFrame({ children, width = 230 }: { children: React.ReactNode; width?: number }) {
  return (
    <div style={{ width, background: "var(--fg)", padding: 8, borderRadius: 30, boxShadow: "0 30px 60px rgba(15,15,15,0.18)" }}>
      <div style={{ background: "#f3f3f1", borderRadius: 23, overflow: "hidden", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 18px 6px", fontFamily: "var(--font-inter)", fontSize: 10, fontWeight: 600, color: "var(--fg)" }}>
          <span>9:41</span>
          <span style={{ width: 54, height: 14, borderRadius: 10, background: "var(--fg)" }} />
          <span style={{ letterSpacing: 1 }}>●●●</span>
        </div>
        {children}
      </div>
    </div>
  );
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
// [day, row, label, isNew]
const SLOTS: [number, number, string, boolean][] = [
  [0, 0, "Ben", false], [0, 2, "Sara", false], [1, 1, "Anna", true], [1, 3, "Tom", false],
  [2, 0, "Lea", false], [2, 1, "Kofi", false], [3, 2, "Mia", false], [4, 0, "Joe", false], [4, 3, "Ivy", false],
];

/** Booking + reminders: a week filling up, with a reminder going out. */
export function BookingIllustration() {
  return (
    <div aria-hidden="true" style={{ position: "relative", width: "100%", maxWidth: 340 }}>
      <div style={{ ...card, padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <p style={strong}>This week</p>
          <p style={{ ...tiny, color: "var(--accent-green)", fontWeight: 600 }}>9 booked</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 5 }}>
          {DAYS.map(d => <p key={d} style={{ ...tiny, fontSize: 10, textAlign: "center", color: "var(--fg-muted)" }}>{d}</p>)}
          {Array.from({ length: 20 }, (_, i) => {
            const day = i % 5, row = Math.floor(i / 5);
            const slot = SLOTS.find(([d, r]) => d === day && r === row);
            return (
              <span key={i} style={{
                height: 24, display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-inter)", fontSize: 9.5, fontWeight: 600,
                background: slot ? (slot[3] ? "var(--accent-green)" : "rgba(109,40,217,0.12)") : "rgba(0,0,0,0.03)",
                color: slot ? (slot[3] ? "#fff" : "var(--accent-purple)") : "transparent",
                ...(slot ? pop(0.1 + i * 0.04) : {}),
              }}>{slot?.[2] ?? "·"}</span>
            );
          })}
        </div>
      </div>
      <div style={{ ...card, position: "absolute", right: -10, bottom: -22, padding: "9px 12px", display: "flex", gap: 9, alignItems: "center", ...pop(0.9) }}>
        <IconTile bg="var(--fg)"><MessageSquareText size={14} /></IconTile>
        <div>
          <p style={strong}>Reminder sent</p>
          <p style={tiny}>Anna · tomorrow 10:30</p>
        </div>
      </div>
    </div>
  );
}

/** Quote form: job details + photos land on the owner's phone in one go. */
export function QuoteIllustration() {
  return (
    <div aria-hidden="true" style={{ position: "relative", width: "100%", maxWidth: 340, display: "flex", gap: 14, alignItems: "center" }}>
      <div style={{ ...card, padding: 14, flex: 1, display: "grid", gap: 7 }}>
        <p style={strong}>Get a quote</p>
        {["Leaking pipe under sink", "Kitchen · ground floor"].map(v => (
          <span key={v} style={{ ...tiny, border: "1px solid rgba(0,0,0,0.1)", padding: "6px 8px", color: "var(--fg)" }}>{v}</span>
        ))}
        <div style={{ display: "flex", gap: 5 }}>
          {["#cbd5e1", "#a5b4fc", "#99f6e4"].map((c, i) => (
            <span key={c} style={{ width: 34, height: 28, background: `linear-gradient(135deg, ${c}, #fff)`, border: "1px solid rgba(0,0,0,0.06)", ...pop(0.2 + i * 0.12) }} />
          ))}
        </div>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: 10.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", background: "var(--fg)", color: "#fff", textAlign: "center", padding: "7px 0" }}>Send</span>
      </div>
      <div style={{ ...card, width: 132, borderRadius: 18, padding: 10, display: "grid", gap: 6, ...pop(0.7) }}>
        <IconTile bg="#0ea5e9"><Phone size={14} /></IconTile>
        <p style={strong}>New quote request</p>
        <p style={tiny}>Leaking pipe · 3 photos</p>
        <span style={{ ...tiny, fontWeight: 600, color: "var(--accent-purple)" }}>Reply →</span>
      </div>
    </div>
  );
}

/** Review requests: a friendly text after the visit, then a new review. */
export function ReviewIllustration() {
  return (
    <div aria-hidden="true" style={{ width: "100%", maxWidth: 320, display: "grid", gap: 10 }}>
      <div style={{ ...card, borderRadius: "16px 16px 16px 4px", padding: "11px 13px", maxWidth: 250, ...pop(0.1) }}>
        <p style={{ ...tiny, color: "var(--fg)", fontSize: 12 }}>Thanks for coming in today! Would you mind leaving us a quick review?</p>
        <p style={{ ...tiny, color: "var(--accent-purple)", fontWeight: 600, marginTop: 6 }}>g.page/your-business/review</p>
      </div>
      <div style={{ ...card, padding: 12, marginLeft: 40, display: "grid", gap: 6, ...pop(0.6) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--accent-green)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 700 }}>L</span>
          <p style={strong}>Lisa K.</p>
          <span style={{ display: "flex", gap: 1, marginLeft: "auto" }}>
            {[0, 1, 2, 3, 4].map(i => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" style={pop(0.8 + i * 0.08)} />)}
          </span>
        </div>
        <p style={tiny}>Lovely team, and booking online took a minute. Will be back!</p>
      </div>
    </div>
  );
}

/** Website: clear on a phone, with prices, hours and a booking button. */
export function SiteIllustration() {
  return (
    <div aria-hidden="true" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <PhoneFrame width={170}>
        <div style={{ padding: "4px 10px 12px", display: "grid", gap: 7 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ width: 46, height: 8, background: "var(--fg)" }} />
            <span style={{ width: 14, height: 8, borderTop: "2px solid var(--fg)", borderBottom: "2px solid var(--fg)" }} />
          </div>
          <div style={{ height: 58, background: "linear-gradient(135deg, rgba(109,40,217,0.18), rgba(0,171,74,0.14))", ...pop(0.15) }} />
          {[["Check-up", "€60"], ["Cleaning", "€85"], ["Open today", "8–18"]].map(([a, b], i) => (
            <div key={a} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.07)", paddingBottom: 4, ...pop(0.3 + i * 0.12) }}>
              <span style={{ ...tiny, fontSize: 10, color: "var(--fg)" }}>{a}</span>
              <span style={{ ...tiny, fontSize: 10, fontWeight: 600, color: "var(--fg)" }}>{b}</span>
            </div>
          ))}
          <span style={{ fontFamily: "var(--font-inter)", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", background: "var(--accent-purple)", color: "#fff", textAlign: "center", padding: "8px 0", ...pop(0.8) }}>Book now</span>
        </div>
      </PhoneFrame>
    </div>
  );
}
