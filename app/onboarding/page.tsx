"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import BrandLogo from "@/app/_components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PLANS = [
  { id: "basic", name: "Basic", price: "$19.95/month" },
  { id: "basic-plus", name: "Basic+", price: "$29.95/month" },
  { id: "pro", name: "Pro", price: "$49.95/month" },
  { id: "enterprise", name: "Enterprise", price: "$99.95/month" },
];

export default function OnboardingPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
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

  const [selectedPlan, setSelectedPlan] = useState("basic");

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


  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && timezones.includes(tz)) setTimezone(tz);

    const planParam = searchParams.get("plan");
    if (planParam && PLANS.some((p) => p.id === planParam)) {
      setSelectedPlan(planParam);
    }

    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session?.access_token) {
        router.replace("/login");
        return;
      }

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
          default_buffer_minutes: 15,
          subscription_plan: selectedPlan,
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

      router.replace(`/checkout?plan=${encodeURIComponent(selectedPlan)}&org=${encodeURIComponent(org.id)}`);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Onboarding failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen itutoros-soft-gradient p-6" style={{ position: "relative", fontFamily: "inherit" }}>
      <div style={{ position: "absolute", top: 16, left: 16, zIndex: 50 }}>
        <BrandLogo href="/" />
      </div>

      <div className="mx-auto w-full max-w-[900px] itutoros-card-2 p-8">
        <h2 className="m-0 text-3xl font-extrabold">Let&apos;s Get Started</h2>
        <h3 className="mt-3 text-lg font-medium">
          This is the onboarding wizard for your organization. I just need to gather a little bit of information about your amazing
          tutoring business!
        </h3>

        <div className="mt-6">
          <h4 className="text-lg font-extrabold">Choose a plan</h4>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {PLANS.map((plan) => {
              const selected = plan.id === selectedPlan;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`rounded-xl border-2 p-4 text-left transition ${
                    selected ? "border-[#6ddf8b] bg-[#e0fde5]" : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="text-base font-extrabold">{plan.name}</div>
                  <div className="text-sm text-gray-700">{plan.price}</div>
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-6 grid gap-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="grid w-full gap-2 sm:min-w-[240px] sm:flex-1">
              <Label htmlFor="firstName">Your First Name</Label>
              <Input
                id="firstName"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-zinc-50"
                autoComplete="given-name"
              />
            </div>
            <div className="grid w-full gap-2 sm:min-w-[240px] sm:flex-1">
              <Label htmlFor="lastName">Your Last Name</Label>
              <Input
                id="lastName"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-zinc-50"
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
              className="bg-zinc-50"
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
              className="bg-zinc-50"
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
              className="bg-zinc-50"
              autoComplete="address-line1"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="businessAddress2">Business address line 2 (optional)</Label>
            <Input
              id="businessAddress2"
              value={businessAddress2}
              onChange={(e) => setBusinessAddress2(e.target.value)}
              className="bg-zinc-50"
              autoComplete="address-line2"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <div className="grid w-full gap-2 sm:min-w-[240px] sm:flex-[2_1_240px]">
              <Label htmlFor="businessCity">City</Label>
              <Input
                id="businessCity"
                required
                value={businessCity}
                onChange={(e) => setBusinessCity(e.target.value)}
                className="bg-zinc-50"
                autoComplete="address-level2"
              />
            </div>
            <div className="grid w-full gap-2 sm:w-[110px]">
              <Label htmlFor="businessState">State</Label>
              <Input
                id="businessState"
                required
                value={businessState}
                onChange={(e) => setBusinessState(e.target.value)}
                className="bg-zinc-50"
                autoComplete="address-level1"
              />
            </div>
            <div className="grid w-full gap-2 sm:w-[160px]">
              <Label htmlFor="businessZip">ZIP</Label>
              <Input
                id="businessZip"
                required
                value={businessZip}
                onChange={(e) => setBusinessZip(e.target.value)}
                className="bg-zinc-50"
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
              className="min-h-10 w-full rounded-xl border border-input bg-zinc-50 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4">
            <h4 className="text-lg font-extrabold">Payment information</h4>
            <p className="mt-1 text-sm text-gray-600">
              Payments are handled securely by Stripe. On the next step you&apos;ll enter your card details and can update them anytime in
              Settings.
            </p>
          </div>

          <Button disabled={busy} type="submit" className="mt-4 w-full">
            {busy ? "Processing..." : "Continue to checkout"}
          </Button>
        </form>

        {status ? <p className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm">{status}</p> : null}
      </div>
    </main>
  );
}
