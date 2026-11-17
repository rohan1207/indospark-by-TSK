"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100063719566813",
    icon: "facebook",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/icfs_official",
    icon: "instagram",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/indo-spark",
    icon: "linkedin",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@indospark/videos",
    icon: "youtube",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/ashutoshch39241",
    icon: "x",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919873233311",
    icon: "whatsapp",
  },
];

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Services", href: "/services" },
  { label: "Pull Out Test", href: "/services/pull-out-test" },
  { label: "Installation", href: "/services/installation" },
  { label: "Design Software", href: "/design-software" },
  { label: "Contact Us", href: "/contact" },
];

const otherLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Payment Policy", href: "/payment-policy" },
  { label: "Membership Policy", href: "/membership-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
];

function IconArrowDiag({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrowUp({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrowRight({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SocialIcon({ name, className = "h-3.5 w-3.5" }) {
  switch (name) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
          <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="3.8" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
          <path d="M6.5 9.5H9v9H6.5v-9ZM7.8 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11 9.5h2.4v1.2h.03c.33-.63 1.15-1.3 2.37-1.3 2.53 0 3 1.67 3 3.83V18.5H16.4v-4.4c0-1.05-.02-2.4-1.46-2.4-1.46 0-1.68 1.14-1.68 2.32v4.48H11v-9Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
          <path d="M21.6 8.2a2.5 2.5 0 0 0-1.8-1.8C18.2 6 12 6 12 6s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 8.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 3.8 2.5 2.5 0 0 0 1.8 1.8C5.8 18 12 18 12 18s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-3.8ZM10 14.8V9.2L15 12l-5 2.8Z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
          <path d="M17.6 4h2.4l-5.3 6.1L21 20h-4.7l-3.7-4.8L8.3 20H5.9l5.7-6.5L3.5 4h4.8l3.3 4.4L17.6 4Zm-.8 14.4h1.3L7.3 5.5H5.9l10.9 12.9Z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
          <path d="M12.04 2C6.5 2 2 6.5 2 12.04c0 1.78.46 3.52 1.35 5.05L2 22l5.05-1.32A10.02 10.02 0 0 0 12.04 22C17.58 22 22 17.5 22 11.96 22 6.42 17.58 2 12.04 2Zm0 18.3a8.3 8.3 0 0 1-4.23-1.16l-.3-.18-3.14.82.84-3.06-.2-.31a8.28 8.28 0 1 1 7.03 3.89Z" />
        </svg>
      );
    default:
      return null;
  }
}

function ColLabel({ children }) {
  return (
    <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink">
      {children}
    </p>
  );
}

function TextLink({ href, children, external = false }) {
  const className =
    "text-[14px] uppercase tracking-[0.06em] text-ink/55 transition-colors hover:text-brand sm:text-[15px]";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function SocialLink({ link }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2.5 text-[14px] uppercase tracking-[0.06em] text-ink/55 transition-colors hover:text-brand sm:text-[15px]"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/12 text-ink/50 transition group-hover:border-brand/30 group-hover:text-brand">
        <SocialIcon name={link.icon} />
      </span>
      {link.label}
    </a>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const onSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("done");
    setEmail("");
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-black/[0.07] bg-white" aria-labelledby="footer-heading">
      <div className="mx-auto max-w-[1440px] px-4 pt-10 sm:px-5 sm:pt-12 lg:px-6 xl:px-8">
        {/* CTA row */}
        <div className="flex items-start justify-between gap-6 border-b border-black/[0.07] pb-8 sm:pb-9">
          <h2
            id="footer-heading"
            className="max-w-3xl text-[clamp(1.5rem,4vw,2.75rem)] font-bold uppercase leading-[1.05] tracking-[-0.03em] text-ink"
          >
            Need the right anchor for your project?
          </h2>
          <Link
            href="/contact"
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-md border border-ink/20 text-ink transition hover:border-brand hover:text-brand sm:inline-flex"
            aria-label="Contact us"
          >
            <IconArrowDiag className="h-5 w-5" />
          </Link>
        </div>

        {/* Mid grid */}
        <div className="grid gap-8 border-b border-black/[0.07] py-8 sm:grid-cols-2 sm:gap-8 sm:py-9 lg:grid-cols-12 lg:gap-6">
          {/* Work with us + newsletter pill */}
          <div className="lg:col-span-3">
            <Link
              href="/contact"
              className="cursor-target btn-shine mb-4 inline-flex h-10 items-center gap-2.5 rounded-full bg-ink px-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-brand"
            >
              <IconArrowRight className="h-3.5 w-3.5" />
              Work with us
            </Link>

            <form onSubmit={onSubscribe} className="mt-2">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <div className="flex h-11 items-center rounded-full border border-ink/15 bg-white pl-4 pr-1.5 transition focus-within:border-brand/40">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "done") setStatus("idle");
                  }}
                  placeholder="Your email"
                  className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink/35"
                />
                <button
                  type="submit"
                  className="cursor-target btn-shine inline-flex h-8 shrink-0 items-center rounded-full bg-brand px-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-brand-deep"
                >
                  Join
                </button>
              </div>
              {status === "done" && (
                <p className="mt-2 text-[14px] font-medium text-brand" role="status">
                  Thanks, you’re on the list.
                </p>
              )}
            </form>
          </div>

          {/* Hello / contact */}
          <div className="lg:col-span-3">
            <ColLabel>Hello</ColLabel>
            <div className="mt-3 space-y-1.5">
              <a
                href="mailto:email@icfs.in"
                className="block text-[15px] text-ink/60 transition hover:text-brand"
              >
                email@icfs.in
              </a>
              <a
                href="tel:1800123500023"
                className="block text-[15px] text-ink/60 transition hover:text-brand"
              >
                Toll Free: 1800 123 500 023
              </a>
              <p className="pt-1 text-[14px] leading-relaxed text-ink/45">
                HQ: Kolhapur
                <br />
                Studio: Pune
              </p>
            </div>

            <ColLabel>
              <span className="mt-5 block">Opening hours</span>
            </ColLabel>
            <p className="mt-2 text-[14px] uppercase tracking-[0.04em] text-ink/50">
              Monday to Saturday / 9AM to 6PM
            </p>
          </div>

          {/* Social */}
          <div className="lg:col-span-3">
            <ColLabel>Social</ColLabel>
            <nav className="mt-3 flex flex-col gap-2.5" aria-label="Social links">
              {socialLinks.map((link) => (
                <SocialLink key={link.label} link={link} />
              ))}
            </nav>
          </div>

          {/* Explore + Other */}
          <div className="grid grid-cols-2 gap-6 lg:col-span-3">
            <div>
              <ColLabel>Explore</ColLabel>
              <nav className="mt-3 flex flex-col gap-2" aria-label="Explore">
                {exploreLinks.map((link) => (
                  <TextLink key={link.href} href={link.href}>
                    {link.label}
                  </TextLink>
                ))}
              </nav>
            </div>
            <div>
              <ColLabel>Other</ColLabel>
              <nav className="mt-3 flex flex-col gap-2" aria-label="Policies">
                {otherLinks.map((link) => (
                  <TextLink key={link.href} href={link.href}>
                    {link.label}
                  </TextLink>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-5 py-6 sm:flex-row sm:justify-between sm:gap-4 sm:py-7">
          <Link href="/" className="shrink-0" aria-label="ICFS home">
            <Image
              src="/logo1.png"
              alt="ICFS: Indo Construction Fastening Systems"
              width={180}
              height={60}
              className="h-10 w-auto sm:h-11"
            />
          </Link>

          <div className="text-center text-[13px] leading-relaxed text-ink/40 sm:text-[14px]">
            <p>All content © ICFS {new Date().getFullYear()}</p>
            <p>Anchor fasteners since 1978</p>
            <p className="mt-1 text-ink/50">
              Designed &amp; developed by :{" "}
              <span className="font-medium text-ink/65">TheSocialKollab</span>
            </p>
          </div>

          <button
            type="button"
            onClick={scrollTop}
            className="cursor-target btn-shine inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-brand"
          >
            <IconArrowUp />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
