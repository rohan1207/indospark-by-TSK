"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ITEMS = [
  {
    id: "exhibition",
    tag: "Events",
    title: "Exhibition, Events & Achievements",
    excerpt: "MAHATECH, Pune — ICFS on the floor with live demos and project conversations.",
    href: "/news/mahatech-pune",
    image: "/images/news/exhibition.png",
    alt: "ICFS exhibition booth at a trade fair",
  },
  {
    id: "software",
    tag: "Software",
    title: "ICFS Chemical Anchor / Rebar Design",
    excerpt:
      "Select chemical anchors, cartridge volumes, loads, and concrete dimensions — download the design tools engineers rely on.",
    href: "/design-software",
    image: "/images/news/software.png",
    alt: "ICFS chemical anchor design software on a workstation",
  },
  {
    id: "video",
    tag: "Video",
    title: "ICFS Introduction",
    excerpt: "A short film on ICFS chemical and mechanical anchors — and how we support your projects.",
    href: "https://www.youtube.com/@indospark/videos",
    image: "/images/news/video.png",
    alt: "ICFS product introduction video thumbnail",
    external: true,
    isVideo: true,
  },
  {
    id: "catalogue",
    tag: "Resources",
    title: "New product catalogue release",
    excerpt: "Updated specs across chemical mortars, mechanical anchors, capsules, and site accessories — ready to download.",
    href: "/catalogue",
    image: "/images/banners/mechanical-anchors.png",
    alt: "ICFS mechanical anchors product photography",
  },
];

function NewsCard({ item, index }) {
  const Wrapper = item.external ? "a" : Link;
  const wrapperProps = item.external
    ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: item.href };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)]"
    >
      <Wrapper {...wrapperProps} className="relative block aspect-[16/10] overflow-hidden bg-white">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        {item.isVideo && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-lg">
              <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-px" fill="currentColor" aria-hidden>
                <path d="M8 5.5v13l11-6.5L8 5.5z" />
              </svg>
            </span>
          </span>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/70">
          {item.tag}
        </span>
      </Wrapper>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
        <h3 className="text-[16px] font-bold leading-snug tracking-[-0.015em] text-ink sm:text-[16px]">
          <Wrapper
            {...wrapperProps}
            className="transition-colors hover:text-brand"
          >
            {item.title}
          </Wrapper>
        </h3>
        <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink/55 sm:text-[16px]">
          {item.excerpt}
        </p>
        <Wrapper
          {...wrapperProps}
          className="cursor-target mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink transition-colors hover:text-brand"
        >
          Learn more
          <span className="text-brand" aria-hidden>
            →
          </span>
        </Wrapper>
      </div>
    </motion.article>
  );
}

export default function NewsEvents() {
  return (
    <section
      id="news-events"
      className="bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="news-events-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-6 xl:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
            Stay updated
          </p>
          <h2
            id="news-events-heading"
            className="mt-2 text-[clamp(1.6rem,3vw,2.25rem)] font-bold tracking-[-0.03em] text-ink"
          >
            News &amp; Events
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-black/15" aria-hidden />
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-ink/55">
            Exhibitions, design tools, product films, and catalogue updates.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {ITEMS.map((item, i) => (
            <NewsCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            href="/news"
            className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-ink px-7 text-[15px] font-semibold text-white transition hover:bg-brand"
          >
            View all news &amp; events
          </Link>
        </div>
      </div>
    </section>
  );
}
