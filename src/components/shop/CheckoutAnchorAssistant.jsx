"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ALL_PRODUCTS, CATEGORY_SHORTCUTS } from "@/data/shopCatalog";
import { formatMoney, useCartWishlist } from "./CartWishlistContext";

const SIZES = ["Any", "M8", "M10", "M12", "M16", "M20"];
const STEEL = [
  { id: "any", label: "Any finish" },
  { id: "zinc", label: "Zinc plated" },
  { id: "ss", label: "Stainless / A4" },
];

const inputClass =
  "h-11 w-full rounded-xl border border-black/[0.08] bg-[#f7f6f4] px-3.5 text-[15px] text-ink outline-none transition placeholder:text-ink/35 focus:border-brand/40 focus:bg-white focus:ring-2 focus:ring-brand/15";

function estimateQty(fixings, perFixing, wastePct) {
  const f = Math.max(0, Number(fixings) || 0);
  const p = Math.max(1, Number(perFixing) || 1);
  const w = Math.max(0, Math.min(50, Number(wastePct) || 0));
  return Math.min(999, Math.ceil(f * p * (1 + w / 100)));
}

function matchesSize(product, size) {
  if (!size || size === "Any") return true;
  return product.name.toUpperCase().includes(size.toUpperCase());
}

function matchesSteel(product, steel) {
  if (!steel || steel === "any") return true;
  const n = product.name.toLowerCase();
  const tag = (product.tag || "").toLowerCase();
  if (steel === "ss") {
    return n.includes("stainless") || n.includes("ss") || tag.includes("ss") || n.includes("a4");
  }
  if (steel === "zinc") {
    return !n.includes("stainless") && !tag.includes("ss");
  }
  return true;
}

function scoreBomLine(raw, products) {
  const text = raw.trim();
  if (!text) return null;
  const qtyMatch = text.match(/(?:x|\*|×|,|\s)\s*(\d+)\s*$/i);
  let qty = 1;
  let needle = text;
  if (qtyMatch) {
    qty = Math.min(999, Math.max(1, Number(qtyMatch[1]) || 1));
    needle = text.slice(0, qtyMatch.index).replace(/[,;]+$/, "").trim();
  }
  const lower = needle.toLowerCase();
  const sku = lower.replace(/^icfs-/, "");

  let best = null;
  let bestScore = 0;
  for (const p of products) {
    let score = 0;
    if (p.id.toLowerCase() === sku || p.id.toLowerCase() === lower) score = 100;
    else if (p.sku?.toLowerCase() === lower || p.sku?.toLowerCase() === `icfs-${sku}`) score = 95;
    else if (p.name.toLowerCase() === lower) score = 90;
    else if (p.name.toLowerCase().includes(lower) && lower.length >= 4) score = 70;
    else if (lower.length >= 5 && lower.split(/\s+/).every((w) => p.name.toLowerCase().includes(w))) {
      score = 60;
    }
    if (score > bestScore) {
      bestScore = score;
      best = p;
    }
  }
  if (!best || bestScore < 60) {
    return { raw: text, qty, product: null, unmatched: true };
  }
  return { raw: text, qty, product: best, unmatched: false };
}

