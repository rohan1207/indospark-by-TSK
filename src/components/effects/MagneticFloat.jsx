"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Subtle magnetic pull toward the cursor — smooth, elegant, restrained.
 * Outer node keeps layout classes; inner node receives GSAP transforms.
 */
export default function MagneticFloat({
  children,
  className = "",
  strength = 0.18,
  max = 18,
}) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const xTo = gsap.quickTo(inner, "x", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(inner, "y", { duration: 0.7, ease: "power3.out" });
    const rTo = gsap.quickTo(inner, "rotation", { duration: 0.85, ease: "power3.out" });

    const field = outer.closest("[data-magnetic-field]") || outer.parentElement;
    if (!field) return;

    const onMove = (e) => {
      const rect = outer.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let dx = (e.clientX - cx) * strength;
      let dy = (e.clientY - cy) * strength;
      dx = Math.max(-max, Math.min(max, dx));
      dy = Math.max(-max, Math.min(max, dy));
      xTo(dx);
      yTo(dy);
      rTo(dx * 0.04);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
      rTo(0);
    };

    field.addEventListener("mousemove", onMove);
    field.addEventListener("mouseleave", onLeave);

    return () => {
      field.removeEventListener("mousemove", onMove);
      field.removeEventListener("mouseleave", onLeave);
      gsap.set(inner, { x: 0, y: 0, rotation: 0 });
    };
  }, [strength, max]);

  return (
    <div ref={outerRef} className={className}>
      <div ref={innerRef} className="relative h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
