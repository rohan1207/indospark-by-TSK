"use client";

/** Minimal CSS 3D cube — used while the hero GLB loads */
export default function CubeLoader({ className = "", label = "Loading 3D model" }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="cube-loader" aria-hidden>
        <div className="cube-loader__scene">
          <div className="cube-loader__cube">
            <span className="cube-loader__face cube-loader__face--front" />
            <span className="cube-loader__face cube-loader__face--back" />
            <span className="cube-loader__face cube-loader__face--right" />
            <span className="cube-loader__face cube-loader__face--left" />
            <span className="cube-loader__face cube-loader__face--top" />
            <span className="cube-loader__face cube-loader__face--bottom" />
          </div>
        </div>
      </div>
      <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ink/35">
        Loading
      </span>
    </div>
  );
}
