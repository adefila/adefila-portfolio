"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

// The site's own dropdown, used wherever a form needs a choice (never a native select). A square field with the same outline and focus ring as
// the text fields, a list in the same style, and full keyboard use: Enter, Space or the arrows open it, the arrows move, Enter picks, Esc closes,
// typing a letter jumps to a matching option. States: focus (purple outline), open, invalid (red outline), disabled (greyed, not clickable).
export type DropdownOption = { value: string; label: string };

export default function Dropdown({
  id, value, onChange, options, placeholder, invalid = false, disabled = false, onBlur, "aria-label": ariaLabel,
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder: string;
  invalid?: boolean;
  disabled?: boolean;
  onBlur?: () => void;
  "aria-label"?: string;
}) {
  const uid = useId();
  const listId = `${uid}-list`;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const root = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const typed = useRef({ text: "", at: 0 });

  const selected = options.findIndex((o) => o.value === value);
  const choose = (i: number) => {
    const o = options[i];
    if (!o) return;
    onChange(o.value);
    setOpen(false);
    btn.current?.focus();
  };
  const show = () => { if (disabled) return; setActive(selected >= 0 ? selected : 0); setOpen(true); };

  // A click anywhere else closes the list
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) { setOpen(false); onBlur?.(); } };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, onBlur]);

  // Keep the highlighted option in view
  useEffect(() => {
    if (!open) return;
    (list.current?.children[active] as HTMLElement | undefined)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) { e.preventDefault(); show(); }
      return;
    }
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); setOpen(false); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(options.length - 1, i + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(0, i - 1)); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(options.length - 1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(active); }
    else if (e.key === "Tab") { setOpen(false); }
    else if (e.key.length === 1) {
      const now = Date.now();
      typed.current = { text: (now - typed.current.at < 700 ? typed.current.text : "") + e.key.toLowerCase(), at: now };
      const hit = options.findIndex((o) => o.label.toLowerCase().startsWith(typed.current.text));
      if (hit >= 0) setActive(hit);
    }
  };

  const current = selected >= 0 ? options[selected] : null;
  return (
    <div className={`dd${open ? " is-open" : ""}${invalid ? " is-invalid" : ""}${disabled ? " is-disabled" : ""}`} ref={root}>
      <button
        ref={btn}
        id={id}
        type="button"
        className="dd-btn"
        disabled={disabled}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={invalid || undefined}
        aria-label={ariaLabel}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        onBlur={(e) => { if (!root.current?.contains(e.relatedTarget as Node)) { setOpen(false); onBlur?.(); } }}
      >
        <span className={current ? "dd-val" : "dd-ph"}>{current ? current.label : placeholder}</span>
        <ChevronDown size={16} strokeWidth={1.75} className="dd-chev" aria-hidden="true" />
      </button>
      {open && (
        <ul ref={list} id={listId} role="listbox" className="dd-list" tabIndex={-1}>
          {options.map((o, i) => (
            <li
              key={o.value}
              role="option"
              aria-selected={i === selected}
              className={`dd-opt${i === active ? " is-active" : ""}${i === selected ? " is-selected" : ""}`}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(i)}
            >
              <span>{o.label}</span>
              {i === selected && <Check size={14} strokeWidth={2} aria-hidden="true" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
