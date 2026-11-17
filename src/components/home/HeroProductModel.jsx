"use client";

import { useEffect, useRef, useState } from "react";
import CubeLoader from "@/components/effects/CubeLoader";

/**
 * Hero product turntable, auto-spins, drag / touch to orbit.
 * Shows a minimal 3D cube loader until the GLB is ready (no poster image).
 */
export default function HeroProductModel() {
  const [libReady, setLibReady] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const viewerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    import("@google/model-viewer").then(() => {
      if (!cancelled) setLibReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = viewerRef.current;
    if (!el || !libReady) return;

    el.setAttribute("camera-controls", "");
    el.setAttribute("auto-rotate", "");
    el.setAttribute("disable-zoom", "");
    el.setAttribute("touch-action", "none");
    el.setAttribute("interaction-prompt", "none");
    el.setAttribute("environment-image", "neutral");
    el.setAttribute("camera-orbit", "25deg 72deg 92%");
    el.setAttribute("min-camera-orbit", "auto 55deg auto");
    el.setAttribute("max-camera-orbit", "auto 95deg auto");
    el.setAttribute("field-of-view", "30deg");
    el.setAttribute("interpolation-decay", "90");
    el.style.setProperty("--poster-color", "transparent");

    const onLoad = () => setModelLoaded(true);
    el.addEventListener("load", onLoad);

    // Already cached / finished before listener attached
    if (el.loaded) setModelLoaded(true);

    return () => el.removeEventListener("load", onLoad);
  }, [libReady]);

  const showLoader = !libReady || !modelLoaded;

  return (
    <div className="absolute inset-0">
      {showLoader && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-[#fafafa] to-[#f0f0f0]">
          <CubeLoader />
        </div>
      )}

      {libReady && (
        <model-viewer
          ref={viewerRef}
          src="/anchor.glb"
          alt="ICFS chemical fastening product"
          loading="eager"
          reveal="auto"
          auto-rotate-delay="0"
          rotation-per-second="28deg"
          shadow-intensity="0.7"
          exposure="1.08"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            cursor: "grab",
            outline: "none",
            opacity: modelLoaded ? 1 : 0,
            transition: "opacity 0.45s ease",
          }}
        />
      )}
    </div>
  );
}
