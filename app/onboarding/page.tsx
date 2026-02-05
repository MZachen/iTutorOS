"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import BrandLogo from "@/app/_components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OnboardingPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const timezones = useMemo(() => {
    const supported =
      typeof Intl !== "undefined" && typeof (Intl as any).supportedValuesOf === "function"
        ? ((Intl as any).supportedValuesOf("timeZone") as string[])
        : [
            "UTC",
            "America/New_York",
            "America/Chicago",
            "America/Denver",
            "America/Los_Angeles",
            "America/Phoenix",
            "America/Anchorage",
            "Pacific/Honolulu",
          ];
    return Array.from(new Set(supported)).sort((a, b) => a.localeCompare(b));
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [businessName, setBusinessName] = useState("My Tutoring Business");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessAddress1, setBusinessAddress1] = useState("");
  const [businessAddress2, setBusinessAddress2] = useState("");
  const [businessCity, setBusinessCity] = useState("");
  const [businessState, setBusinessState] = useState("");
  const [businessZip, setBusinessZip] = useState("");

  const [timezone, setTimezone] = useState("America/New_York");
  const [defaultBufferMinutes, setDefaultBufferMinutes] = useState(15);

  useEffect(() => {
    // Prefer the browser's timezone when available.
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && timezones.includes(tz)) setTimezone(tz);

    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session?.access_token) {
        router.replace("/login");
        return;
      }

      // If already registered in an org, skip onboarding.
      const res = await fetch("/organizations", {
        headers: { Authorization: `Bearer ${data.session.access_token}` },
      });
      if (res.ok) {
        router.replace("/dashboard");
      }
    });
  }, [router, supabase, timezones]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus(null);
    setBusy(true);
    try {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session?.user?.id || !session.user.email) {
        setStatus("No active session. Please log in again.");
        return;
      }

      const orgRes = await fetch("/organizations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          business_name: businessName,
          timezone,
          default_buffer_minutes: defaultBufferMinutes,
          business_phone: businessPhone,
          business_address_1: businessAddress1,
          business_address_2: businessAddress2,
          business_city: businessCity,
          business_state: businessState,
          business_zip: businessZip,
        }),
      });
      if (!orgRes.ok) {
        const msg = await orgRes.text();
        setStatus(`Failed to create organization (${orgRes.status}): ${msg}`);
        return;
      }
      const org = await orgRes.json();

      const bootRes = await fetch("/bootstrap/owner", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          organization_id: org.id,
          user_id: session.user.id,
          email: session.user.email,
          first_name: firstName,
          last_name: lastName,
        }),
      });
      if (!bootRes.ok) {
        const msg = await bootRes.text();
        setStatus(`Failed to bootstrap owner (${bootRes.status}): ${msg}`);
        return;
      }

      router.replace("/setup");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Onboarding failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-[#ffff99] p-6 font-sans">
      <div className="absolute left-4 top-4">
        <BrandLogo href="/" />
      </div>

      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-start gap-6 pt-18 lg:grid-cols-[minmax(320px,45%)_minmax(24px,10%)_minmax(320px,45%)] lg:gap-0">
        <Card className="bg-white/95">
          <CardContent className="p-6">
            <h2 className="m-0 text-3xl font-extrabold">Let&apos;s Get Started</h2>
            <h3 className="mt-3 text-lg font-medium">
              This is the onboarding wizard for your organization. I just need to gather a little bit of information about your
              amazing tutoring business!
            </h3>

            <form onSubmit={onSubmit} className="mt-6 grid gap-3">
              <div className="flex flex-wrap gap-3">
                <div className="grid min-w-[240px] flex-1 gap-2">
                  <Label htmlFor="firstName">Your First Name</Label>
                  <Input
                    id="firstName"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-indigo-50"
                    autoComplete="given-name"
                  />
                </div>
                <div className="grid min-w-[240px] flex-1 gap-2">
                  <Label htmlFor="lastName">Your Last Name</Label>
                  <Input
                    id="lastName"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-indigo-50"
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="businessName">Name of Your Business</Label>
                <Input
                  id="businessName"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="bg-indigo-50"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="businessPhone">Business phone number</Label>
                <Input
                  id="businessPhone"
                  required
                  type="tel"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  className="bg-indigo-50"
                  autoComplete="tel"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="businessAddress1">Business address line 1</Label>
                <Input
                  id="businessAddress1"
                  required
                  value={businessAddress1}
                  onChange={(e) => setBusinessAddress1(e.target.value)}
                  className="bg-indigo-50"
                  autoComplete="address-line1"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="businessAddress2">Business address line 2 (optional)</Label>
                <Input
                  id="businessAddress2"
                  value={businessAddress2}
                  onChange={(e) => setBusinessAddress2(e.target.value)}
                  className="bg-indigo-50"
                  autoComplete="address-line2"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="grid min-w-[240px] flex-[2_1_240px] gap-2">
                  <Label htmlFor="businessCity">City</Label>
                  <Input
                    id="businessCity"
                    required
                    value={businessCity}
                    onChange={(e) => setBusinessCity(e.target.value)}
                    className="bg-indigo-50"
                    autoComplete="address-level2"
                  />
                </div>
                <div className="grid w-[110px] gap-2">
                  <Label htmlFor="businessState">State</Label>
                  <Input
                    id="businessState"
                    required
                    value={businessState}
                    onChange={(e) => setBusinessState(e.target.value)}
                    className="bg-indigo-50"
                    autoComplete="address-level1"
                  />
                </div>
                <div className="grid w-[160px] gap-2">
                  <Label htmlFor="businessZip">ZIP</Label>
                  <Input
                    id="businessZip"
                    required
                    value={businessZip}
                    onChange={(e) => setBusinessZip(e.target.value)}
                    className="bg-indigo-50"
                    autoComplete="postal-code"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="timezone">Time Zone</Label>
                <select
                  id="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="min-h-10 w-full rounded-xl border border-input bg-indigo-50 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="defaultBufferMinutes">Default schedule buffer</Label>
                  <span
                    title="This is a block of time that is optionally added after tutoring sessions to allow for time between students for clean up, prep, bathroom breaks, etc."
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-500 text-xs font-bold text-gray-700"
                  >
                    i
                  </span>
                </div>
                <Input
                  id="defaultBufferMinutes"
                  type="number"
                  min={0}
                  required
                  value={defaultBufferMinutes}
                  onChange={(e) => setDefaultBufferMinutes(Number(e.target.value))}
                  placeholder="Minutes"
                  className="bg-indigo-50"
                />
              </div>

              <Button disabled={busy} type="submit" className="mt-2 w-full">
                {busy ? "Creating..." : "Create organization"}
              </Button>
            </form>

            {status ? <p className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm">{status}</p> : null}
          </CardContent>
        </Card>

        <div className="hidden lg:block" />

        <div>
          <img
            src="/tutorPic1.jpg"
            alt="Tutor"
            className="block h-auto w-full max-h-[calc(100vh-140px)] object-contain"
          />
        </div>
      </div>
    </main>
  );
}
