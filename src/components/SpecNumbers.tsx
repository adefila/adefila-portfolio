"use client";
import { useEffect } from "react";

// Numbers the section labels (01, 02, 03 ...) in the order they appear on the page. This is done here rather than
// with CSS counters because each section is rendered with content-visibility, which keeps counters from carrying
// across sections. Put one on every page that uses SpecLabel.
export default function SpecNumbers() {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".spec-label b").forEach((el, i) => {
      el.setAttribute("data-n", String(i + 1).padStart(2, "0"));
    });
  }, []);
  return null;
}
