"use client";

import { usePathname } from "next/navigation";

/**
 * Thin progress bar pinned to the top of the viewport.
 * The bar is keyed by pathname, so every client navigation remounts it and
 * the CSS animation restarts. No state needed — the animation itself handles
 * the slide-in and fade-out.
 */
export default function RouteProgress() {
  const pathname = usePathname();

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[100] h-0.5 pointer-events-none overflow-hidden"
    >
      <div
        key={pathname}
        className="h-full w-full bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-progress-slide"
      />
    </div>
  );
}