export type SearchItem = {
  href: string;
  title: string;
  description: string;
  tags?: string[];
};

const SITE_INDEX: SearchItem[] = [
  {
    href: "/",
    title: "Home",
    description: "Marketing homepage with overview, signup, and feature highlights.",
    tags: ["marketing", "overview", "signup"],
  },
  {
    href: "/get-started",
    title: "Get started",
    description: "Full product overview with signup to create your account.",
    tags: ["signup", "onboarding", "marketing"],
  },
  {
    href: "/login",
    title: "Log in",
    description: "Access your iTutorOS account.",
    tags: ["auth", "signin"],
  },
  {
    href: "/signup",
    title: "Sign up",
    description: "Create an iTutorOS account and confirm your email.",
    tags: ["auth", "signup"],
  },
  {
    href: "/pricing",
    title: "Pricing",
    description: "Plan and pricing information.",
    tags: ["plans", "billing"],
  },
  {
    href: "/features",
    title: "Features",
    description: "Overview of scheduling, marketing, sales, and website tools.",
    tags: ["features", "overview"],
  },
  {
    href: "/features/scheduling",
    title: "Scheduling",
    description:
      "Recurring schedules, buffers, tutor assignments, rooms, and subject-aware sessions built for tutoring workflows.",
    tags: ["calendar", "recurring", "buffers", "tutors", "rooms"],
  },
  {
    href: "/features/marketing",
    title: "Marketing",
    description:
      "AI-powered marketing workflows, lead capture, and guidance to build trust with families and grow consistently.",
    tags: ["ai", "leads", "growth", "brand"],
  },
  {
    href: "/features/sales",
    title: "Sales",
    description: "AI-assisted pipeline to track inquiries, follow up, and convert leads into long-term students.",
    tags: ["pipeline", "crm", "ai", "follow-up"],
  },
  {
    href: "/features/custom-website",
    title: "Custom web site",
    description: "AI-generated sites with templates, photos, branding, and easy updates.",
    tags: ["website", "branding", "templates", "ai"],
  },
  {
    href: "/features/support",
    title: "Support",
    description: "White-glove, U.S.-based support to keep your business running smoothly.",
    tags: ["help", "support", "service"],
  },
  {
    href: "/documentation",
    title: "Documentation",
    description: "Guides and reference documentation.",
    tags: ["docs", "help"],
  },
  {
    href: "/contact-us",
    title: "Contact us",
    description: "Get in touch with the iTutorOS team.",
    tags: ["support", "contact"],
  },
];

function normalize(value: string) {
  return value.toLowerCase();
}

function splitWords(value: string) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter(Boolean);
}

function editDistance(a: string, b: string) {
  const aLen = a.length;
  const bLen = b.length;
  if (!aLen) return bLen;
  if (!bLen) return aLen;

  const dp = Array.from({ length: aLen + 1 }, () => new Array<number>(bLen + 1).fill(0));
  for (let i = 0; i <= aLen; i += 1) dp[i][0] = i;
  for (let j = 0; j <= bLen; j += 1) dp[0][j] = j;

  for (let i = 1; i <= aLen; i += 1) {
    for (let j = 1; j <= bLen; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[aLen][bLen];
}

function isFuzzyTermMatch(term: string, haystack: string) {
  if (!term) return true;
  if (haystack.includes(term)) return true;

  const words = splitWords(haystack);
  for (const word of words) {
    if (word.startsWith(term) || term.startsWith(word)) return true;
  }

  if (term.endsWith("s") && haystack.includes(term.slice(0, -1))) return true;
  if (term.endsWith("es") && haystack.includes(term.slice(0, -2))) return true;

  const threshold = term.length <= 4 ? 1 : term.length <= 7 ? 2 : 3;
  return words.some((word) => editDistance(term, word) <= threshold);
}

export function searchSiteIndex(query: string): SearchItem[] {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const terms = normalize(trimmed).split(/\s+/).filter(Boolean);

  return SITE_INDEX.filter((item) => {
    const haystack = [
      item.title,
      item.description,
      item.href,
      ...(item.tags ?? []),
    ]
      .map(normalize)
      .join(" ");

    return terms.every((term) => isFuzzyTermMatch(term, haystack));
  });
}

export function getSiteIndex() {
  return SITE_INDEX;
}
