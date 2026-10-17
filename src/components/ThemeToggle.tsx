"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Pref = "light" | "dark" | "system";
const KEY = "sam-theme";
const OPTIONS: { value: Pref; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light mode", Icon: Sun },
  { value: "system", label: "Match my device", Icon: Monitor },
  { value: "dark", label: "Dark mode", Icon: Moon },
];

const readPref = (): Pref => {
  try {
    const v = localStorage.getItem(KEY);
    return v === "dark" || v === "system" || v === "light" ? v : "light";
  } catch {
    return "light";
  }
};

// Puts the right theme on <html>. The same rule runs in an inline script in the page head
// (layout.tsx) before first paint, so a returning visitor never sees a flash of the other theme.
const apply = (pref: Pref) => {
  const dark = pref === "dark" || (pref === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
};

// For components that need to know the theme in JavaScript (the Process section)
export function useThemeDark(): boolean {
  return useSyncExternalStore(
    (notify) => {
      const observer = new MutationObserver(notify);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      return () => observer.disconnect();
    },
    () => document.documentElement.getAttribute("data-theme") === "dark",
    () => false,
  );
}

export default function ThemeToggle() {
  const [pref, setPref] = useState<Pref>("light");

  // Read the saved choice once; the page head script has already applied it
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with localStorage after hydration
    setPref(readPref());
  }, []);

  // "Match my device" follows the device when it switches between light and dark
  useEffect(() => {
    if (pref !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [pref]);

  const choose = (next: Pref) => {
    setPref(next);
    try { localStorage.setItem(KEY, next); } catch {}
    apply(next);
  };

  return (
    <div className="theme-toggle" role="group" aria-label="Colour theme">
      {OPTIONS.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => choose(value)}
          aria-pressed={pref === value}
          aria-label={label}
          title={label}
          className={`theme-btn${pref === value ? " is-active" : ""}`}
        >
          <Icon size={15} strokeWidth={2} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