export default function CheckoutAnchorAssistant({
  onAttachQuoteNote,
  compact = false,
}) {
  const { addToCart, showToast } = useCartWishlist();
  const [mode, setMode] = useState("selector"); // selector | bom
  const [open, setOpen] = useState(!compact);

  // Smart selector
  const [categoryId, setCategoryId] = useState("studs");
  const [size, setSize] = useState("M12");
  const [steel, setSteel] = useState("any");
  const [ceOnly, setCeOnly] = useState(false);
  const [fixings, setFixings] = useState(10);
  const [perFixing, setPerFixing] = useState(4);
  const [waste, setWaste] = useState(10);
  const [selectedIds, setSelectedIds] = useState([]);

  // BOM / IndoExperts
  const [bomText, setBomText] = useState("");
  const [projectRef, setProjectRef] = useState("");
  const [calcNote, setCalcNote] = useState("");

  const qty = useMemo(
    () => estimateQty(fixings, perFixing, waste),
    [fixings, perFixing, waste]
  );

  const filtered = useMemo(() => {
    return ALL_PRODUCTS.filter((p) => {
      if (categoryId !== "all" && p.categoryId !== categoryId) return false;
      if (!matchesSize(p, size)) return false;
      if (!matchesSteel(p, steel)) return false;
      if (ceOnly) {
        const tag = (p.tag || "").toLowerCase();
        const name = p.name.toLowerCase();
        const approved =
          tag.includes("eta") ||
          name.includes("eta") ||
          tag.includes("ce") ||
          name.includes("ce");
        if (!approved) return false;
      }
      return true;
    }).slice(0, 12);
  }, [categoryId, size, steel, ceOnly]);

  const bomLines = useMemo(() => {
    return bomText
      .split(/\n+/)
      .map((line) => scoreBomLine(line, ALL_PRODUCTS))
      .filter(Boolean);
  }, [bomText]);

  const matchedBom = bomLines.filter((l) => !l.unmatched);
  const unmatchedBom = bomLines.filter((l) => l.unmatched);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const addSelectorToCart = () => {
    const ids = selectedIds.length
      ? selectedIds
      : filtered.slice(0, 1).map((p) => p.id);
    if (!ids.length || qty < 1) {
      showToast("Pick a product and quantity first");
      return;
    }
    ids.forEach((id, i) => addToCart(id, qty, { open: i === ids.length - 1 }));
  };

  const addBomToCart = () => {
    if (!matchedBom.length) {
      showToast("No catalog matches found in BOM");
      return;
    }
    matchedBom.forEach((line, i) =>
      addToCart(line.product.id, line.qty, { open: i === matchedBom.length - 1 })
    );
  };

  const attachQuote = () => {
    const parts = [];
    if (projectRef.trim()) parts.push(`Project / calc ref: ${projectRef.trim()}`);
    if (calcNote.trim()) parts.push(calcNote.trim());
    if (matchedBom.length) {
      parts.push(
        "IndoExperts BOM lines:\n" +
          matchedBom
            .map((l) => `• ${l.product.name} (${l.product.sku}) × ${l.qty}`)
            .join("\n")
      );
    }
    if (unmatchedBom.length) {
      parts.push(
        "Unmatched BOM lines (for sales):\n" +
          unmatchedBom.map((l) => `• ${l.raw}`).join("\n")
      );
    }
    if (mode === "selector" && selectedIds.length) {
      const picks = ALL_PRODUCTS.filter((p) => selectedIds.includes(p.id));
      parts.push(
        `Selector estimate: ${qty} pcs · ${fixings} fixings × ${perFixing}/fixing (+${waste}% waste)\n` +
          picks.map((p) => `• ${p.name}`).join("\n")
      );
    }
    const note = parts.join("\n\n");
    if (!note.trim()) {
      showToast("Add a project ref, note, or BOM first");
      return;
    }
    onAttachQuoteNote?.(note);
    showToast("Attached to checkout as project quote note");
  };

  return (
    <section
      className={`rounded-[1.5rem] bg-white ring-1 ring-black/[0.06] sm:rounded-[1.75rem] ${
        compact ? "" : ""
      }`}
      aria-labelledby="anchor-assistant-heading"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-3 p-5 text-left sm:p-6"
      >
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
            Checkout assistant
          </p>
          <h2
            id="anchor-assistant-heading"
            className="mt-1 text-[18px] font-bold tracking-[-0.02em] text-ink sm:text-[20px]"
          >
            Size anchors & build your order
          </h2>
          <p className="mt-1.5 max-w-xl text-[14px] leading-relaxed text-ink/50 sm:text-[15px]">
            Quick site estimate, or paste an IndoExperts BOM — not a substitute for full EN / ETAG
            design software.
          </p>
        </div>
        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-ink">
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
            fill="none"
            aria-hidden
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div className="border-t border-black/[0.06] px-5 pb-5 sm:px-6 sm:pb-6">
          <div className="flex flex-wrap gap-2 pt-4">
            {[
              { id: "selector", label: "Smart selector" },
              { id: "bom", label: "IndoExperts BOM" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setMode(tab.id)}
                className={`cursor-target rounded-full px-4 py-2 text-[14px] font-semibold transition ${
                  mode === tab.id
                    ? "bg-ink text-white"
                    : "bg-black/[0.04] text-ink/55 hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {mode === "selector" && (
            <div className="mt-5 space-y-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <label className="block sm:col-span-2 lg:col-span-1">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                    Category
                  </span>
                  <select
                    className={`${inputClass} mt-1.5`}
                    value={categoryId}
                    onChange={(e) => {
                      setCategoryId(e.target.value);
                      setSelectedIds([]);
                    }}
                  >
                    {CATEGORY_SHORTCUTS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                    Size
                  </span>
                  <select
                    className={`${inputClass} mt-1.5`}
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    {SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                    Steel
                  </span>
                  <select
                    className={`${inputClass} mt-1.5`}
                    value={steel}
                    onChange={(e) => setSteel(e.target.value)}
                  >
                    {STEEL.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex h-[calc(100%-0.5rem)] items-end pb-0.5">
                  <span className="flex w-full items-center gap-2.5 rounded-xl border border-black/[0.08] bg-[#f7f6f4] px-3.5 py-3 text-[14px] font-medium text-ink">
                    <input
                      type="checkbox"
                      checked={ceOnly}
                      onChange={(e) => setCeOnly(e.target.checked)}
                      className="h-4 w-4 accent-[var(--brand,#c9342e)]"
                    />
                    Prefer ETA / CE tagged
                  </span>
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-4">
                <label className="block">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                    Fixings / plates
                  </span>
                  <input
                    type="number"
                    min={0}
                    className={`${inputClass} mt-1.5`}
                    value={fixings}
                    onChange={(e) => setFixings(e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                    Anchors per fixing
                  </span>
                  <input
                    type="number"
                    min={1}
                    className={`${inputClass} mt-1.5`}
                    value={perFixing}
                    onChange={(e) => setPerFixing(e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                    Waste %
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={50}
                    className={`${inputClass} mt-1.5`}
                    value={waste}
                    onChange={(e) => setWaste(e.target.value)}
                  />
                </label>
                <div className="flex flex-col justify-end rounded-xl bg-ink px-4 py-3 text-white">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/55">
                    Est. quantity
                  </span>
                  <span className="mt-0.5 text-[1.5rem] font-bold tabular-nums tracking-[-0.03em]">
                    {qty}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                  Matching products
                </p>
                <ul className="mt-2 max-h-56 space-y-2 overflow-y-auto pr-1">
                  {filtered.length === 0 && (
                    <li className="rounded-xl bg-[#f7f6f4] px-4 py-3 text-[14px] text-ink/50">
                      No products match these filters — try “Any” size or another category.
                    </li>
                  )}
                  {filtered.map((p) => {
                    const on = selectedIds.includes(p.id);
                    return (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => toggleSelect(p.id)}
                          className={`cursor-target flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                            on
                              ? "border-brand bg-brand/[0.04]"
                              : "border-black/[0.08] hover:border-black/20"
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                              on ? "border-brand bg-brand text-white" : "border-black/20"
                            }`}
                          >
                            {on && (
                              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden>
                                <path
                                  d="M5 13l4 4L19 7"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-black/[0.06]">
                            <Image
                              src={p.image}
                              alt=""
                              fill
                              sizes="44px"
                              className="object-contain p-1"
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[14px] font-semibold text-ink">
                              {p.name}
                            </span>
                            <span className="text-[13px] text-ink/45">
                              {p.sku} · {formatMoney(p.price)}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={addSelectorToCart}
                  className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-brand px-5 text-[14px] font-semibold text-white transition hover:bg-brand-deep"
                >
                  Add {qty} to cart
                  {selectedIds.length > 1 ? ` (${selectedIds.length} items)` : ""}
                </button>
                {typeof onAttachQuoteNote === "function" && (
                  <button
                    type="button"
                    onClick={attachQuote}
                    className="cursor-target inline-flex h-11 items-center rounded-full border border-black/10 px-5 text-[14px] font-semibold text-ink transition hover:border-brand hover:text-brand"
                  >
                    Attach as quote note
                  </button>
                )}
              </div>
            </div>
          )}

          {mode === "bom" && (
            <div className="mt-5 space-y-5">
              <div className="rounded-2xl bg-[#f7f6f4] p-4 text-[14px] leading-relaxed text-ink/60">
                Design in{" "}
                <Link
                  href="/design-software/chemical-anchor-calculation"
                  className="font-semibold text-brand hover:underline"
                >
                  IndoExperts / Chemical Anchor Calculation
                </Link>
                , then paste product lines below (name or SKU + qty). We match the shop catalog and
                add them to cart — calculation stays on the desktop software.
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                    BOM lines
                  </span>
                  <textarea
                    rows={6}
                    className={`${inputClass} mt-1.5 h-auto resize-y py-3 font-mono text-[13px] leading-relaxed`}
                    placeholder={`ICFS CM350P Chemical Mortar, 12\nICFS-S2 40\nAnchor Stud M12 × 80\nCM585 PE 4.6 grade stud, 24`}
                    value={bomText}
                    onChange={(e) => setBomText(e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                    Project / calc reference
                  </span>
                  <input
                    className={`${inputClass} mt-1.5`}
                    value={projectRef}
                    onChange={(e) => setProjectRef(e.target.value)}
                    placeholder="e.g. Bridge pier B2 / file name"
                  />
                </label>
                <label className="block">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                    Note for sales
                  </span>
                  <input
                    className={`${inputClass} mt-1.5`}
                    value={calcNote}
                    onChange={(e) => setCalcNote(e.target.value)}
                    placeholder="EN 1992-4 run, seismic on, etc."
                  />
                </label>
              </div>

              {(matchedBom.length > 0 || unmatchedBom.length > 0) && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-emerald-700/80">
                      Matched ({matchedBom.length})
                    </p>
                    <ul className="mt-2 max-h-40 space-y-1.5 overflow-y-auto text-[13px] text-ink/70">
                      {matchedBom.map((l) => (
                        <li key={`${l.product.id}-${l.raw}`}>
                          {l.product.name} × {l.qty}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                      Needs sales review ({unmatchedBom.length})
                    </p>
                    <ul className="mt-2 max-h-40 space-y-1.5 overflow-y-auto text-[13px] text-ink/50">
                      {unmatchedBom.length === 0 && <li>None</li>}
                      {unmatchedBom.map((l) => (
                        <li key={l.raw}>{l.raw}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={addBomToCart}
                  className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-brand px-5 text-[14px] font-semibold text-white transition hover:bg-brand-deep"
                >
                  Add matched BOM to cart
                </button>
                {typeof onAttachQuoteNote === "function" && (
                  <button
                    type="button"
                    onClick={attachQuote}
                    className="cursor-target inline-flex h-11 items-center rounded-full border border-black/10 px-5 text-[14px] font-semibold text-ink transition hover:border-brand hover:text-brand"
                  >
                    Request quote with BOM
                  </button>
                )}
                <Link
                  href="/design-software"
                  className="cursor-target inline-flex h-11 items-center rounded-full px-4 text-[14px] font-semibold text-ink/50 transition hover:text-brand"
                >
                  Open design software →
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
