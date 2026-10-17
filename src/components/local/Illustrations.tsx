"use client";
import Image from "next/image";
import { CalendarCheck, Check, MessageSquareText, Phone, Send, Star } from "lucide-react";
import { useLang } from "@/context/LangContext";

// Animated UI illustrations for /local-business. Each one is a short story that loops: a slot gets
// booked, a quote request is typed and sent, a review message goes out and a review comes back,
// a customer books on a phone. Pure markup + CSS timelines (the .il-* rules in globals.css), so
// they add no animation code. They start when their card scrolls into view. With "reduce motion" on,
// every element rests in its finished state, which is the complete picture. All decoration:
// the card text beside each one says the same thing. Their words come from the page's translations.

// ── 1. Booking: a cursor books a slot, the count goes up, a reminder is sent ─────────────────
// [day, row, name]. Anna is the booking that happens in the loop.
const SLOTS: [number, number, string][] = [
  [0, 0, "Ben"], [0, 2, "Sara"], [1, 3, "Tom"], [2, 0, "Lea"], [2, 1, "Kofi"],
  [3, 2, "Mia"], [4, 0, "Joe"], [4, 3, "Ivy"],
];

export function BookingIllustration() {
  const { t } = useLang();
  const days = t("il.days").split("|");
  return (
    <div aria-hidden="true" className="il il-book il-loop" style={{ ["--d" as string]: "9s" }}>
      <div className="il-card il-cal">
        <div className="il-cal-head">
          <span className="il-title">{t("il.week")}</span>
          <span className="il-count">
            <span className="il-count-a">{t("il.booked8")}</span>
            <span className="il-count-b">{t("il.booked9")}</span>
          </span>
        </div>
        <div className="il-grid">
          {days.map((d) => <span key={d} className="il-day">{d}</span>)}
          {Array.from({ length: 20 }, (_, i) => {
            const day = i % 5, row = Math.floor(i / 5);
            const slot = SLOTS.find(([d, r]) => d === day && r === row);
            if (day === 1 && row === 1) {
              return (
                <span key={i} className="il-cell il-cell-anna">
                  Anna
                  <svg className="il-cursor" width="18" height="18" viewBox="0 0 24 24"><path d="M5 3l14 8-6 1.8L9.8 19 5 3z" fill="#fff" stroke="#0f0f0f" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                </span>
              );
            }
            return (
              <span key={i} className={slot ? "il-cell il-cell-on il-in" : "il-cell"} style={slot ? { animationDelay: `${0.08 * (i % 9)}s` } : undefined}>
                {slot?.[2]}
              </span>
            );
          })}
        </div>
      </div>
      <div className="il-card il-toast">
        <span className="il-toast-ico"><MessageSquareText size={14} /></span>
        <span>
          <b>{t("il.reminder")}</b>
          <small>{t("il.reminder.sub")}</small>
        </span>
        <Check className="il-toast-check" size={15} strokeWidth={3} />
      </div>
    </div>
  );
}

// ── 2. Quote: the form types itself, a request flies to the owner's phone ────────────────────
export function QuoteIllustration() {
  const { t } = useLang();
  return (
    <div aria-hidden="true" className="il il-quote il-loop" style={{ ["--d" as string]: "10s" }}>
      <div className="il-card il-qform">
        <b className="il-title">{t("il.quote.title")}</b>
        <div className="il-field"><span className="il-type il-t1">{t("il.quote.f1")}</span></div>
        <div className="il-field"><span className="il-type il-t2">{t("il.quote.f2")}</span></div>
        <div className="il-thumbs"><i className="il-th1" /><i className="il-th2" /><i className="il-th3" /></div>
        <div className="il-send">
          <span className="il-send-a">{t("il.send")}</span>
          <span className="il-send-b"><Check size={13} strokeWidth={3} /> {t("il.sent")}</span>
        </div>
      </div>
      <Send className="il-plane" size={18} strokeWidth={2.2} />
      <div className="il-card il-notif">
        <span className="il-notif-ico"><Phone size={15} /><i className="il-badge" /></span>
        <b>{t("il.notif.title")}</b>
        <small>{t("il.notif.sub")}</small>
        <span className="il-reply">{t("il.reply")} <span>→</span></span>
      </div>
    </div>
  );
}

// ── 3. Reviews: the text goes out, a review comes back and the stars fill ────────────────────
export function ReviewIllustration() {
  const { t } = useLang();
  return (
    <div aria-hidden="true" className="il il-review il-loop" style={{ ["--d" as string]: "9s" }}>
      <div className="il-card il-sms">
        <p>{t("il.sms")}</p>
        <span>g.page/your-business/review</span>
        <div className="il-dots"><i /><i /><i /></div>
      </div>
      <div className="il-card il-rev">
        <div className="il-rev-head">
          <span className="il-av">L</span>
          <b>Lisa K.</b>
          <span className="il-stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={13} fill="currentColor" strokeWidth={0} style={{ animationDelay: `${i * 0.22}s` }} />)}</span>
        </div>
        <p><span className="il-type il-t3">{t("il.rev.text")}</span></p>
      </div>
      <span className="il-plus">{t("il.plus")}</span>
    </div>
  );
}

// ── 4. Website on a phone: the whole phone shows, the camera pushes in on Book now ──────────
export function SiteIllustration() {
  const { t } = useLang();
  return (
    <div aria-hidden="true" className="il il-site" style={{ ["--d" as string]: "12s" }}>
      <div className="il-cam">
        <Image className="il-frame" src="/local/iphone-hd.webp" alt="" width={828} height={1709} unoptimized />
        <div className="il-ui">
          <div className="il-banner">
            <span className="il-app"><CalendarCheck size={10} /></span>
            <span><b>Bright Smile</b><small>{t("il.phone.booked")}</small></span>
            <em>now</em>
          </div>
          <div className="il-page">
            <div className="il-nav"><b>Bright Smile</b><span><i /><i /><i /></span></div>
            <div className="il-hero">
              <b>{t("il.phone.headline")}</b>
              <small>{t("il.phone.open")}</small>
              <span className="il-rate">{t("il.phone.rate")}</span>
            </div>
            <ul className="il-list">
              <li><span>{t("il.phone.svc1")}</span><b>$60</b></li>
              <li><span>{t("il.phone.svc2")}</span><b>$85</b></li>
              <li><span>{t("il.phone.svc3")}</span><b>$190</b></li>
            </ul>
            <div className="il-slot"><span>{t("il.phone.slot")}</span><b>{t("il.time")}</b></div>
            <div className="il-team"><i /><i /><i /><span>{t("il.phone.team")}</span></div>
            <div className="il-quote-card">{t("il.phone.quote")}<small>Maria S.</small></div>
            <div className="il-map"><i className="il-pin" /><small>{t("il.phone.street")}</small></div>
          </div>
          <div className="il-cta-bar">
            <div className="il-cta">
              <span className="il-cta-a">{t("il.phone.book")}</span>
              <span className="il-cta-b"><Check size={11} strokeWidth={3} /> {t("il.phone.booked")}</span>
              <i className="il-touch" />
            </div>
          </div>
        </div>
        <span className="il-glare" />
      </div>
    </div>
  );
}
