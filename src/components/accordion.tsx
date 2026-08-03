"use client";

import { useState } from "react";

export default function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: { q: string; a: string }[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-navy"
            >
              <span className="font-display text-lg leading-snug md:text-xl">
                {item.q}
              </span>
              <span
                className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-ink-mute transition-all duration-500 ${
                  isOpen ? "rotate-45 border-navy/30 text-navy" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-ink-soft">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
