"use client";

import Image from "next/image";

const LEFT = [
  {
    title: "Strong Hold",
    text: "Reliable fastening for demanding applications.",
    icon: "layers",
  },
  {
    title: "Since 1978",
    text: "Decades of experience in construction fastening.",
    icon: "calendar",
  },
  {
    title: "Clear Advice",
    text: "Expert guidance for every project need.",
    icon: "headset",
  },
];

const RIGHT = [
  {
    title: "On-time Stock",
    text: "Ready availability to keep projects moving.",
    icon: "bolt",
  },
  {
    title: "Design Tools",
    text: "Technical resources for the right product selection.",
    icon: "monitor",
  },
  {
    title: "Tested Quality",
    text: "Quality-focused solutions for long-lasting performance.",
    icon: "shield",
  },
];

function FeatureIcon({ name }) {
  const common = "h-[18px] w-[18px]";
  switch (name) {
    case "layers":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path
            d="M12 4.5L3.5 9 12 13.5 20.5 9 12 4.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M3.5 13.5L12 18l8.5-4.5M3.5 16.5L12 21l8.5-4.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 3.5v3M16 3.5v3M3.5 10h17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "headset":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path
            d="M4.5 13.5v-1a7.5 7.5 0 0115 0v1"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M4.5 13.5h2.2A1.8 1.8 0 018.5 15.3v2.2A1.8 1.8 0 016.7 19.3H5.8A1.3 1.3 0 014.5 18v-4.5zM19.5 13.5h-2.2a1.8 1.8 0 00-1.8 1.8v2.2a1.8 1.8 0 001.8 1.8h.9a1.3 1.3 0 001.3-1.3v-4.5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "bolt":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path
            d="M13 3L5.5 13h5.2L10.2 21 18.5 11h-5L13 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "monitor":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <rect x="3.5" y="4.5" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 20h8M12 16.5V20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path
            d="M12 3.5l7 2.5v5.8c0 4.2-2.8 7.8-7 9.2-4.2-1.4-7-5-7-9.2V6L12 3.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M9 12.2l2 2 4-4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

function FeatureCard({ feature }) {
  return (
    <article className="flex items-start gap-3 rounded-[1.35rem] bg-white px-4 py-3.5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.04] sm:gap-3.5 sm:px-5 sm:py-4">
      <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand ring-1 ring-brand/15">
        <FeatureIcon name={feature.icon} />
      </span>
      <div className="min-w-0">
        <h3 className="text-[15px] font-bold tracking-[-0.02em] text-ink sm:text-[16px]">{feature.title}</h3>
        <p className="mt-1 text-[13px] leading-snug text-ink/55 sm:text-[14px]">{feature.text}</p>
      </div>
    </article>
  );
}

function ConnectorSvg() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      viewBox="0 0 1200 520"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Arc above the hub */}
      <path
        d="M390 360 C430 170, 770 170, 810 360"
        stroke="#d7d7d7"
        strokeWidth="1.5"
      />
      {/* Left connectors */}
      <path d="M330 118 C370 118, 400 150, 430 210" stroke="#d7d7d7" strokeWidth="1.4" />
      <path d="M330 250 C380 250, 410 250, 445 265" stroke="#d7d7d7" strokeWidth="1.4" />
      <path d="M330 382 C380 382, 410 340, 450 320" stroke="#d7d7d7" strokeWidth="1.4" />
      {/* Right connectors */}
      <path d="M870 118 C830 118, 800 150, 770 210" stroke="#d7d7d7" strokeWidth="1.4" />
      <path d="M870 250 C820 250, 790 250, 755 265" stroke="#d7d7d7" strokeWidth="1.4" />
      <path d="M870 382 C820 382, 790 340, 750 320" stroke="#d7d7d7" strokeWidth="1.4" />
      {/* Red dots on arc */}
      {[
        [430, 210],
        [480, 185],
        [540, 172],
        [660, 172],
        [720, 185],
        [770, 210],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5.5" fill="#c9342e" />
      ))}
    </svg>
  );
}

export default function WhyChoose() {
  return (
    <section
      id="why-choose"
      className="relative overflow-x-hidden bg-[#f7f7f7] py-14 sm:py-16 lg:py-20"
      aria-labelledby="why-choose-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-5 lg:px-6 xl:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-ink/45 sm:text-[13px]">
            <span className="mr-2 inline-block h-px w-5 bg-ink/25 align-middle" aria-hidden />
            Why choose <span className="text-brand">ICFS</span>
            <span className="ml-2 inline-block h-px w-5 bg-ink/25 align-middle" aria-hidden />
          </p>
          <h2
            id="why-choose-heading"
            className="mt-3 text-[clamp(1.7rem,3.6vw,2.85rem)] font-bold leading-[1.15] tracking-[-0.03em] text-ink"
          >
            Built for{" "}
            <span className="relative inline-block text-ink">
              Stronger
              <span
                className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-brand/80"
                aria-hidden
              />
            </span>{" "}
            Constructions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink/55 sm:text-[16px]">
            Reliable fastening solutions, backed by experience, expertise and a customer-first
            approach.
          </p>
        </div>

        {/* Mobile / tablet: image then stacked cards */}
        <div className="mt-10 lg:hidden">
          <div className="mx-auto mb-8 flex max-w-[18rem] justify-center sm:max-w-[20rem]">
            <div className="relative aspect-square w-full overflow-hidden rounded-full bg-white shadow-[0_18px_40px_rgba(15,23,42,0.12)] ring-[6px] ring-white">
              <div
                className="pointer-events-none absolute -inset-[8%] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 50% 18%, rgba(201,52,46,0.35), transparent 52%)",
                }}
                aria-hidden
              />
              <Image
                src="/images/why-choose-construction.jpg"
                alt="Construction site representing ICFS fastening strength"
                fill
                sizes="320px"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>
          <div className="mx-auto grid max-w-lg gap-3.5">
            {[...LEFT, ...RIGHT].map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>

        {/* Desktop: left / hub / right with connectors */}
        <div className="relative mt-14 hidden lg:block">
          <ConnectorSvg />

          <div className="relative z-10 grid grid-cols-[1fr_minmax(280px,360px)_1fr] items-center gap-6 xl:gap-10">
            <div className="flex flex-col gap-5 xl:gap-6">
              {LEFT.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </div>

            <div className="relative mx-auto w-full max-w-[340px]">
              <div
                className="pointer-events-none absolute left-1/2 top-[-12%] h-[70%] w-[120%] -translate-x-1/2 rounded-[999px]"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(201,52,46,0.28), transparent 68%)",
                }}
                aria-hidden
              />
              <div className="relative aspect-square overflow-hidden rounded-full bg-white shadow-[0_22px_50px_rgba(15,23,42,0.14)] ring-[8px] ring-white">
                <Image
                  src="/images/why-choose-construction.jpg"
                  alt="Construction site representing ICFS fastening strength"
                  fill
                  sizes="360px"
                  className="object-cover"
                  priority={false}
                />
              </div>
            </div>

            <div className="flex flex-col gap-5 xl:gap-6">
              {RIGHT.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
