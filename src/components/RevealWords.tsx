"use client";
import { Fragment, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const SPRING = [0.22, 1, 0.36, 1] as [number, number, number, number];
const STAGGER = 0.05;

// Slides each word of a heading up into view the first time it scrolls on screen.
// `delay` lets a second span in the same heading start after the first one.
export default function RevealWords({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Watch the outer span: the words themselves start clipped, so they never "intersect"
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return <>{text}</>;

  const words = text.split(/\s+/).filter(Boolean);
  return (
    <span ref={ref}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.1em", marginBottom: "-0.1em" }}>
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ y: "110%" }}
              animate={{ y: inView ? "0%" : "110%" }}
              transition={{ duration: 0.7, ease: SPRING, delay: delay + i * STAGGER }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}

// Delay to pass to a second RevealWords so it continues after `text`.
export const revealDelayAfter = (text: string) => text.split(/\s+/).filter(Boolean).length * STAGGER;
