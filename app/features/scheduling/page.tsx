"use client";

import { useMemo, useState, type FormEvent } from "react";
import MarketingFooter from "@/app/_components/MarketingFooter";
import MarketingHeader from "@/app/_components/MarketingHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { HugeiconsIcon } from "@hugeicons/react";
import { PencilIcon } from "@hugeicons/core-free-icons";

export default function SchedulingFeaturePage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

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
      <main className="flex-1 p-6 itutoros-soft-gradient">
        <div className="mx-auto w-full max-w-[1000px]">
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <h1 className="title-font m-0">Scheduling Made Simple</h1>
                <p className="mt-3 text-base font-bold">
                  Managing a tutoring schedule is challenging. iTutorOS makes it an easy process with an intuitive interface.
                </p>
              </div>

              <img
                src="/schedule-header-1.png"
                alt="Scheduling overview"
                className="mt-6 mx-auto w-full rounded-2xl object-cover sm:w-1/2"
              />

              <p className="mt-6 text-base leading-relaxed text-gray-700">
                Traditional calendars like Outlook and Google Calendar weren&apos;t built for tutoring businesses. They miss the real-world
                needs of recurring weekly slots, tutor availability, room conflicts, student capacity, and the business rules that keep
                schedules clean. iTutorOS is a scheduling system built specifically for independent tutors and tutoring companies, with
                the logic and workflows you actually need.
              </p>

              <ul className="mt-6 grid gap-3 text-base text-gray-700">
                {[
                  "Create new schedule entries by location, service type, subject, and topic.",
                  "Set capacity and get warnings when attendees exceed limits.",
                  "Assign tutors from the list tied to the selected location.",
                  "Link attendees directly to Student records in the CRM.",
                  "Choose schedule patterns: daily recurring (workshops/camps), weekly recurring (tutoring/classes), or ad-hoc sessions.",
                  "Define start date, day of week (weekly), and session time.",
                  "Select session duration from a list and include buffer time.",
                  "Automatically calculates session end time and blocked/occupied time.",
                  "Set schedule length by number of days/weeks or an end date.",
                  "Assign one or more rooms per session with multi-room support.",
                  "Add resources like web links, projectors, supplies, or other notes.",
                  "Recurring conflict logic flags future overlaps and exceptions (workshops, camps, etc.).",
                  "Multiple calendar views: daily, weekly, monthly, print.",
                  "Filter by tutor or show all tutors across locations.",
                  "Highlight conflicts by type: tutor, room, overlap, buffer.",
                  "Supports cancellations, reschedules, and tutor-defined business rules (like disallowing bi-weekly sessions).",
                  "Auto-uses the hourly price from the selected Service Offered at the chosen Location.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 text-[#ff9df9]" aria-hidden="true">
                      <HugeiconsIcon icon={PencilIcon} size={16} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <h2 className="text-2xl font-extrabold">Ready to Get Started?</h2>
                <form onSubmit={onSubmit} className="mt-4 grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email (This will be your main organization email after sign up)</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-zinc-50"
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
                      className="bg-zinc-50"
                      autoComplete="new-password"
                    />
                  </div>

                  <Button disabled={busy} type="submit" className="w-full">
                    {busy ? "Creating..." : "Create account"}
                  </Button>
                </form>

                {status ? <p className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm">{status}</p> : null}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
