"use client";

import type { CSSProperties } from "react";

type BrandLogoProps = {
  href?: string;
  width?: number;
  style?: CSSProperties;
};

export default function BrandLogo({ href = "/", width = 200, style }: BrandLogoProps) {
  const img = (
    <img
      src="/logo1.png"
      alt="iTutorOS"
      style={{ width, height: "auto", display: "block" }}
    />
  );

  if (!href) return img;

  return (
    <a
      href={href}
      style={{
        display: "inline-block",
        textDecoration: "none",
        color: "inherit",
        ...style,
      }}
    >
      {img}
    </a>
  );
}

