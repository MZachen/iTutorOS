"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { EmojiClickData } from "emoji-picker-react";
import { cn } from "@/lib/utils";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

type EmojiInsertButtonProps = {
  onSelect: (emoji: string) => void;
  className?: string;
  buttonClassName?: string;
  panelAlign?: "left" | "right";
};

export function EmojiInsertButton({
  onSelect,
  className,
  buttonClassName,
  panelAlign = "right",
}: EmojiInsertButtonProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (containerRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full text-[26px] leading-none text-gray-500 hover:bg-gray-100",
          buttonClassName,
        )}
        title="Insert emoji"
        aria-label="Insert emoji"
        onClick={() => setOpen((prev) => !prev)}
      >
        ☺
      </button>
      {open ? (
        <div
          className={cn(
            "absolute top-full z-[120] mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl",
            panelAlign === "left" ? "left-0" : "right-0",
          )}
        >
          <EmojiPicker
            width={320}
            height={380}
            lazyLoadEmojis
            searchDisabled={false}
            previewConfig={{ showPreview: false }}
            onEmojiClick={(emojiData: EmojiClickData) => {
              onSelect(emojiData.emoji);
              setOpen(false);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
