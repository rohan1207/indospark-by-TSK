"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { formatMoney, useCartWishlist } from "./CartWishlistContext";

const STEPS = ["Details", "Delivery", "Review"];

const INITIAL = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
  delivery: "standard",
  payment: "quote",
};

function Field({ label, children, error }) {
  return (
    <label className="block">
      <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink/40">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-[13px] font-medium text-brand">{error}</p>}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-xl border border-black/[0.08] bg-[#f7f6f4] px-3.5 text-[16px] text-ink outline-none transition placeholder:text-ink/35 focus:border-brand/40 focus:bg-white focus:ring-2 focus:ring-brand/15";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartLines, cartCount, cartSubtotal, clearCart, hydrated } = useCartWishlist();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const shipping = useMemo(() => {
    if (cartSubtotal <= 0) return 0;
    if (form.delivery === "express") return 499;
    if (form.delivery === "pickup") return 0;
    return cartSubtotal >= 5000 ? 0 : 199;
  }, [cartSubtotal, form.delivery]);

  const total = cartSubtotal + shipping;

  const set = (key) => (e) => {
    const value = e?.target ? e.target.value : e;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const validateDetails = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Valid email required";
    }
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) {
      next.phone = "Valid 10-digit phone required";
    }
    if (!form.address.trim()) next.address = "Address is required";
    if (!form.city.trim()) next.city = "City is required";
    if (!form.pincode.trim() || form.pincode.replace(/\D/g, "").length < 6) {
      next.pincode = "Valid pincode required";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (step === 0 && !validateDetails()) return;
    setStep((s) => Math.min(2, s + 1));
  };

  const placeOrder = async () => {
    if (!validateDetails()) {
      setStep(0);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    const id = `IS-${Date.now().toString().slice(-8)}`;
    setOrderId(id);
    clearCart();
    setSubmitting(false);
  };

  useEffect(() => {
    if (!hydrated) return;
    if (orderId) return;
    if (cartCount === 0) {
      // empty cart — leave them on page with empty state
    }
  }, [hydrated, cartCount, orderId]);

  if (!hydrated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#fafafa] text-[16px] text-ink/45">
        Loading checkout…
      </div>
    );
  }

  if (orderId) {
    return (
      <div className="bg-[#fafafa]">
        <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-5">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-[1.75rem] bg-white p-8 ring-1 ring-black/[0.06] sm:p-10"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="mt-5 text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.03em] text-ink">
              Order received
            </h1>
            <p className="mt-2 text-[16px] text-ink/55">
              Thanks{form.fullName ? `, ${form.fullName.split(" ")[0]}` : ""}. We&apos;ll confirm
              stock and shipping shortly.
            </p>
            <p className="mt-4 rounded-full bg-[#f3f1ee] px-4 py-2 text-[15px] font-semibold text-ink">
              Order ID · {orderId}
            </p>
            <p className="mt-4 text-[15px] text-ink/45">
              A confirmation note will go to <span className="font-medium text-ink">{form.email}</span>
              {form.payment === "quote" ? " with a project quote." : "."}
            </p>
            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
              <Link
                href="/shop"
                className="cursor-target btn-shine inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 text-[15px] font-semibold text-white transition hover:bg-brand"
              >
                Continue shopping
              </Link>
              <Link
                href="/contact"
                className="cursor-target inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-6 text-[15px] font-semibold text-ink transition hover:border-brand hover:text-brand"
              >
                Talk to sales
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (cartCount === 0) {
    return (
      <div className="bg-[#fafafa]">
        <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-5">
          <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.03em] text-ink">
            Your cart is empty
          </h1>
          <p className="mt-2 text-[16px] text-ink/55">Add products before checking out.</p>
          <Link
            href="/shop"
            className="cursor-target btn-shine mt-8 inline-flex h-11 items-center rounded-full bg-brand px-6 text-[15px] font-semibold text-white transition hover:bg-brand-deep"
          >
            Browse shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa]">
      <section className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-5 lg:px-6 xl:px-8">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
            Secure checkout
          </p>
          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="text-[clamp(1.75rem,3.5vw,2.55rem)] font-bold tracking-[-0.035em] text-ink">
              Checkout
            </h1>
            <ol className="flex items-center gap-2">
              {STEPS.map((label, i) => (
                <li key={label} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (i < step) setStep(i);
                    }}
                    className={`flex h-8 items-center gap-2 rounded-full px-3 text-[14px] font-semibold transition ${
                      i === step
                        ? "bg-ink text-white"
                        : i < step
                          ? "bg-brand/10 text-brand"
                          : "bg-black/[0.04] text-ink/35"
                    }`}
                  >
                    <span className="tabular-nums">{i + 1}</span>
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <span className="h-px w-4 bg-black/10" aria-hidden />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-8 sm:px-5 lg:grid-cols-12 lg:gap-10 lg:px-6 lg:py-12 xl:px-8">
        {/* Form column */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="rounded-[1.5rem] bg-white p-5 ring-1 ring-black/[0.06] sm:rounded-[1.75rem] sm:p-7"
            >
              {step === 0 && (
                <div className="space-y-4">
                  <h2 className="text-[18px] font-bold tracking-[-0.02em] text-ink">
                    Contact & shipping
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" error={errors.fullName}>
                      <input
                        className={inputClass}
                        value={form.fullName}
                        onChange={set("fullName")}
                        placeholder="Your name"
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Company (optional)">
                      <input
                        className={inputClass}
                        value={form.company}
                        onChange={set("company")}
                        placeholder="Company / site"
                        autoComplete="organization"
                      />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input
                        type="email"
                        className={inputClass}
                        value={form.email}
                        onChange={set("email")}
                        placeholder="you@company.com"
                        autoComplete="email"
                      />
                    </Field>
                    <Field label="Phone" error={errors.phone}>
                      <input
                        type="tel"
                        className={inputClass}
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="+91 …"
                        autoComplete="tel"
                      />
                    </Field>
                  </div>
                  <Field label="Address" error={errors.address}>
                    <input
                      className={inputClass}
                      value={form.address}
                      onChange={set("address")}
                      placeholder="Street, area, landmark"
                      autoComplete="street-address"
                    />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="City" error={errors.city}>
                      <input
                        className={inputClass}
                        value={form.city}
                        onChange={set("city")}
                        placeholder="City"
                        autoComplete="address-level2"
                      />
                    </Field>
                    <Field label="State">
                      <input
                        className={inputClass}
                        value={form.state}
                        onChange={set("state")}
                        placeholder="State"
                        autoComplete="address-level1"
                      />
                    </Field>
                    <Field label="Pincode" error={errors.pincode}>
                      <input
                        className={inputClass}
                        value={form.pincode}
                        onChange={set("pincode")}
                        placeholder="6 digits"
                        autoComplete="postal-code"
                      />
                    </Field>
                  </div>
                  <Field label="Order notes (optional)">
                    <textarea
                      rows={3}
                      className={`${inputClass} h-auto resize-none py-3`}
                      value={form.notes}
                      onChange={set("notes")}
                      placeholder="Shutdown window, delivery gate pass, PO number…"
                    />
                  </Field>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-[18px] font-bold tracking-[-0.02em] text-ink">
                      Delivery method
                    </h2>
                    <div className="mt-4 grid gap-2.5">
                      {[
                        {
                          id: "standard",
                          title: "Standard dispatch",
                          text: cartSubtotal >= 5000 ? "Free · 4–7 business days" : "₹199 · 4–7 business days",
                        },
                        {
                          id: "express",
                          title: "Express",
                          text: "₹499 · 1–3 business days (metros)",
                        },
                        {
                          id: "pickup",
                          title: "Branch pickup",
                          text: "Free · Kolhapur / Pune / Mumbai coordination",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => set("delivery")(opt.id)}
                          className={`cursor-target flex items-start gap-3 rounded-2xl border px-4 py-3.5 text-left transition ${
                            form.delivery === opt.id
                              ? "border-brand bg-brand/[0.04]"
                              : "border-black/[0.08] hover:border-black/20"
                          }`}
                        >
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                              form.delivery === opt.id
                                ? "border-brand bg-brand"
                                : "border-black/20"
                            }`}
                          >
                            {form.delivery === opt.id && (
                              <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            )}
                          </span>
                          <span>
                            <span className="block text-[16px] font-semibold text-ink">
                              {opt.title}
                            </span>
                            <span className="mt-0.5 block text-[14px] text-ink/50">{opt.text}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-[18px] font-bold tracking-[-0.02em] text-ink">
                      Payment
                    </h2>
                    <div className="mt-4 grid gap-2.5">
                      {[
                        {
                          id: "quote",
                          title: "Request project quote",
                          text: "Best for bulk / site orders — our team confirms pricing.",
                        },
                        {
                          id: "cod",
                          title: "Cash on delivery / site",
                          text: "Pay on delivery for eligible pin codes.",
                        },
                        {
                          id: "online",
                          title: "Pay online later",
                          text: "We’ll email a payment link after stock confirmation.",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => set("payment")(opt.id)}
                          className={`cursor-target flex items-start gap-3 rounded-2xl border px-4 py-3.5 text-left transition ${
                            form.payment === opt.id
                              ? "border-brand bg-brand/[0.04]"
                              : "border-black/[0.08] hover:border-black/20"
                          }`}
                        >
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                              form.payment === opt.id
                                ? "border-brand bg-brand"
                                : "border-black/20"
                            }`}
                          >
                            {form.payment === opt.id && (
                              <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            )}
                          </span>
                          <span>
                            <span className="block text-[16px] font-semibold text-ink">
                              {opt.title}
                            </span>
                            <span className="mt-0.5 block text-[14px] text-ink/50">{opt.text}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-[18px] font-bold tracking-[-0.02em] text-ink">
                    Review & place order
                  </h2>
                  <div className="rounded-2xl bg-[#f7f6f4] p-4 text-[15px] leading-relaxed text-ink/70">
                    <p className="font-semibold text-ink">{form.fullName}</p>
                    {form.company && <p>{form.company}</p>}
                    <p className="mt-2">
                      {form.address}
                      <br />
                      {form.city}
                      {form.state ? `, ${form.state}` : ""} {form.pincode}
                    </p>
                    <p className="mt-2">
                      {form.email} · {form.phone}
                    </p>
                    <p className="mt-3 text-[14px] text-ink/45">
                      Delivery:{" "}
                      <span className="font-medium text-ink/70">
                        {form.delivery === "express"
                          ? "Express"
                          : form.delivery === "pickup"
                            ? "Branch pickup"
                            : "Standard"}
                      </span>
                      {" · "}
                      Payment:{" "}
                      <span className="font-medium text-ink/70">
                        {form.payment === "cod"
                          ? "COD"
                          : form.payment === "online"
                            ? "Online link later"
                            : "Project quote"}
                      </span>
                    </p>
                    {form.notes && (
                      <p className="mt-2 border-t border-black/5 pt-2 text-[14px]">
                        Notes: {form.notes}
                      </p>
                    )}
                  </div>
                  <p className="text-[14px] text-ink/45">
                    By placing this order you agree to be contacted by ICFS for confirmation,
                    stock, and delivery. This demo checkout does not charge a card.
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] pt-5">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="cursor-target text-[15px] font-semibold text-ink/50 transition hover:text-ink"
                  >
                    ← Back
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => router.push("/shop")}
                    className="cursor-target text-[15px] font-semibold text-ink/50 transition hover:text-ink"
                  >
                    ← Back to shop
                  </button>
                )}

                {step < 2 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-ink px-6 text-[15px] font-semibold text-white transition hover:bg-brand"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={placeOrder}
                    className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-brand px-6 text-[15px] font-semibold text-white transition hover:bg-brand-deep disabled:opacity-60"
                  >
                    {submitting ? "Placing order…" : `Place order · ${formatMoney(total)}`}
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Summary */}
        <aside className="lg:col-span-5">
          <div className="sticky top-28 rounded-[1.5rem] bg-white p-5 ring-1 ring-black/[0.06] sm:rounded-[1.75rem] sm:p-6">
            <h2 className="text-[16px] font-bold tracking-[-0.02em] text-ink">Order summary</h2>
            <ul className="mt-4 max-h-[320px] space-y-3 overflow-y-auto pr-1">
              {cartLines.map(({ product, qty, lineTotal }) => (
                <li key={product.id} className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f5f5f5]">
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain p-1.5"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-[15px] font-semibold leading-snug text-ink">
                      {product.name}
                    </p>
                    <p className="mt-1 text-[14px] text-ink/45">
                      {product.priceLabel} × {qty}
                    </p>
                  </div>
                  <p className="shrink-0 text-[15px] font-bold text-ink">
                    {formatMoney(lineTotal)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-2 border-t border-black/[0.06] pt-4 text-[15px]">
              <div className="flex justify-between text-ink/55">
                <span>Subtotal</span>
                <span className="font-medium text-ink">{formatMoney(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-ink/55">
                <span>Shipping</span>
                <span className="font-medium text-ink">
                  {shipping === 0 ? "Free" : formatMoney(shipping)}
                </span>
              </div>
              <div className="flex justify-between border-t border-black/[0.06] pt-3 text-[16px] font-bold text-ink">
                <span>Total</span>
                <span>{formatMoney(total)}</span>
              </div>
            </div>

            <Link
              href="/cart"
              className="mt-5 inline-flex text-[14px] font-semibold text-brand transition hover:underline"
            >
              Review / edit cart →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
