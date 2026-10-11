"use client";

import { useLinkStatus } from "next/link";

/**
 * Inline pending indicator for a <Link>.
 * Must be rendered inside a descendant of the <Link> it reports on.
 * Fixed-size + opacity toggle so it never causes layout shift.
 */
export default function LinkSpinner({ className = "" }: { className?: string }) {
  const { pending } = useLinkStatus();

  return (
    <span
      aria-hidden
      className={`inline-block w-2 h-2 rounded-full bg-current shrink-0 transition-opacity duration-200 ${
        pending ? "opacity-100 animate-pulse" : "opacity-0"
      } ${className}`}
    />
  );
}