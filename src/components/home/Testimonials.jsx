"use client";

import Link from "next/link";

const TESTIMONIALS = [
  {
    quote:
      "We are ecstatic to be associated with ICFS. Their knowledge, innovative approach, and genuine passion have greatly enriched our projects.",
    name: "Prashant S. Hadkar",
    role: "Consulting Structural Engineer",
    company: "Structural Practice",
  },
  {
    quote:
      "Being affiliated with ICFS has been an absolute pleasure. Their professionalism, attention to detail, and exceptional products contributed to our success.",
    name: "Hindurao Patil",
    role: "Structural Consultant",
    company: "Consulting",
  },
  {
    quote:
      "Working alongside ICFS has been a delightful experience. Their expertise, reliability, and strong industry reputation add tremendous value.",
    name: "Jaiprakash Mane",
    role: "Consulting Engineer",
    company: "Kaivalya",
  },
  {
    quote:
      "I am so glad I chose Indo Spark & ICFS brand anchor fasteners. They're strong, durable, and easy to use. I would definitely use them again.",
    name: "Anil R. Panjwani",
    role: "Structural Consultant",
    company: "Acme Structural",
  },
  {
    quote:
      "Indo Spark Services amazed me with exceptional quality. Their knowledge and professionalism went beyond the call of duty on my project.",
    name: "Aqueel M.H.",
    role: "Structural Engineer",
    company: "Structure Vizion",
  },
  {
    quote:
      "We have used ICFS Anchor Fasteners in many of our projects. We find their quality compatible with well-known multinational brands.",
    name: "Pramod Beri",
    role: "Chairman",
    company: "Beri Builtspace",
  },
  {
    quote:
      "I highly recommend ICFS Anchor Fasteners and Indo Spark Construction Services for high-quality fasteners and professional support.",
    name: "Indrajeet Nageshkar",
    role: "Architect & Urban Designer",
    company: "Practice",
  },
  {
    quote:
      "Indo Spark Construction Services is a great company to work with. They're responsive and always go the extra mile.",
    name: "Arun Gokhale",
    role: "Principal",
    company: "Gokhale & Associates",
  },
  {
    quote:
      "Exceptional cutting services that exceeded our expectations. Thanks to their expertise and precision, our project soared.",
    name: "Girish Malu",
    role: "Structural Consultant",
    company: "Elite Consultants",
  },
  {
    quote:
      "Excellent wire sawing services. Their expertise and professionalism helped us secure a new business deal.",
    name: "Mukul Parikh",
    role: "Principal",
    company: "Parikh Associates",
  },
  {
    quote:
      "Indo Spark is a one-stop destination for vibration-free concrete cutting and ICFS fasteners. Quality, professionalism, and service impressed us.",
    name: "Prasad Dabeer",
    role: "Owner",
    company: "Designs",
  },
  {
    quote:
      "We use ICFS Rebaring Chemical and Indo Spark Rebaring & Core Cutting. Product quality and performance surpassed our expectations.",
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
    <article className="rounded-2xl border border-black/[0.06] bg-[#f7f7f7] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
      <p className="text-[14px] leading-relaxed text-ink/80">
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
          {initials(item.name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-ink">{item.name}</p>
          <p className="truncate text-[11px] text-ink/45">{item.role}</p>
        </div>
        <p className="hidden max-w-[90px] truncate text-right text-[10px] font-semibold uppercase tracking-[0.08em] text-ink/35 sm:block">
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
            Testimonials
          </p>
          <h2
            id="testimonials-heading"
            className="mt-2 max-w-md text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold leading-[1.12] tracking-[-0.03em] text-ink"
          >
            What engineers and builders say about IndoSpark
          </h2>
          <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-ink/55">
            From structural consultants to site teams — trusted for ICFS fastening systems and specialty concrete services across India.
          </p>

          <div className="mt-5 flex items-center gap-2 text-[13px] text-ink/65">
            <span className="tracking-wide text-brand" aria-hidden="true">
              ★★★★★
            </span>
            <span>4.9 across trusted project reviews</span>
          </div>

          <Link
            href="/testimonials"
            className="cursor-target btn-shine mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-brand"
          >
            Read every review
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="relative h-[420px] overflow-hidden sm:h-[460px] lg:col-span-7 lg:h-[520px]">
          <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2">
            <MarqueeColumn items={COLUMN_A} direction="down" />
            <MarqueeColumn items={COLUMN_B} direction="up" className="hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
