"use client";

import { useState } from "react";

export function CopyEmail({
  email,
  label,
  className = "",
}: {
  email: string;
  label?: string; // when set, the button shows just this (e.g. "Copy") instead of the address
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${className}`}
    >
      {label ? (
        <span aria-live="polite" aria-label={copied ? "Email copied" : `Copy ${email}`}>
          {copied ? "Copied ✓" : label}
        </span>
      ) : (
        <>
          <span>{email}</span>
          <span aria-live="polite" className="opacity-60 group-hover:opacity-100">
            {copied ? "Copied ✓" : "Copy"}
          </span>
        </>
      )}
    </button>
  );
}
