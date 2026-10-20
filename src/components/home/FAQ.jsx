"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FAQS = [
  {
    question: "What are chemical anchors?",
    answer:
      "Chemical anchors use a resin mortar to bond a stud or rebar into drilled concrete or masonry. They are used for structural fixing, façades, machinery bases, and retrofit work where a strong, even hold is needed.",
  },
  {
    question: "Chemical vs mechanical anchors — which should I use?",
    answer:
      "Mechanical anchors expand in the hole for a friction hold. Chemical anchors bond with resin and often suit higher loads, edge distances, and cracked concrete. ICFS offers both — we help you match the product to the base and the load.",
  },
  {
    question: "How do I choose the right fastener?",
    answer:
      "Check the base material, load type, edge distance, and site conditions. Then pick chemical mortar, capsule, stud, or mechanical wedge. Our team and design software can help size the fix.",
  },
  {
    question: "How long does chemical mortar take to cure?",
    answer:
      "It depends on the product and temperature. Many ICFS mortars reach working strength in minutes to a few hours. Always follow the data sheet for gel time and when you can apply full load.",
  },
  {
    question: "Can I buy ICFS anchors online?",
    answer:
      "Yes. Shop chemical mortars, guns, capsules, studs, mechanical anchors, PU foam, and nylon frame anchors on this site. Need bulk or project pricing? Email email@icfs.in or call 1800 123 500 023.",
  },
  {
    question: "What is PU foam used for?",
    answer:
      "ICFS PU foam fills gaps, seals joints, and packs around frames. It expands on site, then cures so you can trim and finish it.",
  },
  {
    question: "Are ICFS anchors tested for safety?",
    answer:
      "Yes. Our fasteners are built for structural use and tested to industry standards. Performance data is available so engineers can specify with confidence.",
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
        <span className="mt-0.5 w-7 shrink-0 text-[14px] font-medium tabular-nums text-ink/35 sm:text-[15px]">
          {number}
        </span>
        <span className="min-w-0 flex-1 text-[16px] font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-[16px]">
          {item.question}
        </span>
        <span
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f4f4f4] text-ink/50 transition ${
            open ? "rotate-180 bg-brand text-white" : ""
          }`}
        >
          <IconChevron className="h-3.5 w-3.5" />
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
            <p className="pb-5 pl-11 pr-10 text-[16px] leading-relaxed text-ink/55 sm:pb-6 sm:pl-12 sm:text-[16px]">
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

  const onToggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-5 lg:grid-cols-12 lg:gap-12 lg:px-6 xl:gap-16 xl:px-8">
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2
              id="faq-heading"
              className="max-w-md text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.035em] text-ink"
            >
              Common questions about ICFS anchors
            </h2>
            <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-ink/55 sm:text-[16px]">
              Clear answers on chemical anchors, mechanical fixings, cure times, and how to order.
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
                    <span className="text-[16px] font-semibold text-ink">WhatsApp help</span>
                    <IconArrowOut className="h-3.5 w-3.5 text-ink/30 transition group-hover:text-brand" />
                  </span>
                  <span className="mt-0.5 block text-[14px] text-ink/45">
                    Weekdays, 9:00–18:00 IST
                  </span>
                </span>
              </a>

              <div className="mx-4 border-t border-black/[0.06] sm:mx-5" />

              <a
                href="mailto:email@icfs.in"
                className="cursor-target group flex items-start gap-3.5 px-4 py-4 transition-colors hover:bg-black/[0.03] sm:px-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink ring-1 ring-black/8">
                  <IconMail className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-[16px] font-semibold text-ink">
                      email@icfs.in
                    </span>
                    <IconArrowOut className="h-3.5 w-3.5 shrink-0 text-ink/30 transition group-hover:text-brand" />
                  </span>
                  <span className="mt-0.5 block text-[14px] text-ink/45">
                    We reply within a few business hours
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 xl:col-span-8">
          <div className="rounded-2xl border border-black/[0.06] bg-[#fafafa] px-4 sm:px-6">
            {FAQS.map((item, index) => (
              <FaqItem
                key={item.question}
                item={item}
                index={index}
                open={openIndex === index}
                onToggle={() => onToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
