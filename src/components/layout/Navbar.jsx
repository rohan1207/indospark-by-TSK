"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { useCartWishlist } from "@/components/shop/CartWishlistContext";

const aboutLinks = [
  { label: "Overview", href: "/about#overview" },
  { label: "Our products", href: "/about#verticals" },
  { label: "History", href: "/about#history" },
];

const categoryLinks = [
  { label: "All products", href: "/shop" },
  { label: "Chemical Mortars", href: "/shop?category=mortars" },
  { label: "Chemical Guns", href: "/shop?category=guns" },
  { label: "Chemical Capsules", href: "/shop?category=capsules" },
  { label: "Chemical Anchor Studs", href: "/shop?category=studs" },
  { label: "Mechanical Anchors", href: "/shop?category=mechanical" },
  { label: "PU Foam", href: "/shop?category=foam" },
  { label: "Nylon Frame Anchors", href: "/shop?category=nylon" },
];

const serviceLinks = [
  { label: "All services", href: "/services#service-lines" },
  { label: "Pull Out Test (POT)", href: "/services/pull-out-test" },
  { label: "Installation Services", href: "/services/installation" },
];

const softwareLinks = [
  { label: "All Design Software", href: "/design-software" },
  {
    label: "ICFS Chemical Anchor / Rebar Design",
    href: "/design-software/icfs-chemical-anchor-rebar-design",
  },
  {
    label: "Chemical Anchor Calculation",
    href: "/design-software/chemical-anchor-calculation",
  },
  {
    label: "IndoExpert Professional",
    href: "/design-software/indoexpert-professional",
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about", children: aboutLinks },
  { label: "Shop", href: "/shop", children: categoryLinks },
  { label: "Services", href: "/services", children: serviceLinks },
  { label: "Design Software", href: "/design-software", children: softwareLinks },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact Us", href: "/contact" },
];

const IconSearch = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
    <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconCart = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M3.5 5h1.8l1.4 11.2a1.5 1.5 0 0 0 1.5 1.3h9.1a1.5 1.5 0 0 0 1.5-1.2L20.5 8H7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9.5" cy="20" r="1.2" fill="currentColor" />
    <circle cx="17" cy="20" r="1.2" fill="currentColor" />
  </svg>
);

const IconPhone = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M8.5 3.8c.4-.4 1-.5 1.5-.3l2 1c.5.2.8.7.8 1.2v2.1c0 .4-.2.8-.5 1l-1.3.9a11.5 11.5 0 0 0 5.3 5.3l.9-1.3c.2-.3.6-.5 1-.5h2.1c.5 0 1 .3 1.2.8l1 2c.2.5.1 1.1-.3 1.5l-1.2 1.2c-.4.4-1 .6-1.6.5C10.8 18.7 5.3 13.2 4.8 6.6c-.1-.6.1-1.2.5-1.6L8.5 3.8Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const IconWhatsApp = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.49-8.485" />
  </svg>
);

