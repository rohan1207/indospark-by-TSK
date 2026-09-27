"use client";

import dynamic from "next/dynamic";

const TargetCursor = dynamic(() => import("./TargetCursor"), { ssr: false });

/** Site-wide target cursor — desktop only, snaps on .cursor-target CTAs */
export default function SiteCursor() {
  return (
    <TargetCursor
      spinDuration={2}
      hideDefaultCursor
      parallaxOn
      hoverDuration={0.2}
      cursorColor="#1a1a1a"
      cursorColorOnTarget="#c9342e"
    />
  );
}
