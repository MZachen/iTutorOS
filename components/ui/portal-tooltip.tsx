"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type TooltipPlacement = "top" | "bottom";

type PortalTooltipProps = {
  content: string;
  children: React.ReactNode;
  maxWidth?: number;
};

export function PortalTooltip({ content, children, maxWidth = 320 }: PortalTooltipProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; placement: TooltipPlacement } | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open) return;

    let rafId = 0;
    const updatePosition = () => {
      const trigger = triggerRef.current;
      const tooltip = tooltipRef.current;
      if (!trigger || !tooltip) return;

      const rect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const margin = 8;
      const offset = 8;

      let placement: TooltipPlacement = "bottom";
      let top = rect.bottom + offset;
      if (top + tooltipRect.height > window.innerHeight - margin) {
        placement = "top";
        top = rect.top - tooltipRect.height - offset;
      }
      if (top < margin) {
        top = margin;
      }

      let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
      left = Math.max(margin, Math.min(left, window.innerWidth - tooltipRect.width - margin));

      setCoords({ top, left, placement });
    };

    rafId = window.requestAnimationFrame(updatePosition);

    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [open, content]);

  if (!content) return <>{children}</>;

  return (
    <>
      <span
        ref={triggerRef}
        className="inline-block"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        {children}
      </span>
      {open && mounted
        ? createPortal(
            <div
              ref={tooltipRef}
              role="tooltip"
              className={[
                "pointer-events-none fixed z-[100] select-none",
                "rounded-xl bg-[#f3e9ff] px-3 py-2 text-sm text-gray-800 shadow-lg",
                "transition-opacity duration-150",
              ].join(" ")}
              style={{
                top: coords?.top ?? 0,
                left: coords?.left ?? 0,
                maxWidth,
                boxShadow: "0 6px 14px rgba(44, 16, 74, 0.45)",
                outline: "1px solid rgba(0, 0, 0, 0.35)",
                opacity: coords ? 1 : 0,
              }}
            >
              {content}
              <span
                className={[
                  "pointer-events-none absolute h-2 w-2 rotate-45 bg-[#f3e9ff]",
                  coords?.placement === "top"
                    ? "left-1/2 top-full -translate-x-1/2 -translate-y-1"
                    : "left-1/2 bottom-full -translate-x-1/2 translate-y-1",
                ].join(" ")}
              />
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
