"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { PortalTooltip } from "@/components/ui/portal-tooltip";

type ClampedCellProps = {
  text?: string | null;
  fallback?: string;
  className?: string;
  children?: React.ReactNode;
};

export function ClampedCell({ text, fallback = "—", className, children }: ClampedCellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [truncated, setTruncated] = useState(false);

  const normalized = typeof text === "string" ? text.trim() : "";
  const hasText = normalized.length > 0;

  useLayoutEffect(() => {
    if (!hasText) {
      setTruncated(false);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let measureEl: HTMLDivElement | null = null;

    const measure = () => {
      if (!ref.current) return;
      const target = ref.current;
      const width = target.clientWidth;
      if (width === 0) return;

      if (!measureEl) {
        measureEl = document.createElement("div");
        measureEl.setAttribute("data-clamp-measure", "true");
        document.body.appendChild(measureEl);
      }

      const computed = window.getComputedStyle(target);
      Object.assign(measureEl.style, {
        position: "fixed",
        visibility: "hidden",
        pointerEvents: "none",
        zIndex: "-1",
        left: "0px",
        top: "0px",
        width: `${width}px`,
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        letterSpacing: computed.letterSpacing,
        lineHeight: computed.lineHeight,
        whiteSpace: "normal",
        padding: computed.padding,
        border: computed.border,
        boxSizing: computed.boxSizing,
      } as CSSStyleDeclaration);
      measureEl.textContent = normalized;

      const fullHeight = measureEl.scrollHeight;
      const clampHeight = target.getBoundingClientRect().height;
      setTruncated(fullHeight > clampHeight + 1);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      if (measureEl && measureEl.parentNode) {
        measureEl.parentNode.removeChild(measureEl);
      }
    };
  }, [hasText, normalized]);

  const content = (
    <div
      ref={ref}
      className={["itutoros-clamp-2", className].filter(Boolean).join(" ")}
      style={{
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "normal",
        lineHeight: "1.25rem",
        maxHeight: "2.5rem",
        width: "100%",
        minWidth: 0,
        wordBreak: "break-word",
        overflowWrap: "anywhere",
      }}
    >
      {hasText ? children ?? normalized : fallback}
    </div>
  );

  if (!hasText) return content;
  return truncated ? <PortalTooltip content={normalized}>{content}</PortalTooltip> : content;
}
