"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import BrandLogo from "@/app/_components/BrandLogo";
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

export default function SignupPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const slides = useMemo(() => [...SIGNUP_SLIDES, SIGNUP_SLIDES[0]], []);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideAnimate, setSlideAnimate] = useState(true);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlideIndex((prev) => prev + 1);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (slideIndex <= SIGNUP_SLIDES.length) return;
    setSlideAnimate(false);
    setSlideIndex(0);
    requestAnimationFrame(() => requestAnimationFrame(() => setSlideAnimate(true)));
  }, [slideIndex]);

  function onSlideTransitionEnd() {
    if (slideIndex !== SIGNUP_SLIDES.length) return;
    setSlideAnimate(false);
    setSlideIndex(0);
    requestAnimationFrame(() => requestAnimationFrame(() => setSlideAnimate(true)));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus(null);
    setBusy(true);
    try {
      const emailRedirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo },
      });
      if (error) {
        setStatus(error.message);
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
    <main
      className="min-h-screen p-6"
      style={{
        position: "relative",
        fontFamily: "inherit",
        backgroundImage: "url(/pencilBG.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      <div style={{ position: "absolute", top: 16, left: 16, zIndex: 50 }}>
        <BrandLogo href="/" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-48px)] w-full max-w-[1200px] grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <section className="grid gap-6">
          <Card>
            <CardContent className="p-0">
              <div className="relative h-[38vh] min-h-[280px] w-full overflow-hidden rounded-2xl">
                <div
                  className={`flex h-full w-full ${slideAnimate ? "transition-transform duration-700 ease-in-out" : ""}`}
                  style={{ transform: `translateX(-${slideIndex * 100}%)` }}
                  onTransitionEnd={onSlideTransitionEnd}
                >
                  {slides.map((src, idx) => (
                    <div key={`${src}-${idx}`} className="h-full w-full shrink-0">
                      <img
                        src={src}
                        alt={`Tutor photo ${((idx % SIGNUP_SLIDES.length) + 1).toString()}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
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
                Create your account to get started — it only takes a minute, and you&apos;ll be guided step-by-step through onboarding.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="flex w-full justify-center lg:justify-end">
          <Card className="w-full max-w-[520px]">
            <CardContent className="p-6">
              <h1 className="m-0 text-5xl font-extrabold">Sign up</h1>
              <p className="mt-2">Create an account. You&apos;ll receive a confirmation email.</p>

              <form onSubmit={onSubmit} className="mt-4 grid gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
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
      </div>
    </main>
  );
}
