"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  SERVICES,
  TECHNOLOGIES,
  getRelatedProjects,
  getRelatedTechnologies,
} from "./servicesData";

export function ServiceDetail({ service }) {
  const relatedTech = getRelatedTechnologies(service);
  const relatedProjects = getRelatedProjects(service);
  const gallery = service.gallery?.length ? service.gallery : [service.image];

  return (
    <article>
      <header className="relative overflow-hidden bg-steel text-white">
        <div className="absolute inset-0">
          <Image src={service.image} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/75 to-ink/40" />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-4 py-14 sm:px-5 sm:py-16 lg:px-6 lg:py-20 xl:px-8">
          <Link
            href="/services#service-lines"
            className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/45 transition hover:text-white"
          >
            ← All services
          </Link>
          <h1 className="mt-4 max-w-3xl text-[clamp(1.85rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.035em]">
            {service.title}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-[16px]">
            {service.hero}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {service.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/85"
              >
                {h}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-brand px-6 text-[13px] font-semibold text-white transition hover:bg-brand-deep"
            >
              Request consultation
            </Link>
            {service.video && (
              <a
                href={service.video}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target inline-flex h-11 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 text-[13px] font-semibold text-white transition hover:bg-white/20"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-brand">
                  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 translate-x-px" fill="currentColor" aria-hidden>
                    <path d="M8 5.5v13l11-6.5L8 5.5z" />
                  </svg>
                </span>
                Watch video
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-14 sm:px-5 sm:py-16 lg:grid-cols-12 lg:gap-14 lg:px-6 lg:py-20 xl:px-8">
        <div className="space-y-14 lg:col-span-7">
          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">Overview</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/60 sm:text-[16px]">{service.overview}</p>
          </section>

          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">Capabilities</h2>
            <ul className="mt-4 space-y-3">
              {service.capabilities.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] text-ink/70 sm:text-[15px]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">Typical applications</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {service.applications.map((app) => (
                <div key={app} className="rounded-2xl bg-paper px-4 py-3 text-[13px] font-medium text-ink/70 ring-1 ring-black/[0.05]">
                  {app}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">Site imagery</h2>
            <p className="mt-2 text-[14px] text-ink/50">
              Representative work from vibration-free cutting, drilling, and demolition crews.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3">
              {gallery.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className={`relative overflow-hidden rounded-[1.1rem] sm:rounded-[1.25rem] ${
                    i === 0 ? "col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${service.title} — image ${i + 1}`}
                    fill
                    sizes={i === 0 ? "80vw" : "40vw"}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>

          {service.videoId && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">On-site video</h2>
              <p className="mt-2 text-[14px] text-ink/50">
                See how IndoSpark crews execute controlled cutting and demolition.
              </p>
              <div className="relative mt-5 aspect-video overflow-hidden rounded-[1.25rem] bg-ink ring-1 ring-black/[0.06] sm:rounded-[1.5rem]">
                <iframe
                  title={`${service.title} video`}
                  src={`https://www.youtube.com/embed/${service.videoId}`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          )}

          {relatedTech.length > 0 && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">Related technology</h2>
              <p className="mt-2 text-[14px] text-ink/50">
                Equipment and methods commonly used with this service line.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {relatedTech.map((tech) => (
                  <Link
                    key={tech.slug}
                    href={`/services/technology/${tech.slug}`}
                    className="cursor-target group flex overflow-hidden rounded-[1.2rem] bg-white ring-1 ring-black/[0.06] transition hover:-translate-y-0.5 hover:ring-brand/30"
                  >
                    <div className="relative w-[38%] min-h-[110px] shrink-0">
                      <Image src={tech.image} alt="" fill sizes="20vw" className="object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center p-4">
                      <p className="text-[14px] font-bold tracking-[-0.02em] text-ink group-hover:text-brand">{tech.title}</p>
                      <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-ink/50">{tech.short}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {relatedProjects.length > 0 && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">Related projects</h2>
              <p className="mt-2 text-[14px] text-ink/50">
                Case studies where this capability was central to the shutdown plan.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {relatedProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/services/projects/${project.slug}`}
                    className="cursor-target group flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-paper ring-1 ring-black/[0.05] transition hover:-translate-y-1 hover:ring-brand/25"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={project.image} alt={project.title} fill sizes="40vw" className="object-cover transition duration-700 group-hover:scale-105" />
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink/65">
                        {project.sector}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-[14px] font-bold leading-snug tracking-[-0.02em] text-ink group-hover:text-brand sm:text-[15px]">
                        {project.title}
                      </h3>
                      <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-ink/55">{project.summary}</p>
                      <span className="mt-3 text-[12px] font-semibold text-ink">View case study →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-32 space-y-4">
            <div className="overflow-hidden rounded-2xl bg-paper ring-1 ring-black/[0.06] sm:rounded-3xl">
              <div className="relative aspect-[4/3]">
                <Image src={service.image} alt={service.title} fill className="object-cover" sizes="40vw" />
              </div>
              <div className="p-5">
                <p className="text-[13px] leading-relaxed text-ink/55">
                  Need a shutdown plan for this capability? Our technical team can map method, crew, and window.
                </p>
                <Link
                  href="/contact"
                  className="cursor-target btn-shine mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-ink text-[13px] font-semibold text-white transition hover:bg-brand"
                >
                  Request consultation
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 ring-1 ring-black/[0.06] sm:rounded-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/35">Other services</p>
              <ul className="mt-3 space-y-1">
                {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="block rounded-lg px-2 py-2 text-[13px] text-ink/60 transition hover:bg-paper hover:text-brand"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

export function TechnologyDetail({ tech }) {
  return (
    <article>
      <header className="border-b border-black/[0.06] bg-paper">
        <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-5 sm:py-16 lg:px-6 lg:py-20 xl:px-8">
          <Link
            href="/services#service-lines"
            className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/40 transition hover:text-brand"
          >
            ← All services
          </Link>
          <h1 className="mt-4 max-w-3xl text-[clamp(1.85rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.035em] text-ink">
            {tech.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/55 sm:text-[16px]">
            {tech.summary}
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 sm:px-5 lg:grid-cols-12 lg:px-6 lg:py-16 xl:px-8">
        <div className="lg:col-span-7">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
            How it works
          </h2>
          <ol className="mt-5 space-y-4">
            {tech.steps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 rounded-2xl bg-paper p-4 ring-1 ring-black/[0.05] sm:p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-[12px] font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[15px] font-bold text-ink">{step.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink/55 sm:text-[14px]">
                    {step.text}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>

          <h2 className="mt-12 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
            Key benefits
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {tech.benefits.map((b) => (
              <li
                key={b}
                className="rounded-2xl border border-black/[0.06] bg-white px-4 py-3 text-[13px] font-medium text-ink/70"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-3xl">
            <Image src={tech.image} alt={tech.title} fill className="object-cover" sizes="40vw" />
          </div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
            Common applications
          </h2>
          <ul className="mt-3 space-y-2">
            {tech.applications.map((a) => (
              <li key={a} className="flex gap-2 text-[14px] text-ink/65">
                <span className="text-brand" aria-hidden>
                  ▸
                </span>
                {a}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="cursor-target btn-shine mt-8 inline-flex h-11 items-center rounded-full bg-brand px-6 text-[13px] font-semibold text-white transition hover:bg-brand-deep"
          >
            Contact technical experts
          </Link>
          <div className="mt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/35">
              More technologies
            </p>
            <ul className="mt-2 space-y-1">
              {TECHNOLOGIES.filter((t) => t.slug !== tech.slug).map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/services/technology/${t.slug}`}
                    className="text-[13px] font-medium text-ink/60 hover:text-brand"
                  >
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProjectDetail({ project }) {
  return (
    <article>
      <header className="bg-ink text-white">
        <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-5 sm:py-16 lg:px-6 lg:py-20 xl:px-8">
          <Link
            href="/services#service-lines"
            className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/40 transition hover:text-white"
          >
            ← All services
          </Link>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
            {project.sector}
          </p>
          <h1 className="mt-2 max-w-3xl text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.035em]">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] text-white/60">{project.summary}</p>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
              >
                <p className="text-[clamp(1.35rem,3vw,1.85rem)] font-bold tracking-[-0.03em]">
                  {m.value}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-5 lg:px-6 lg:py-16 xl:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-10 lg:col-span-7">
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                The challenge
              </h2>
              <p className="mt-2 text-[13px] font-semibold text-ink/45">Client: {project.client}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/60">{project.challenge}</p>
              <ul className="mt-4 space-y-2">
                {project.challenges.map((c) => (
                  <li key={c} className="flex gap-2.5 text-[14px] text-ink/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {c}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                The Indo Spark solution
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/60">{project.solution}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-paper px-3 py-1.5 text-[11px] font-semibold text-ink/65 ring-1 ring-black/[0.06]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.execution.map((e) => (
                  <div
                    key={e.title}
                    className="rounded-2xl border border-black/[0.06] bg-white p-4"
                  >
                    <p className="text-[14px] font-bold text-ink">{e.title}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink/55">{e.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                The result
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {project.results.map((r) => (
                  <div key={r.title} className="rounded-2xl bg-paper p-4 ring-1 ring-black/[0.05]">
                    <p className="text-[14px] font-bold text-ink">{r.title}</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-ink/55">{r.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {project.quote && (
              <blockquote className="rounded-[1.5rem] bg-steel p-6 text-white sm:p-8">
                <p className="font-display text-[17px] leading-snug italic text-white/90 sm:text-[19px]">
                  “{project.quote.text}”
                </p>
                <footer className="mt-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/40">
                  — {project.quote.by}
                </footer>
              </blockquote>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-32 overflow-hidden rounded-2xl ring-1 ring-black/[0.06] sm:rounded-3xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
              </div>
              <div className="bg-white p-5">
                <Link
                  href="/contact"
                  className="cursor-target btn-shine inline-flex h-11 w-full items-center justify-center rounded-full bg-brand text-[13px] font-semibold text-white transition hover:bg-brand-deep"
                >
                  Start your project
                </Link>
                <Link
                  href="/services#service-lines"
                  className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-full text-[13px] font-semibold text-ink/60 transition hover:text-brand"
                >
                  View our services
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
