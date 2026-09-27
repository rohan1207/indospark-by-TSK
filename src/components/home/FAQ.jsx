"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const FAQS = [
  {
    question: "What are chemical anchors, and where are they used?",
    answer:
      "Chemical anchors use a resin mortar to bond a stud or rebar into drilled concrete or masonry. They’re ideal for structural connections, façade fixing, heavy machinery bases, and retrofit work where high load capacity and vibration resistance matter.",
  },
  {
    question: "What is the difference between chemical anchors and mechanical anchors?",
    answer:
      "Mechanical anchors expand inside the hole to create a friction or key hold. Chemical anchors form a bonded connection with resin, distributing stress more evenly — better for cracked concrete, edge distances, and higher design loads. ICFS offers both systems so you can match the method to the substrate and load.",
  },
  {
    question: "How can I choose the right anchor fastener for my project?",
    answer:
      "Start with base material (concrete, brick, hollow block), load type (tension, shear, dynamic), edge distance, and environment (dry, wet, outdoor). Our team and design software can help size the correct chemical mortar, capsule, stud, or mechanical wedge for your application.",
  },
  {
    question: "How long does a chemical mortar take to cure?",
    answer:
      "Cure time depends on the product grade and ambient temperature. Many ICFS chemical mortars reach working strength within minutes to a few hours in typical site conditions; always follow the technical data sheet for gel time, full cure, and load application windows.",
  },
  {
    question: "What services does IndoSpark offer besides fastening systems?",
    answer:
      "Beyond ICFS fastening products, IndoSpark provides site services including concrete cutting, rebaring, core drilling, wire sawing, and pull-out testing — so supply and installation support stay under one trusted partner.",
  },
  {
    question: "What is PU foam and how is it used in construction?",
    answer:
      "ICFS PU foam is a one-component polyurethane expanding foam used to fill gaps, seal joints, insulate around frames, and close cracks. It expands after application, then cures to a lightweight, durable fill that can be trimmed and finished.",
  },
  {
    question: "Are IndoSpark ICFS anchor fasteners certified for safety?",
    answer:
      "ICFS fasteners are engineered for structural performance and tested to industry standards. Product documentation and performance data are available on request so engineers and contractors can specify with confidence on critical projects.",
  },
];

function IconChat({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M5 18.5V7.8A2.8 2.8 0 0 1 7.8 5h8.4A2.8 2.8 0 0 1 19 7.8v5.4a2.8 2.8 0 0 1-2.8 2.8H9.2L5 18.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrowOut({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M7 17L17 7M10 7h7v7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevron({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FaqItem({ item, index, open, onToggle }) {
  const id = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="border-b border-black/[0.08]">
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="flex w-full items-start gap-4 py-5 text-left sm:gap-5 sm:py-6"
      >
        <span className="mt-0.5 w-7 shrink-0 text-[12px] font-medium tabular-nums text-ink/35 sm:text-[13px]">
          {number}
        </span>

        <span className="min-w-0 flex-1 pt-px text-[15px] font-semibold leading-snug tracking-[-0.015em] text-ink sm:text-[16px]">
          {item.question}
        </span>

        <span
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
            open
              ? "border-brand bg-brand text-white"
              : "border-black/10 bg-white text-ink/50"
          }`}
          aria-hidden
        >
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex"
          >
            <IconChevron />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 pl-11 text-[14px] leading-relaxed text-ink/55 sm:pl-12 sm:text-[15px]">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-5 lg:grid-cols-12 lg:gap-12 lg:px-6 xl:gap-16 xl:px-8">
        {/* Left — sticky intro + contact */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2
              id="faq-heading"
              className="max-w-md text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.035em] text-ink"
            >
              Everything teams ask before specifying ICFS.
            </h2>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-ink/55 sm:text-[15px]">
              Anchors, cure times, services, ordering, and more — clear answers so engineers and contractors can move with confidence.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-black/[0.08] bg-[#f7f7f7]">
              <a
                href="https://wa.me/919873233311"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target group flex items-start gap-3.5 px-4 py-4 transition-colors hover:bg-black/[0.03] sm:px-5 sm:py-4.5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink ring-1 ring-black/8">
                  <IconChat className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[14px] font-semibold text-ink">WhatsApp / Live help</span>
                    <IconArrowOut className="h-3.5 w-3.5 text-ink/30 transition group-hover:text-brand" />
                  </span>
                  <span className="mt-0.5 block text-[12px] text-ink/45">
                    Weekdays, 9:00–18:00 IST
                  </span>
                </span>
              </a>

              <div className="mx-4 border-t border-black/[0.06] sm:mx-5" />

              <a
                href="mailto:email@indospark.com"
                className="cursor-target group flex items-start gap-3.5 px-4 py-4 transition-colors hover:bg-black/[0.03] sm:px-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink ring-1 ring-black/8">
                  <IconMail className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-[14px] font-semibold text-ink">
                      email@indospark.com
                    </span>
                    <IconArrowOut className="h-3.5 w-3.5 shrink-0 text-ink/30 transition group-hover:text-brand" />
                  </span>
                  <span className="mt-0.5 block text-[12px] text-ink/45">
                    Replies within a few business hours
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Right — FAQ list */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="border-t border-black/[0.08]" role="list">
            {FAQS.map((item, index) => (
              <FaqItem
                key={item.question}
                item={item}
                index={index}
                open={openIndex === index}
                onToggle={() => toggle(index)}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-start sm:mt-10">
            <Link
              href="/faq"
              className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-ink px-7 text-[13px] font-semibold text-white transition hover:bg-brand"
            >
              View all questions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
