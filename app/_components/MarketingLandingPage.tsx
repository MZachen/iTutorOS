"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import MarketingFooter from "@/app/_components/MarketingFooter";
import MarketingHeader from "@/app/_components/MarketingHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SIGNUP_SLIDES = [
  "/tutor_pic_1.png",
  "/tutor_pic_2.png",
  "/tutor_pic_3.png",
  "/tutor_pic_4.png",
  "/tutor_pic_5.png",
  "/tutor_pic_6.png",
];

export default function MarketingLandingPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % SIGNUP_SLIDES.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus(null);
    setBusy(true);
    try {
      const emailRedirectTo = `${window.location.origin}/auth/callback`;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo },
      });
      if (error) {
        setStatus(error.message);
        return;
      }
      const identities = data?.user?.identities ?? [];
      if (data?.user && identities.length === 0) {
        setStatus("You already have an account. Redirecting you to log in...");
        const encoded = encodeURIComponent(email);
        setTimeout(() => {
          window.location.href = `/login?reason=exists&email=${encoded}`;
        }, 1200);
        return;
      }
      setStatus("Check your email to confirm your signup. After confirming, you'll be redirected back here.");
      setEmail("");
      setPassword("");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />

      <main
        className="flex-1 p-6"
        style={{
          position: "relative",
          fontFamily: "inherit",
          backgroundImage: "url(/pencilBG.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      >
        <section className="mx-auto w-full max-w-[900px] text-center">
          <h1 className="m-0 text-4xl font-extrabold">Built to run a successful tutoring business</h1>
          <p className="mt-3 text-base font-bold leading-relaxed text-gray-700">
            Grow your tutoring business to new heights with our all in one customizable platform. Web, marketing, sales, and scheduling.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-[#bff2c6] px-4 py-2 text-xs font-bold text-black transition hover:brightness-[1.2]"
            >
              Get started
            </a>
            <a
              href="/features"
              className="inline-flex items-center justify-center rounded-full bg-[#e5e5e5] px-4 py-2 text-xs font-bold text-black transition hover:brightness-[0.8]"
            >
              View features
            </a>
          </div>
        </section>

        <div className="itutoros-marketing-grid mx-auto mt-8 w-full max-w-[1200px]">
          <section className="grid w-full max-w-[560px] gap-6 justify-self-start">
            <Card>
              <CardContent className="p-0">
                <div className="relative h-[38vh] min-h-[280px] w-full overflow-hidden rounded-2xl">
                  {SIGNUP_SLIDES.map((src, idx) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Tutor photo ${(idx + 1).toString()}`}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                        idx === slideIndex ? "opacity-100" : "opacity-0"
                      }`}
                      loading={idx === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="m-0 text-2xl font-extrabold">Run your tutoring business like a pro</h2>
                <p className="mt-3 text-base leading-relaxed text-gray-700">
                  iTutorOS is your all-in-one business OS for tutoring: organize services and pricing, set up locations and rooms,
                  manage schedules, and keep everything consistent as your business grows.
                </p>
                <p className="mt-3 text-base leading-relaxed text-gray-700">
                  Create your account to get started - it only takes a minute, and you&apos;ll be guided step-by-step through onboarding.
                </p>
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardContent className="p-6">
                <h1 className="m-0 text-5xl font-extrabold">Sign up</h1>
                <p className="mt-2">Create an account. You&apos;ll receive a confirmation email.</p>

                <form onSubmit={onSubmit} className="mt-4 grid gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email (This will be your main organization email after sign up)</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-indigo-50"
                      autoComplete="email"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-indigo-50"
                      autoComplete="new-password"
                    />
                  </div>

                  <Button disabled={busy} type="submit" className="mt-2 w-full">
                    {busy ? "Creating..." : "Create account"}
                  </Button>
                </form>

                {status ? <p className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm">{status}</p> : null}

                <p className="mt-4 text-sm">
                  Already have an account? <a href="/login">Log in</a>
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="w-full">
            <div className="rounded-2xl bg-white p-8">
              <div className="grid gap-6">
                <a href="/features/scheduling" className="group flex items-start gap-4">
                  <img src="/schedule_icon_1.png" alt="Scheduling" className="h-12 w-12 flex-shrink-0 object-contain" />
                  <div>
                    <div className="text-lg font-extrabold text-[#7200dc] transition-colors group-hover:text-[#00c5dc]">
                      Scheduling
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-gray-700">
                      Tutoring schedules are more complex than most calendars: daily vs. weekly series, shared rooms, rotating tutors,
                      student availability, and the real-world need for buffers between sessions. iTutorOS keeps it simple by letting you
                      build recurring or one-off sessions, add buffers, assign tutors and rooms, pick subjects, and prevent conflicts
                      before they happen.
                    </p>
                  </div>
                </a>

                <a href="/features/marketing" className="group flex items-start gap-4">
                  <img src="/marketing_icon_1.png" alt="Marketing" className="h-12 w-12 flex-shrink-0 object-contain" />
                  <div>
                    <div className="text-lg font-extrabold text-[#7200dc] transition-colors group-hover:text-[#00c5dc]">
                      Marketing
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-gray-700">
                      Marketing is the difference between a thriving tutoring business and one that struggles. Flyers and one-off
                      Facebook posts won&apos;t build trust or consistent inquiries. iTutorOS gives you AI-powered marketing workflows,
                      an integrated lead pipeline, and how-to videos so you can nurture families, follow up at the right time, and turn
                      interest into booked students.
                    </p>
                  </div>
                </a>

                <a href="/features/sales" className="group flex items-start gap-4">
                  <img src="/sales_icon_1.png" alt="Sales" className="h-12 w-12 flex-shrink-0 object-contain" />
                  <div>
                    <div className="text-lg font-extrabold text-[#7200dc] transition-colors group-hover:text-[#00c5dc]">
                      Sales
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-gray-700">
                      Leads need timely, thoughtful follow-up to convert. Our AI-assisted pipeline helps you track every inquiry, suggest
                      next steps, and keep momentum going with reminders, notes, and outreach guidance - so families feel cared for and you
                      don&apos;t lose opportunities.
                    </p>
                  </div>
                </a>

                <a href="/features/custom-website" className="group flex items-start gap-4">
                  <img src="/web_icon_1.png" alt="Custom website" className="h-12 w-12 flex-shrink-0 object-contain" />
                  <div>
                    <div className="text-lg font-extrabold text-[#7200dc] transition-colors group-hover:text-[#00c5dc]">
                      Custom web site
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-gray-700">
                      If you don&apos;t have a website - or need a better one - iTutorOS can generate an AI-powered site in minutes. Choose from
                      templates, upload your own photos (or use ours), apply your colors and logo, and publish a branded experience that
                      builds confidence with parents.
                    </p>
                  </div>
                </a>

                <a href="/features/support" className="group flex items-start gap-4">
                  <img src="/support_icon_1.png" alt="Support" className="h-12 w-12 flex-shrink-0 object-contain" />
                  <div>
                    <div className="text-lg font-extrabold text-[#7200dc] transition-colors group-hover:text-[#00c5dc]">Support</div>
                    <p className="mt-1 text-sm leading-relaxed text-gray-700">
                      White-glove, U.S.-based support that responds quickly and treats your business like a priority. When questions come
                      up, you get real help from real people - because great support is the most important feature of any software partner.
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
