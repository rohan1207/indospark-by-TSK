"use client";

import Link from "next/link";

const TESTIMONIALS = [
  {
    quote:
      "We are glad to work with ICFS. Clear advice and strong products have helped our projects.",
    name: "Prashant S. Hadkar",
    role: "Consulting Structural Engineer",
    company: "Structural Practice",
  },
  {
    quote:
      "Professional team, careful detailing, and fasteners we trust on site. A pleasure to work with.",
    name: "Hindurao Patil",
    role: "Structural Consultant",
    company: "Consulting",
  },
  {
    quote:
      "Reliable products and a team that knows anchoring. ICFS adds real value to our work.",
    name: "Jaiprakash Mane",
    role: "Consulting Engineer",
    company: "Kaivalya",
  },
  {
    quote:
      "I chose ICFS anchor fasteners. They are strong, durable, and easy to use. I would use them again.",
    name: "Anil R. Panjwani",
    role: "Structural Consultant",
    company: "Acme Structural",
  },
  {
    quote:
      "Good quality and clear technical support. The team went the extra mile on our project.",
    name: "Aqueel M.H.",
    role: "Structural Engineer",
    company: "Structure Vizion",
  },
  {
    quote:
      "We have used ICFS anchor fasteners on many projects. Quality matches well-known global brands.",
    name: "Pramod Beri",
    role: "Chairman",
    company: "Beri Builtspace",
  },
  {
    quote:
      "I recommend ICFS anchor fasteners for quality products and helpful support.",
    name: "Indrajeet Nageshkar",
    role: "Architect & Urban Designer",
    company: "Practice",
  },
  {
    quote:
      "Responsive partners who deliver. Easy to work with on fastener supply and advice.",
    name: "Arun Gokhale",
    role: "Principal",
    company: "Gokhale & Associates",
  },
  {
    quote:
      "Chemical anchors performed as specified. Specs were clear and delivery was on time.",
    name: "Girish Malu",
    role: "Structural Consultant",
    company: "Elite Consultants",
  },
  {
    quote:
      "Solid product range and practical guidance for choosing the right fixing.",
    name: "Mukul Parikh",
    role: "Principal",
    company: "Parikh Associates",
  },
  {
    quote:
      "ICFS is our go-to for chemical and mechanical anchors. Quality and service are consistent.",
    name: "Prasad Dabeer",
    role: "Owner",
    company: "Designs",
  },
  {
    quote:
      "We use ICFS rebaring chemical on site. Product quality and performance exceeded expectations.",
    name: "Bhimrao More",
    role: "Developer",
    company: "Suraj Estate",
  },
];

const COLUMN_A = TESTIMONIALS.filter((_, i) => i % 2 === 0);
const COLUMN_B = TESTIMONIALS.filter((_, i) => i % 2 === 1);

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function TestimonialCard({ item }) {
  return (
    <article className="rounded-2xl border border-black/[0.06] bg-[#f7f7f7] p-5">
      <p className="text-[16px] leading-relaxed text-ink/80">
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-[13px] font-bold text-white">
          {initials(item.name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-ink">{item.name}</p>
          <p className="truncate text-[13px] text-ink/45">{item.role}</p>
        </div>
        <p className="hidden max-w-[90px] truncate text-right text-[12px] font-semibold uppercase tracking-[0.08em] text-ink/35 sm:block">
          {item.company}
        </p>
      </div>
    </article>
  );
}

function MarqueeColumn({ items, direction, className = "" }) {
  const loop = [...items, ...items];

  return (
    <div className={`relative h-full overflow-hidden ${className}`}>
      <div
        className={`flex flex-col gap-3 will-change-transform hover:[animation-play-state:paused] ${
          direction === "down" ? "animate-marquee-down" : "animate-marquee-up"
        }`}
      >
        {loop.map((item, index) => (
          <TestimonialCard key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-white text-ink"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-12 sm:px-5 sm:py-14 lg:grid-cols-12 lg:gap-10 lg:px-6 lg:py-16 xl:px-8">
        <div className="flex flex-col justify-center lg:col-span-5">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
            Testimonials
          </p>
          <h2
            id="testimonials-heading"
            className="mt-2 max-w-md text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold leading-[1.12] tracking-[-0.03em] text-ink"
          >
            Trusted by engineers and builders
          </h2>
          <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-ink/55">
            Structural consultants and site teams across India rely on ICFS anchor fasteners.
          </p>

          <div className="mt-5 flex items-center gap-2 text-[15px] text-ink/65">
            <span className="tracking-wide text-brand" aria-hidden="true">
              ★★★★★
            </span>
            <span>4.9 from project reviews</span>
          </div>

          <Link
            href="/contact"
            className="cursor-target btn-shine mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand"
          >
            Talk to us
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="relative h-[420px] lg:col-span-7 lg:h-[480px]">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-white to-transparent" />
          <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2">
            <MarqueeColumn items={COLUMN_A} direction="up" />
            <MarqueeColumn items={COLUMN_B} direction="down" className="hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
