"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ANCHOR_TYPES = [
  "Chemical anchor / stud",
  "Mechanical wedge anchor",
  "Through bolt",
  "Rebar",
  "Other",
];

const SITE_CONDITIONS = ["Indoor", "Outdoor", "Both", "Under construction", "Operational plant"];

const CONCRETE_TYPES = ["RCC", "PCC", "Precast", "Masonry", "Other / mixed"];

const CONCRETE_GRADES = ["M20", "M25", "M30", "M35", "M40+", "Unknown"];

const HIGHLIGHTS = [
  "On-site testing across India",
  "Capacity up to 75 Tons",
  "Covers 8mm to 40mm anchors",
  "Certified reports with client co-signature",
  "Trained technical team ensuring safety & accuracy",
];

const inputClass =
  "w-full rounded-xl border border-black/[0.08] bg-[#f4f4f4] px-3.5 py-3 text-[15px] text-ink outline-none transition placeholder:text-ink/30 focus:border-brand/40 focus:bg-white focus:ring-1 focus:ring-brand/25 sm:text-[16px]";

const labelClass = "mb-1.5 block text-[13px] font-semibold tracking-[-0.01em] text-ink";

function Field({ label, required, hint, children }) {
  return (
    <div>
      <label className={labelClass}>
        {label}
        {required ? <span className="text-brand"> *</span> : null}
      </label>
      {children}
      {hint ? <p className="mt-1.5 text-[12px] leading-snug text-ink/45">{hint}</p> : null}
    </div>
  );
}

