export default function FloatingSocial() {
  const items = [
    { href: "https://www.facebook.com", label: "Facebook", icon: "/social-media-icon-facebook.png" },
    { href: "https://www.instagram.com", label: "Instagram", icon: "/social-media-icon-instagram.png" },
    { href: "https://www.linkedin.com", label: "LinkedIn", icon: "/social-media-icon-linkedin.png" },
    { href: "https://www.tiktok.com", label: "TikTok", icon: "/social-media-icon-tiktok.png" },
    { href: "https://x.com", label: "X", icon: "/social-media-icon-x.png" },
    { href: "https://www.youtube.com", label: "YouTube", icon: "/social-media-icon-youtube.png" },
  ];

  return (
    <div className="itutoros-social-widget pointer-events-auto fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1 sm:flex">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          aria-label={item.label}
          target="_blank"
          rel="noreferrer"
          className="itutoros-social-link flex h-12 w-12 items-center justify-center rounded-full transition hover:-translate-y-0.5"
        >
          <img src={item.icon} alt="" className="itutoros-social-icon h-8 w-8 object-contain" />
        </a>
      ))}
    </div>
  );
}
