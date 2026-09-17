"use client";
import { useRef, ReactNode, CSSProperties, ComponentPropsWithoutRef } from "react";

type Props = Omit<ComponentPropsWithoutRef<"a">, "style"> & {
  children: ReactNode;
  href?: string;
  style?: CSSProperties;
  strength?: number;
};

export default function MagneticButton({ children, href, className, style, strength = 0.3, onMouseLeave: externalLeave, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
    externalLeave?.(e);
  };

  const shared: CSSProperties = {
    ...style,
    transition: [style?.transition, "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)"].filter(Boolean).join(", "),
    display: "inline-flex",
  };

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={className}
        style={shared}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      className={className}
      style={shared}
      onMouseMove={onMove}
    >
      {children}
    </span>
  );
}