function Section({ step, title, children }) {
  return (
    <section className="rounded-2xl border border-black/[0.06] bg-white p-5 sm:p-6 lg:p-7">
      <div className="mb-5 flex items-center gap-3 border-b border-black/[0.06] pb-4">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[13px] font-bold text-white">
          {step}
        </span>
        <h2 className="text-[18px] font-bold tracking-[-0.02em] text-ink sm:text-[19px]">{title}</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

const INITIAL = {
  projectName: "",
  siteName: "",
  siteAddress: "",
  anchorType: "",
  anchorBrand: "",
  anchorDetails: "",
  siteCondition: "",
  concreteType: "",
  concreteGrade: "",
  anchorsAndLoad: "",
  floorNotes: "",
  siteContactName: "",
  siteContactMobile: "",
  siteContactEmail: "",
  execName: "",
  execMobile: "",
  execEmail: "",
  remarks: "",
  confirm: false,
};

export default function PullOutTestBooking() {
  const [form, setForm] = useState(INITIAL);
  const [floorFile, setFloorFile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const photoNames = useMemo(() => photos.map((f) => f.name).join(", "), [photos]);

  const onFloorChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 5 * 1024 * 1024) {
      setError("Floor plan must be 5 MB or smaller.");
      e.target.value = "";
      return;
    }
    setError("");
    setFloorFile(file);
  };

  const onPhotosChange = (e) => {
    const list = Array.from(e.target.files || []);
    if (list.length > 5) {
      setError("You can upload a maximum of 5 site photographs.");
      e.target.value = "";
      return;
    }
    if (list.some((f) => f.size > 5 * 1024 * 1024)) {
      setError("Each photograph must be 5 MB or smaller.");
      e.target.value = "";
      return;
    }
    setError("");
    setPhotos(list);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const required = [
      "projectName",
      "siteName",
      "siteAddress",
      "anchorType",
      "anchorBrand",
      "anchorDetails",
      "siteCondition",
      "concreteType",
      "concreteGrade",
      "anchorsAndLoad",
      "siteContactName",
      "siteContactMobile",
      "siteContactEmail",
      "execName",
      "execMobile",
      "execEmail",
    ];
    const missing = required.find((k) => !String(form[k] || "").trim());
    if (missing) {
      setError("Please fill all required fields marked with *.");
      return;
    }
    if (!form.confirm) {
      setError("Please confirm that the details above are accurate.");
      return;
    }
    setError("");
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-5 sm:py-16 lg:px-6 xl:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-black/[0.06] bg-white p-8 text-center shadow-sm sm:p-10">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">Request received</p>
          <h1 className="mt-2 text-[clamp(1.6rem,3vw,2.1rem)] font-bold tracking-[-0.03em] text-ink">
            Pull out test booking submitted
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink/60">
            Thank you{form.siteContactName ? `, ${form.siteContactName}` : ""}. Our technical team
            will contact you shortly to confirm the test schedule for{" "}
            <span className="font-semibold text-ink">{form.projectName || "your project"}</span>.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/services/pull-out-test"
              className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-brand px-6 text-[15px] font-semibold text-white hover:bg-brand-deep"
            >
              View POT service
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 items-center rounded-full border border-black/10 px-6 text-[15px] font-semibold text-ink hover:border-brand hover:text-brand"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper">
      {/* Page hero */}
      <section className="relative overflow-hidden border-b border-black/[0.06] bg-steel">
        <div className="absolute inset-0">
          <Image
            src="/images/banners/pull-out-test-banner.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-right opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-steel via-steel/90 to-steel/55" aria-hidden />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-4 py-12 sm:px-5 sm:py-14 lg:px-6 xl:px-8">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/55">
            ICFS Services
          </p>
          <h1 className="mt-2 max-w-3xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
            Pull Out Test Booking
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-[16px]">
            On-site anchor pull out testing across India. Fill in the details below and our
            technical team will get in touch to confirm your test schedule.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 sm:px-5 sm:py-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10 lg:px-6 xl:px-8">
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <Section step="1" title="Project Information">
            <Field label="Project Name" required>
              <input className={inputClass} value={form.projectName} onChange={set("projectName")} />
            </Field>
            <Field label="Site Name" required>
              <input className={inputClass} value={form.siteName} onChange={set("siteName")} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Site Address" required>
                <textarea
                  rows={3}
                  className={`${inputClass} resize-y`}
                  value={form.siteAddress}
                  onChange={set("siteAddress")}
                />
              </Field>
            </div>
          </Section>

          <Section step="2" title="Anchor Details">
            <Field label="Type of Anchor Tested" required>
              <select
                className={`${inputClass} appearance-none bg-[#f4f4f4]`}
                value={form.anchorType}
                onChange={set("anchorType")}
              >
                <option value="">Select</option>
                {ANCHOR_TYPES.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Brand of Anchor / Chemical Used" required>
              <input className={inputClass} value={form.anchorBrand} onChange={set("anchorBrand")} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Anchor Details" required hint="Diameter × Length | Embedment Depth">
                <input
                  className={inputClass}
                  placeholder="e.g. M16 × 190 mm | 125 mm embedment"
                  value={form.anchorDetails}
                  onChange={set("anchorDetails")}
                />
              </Field>
            </div>
          </Section>

          <Section step="3" title="Site & Testing Details">
            <Field label="Site Condition" required>
              <select
                className={`${inputClass} appearance-none bg-[#f4f4f4]`}
                value={form.siteCondition}
                onChange={set("siteCondition")}
              >
                <option value="">Select</option>
                {SITE_CONDITIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Type of Concrete" required>
              <select
                className={`${inputClass} appearance-none bg-[#f4f4f4]`}
                value={form.concreteType}
                onChange={set("concreteType")}
              >
                <option value="">Select</option>
                {CONCRETE_TYPES.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Concrete Grade" required>
              <select
                className={`${inputClass} appearance-none bg-[#f4f4f4]`}
                value={form.concreteGrade}
                onChange={set("concreteGrade")}
              >
                <option value="">Select</option>
                {CONCRETE_GRADES.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Number of Anchors & Test Load" required>
              <input
                className={inputClass}
                placeholder="e.g. 10 anchors @ 5 Tons"
                value={form.anchorsAndLoad}
                onChange={set("anchorsAndLoad")}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field
                label="Floor Details / Plan"
                hint="Optional. Image or PDF, up to 5 MB."
              >
                <input
                  type="file"
                  accept="image/*,.pdf,application/pdf"
                  onChange={onFloorChange}
                  className="block w-full text-[14px] text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-brand/10 file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-brand"
                />
                {floorFile ? (
                  <p className="mt-1.5 text-[12px] text-ink/50">{floorFile.name}</p>
                ) : null}
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Floor Details (Notes)" hint="Optional notes about floor / plan">
                <textarea
                  rows={2}
                  className={`${inputClass} resize-y`}
                  value={form.floorNotes}
                  onChange={set("floorNotes")}
                />
              </Field>
            </div>
          </Section>

          <Section step="4" title="Contact Information">
            <div className="sm:col-span-2">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink/45">
                Site Contact Person
              </p>
            </div>
            <Field label="Name" required>
              <input className={inputClass} value={form.siteContactName} onChange={set("siteContactName")} />
            </Field>
            <Field label="Mobile Number" required>
              <input
                className={inputClass}
                inputMode="tel"
                placeholder="e.g. 9876543210"
                value={form.siteContactMobile}
                onChange={set("siteContactMobile")}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Email ID" required>
                <input
                  type="email"
                  className={inputClass}
                  value={form.siteContactEmail}
                  onChange={set("siteContactEmail")}
                />
              </Field>
            </div>

            <div className="sm:col-span-2 pt-2">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink/45">
                Project Executive
              </p>
            </div>
            <Field label="Name" required>
              <input className={inputClass} value={form.execName} onChange={set("execName")} />
            </Field>
            <Field label="Mobile Number" required>
              <input
                className={inputClass}
                inputMode="tel"
                placeholder="e.g. 9876543210"
                value={form.execMobile}
                onChange={set("execMobile")}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Email ID" required>
                <input
                  type="email"
                  className={inputClass}
                  value={form.execEmail}
                  onChange={set("execEmail")}
                />
              </Field>
            </div>
          </Section>

          <Section step="5" title="Site Photographs">
            <div className="sm:col-span-2">
              <Field
                label="Upload Site Photographs"
                hint="Optional. Multiple images allowed, maximum 5 images, 5 MB each (JPG, PNG, WEBP)."
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={onPhotosChange}
                  className="block w-full text-[14px] text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-brand/10 file:px-4 file:py-2 file:text-[13px] file:font-semibold file:text-brand"
                />
                {photoNames ? (
                  <p className="mt-1.5 text-[12px] text-ink/50">{photoNames}</p>
                ) : null}
              </Field>
            </div>
          </Section>

          <Section step="6" title="Additional Information">
            <div className="sm:col-span-2">
              <Field label="Remarks / Special Instructions" hint="Optional">
                <textarea
                  rows={4}
                  className={`${inputClass} resize-y`}
                  value={form.remarks}
                  onChange={set("remarks")}
                />
              </Field>
            </div>
          </Section>

          <div className="rounded-2xl border border-black/[0.06] bg-white p-5 sm:p-6">
            <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-snug text-ink/75">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 accent-brand"
                checked={form.confirm}
                onChange={set("confirm")}
              />
              <span>I confirm that the above details are accurate.</span>
            </label>

            {error ? (
              <p className="mt-4 rounded-xl bg-brand/10 px-3.5 py-2.5 text-[14px] text-brand" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              className="cursor-target btn-shine mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-brand px-6 text-[15px] font-semibold text-white transition hover:bg-brand-deep sm:w-auto sm:min-w-[14rem]"
            >
              Book Pull Out Test
            </button>
            <p className="mt-3 text-[12px] leading-relaxed text-ink/45">
              Your details are secure and used only to schedule your pull out test.
            </p>
          </div>
        </form>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
            <div className="relative h-36 bg-steel">
              <Image
                src="/images/banners/pull-out-test-banner.jpg"
                alt=""
                fill
                sizes="320px"
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/65">
                  Service highlights
                </p>
                <p className="mt-1 text-[20px] font-bold tracking-[-0.02em] text-white">
                  Pull Out Test
                </p>
              </div>
            </div>
            <ul className="space-y-3 p-5">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex gap-2.5 text-[14px] leading-snug text-ink/75">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="border-t border-black/[0.06] bg-paper px-5 py-4">
              <p className="text-[28px] font-bold tracking-[-0.03em] text-brand">75T</p>
              <p className="mt-1 text-[13px] leading-snug text-ink/55">
                Maximum pull out capacity, tested to certified standards.
              </p>
            </div>
            <div className="border-t border-black/[0.06] px-5 py-4">
              <Link
                href="/services/pull-out-test"
                className="text-[14px] font-semibold text-brand hover:text-brand-deep"
              >
                Learn more about POT →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