const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconChevron = ({ className = "h-3.5 w-3.5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function NavItem({ link, active }) {
  const [open, setOpen] = useState(false);
  const hasChildren = Boolean(link.children?.length);

  if (!hasChildren) {
    return (
      <Link
        href={link.href}
        className={`rounded-full px-3 py-1.5 text-[16px] font-medium transition xl:px-3.5 xl:text-[16px] ${
          active
            ? "text-brand"
            : "text-ink/75 hover:bg-black/[0.04] hover:text-ink"
        }`}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={link.href}
        className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[16px] font-medium text-ink/75 transition hover:bg-black/[0.04] hover:text-ink xl:px-3.5 xl:text-[16px]"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        {link.label}
        <IconChevron
          className={`h-3.5 w-3.5 text-ink/45 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-full z-50 min-w-[18rem] max-w-[22rem] pt-2"
          >
            <div className="max-h-[min(70vh,28rem)] overflow-y-auto overflow-hidden rounded-2xl border border-black/5 bg-white py-2 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
              {link.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-4 py-2.5 text-[15px] font-medium text-ink/80 transition hover:bg-brand/5 hover:text-brand"
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const { cartCount, wishlistCount, compareCount, openCart } = useCartWishlist();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(null);

  const isActive = (href) => {
    if (href === "/") return router.pathname === "/";
    if (href.startsWith("/#")) return false;
    return router.pathname === href || router.asPath.startsWith(href);
  };

  const onSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  };

  return (
    <header className="sticky top-0 z-50 bg-white text-ink shadow-[0_1px_0_rgba(0,0,0,0.08)]">
      {/* Utility strip: pills left · search center · contact/shop right */}
      <div className="border-b border-black/8 bg-[#fafafa]">
        <div className="relative mx-auto grid h-11 max-w-[92rem] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <div className="justify-self-start" aria-hidden />

          <form
            onSubmit={onSearch}
            className="relative hidden w-64 justify-self-center md:block lg:w-80"
            role="search"
          >
            <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="h-9 w-full rounded-full border border-black/12 bg-white py-0 pl-10 pr-4 text-[14px] text-ink outline-none placeholder:text-ink/40 focus:border-brand/40 focus:ring-2 focus:ring-brand/10"
            />
          </form>

          <div className="flex items-center justify-self-end gap-2 sm:gap-2.5">
            <a
              href="tel:1800123500023"
              className="hidden h-9 items-center gap-2 rounded-full border border-black/12 bg-white px-3.5 text-[14px] font-semibold text-ink/80 transition hover:border-black/20 hover:text-ink xl:inline-flex"
            >
              <IconPhone className="h-3.5 w-3.5 text-brand" />
              <span>1800 123 500 023</span>
            </a>

            <a
              href="https://wa.me/919873233311"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition hover:brightness-110"
              aria-label="WhatsApp"
            >
              <IconWhatsApp className="h-4 w-4" />
            </a>

            <Link
              href="/shop"
              className="cursor-target btn-shine hidden h-9 items-center rounded-full bg-brand px-4 text-[14px] font-semibold tracking-wide text-white shadow-sm transition hover:bg-brand-deep sm:inline-flex"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex h-[3.85rem] max-w-[92rem] items-center gap-3 px-4 sm:px-6 lg:gap-5 lg:px-8">
        <Link href="/" className="relative shrink-0" aria-label="ICFS home">
          <Image
            src="/logo1.png"
            alt="ICFS: Indo Construction Fastening Systems"
            width={240}
            height={80}
            priority
            className="h-[3.15rem] w-auto sm:h-[3.35rem]"
          />
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <NavItem key={link.label} link={link} active={isActive(link.href)} />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/compare"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/70 transition hover:bg-black/[0.04] hover:text-ink"
            aria-label="Compare products"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
              <path
                d="M7 4v16M17 4v16M4 8h6M14 16h6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            {compareCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-ink px-1 text-[12px] font-bold leading-none text-white">
                {compareCount > 99 ? "99+" : compareCount}
              </span>
            )}
          </Link>
          <Link
            href="/wishlist"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/70 transition hover:bg-black/[0.04] hover:text-ink"
            aria-label="Wishlist"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
              <path
                d="M12 20s-7-4.4-9.2-8.2C1.2 8.6 3 5.5 6.4 5.2c1.8-.2 3.4.7 4.4 2 1-1.3 2.6-2.2 4.4-2 3.4.3 5.2 3.4 3.6 6.6C19 15.6 12 20 12 20Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-ink px-1 text-[12px] font-bold leading-none text-white">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/70 transition hover:bg-black/[0.04] hover:text-ink"
            aria-label="Open cart"
          >
            <IconCart className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-brand px-1 text-[12px] font-bold leading-none text-white">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          </button>

          <button
            type="button"
            className="ml-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/12 text-ink transition hover:bg-black/[0.04] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-black/8 lg:hidden"
          >
            <div className="space-y-1 bg-white px-4 py-4 sm:px-6">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="relative mb-3"
                role="search"
              >
                <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products…"
                  className="h-11 w-full rounded-full border border-black/12 bg-[#fafafa] py-0 pl-10 pr-4 text-[16px] text-ink outline-none placeholder:text-ink/40 focus:border-brand/40"
                />
              </form>

              {navLinks.map((link, i) => {
                const hasChildren = Boolean(link.children?.length);
                const expanded = mobileOpen === link.label;

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    {hasChildren ? (
                      <div>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-[16px] font-medium text-ink/80 transition hover:bg-black/[0.04]"
                          onClick={() => setMobileOpen(expanded ? null : link.label)}
                          aria-expanded={expanded}
                        >
                          {link.label}
                          <IconChevron
                            className={`h-4 w-4 text-ink/40 transition-transform ${expanded ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence>
                          {expanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-3"
                            >
                              {link.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setOpen(false)}
                                  className="block rounded-lg px-3 py-2.5 text-[16px] text-ink/65 hover:bg-brand/5 hover:text-brand"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`block rounded-xl px-3 py-3 text-[16px] font-medium transition hover:bg-black/[0.04] ${
                          isActive(link.href) ? "text-brand" : "text-ink/80"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}

              <div className="mt-3 flex flex-col gap-2 border-t border-black/8 pt-3">
                <a
                  href="tel:1800123500023"
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-[16px] text-ink/70 hover:bg-black/[0.04]"
                >
                  <IconPhone className="h-4 w-4 text-brand" />
                  1800 123 500 023
                </a>
                <Link
                  href="/shop"
                  onClick={() => setOpen(false)}
                  className="btn-shine mt-1 inline-flex h-11 items-center justify-center rounded-full bg-brand px-5 text-[16px] font-semibold text-white"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
