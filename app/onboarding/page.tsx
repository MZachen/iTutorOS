"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function OnboardingPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const [businessName, setBusinessName] = useState("My Tutoring Business");
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

  const [timezone, setTimezone] = useState("America/New_York");
  const [defaultBufferMinutes, setDefaultBufferMinutes] = useState(15);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessAddress1, setBusinessAddress1] = useState("");
  const [businessAddress2, setBusinessAddress2] = useState("");
  const [businessCity, setBusinessCity] = useState("");
  const [businessState, setBusinessState] = useState("");
  const [businessZip, setBusinessZip] = useState("");

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
        return;
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
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif", maxWidth: 640 }}>
      <h1 style={{ margin: 0 }}>Onboarding</h1>
      <p style={{ marginTop: 8 }}>
        Create your organization so your account can access the iTutorOS dashboard.
      </p>

      <form onSubmit={onSubmit} style={{ marginTop: 16, display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <div>Business name</div>
          <input
            required
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            style={{ padding: 10 }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <div>Timezone</div>
          <select value={timezone} onChange={(e) => setTimezone(e.target.value)} style={{ padding: 10 }}>
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>Default schedule buffer</span>
            <span
              title="This is a block of time that is optionally added after tutoring sessions to allow for time between students for clean up, prep, bathroom breaks, etc."
              style={{
                display: "inline-flex",
                width: 18,
                height: 18,
                borderRadius: 999,
                border: "1px solid #999",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                cursor: "help",
                userSelect: "none",
              }}
            >
              i
            </span>
          </div>
          <input
            type="number"
            min={0}
            required
            value={defaultBufferMinutes}
            onChange={(e) => setDefaultBufferMinutes(Number(e.target.value))}
            placeholder="Minutes"
            style={{ padding: 10 }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <div>Business phone number</div>
          <input
            required
            type="tel"
            value={businessPhone}
            onChange={(e) => setBusinessPhone(e.target.value)}
            style={{ padding: 10 }}
            autoComplete="tel"
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <div>Business address line 1</div>
          <input
            required
            value={businessAddress1}
            onChange={(e) => setBusinessAddress1(e.target.value)}
            style={{ padding: 10 }}
            autoComplete="address-line1"
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <div>Business address line 2 (optional)</div>
          <input
            value={businessAddress2}
            onChange={(e) => setBusinessAddress2(e.target.value)}
            style={{ padding: 10 }}
            autoComplete="address-line2"
          />
        </label>

        <div style={{ display: "flex", gap: 12 }}>
          <label style={{ display: "grid", gap: 6, flex: 1 }}>
            <div>City</div>
            <input
              required
              value={businessCity}
              onChange={(e) => setBusinessCity(e.target.value)}
              style={{ padding: 10 }}
              autoComplete="address-level2"
            />
          </label>
          <label style={{ display: "grid", gap: 6, flex: 1 }}>
            <div>State</div>
            <input
              required
              value={businessState}
              onChange={(e) => setBusinessState(e.target.value)}
              style={{ padding: 10 }}
              autoComplete="address-level1"
            />
          </label>
          <label style={{ display: "grid", gap: 6, width: 160 }}>
            <div>ZIP</div>
            <input
              required
              value={businessZip}
              onChange={(e) => setBusinessZip(e.target.value)}
              style={{ padding: 10 }}
              autoComplete="postal-code"
            />
          </label>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <label style={{ display: "grid", gap: 6, flex: 1 }}>
            <div>First name</div>
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ padding: 10 }}
              autoComplete="given-name"
            />
          </label>
          <label style={{ display: "grid", gap: 6, flex: 1 }}>
            <div>Last name</div>
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ padding: 10 }}
              autoComplete="family-name"
            />
          </label>
        </div>

        <button disabled={busy} type="submit" style={{ padding: 10 }}>
          {busy ? "Creating..." : "Create organization"}
        </button>
      </form>

      {status ? (
        <p style={{ marginTop: 16, padding: 12, background: "#f5f5f5" }}>{status}</p>
      ) : null}
    </main>
  );
}
