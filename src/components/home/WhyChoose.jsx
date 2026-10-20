"use client";

import Link from "next/link";

const FEATURES = [
  { title: "Since 1978", icon: "heritage" },
  { title: "Strong hold", icon: "anchor" },
  { title: "Clear advice", icon: "support" },
  { title: "On-time stock", icon: "fast" },
  { title: "Design tools", icon: "software" },
  { title: "Tested quality", icon: "safe" },
];

/** Same tooth count on every gear so mesh math stays exact. */
const TEETH = 14;
/** Half-tooth offset seats a tip into the next gear’s valley. */
const HALF_TOOTH_DEG = 180 / TEETH;
/** Identical spin speed — required for continuous meshing. */
const SPIN_DURATION = 36;

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

function GearRing({ className = "", maskId, tone = "ink", phaseDeg = 0 }) {
  const outer = 43.5;
  const inner = 33.5;
  const toothH = 4.6;
  const points = [];
  const rim = tone === "brand" ? "#c9342e" : "#1a1a1a";

  for (let i = 0; i < TEETH; i++) {
    const a0 = (i / TEETH) * Math.PI * 2;
    const a1 = ((i + 0.22) / TEETH) * Math.PI * 2;
    const a2 = ((i + 0.38) / TEETH) * Math.PI * 2;
    const a3 = ((i + 0.62) / TEETH) * Math.PI * 2;
    const a4 = ((i + 0.78) / TEETH) * Math.PI * 2;
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
      <g transform={`rotate(${phaseDeg} 50 50)`} mask={`url(#${maskId})`}>
        <polygon
          points={points.join(" ")}
          fill="#ffffff"
          stroke={rim}
          strokeWidth="1.15"
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
  direction = "cw",
  phaseDeg = 0,
  isFirst = false,
  maskId,
  tone = "ink",
  zIndex = 1,
}) {
  const spinName = direction === "cw" ? "why-gear-spin-cw" : "why-gear-spin-ccw";

  return (
    <div
      className={`relative h-[200px] w-[200px] shrink-0 overflow-visible sm:h-[220px] sm:w-[220px] md:h-[235px] md:w-[235px] xl:h-[250px] xl:w-[250px] ${
        isFirst
          ? ""
          : /* ~12% diameter pull-in → tip seats cleanly in the next valley */
            "-ml-[24px] sm:-ml-[26px] md:-ml-[28px] xl:-ml-[30px]"
      }`}
      style={{ zIndex }}
    >
      <div
        className="why-gear-spin pointer-events-none absolute inset-0 overflow-visible"
        style={{
          animation: `${spinName} ${SPIN_DURATION}s linear infinite`,
          willChange: "transform",
        }}
      >
        <GearRing
          maskId={maskId}
          tone={tone}
          phaseDeg={phaseDeg}
          className="h-full w-full"
        />
      </div>

      <div className="absolute inset-[18%] z-10 flex flex-col items-center justify-center rounded-full bg-white px-3 text-center sm:px-4">
        <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-brand sm:mb-2.5 sm:h-10 sm:w-10 md:h-11 md:w-11">
          <FeatureIcon name={feature.icon} />
        </span>
        <h3 className="max-w-[7.5rem] text-[15px] font-bold leading-snug tracking-[-0.02em] text-ink sm:max-w-[8.5rem] sm:text-[16px] md:text-[17px]">
          {feature.title}
        </h3>
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
            Why choose <span className="text-brand">ICFS</span>
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-[16px] leading-relaxed text-ink/55 sm:mt-3">
            Simple reasons teams pick our chemical and mechanical anchor fasteners.
          </p>
        </div>

        <div className="mx-auto flex max-w-full justify-center overflow-x-auto overflow-y-visible px-2 pb-4 pt-2 [scrollbar-width:none] sm:px-4 [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-min items-center overflow-visible">
            {FEATURES.map((feature, i) => {
              const isOdd = i % 2 === 1;
              return (
                <GearCard
                  key={feature.title}
                  feature={feature}
                  direction={isOdd ? "ccw" : "cw"}
                  phaseDeg={isOdd ? HALF_TOOTH_DEG : 0}
                  isFirst={i === 0}
                  tone={isOdd ? "brand" : "ink"}
                  maskId={`why-gear-mask-${i}`}
                  zIndex={i + 1}
                />
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-center sm:mt-8">
          <Link
            href="/about"
            className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-brand px-7 text-[15px] font-semibold text-white transition hover:bg-brand-deep"
          >
            Learn more about us
          </Link>
        </div>
      </div>
    </section>
  );
}
