"use client";

import Link from "next/link";

const FEATURES = [
  {
    title: "Since 1978",
    description: "Decades of Indo Spark Group expertise behind every ICFS fastening system.",
    icon: "heritage",
  },
  {
    title: "Site-proven hold",
    description: "Chemical & mechanical anchors engineered for real loads and tough substrates.",
    icon: "anchor",
  },
  {
    title: "Engineer support",
    description: "Sizing help, pull-out testing guidance, and responsive project assistance.",
    icon: "support",
  },
  {
    title: "On-time supply",
    description: "Right product on time — from cartridges and studs to foam and guns.",
    icon: "fast",
  },
  {
    title: "Design software",
    description: "ICFS tools to select anchors, embedment, and cartridge volumes with confidence.",
    icon: "software",
  },
  {
    title: "Certified quality",
    description: "Performance-driven fastening built to match global benchmarks on site.",
    icon: "safe",
  },
];

/** Horizontal chain: alternate spin, slight Y jitter, light tooth mesh */
const LAYOUT = [
  { size: "md", direction: "cw", duration: 32, y: 16, overlap: 0 },
  { size: "lg", direction: "ccw", duration: 36, y: 44, overlap: -28 },
  { size: "sm", direction: "cw", duration: 28, y: 0, overlap: -30 },
  { size: "md", direction: "ccw", duration: 34, y: 48, overlap: -28 },
  { size: "lg", direction: "cw", duration: 30, y: 8, overlap: -30 },
  { size: "sm", direction: "ccw", duration: 26, y: 32, overlap: -28 },
];

function FeatureIcon({ name }) {
  const common = "h-5 w-5 sm:h-6 sm:w-6";
  switch (name) {
    case "heritage":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="M4 20V9l8-5 8 5v11" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "anchor":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <circle cx="12" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 9.2V20M8 14c0 3 1.8 5 4 5s4-2 4-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "support":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 12.2l2.2 2.2 4.8-4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "fast":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="M13 3L5.5 13h5.2L10.2 21 18.5 11h-5L13 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "software":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <rect x="3.5" y="4.5" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 20h8M12 16.5V20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="M12 3.5l7 2.5v5.8c0 4.2-2.8 7.8-7 9.2-4.2-1.4-7-5-7-9.2V6L12 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
  }
}

/** Outer toothed ring only — spins; hub cut out so static content stays readable */
function GearRing({ className = "", maskId, tone = "ink" }) {
  // Kept inside viewBox so tooth tips + stroke never clip
  const teeth = 14;
  const outer = 43.5;
  const inner = 33.5;
  const toothH = 4.8;
  const points = [];
  const rim = tone === "brand" ? "#c9342e" : "#1a1a1a";

  for (let i = 0; i < teeth; i++) {
    const a0 = (i / teeth) * Math.PI * 2;
    const a1 = ((i + 0.22) / teeth) * Math.PI * 2;
    const a2 = ((i + 0.38) / teeth) * Math.PI * 2;
    const a3 = ((i + 0.62) / teeth) * Math.PI * 2;
    const a4 = ((i + 0.78) / teeth) * Math.PI * 2;
    const rTip = outer + toothH;

    const pt = (r, a) => `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`;
    points.push(pt(outer, a0), pt(outer, a1), pt(rTip, a2), pt(rTip, a3), pt(outer, a4));
  }

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden overflow="visible">
      <defs>
        <mask id={maskId}>
          <rect x="-4" y="-4" width="108" height="108" fill="white" />
          <circle cx="50" cy="50" r={inner} fill="black" />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>
        <polygon
          points={points.join(" ")}
          fill="#ffffff"
          stroke={rim}
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
      <circle
        cx="50"
        cy="50"
        r={inner}
        fill="none"
        stroke={tone === "brand" ? "#1a1a1a" : "#c9342e"}
        strokeWidth="1.35"
      />
    </svg>
  );
}

function GearCard({
  feature,
  size = "md",
  direction = "cw",
  duration = 28,
  style,
  maskId,
  tone = "ink",
}) {
  const sizeClass =
    size === "lg"
      ? "h-[min(42vw,230px)] w-[min(42vw,230px)] md:h-[240px] md:w-[240px] xl:h-[255px] xl:w-[255px]"
      : size === "sm"
        ? "h-[min(36vw,190px)] w-[min(36vw,190px)] md:h-[200px] md:w-[200px] xl:h-[215px] xl:w-[215px]"
        : "h-[min(38vw,210px)] w-[min(38vw,210px)] md:h-[220px] md:w-[220px] xl:h-[235px] xl:w-[235px]";

  const spinName = direction === "cw" ? "why-gear-spin-cw" : "why-gear-spin-ccw";

  return (
    <div className={`relative shrink-0 overflow-visible ${sizeClass}`} style={style}>
      <div
        className="why-gear-spin pointer-events-none absolute inset-0 overflow-visible"
        style={{
          animation: `${spinName} ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        <GearRing maskId={maskId} tone={tone} className="h-full w-full" />
      </div>

      <div className="absolute inset-[16%] z-10 flex flex-col items-center justify-center rounded-full bg-white px-3 text-center sm:px-3.5">
        <span className="mb-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-brand sm:mb-2 sm:h-10 sm:w-10">
          <FeatureIcon name={feature.icon} />
        </span>
        <h3 className="text-[12px] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[13px] md:text-[14px]">
          {feature.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-ink/50 sm:line-clamp-3 sm:text-[11px]">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export default function WhyChoose() {
  return (
    <section
      id="why-choose"
      className="relative flex min-h-[100svh] flex-col justify-center bg-white py-10 sm:py-12"
      aria-labelledby="why-choose-heading"
    >
      <div className="relative mx-auto w-full max-w-[1440px] px-3 sm:px-5 lg:px-6 xl:px-8">
        <div className="mb-6 text-center sm:mb-8">
          <h2
            id="why-choose-heading"
            className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold tracking-[-0.03em] text-ink"
          >
            Why Choose <span className="text-brand">Us</span>
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-[14px] leading-relaxed text-ink/55 sm:mt-3">
            A fastening system that works like a machine — every part meshed for strength, speed, and site reliability.
          </p>
        </div>

        <div className="mx-auto flex max-w-full justify-center overflow-visible px-4 sm:px-8">
          <div className="flex min-w-min items-start overflow-visible pb-6 pt-2">
            {FEATURES.map((feature, i) => {
              const layout = LAYOUT[i];
              return (
                <GearCard
                  key={feature.title}
                  feature={feature}
                  size={layout.size}
                  direction={layout.direction}
                  duration={layout.duration}
                  tone={i % 2 === 0 ? "ink" : "brand"}
                  maskId={`why-gear-mask-${i}`}
                  style={{
                    marginLeft: layout.overlap,
                    marginTop: layout.y,
                    zIndex: i + 1,
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-center sm:mt-8">
          <Link
            href="/about"
            className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-brand px-7 text-[13px] font-semibold text-white transition hover:bg-brand-deep"
          >
            Learn more about us
          </Link>
        </div>
      </div>
    </section>
  );
}
