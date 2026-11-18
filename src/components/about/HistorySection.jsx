"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TIMELINE } from "./aboutData";

const STICKY_REM = 10.1;

function stickyOffsetPx() {
  if (typeof document === "undefined") return STICKY_REM * 16;
  return parseFloat(getComputedStyle(document.documentElement).fontSize) * STICKY_REM;
}

export default function HistorySection() {
  const runwayRef = useRef(null);
  const panelRef = useRef(null);
  const scrollRef = useRef(null);
  const railTrackRef = useRef(null);
  const [theme, setTheme] = useState("light");
  const [activeYear, setActiveYear] = useState(TIMELINE[0].year);
  const [markerTop, setMarkerTop] = useState(0);
  const [runwayExtra, setRunwayExtra] = useState(1200);
  const isDark = theme === "dark";

  const railYears = [
    TIMELINE[0],
    TIMELINE[3],
    TIMELINE[6],
    TIMELINE[9],
    TIMELINE[12],
    TIMELINE[TIMELINE.length - 1],
  ].filter(Boolean);

  useEffect(() => {
    const measure = () => {
      const el = scrollRef.current;
      if (!el) return;
      setRunwayExtra(Math.max(el.scrollHeight - el.clientHeight, 400));
    };

    measure();
    const t = window.setTimeout(measure, 150);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [theme]);

  useEffect(() => {
    const runway = runwayRef.current;
    const panel = panelRef.current;
    const scroller = scrollRef.current;
    const track = railTrackRef.current;
    if (!runway || !panel || !scroller) return undefined;

    const update = () => {
      const sticky = stickyOffsetPx();
      const distance = Math.max(1, runway.offsetHeight - panel.offsetHeight);
      const progress = Math.min(
        1,
        Math.max(0, (sticky - runway.getBoundingClientRect().top) / distance)
      );

      const maxScroll = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
      scroller.scrollTop = progress * maxScroll;

      if (track) {
        setMarkerTop(progress * Math.max(track.clientHeight - 44, 0));
      }

      const idx = Math.min(
        TIMELINE.length - 1,
        Math.max(0, Math.round(progress * (TIMELINE.length - 1)))
      );
      const year = TIMELINE[idx].year;
      setActiveYear((prev) => (prev === year ? prev : year));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [runwayExtra, theme]);

  const scrollRunwayBy = (dir) => {
    window.scrollBy({ top: dir * window.innerHeight * 0.55, behavior: "smooth" });
  };

  const scrollToYear = (year) => {
    const runway = runwayRef.current;
    const panel = panelRef.current;
    if (!runway || !panel) return;
    const idx = TIMELINE.findIndex((t) => t.year === year);
    if (idx < 0) return;
    const progress = idx / Math.max(1, TIMELINE.length - 1);
    const sticky = stickyOffsetPx();
    const distance = Math.max(1, runway.offsetHeight - panel.offsetHeight);
    const runwayTop = runway.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: runwayTop - sticky + progress * distance, behavior: "smooth" });
  };

  const scrollToTop = () => {
    const runway = runwayRef.current;
    if (!runway) return;
    const sticky = stickyOffsetPx();
    const runwayTop = runway.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: runwayTop - sticky, behavior: "smooth" });
  };

  return (
    <section
      id="history"
      className={`relative scroll-mt-[10.1rem] transition-colors duration-300 ${
        isDark ? "bg-[#111214] text-white" : "bg-white text-ink"
      }`}
    >
      <div
        ref={runwayRef}
        className="relative"
        style={{ height: `calc(100svh - 10.1rem + ${runwayExtra}px)` }}
      >
        <div
          ref={panelRef}
          className={`sticky top-[10.1rem] flex h-[calc(100svh-10.1rem)] flex-col overflow-hidden border-b ${
            isDark ? "border-white/10 bg-[#111214]" : "border-black/[0.06] bg-white"
          }`}
        >
          <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col px-4 sm:px-5 lg:px-6 xl:px-8">
            <div
              className="flex shrink-0 items-end justify-between gap-4 border-b py-4 sm:py-5"
              style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}
            >
              <div className="min-w-0">
                <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
                  Our history
                </p>
                <h2 className="mt-1.5 text-[clamp(1.45rem,2.6vw,2.15rem)] font-bold tracking-[-0.035em]">
                  1978 → 2026
                </h2>
              </div>

              <div
                className={`flex shrink-0 items-center gap-0.5 rounded-full p-1 ${
                  isDark ? "bg-white/10" : "bg-black/[0.05]"
                }`}
                role="group"
                aria-label="History theme"
              >
                {[
                  { id: "light", label: "Light" },
                  { id: "dark", label: "Dark" },
                ].map((opt) => {
                  const on = theme === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTheme(opt.id)}
                      className={`cursor-target rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
                        on
                          ? isDark
                            ? "bg-white text-ink"
                            : "bg-ink text-white"
                          : isDark
                            ? "text-white/50 hover:text-white"
                            : "text-ink/45 hover:text-ink"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative flex min-h-0 flex-1">
              <div
                ref={scrollRef}
                className="min-h-0 flex-1 overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {/* 3 years/row on lg (image+text × 3). Every cell is the same square. */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
                  {TIMELINE.map((item) => {
                    const border = isDark ? "border-white/10" : "border-black/[0.08]";
                    const muted = isDark ? "text-white/50" : "text-ink/50";
                    const tagMuted = isDark ? "text-white/30" : "text-ink/30";
                    const isPresent = Boolean(item.present);
                    const cell = `relative aspect-square w-full min-w-0 overflow-hidden border-b border-r ${border}`;

                    return (
                      <Fragment key={item.year}>
                        <div data-year={item.year} className={cell}>
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16.6vw"
                            className={`object-cover ${
                              isPresent ? "" : "grayscale contrast-[1.05]"
                            }`}
                          />
                          <div
                            className={`pointer-events-none absolute inset-0 ${
                              isPresent
                                ? "bg-transparent"
                                : isDark
                                  ? "bg-black/25"
                                  : "bg-black/[0.04]"
                            }`}
                            aria-hidden
                          />
                          {isPresent ? (
                            <span className="absolute left-2 top-2 rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                              Now
                            </span>
                          ) : null}
                        </div>

                        <article
                          data-year={item.year}
                          className={`${cell} ${
                            isPresent
                              ? isDark
                                ? "bg-brand/15"
                                : "bg-brand/[0.06]"
                              : isDark
                                ? "bg-[#16181c]"
                                : "bg-[#fafafa]"
                          }`}
                        >
                          <div className="absolute inset-0 flex flex-col items-center justify-center px-2.5 py-3 text-center sm:px-3.5 sm:py-4">
                            <p className="text-[clamp(1.35rem,2.2vw,1.95rem)] font-bold leading-none tracking-[-0.045em]">
                              {item.year}
                            </p>
                            <p
                              className={`mt-2.5 line-clamp-4 max-w-[18ch] text-[12px] leading-snug sm:mt-3 sm:text-[13px] ${muted}`}
                            >
                              {item.text}
                            </p>
                            <p
                              className={`mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] sm:mt-3.5 sm:text-[11px] ${
                                isPresent ? "text-brand" : tagMuted
                              }`}
                            >
                              {item.tag}
                            </p>
                            <span
                              className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                                isPresent
                                  ? "bg-brand"
                                  : isDark
                                    ? "bg-white/25"
                                    : "bg-ink/20"
                              }`}
                              aria-hidden
                            />
                          </div>
                        </article>
                      </Fragment>
                    );
                  })}
                </div>
              </div>

              <aside
                className={`relative hidden w-16 shrink-0 flex-col border-l sm:flex lg:w-[4.5rem] ${
                  isDark ? "border-white/10" : "border-black/[0.08]"
                }`}
                aria-label="Timeline years"
              >
                <div className="relative flex min-h-0 flex-1 flex-col items-center px-1 py-3">
                  <div ref={railTrackRef} className="relative flex h-full w-full flex-col justify-between">
                    <div
                      className={`absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 ${
                        isDark ? "bg-white/15" : "bg-black/10"
                      }`}
                      aria-hidden
                    />

                    {railYears.map((item) => (
                      <button
                        key={item.year}
                        type="button"
                        onClick={() => scrollToYear(item.year)}
                        className={`cursor-target relative z-[1] py-1 text-[12px] font-medium transition lg:text-[13px] ${
                          isDark
                            ? "text-white/35 hover:text-white/70"
                            : "text-ink/30 hover:text-ink/60"
                        }`}
                      >
                        {item.year}
                      </button>
                    ))}

                    <div
                      className="pointer-events-none absolute left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-brand text-[13px] font-bold text-white shadow-md transition-[top] duration-150 ease-out lg:h-11 lg:w-11 lg:text-[14px]"
                      style={{ top: markerTop }}
                      aria-hidden
                    >
                      {activeYear}
                    </div>
                  </div>
                </div>

                <div
                  className={`flex flex-col items-center gap-1 border-t py-3 ${
                    isDark ? "border-white/10" : "border-black/[0.08]"
                  }`}
                >
                  <button
                    type="button"
                    aria-label="Scroll up"
                    onClick={() => scrollRunwayBy(-1)}
                    className={`cursor-target flex h-8 w-8 items-center justify-center rounded-full transition ${
                      isDark
                        ? "text-white/45 hover:bg-white/10 hover:text-white"
                        : "text-ink/40 hover:bg-black/[0.05] hover:text-ink"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                      <path
                        d="M6 14l6-6 6 6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Scroll down"
                    onClick={() => scrollRunwayBy(1)}
                    className={`cursor-target flex h-8 w-8 items-center justify-center rounded-full transition ${
                      isDark
                        ? "text-white/45 hover:bg-white/10 hover:text-white"
                        : "text-ink/40 hover:bg-black/[0.05] hover:text-ink"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                      <path
                        d="M6 10l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={scrollToTop}
                    className={`cursor-target mt-0.5 text-[12px] font-bold uppercase tracking-[0.14em] transition ${
                      isDark ? "text-white/40 hover:text-brand" : "text-ink/35 hover:text-brand"
                    }`}
                  >
                    Top
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
