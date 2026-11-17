"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
  CONTACT_CHANNELS,
  CONTACT_CITIES,
  CONTACT_OFFICES,
  ENQUIRY_TYPES,
  FIND_US_OPTIONS,
  SISTER_SITES,
} from "./contactData";

function FadeIn({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-4% 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function IconArrowOut({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M7 17L17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FieldLabel({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[14px] font-medium text-ink/50">
      {children}
      {required ? <span className="text-brand"> *</span> : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-black/[0.08] bg-[#f4f4f4] px-3.5 py-3 text-[16px] text-ink outline-none transition placeholder:text-ink/30 focus:border-brand/40 focus:bg-white focus:ring-1 focus:ring-brand/25";

function makeCaptcha() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function scrollToForm() {
  document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ContactPage() {
  const router = useRouter();
  const [captcha, setCaptcha] = useState("4821");
  const [captchaInput, setCaptchaInput] = useState("");
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [findUs, setFindUs] = useState([]);
  const [form, setForm] = useState({
    company: "",
    person: "",
    phone: "",
    email: "",
    location: "",
    enquiry: "general",
    requirements: "",
    additional: "",
    privacy: false,
  });

  useEffect(() => {
    setCaptcha(makeCaptcha());
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const intent = typeof router.query.intent === "string" ? router.query.intent : "";
    if (intent === "software" || intent === "software-download") {
      setForm((f) => ({ ...f, enquiry: intent }));
    }
  }, [router.isReady, router.query.intent]);

  const productNote = useMemo(() => {
    const p = router.query.product;
    return typeof p === "string" ? p : "";
  }, [router.query.product]);

  const onChange = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const toggleFindUs = (id) => {
    setFindUs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileName("");
      return;
    }
    const ok = /\.(png|jpe?g|pdf)$/i.test(file.name);
    if (!ok) {
      setError("Attach only PNG, JPG, JPEG, or PDF files.");
      e.target.value = "";
      setFileName("");
      return;
    }
    setError("");
    setFileName(file.name);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.privacy) {
      setError("Please agree to the Privacy Policy.");
      return;
    }
    if (captchaInput.trim() !== captcha) {
      setError("Verification code does not match. Try again.");
      setCaptcha(makeCaptcha());
      setCaptchaInput("");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-ink">
      {/* Hero, split like home: copy + CTAs + full visual */}
      <section
        className="relative overflow-hidden bg-[#f4f4f4]"
        aria-labelledby="contact-hero-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.045) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />

        <div className="relative mx-auto grid min-h-[min(72svh,640px)] max-w-[1440px] items-center gap-8 px-4 py-10 sm:px-5 sm:py-12 lg:grid-cols-12 lg:gap-10 lg:px-6 lg:py-14 xl:px-8">
          <div className="lg:col-span-5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-brand">
              Contact us
            </p>
            <h1
              id="contact-hero-heading"
              className="mt-3 max-w-md text-[clamp(1.85rem,3.8vw,3.1rem)] font-bold uppercase leading-[1.08] tracking-[-0.02em] text-ink"
            >
              Talk to us
              <br />
              about anchors
            </h1>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink/55 sm:text-[16px]">
              Send your enquiry and we will reply soon. Chemical and mechanical anchors for sites
              across India: Kolhapur, Pune, Mumbai, and beyond.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={scrollToForm}
                className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-ink px-6 text-[15px] font-semibold text-white transition hover:bg-brand"
              >
                Send enquiry
              </button>
              <a
                href="tel:1800123500023"
                className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-white px-5 text-[15px] font-semibold text-ink ring-1 ring-ink/10 transition hover:bg-paper"
              >
                Call toll free
              </a>
              <a
                href="mailto:email@icfs.in"
                className="cursor-target flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white transition hover:scale-105"
                aria-label="Email ICFS"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                  <path
                    d="M4 7.5h16v9H4v-9Zm0 0 8 5.5L20 7.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            <div className="mt-8 grid max-w-md grid-cols-3 gap-3 border-t border-black/[0.08] pt-6">
              {CONTACT_OFFICES.map((o) => (
                <div key={o.id}>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                    {o.label.replace(" Branch", "").replace("Head Office", "HQ")}
                  </p>
                  <p className="mt-1 text-[15px] font-bold tracking-[-0.02em] text-ink">{o.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[280px] overflow-hidden rounded-[1.5rem] sm:min-h-[360px] sm:rounded-[1.75rem] lg:col-span-7 lg:min-h-[480px]">
            <Image
              src="/images/news/exhibition.png"
              alt="ICFS team and customers"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/65">
                Presence
              </p>
              <p className="mt-1.5 max-w-lg text-[16px] font-semibold leading-snug text-white sm:text-[16px]">
                {CONTACT_CITIES.join(" · ")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="mailto:email@icfs.in"
                  className="cursor-target inline-flex items-center rounded-full bg-white/95 px-3.5 py-1.5 text-[14px] font-semibold text-ink transition hover:bg-brand hover:text-white"
                >
                  email@icfs.in
                </a>
                <a
                  href="tel:1800123500023"
                  className="cursor-target inline-flex items-center rounded-full bg-brand px-3.5 py-1.5 text-[14px] font-semibold text-white transition hover:bg-white hover:text-ink"
                >
                  1800 123 500 023
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main split */}
      <section className="border-t border-black/[0.06] bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-14 sm:px-5 sm:py-16 lg:grid-cols-12 lg:gap-14 lg:px-6 lg:py-20 xl:gap-16 xl:px-8">
          <div className="lg:col-span-5">
            <FadeIn>
              <h2 className="max-w-md text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold leading-[1.15] tracking-[-0.03em] text-ink">
                Reach the right desk, first time.
              </h2>
              <p className="mt-3 max-w-md text-[16px] leading-relaxed text-ink/50 sm:text-[16px]">
                Prefer a direct line? Use quick contact below, or fill the form and we&apos;ll
                respond from the right desk.
              </p>
            </FadeIn>

            <FadeIn delay={0.06} className="mt-10">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
                Quick contact
              </p>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                {CONTACT_CHANNELS.map((ch) => (
                  <div key={ch.id}>
                    <p className="text-[14px] font-medium text-ink/40">{ch.label}</p>
                    <a
                      href={ch.href}
                      className="cursor-target mt-1.5 inline-flex items-center gap-1.5 text-[16px] font-semibold text-ink transition hover:text-brand"
                    >
                      {ch.title}
                      <IconArrowOut className="h-3 w-3 text-ink/30" />
                    </a>
                  </div>
                ))}
              </div>
            </FadeIn>

            <div className="mt-10 h-px bg-black/[0.08]" aria-hidden />

            <FadeIn delay={0.1} className="mt-10">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
                Find us
              </p>
              <div className="mt-5 space-y-7">
                {CONTACT_OFFICES.map((office) => (
                  <div key={office.id}>
                    <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                      {office.label}
                    </p>
                    <p className="mt-1.5 text-[16px] font-semibold text-ink">{office.title}</p>
                    <address className="mt-1 not-italic text-[15px] leading-relaxed text-ink/50">
                      {office.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                ))}
              </div>
            </FadeIn>

            <div className="mt-10 h-px bg-black/[0.08]" aria-hidden />

            <FadeIn delay={0.12} className="mt-8">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
                Also visit
              </p>
              <ul className="mt-3 space-y-2">
                {SISTER_SITES.map((site) => (
                  <li key={site.href}>
                    <a
                      href={site.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-target inline-flex items-center gap-1.5 text-[15px] text-ink/55 transition hover:text-brand"
                    >
                      {site.label}
                      <IconArrowOut className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <FadeIn delay={0.08}>
              <div
                id="enquiry-form"
                className="scroll-mt-28 rounded-[1.75rem] border border-black/[0.06] bg-paper p-6 shadow-[0_16px_50px_rgba(0,0,0,0.04)] sm:rounded-[2rem] sm:p-8 lg:p-9"
              >
                <h2 className="max-w-md text-[clamp(1.35rem,2.4vw,1.85rem)] font-bold leading-[1.15] tracking-[-0.03em] text-ink">
                  Send message to us
                </h2>
                <p className="mt-2 text-[15px] text-ink/45">
                  Fields marked <span className="text-brand">*</span> are required.
                </p>

                {submitted ? (
                  <div className="mt-10 rounded-2xl border border-brand/20 bg-brand/[0.06] p-6">
                    <p className="text-[18px] font-bold tracking-[-0.02em] text-ink">
                      Message received.
                    </p>
                    <p className="mt-2 text-[16px] leading-relaxed text-ink/55">
                      Thanks for writing in. Our team will get back to you shortly
                      {form.email ? ` at ${form.email}` : ""}.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setCaptcha(makeCaptcha());
                        setCaptchaInput("");
                        setFileName("");
                        setFindUs([]);
                      }}
                      className="cursor-target btn-shine mt-5 inline-flex h-11 items-center rounded-full bg-ink px-6 text-[15px] font-semibold text-white transition hover:bg-brand"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
                    {productNote ? (
                      <p className="rounded-xl border border-brand/20 bg-brand/[0.06] px-3.5 py-2.5 text-[14px] text-ink/70">
                        Enquiry related to software:{" "}
                        <span className="font-semibold text-ink">{productNote}</span>
                      </p>
                    ) : null}

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <FieldLabel htmlFor="company" required>
                          Name of Company
                        </FieldLabel>
                        <input
                          id="company"
                          required
                          className={inputClass}
                          placeholder="Your company"
                          value={form.company}
                          onChange={onChange("company")}
                        />
                      </div>
                      <div>
                        <FieldLabel htmlFor="person" required>
                          Name of Contact Person
                        </FieldLabel>
                        <input
                          id="person"
                          required
                          className={inputClass}
                          placeholder="Full name"
                          value={form.person}
                          onChange={onChange("person")}
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <FieldLabel htmlFor="phone" required>
                          Tel. No. / Cell No.
                        </FieldLabel>
                        <input
                          id="phone"
                          required
                          type="tel"
                          className={inputClass}
                          placeholder="+91 …"
                          value={form.phone}
                          onChange={onChange("phone")}
                        />
                      </div>
                      <div>
                        <FieldLabel htmlFor="email" required>
                          Email
                        </FieldLabel>
                        <input
                          id="email"
                          required
                          type="email"
                          className={inputClass}
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={onChange("email")}
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <FieldLabel htmlFor="location" required>
                          Address / City / Location
                        </FieldLabel>
                        <input
                          id="location"
                          required
                          className={inputClass}
                          placeholder="City, site, or address"
                          value={form.location}
                          onChange={onChange("location")}
                        />
                      </div>
                      <div>
                        <FieldLabel htmlFor="enquiry">Type of enquiry</FieldLabel>
                        <select
                          id="enquiry"
                          className={`${inputClass} appearance-none bg-white`}
                          value={form.enquiry}
                          onChange={onChange("enquiry")}
                        >
                          {ENQUIRY_TYPES.map((t) => (
                            <option key={t.value} value={t.value}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <FieldLabel htmlFor="requirements" required>
                        Requirements Details
                      </FieldLabel>
                      <textarea
                        id="requirements"
                        required
                        rows={4}
                        className={`${inputClass} min-h-[110px] resize-y`}
                        placeholder="Tell us about products, services, loads, timeline…"
                        value={form.requirements}
                        onChange={onChange("requirements")}
                      />
                    </div>

                    <div>
                      <FieldLabel htmlFor="additional">Additional Details</FieldLabel>
                      <textarea
                        id="additional"
                        rows={3}
                        className={`${inputClass} resize-y`}
                        placeholder="Anything else we should know"
                        value={form.additional}
                        onChange={onChange("additional")}
                      />
                    </div>

                    <fieldset>
                      <legend className="mb-2.5 text-[14px] font-medium text-ink/50">
                        How did you find out about us?
                      </legend>
                      <div className="space-y-2.5">
                        {FIND_US_OPTIONS.map((opt) => (
                          <label
                            key={opt.id}
                            className="flex cursor-pointer items-start gap-2.5 text-[15px] text-ink/65"
                          >
                            <input
                              type="checkbox"
                              checked={findUs.includes(opt.id)}
                              onChange={() => toggleFindUs(opt.id)}
                              className="mt-0.5 h-4 w-4 rounded border-black/20 text-brand focus:ring-brand/40"
                            />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div>
                      <FieldLabel htmlFor="file">
                        Attach File{" "}
                        <span className="font-normal text-ink/35">(PNG, JPG, JPEG, PDF)</span>
                      </FieldLabel>
                      <div className="flex flex-wrap items-center gap-3">
                        <label className="cursor-target inline-flex h-10 items-center rounded-full border border-black/10 bg-white px-4 text-[14px] font-semibold text-ink/70 transition hover:border-brand/40 hover:text-brand">
                          Choose file
                          <input
                            id="file"
                            type="file"
                            accept=".png,.jpg,.jpeg,.pdf,image/png,image/jpeg,application/pdf"
                            className="sr-only"
                            onChange={onFile}
                          />
                        </label>
                        <span className="text-[14px] text-ink/35">
                          {fileName || "No file chosen"}
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 sm:items-end">
                      <div>
                        <FieldLabel htmlFor="captcha" required>
                          Verification Code
                        </FieldLabel>
                        <div className="flex gap-2">
                          <div
                            className="flex h-[46px] min-w-[7.5rem] select-none items-center justify-center rounded-xl border border-black/[0.08] bg-white px-3 text-[18px] font-bold tracking-[0.18em] text-brand"
                            aria-hidden
                          >
                            {captcha}
                          </div>
                          <input
                            id="captcha"
                            required
                            className={inputClass}
                            placeholder="Enter code"
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value)}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setCaptcha(makeCaptcha());
                          setCaptchaInput("");
                        }}
                        className="cursor-target h-11 text-left text-[14px] font-semibold text-ink/40 transition hover:text-brand sm:text-right"
                      >
                        Refresh code
                      </button>
                    </div>

                    {error ? (
                      <p className="text-[15px] text-brand" role="alert">
                        {error}
                      </p>
                    ) : null}

                    <div className="flex flex-col gap-4 border-t border-black/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <label className="flex max-w-sm cursor-pointer items-start gap-2.5 text-[14px] leading-snug text-ink/50">
                        <input
                          type="checkbox"
                          checked={form.privacy}
                          onChange={onChange("privacy")}
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 text-brand focus:ring-brand/40"
                        />
                        <span>
                          I have read and agree to the{" "}
                          <Link
                            href="/privacy"
                            className="underline decoration-ink/25 underline-offset-2 transition hover:text-brand hover:decoration-brand"
                          >
                            Privacy Policy
                          </Link>
                          .
                        </span>
                      </label>

                      <button
                        type="submit"
                        className="cursor-target btn-shine inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-ink px-7 text-[15px] font-semibold text-white transition hover:bg-brand"
                      >
                        Send message
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
