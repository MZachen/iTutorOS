"use client";

import MarketingFooter from "@/app/_components/MarketingFooter";
import MarketingHeader from "@/app/_components/MarketingHeader";
import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    href: "/features/scheduling",
    title: "Scheduling",
    description: "Recurring sessions, buffers, tutor assignments, rooms, and conflict-aware calendars.",
    icon: "/schedule_icon_1.png",
  },
  {
    href: "/features/marketing",
    title: "Marketing",
    description: "Lead capture, social posts, follow-ups, and consistent service messaging.",
    icon: "/marketing_icon_1.png",
  },
  {
    href: "/features/sales",
    title: "Sales",
    description: "Pipeline stages, lead sources, and conversion workflows built for tutors.",
    icon: "/sales_icon_1.png",
  },
  {
    href: "/features/custom-website",
    title: "Custom web site",
    description: "Auto-generated tutoring sites with pages, photos, branding, and CTAs.",
    icon: "/web_icon_1.png",
  },
  {
    href: "/features/support",
    title: "Support",
    description: "Guided onboarding, tutorials, and plan-based support options.",
    icon: "/support_icon_1.png",
  },
];

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1 p-6 itutoros-soft-gradient">
        <div className="mx-auto w-full max-w-[1100px]">
          <h1 className="title-font m-0 text-center">iTutorOS Features</h1>
          <p className="mt-3 text-center text-base font-bold text-gray-700">
            Everything you need to run and grow a tutoring business in one system.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {FEATURES.map((feature) => (
              <a key={feature.href} href={feature.href} className="block">
                <Card className="h-full">
                  <CardContent className="flex h-full gap-4 p-6">
                    <img src={feature.icon} alt="" className="h-12 w-12 object-contain" />
                    <div>
                      <div className="text-lg font-extrabold text-[#7200dc]">{feature.title}</div>
                      <p className="mt-2 text-sm text-gray-700">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
