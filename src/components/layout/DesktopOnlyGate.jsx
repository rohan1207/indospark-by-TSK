"use client";

/**
 * Temporary phone gate for the home-page-only client preview.
 * Desktop (md+) sees the site; smaller screens get a simple notice.
 */
export default function DesktopOnlyGate({ children }) {
  return (
    <>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-white px-8 text-center md:hidden">
        <div className="max-w-sm">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
            ICFS
          </p>
          <p className="mt-4 text-[18px] font-semibold leading-snug tracking-[-0.02em] text-ink">
            Phone experience is in progress.
          </p>
          <p className="mt-3 text-[16px] leading-relaxed text-ink/55">
            Please visit us on desktop for the full site preview.
          </p>
        </div>
      </div>

      <div className="hidden md:contents">{children}</div>
    </>
  );
}
