"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { Button } from "@/components/ui/button";

type Org = {
  id: string;
  business_name: string;
  timezone: string;
  default_buffer_minutes: number;
  business_phone: string | null;
  business_email: string | null;
  business_address_1: string | null;
  business_address_2: string | null;
  business_city: string | null;
  business_state: string | null;
  business_zip: string | null;
};

export default function OrganizationSettingsPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

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

  const [orgId, setOrgId] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [timezone, setTimezone] = useState("America/New_York");
  const [defaultBufferMinutes, setDefaultBufferMinutes] = useState(15);
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessAddress1, setBusinessAddress1] = useState("");
  const [businessAddress2, setBusinessAddress2] = useState("");
  const [businessCity, setBusinessCity] = useState("");
  const [businessState, setBusinessState] = useState("");
  const [businessZip, setBusinessZip] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session?.access_token) {
        router.replace("/login");
        return;
      }

      const res = await fetch("/organizations", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (cancelled) return;
      if (res.status === 403) {
        router.replace("/onboarding");
        return;
      }
      if (!res.ok) {
        setStatus(`Failed to load organization (${res.status})`);
        return;
      }

      const orgs = (await res.json()) as Org[];
      const org = orgs[0];
      if (!org) {
        router.replace("/onboarding");
        return;
      }

      setOrgId(org.id);
      setBusinessName(org.business_name ?? "");
      setTimezone(org.timezone ?? "America/New_York");
      setDefaultBufferMinutes(org.default_buffer_minutes ?? 15);
      setBusinessPhone(org.business_phone ?? "");
      setBusinessEmail(org.business_email ?? "");
      setBusinessAddress1(org.business_address_1 ?? "");
      setBusinessAddress2(org.business_address_2 ?? "");
      setBusinessCity(org.business_city ?? "");
      setBusinessState(org.business_state ?? "");
      setBusinessZip(org.business_zip ?? "");
      setLoaded(true);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus(null);
    setBusy(true);
    try {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session?.access_token) {
        router.replace("/login");
        return;
      }
      if (!orgId) {
        setStatus("Organization not loaded yet. Please refresh.");
        return;
      }

      const res = await fetch("/organizations", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          business_name: businessName,
          timezone,
          default_buffer_minutes: defaultBufferMinutes,
          business_phone: businessPhone,
          business_email: businessEmail,
          business_address_1: businessAddress1,
          business_address_2: businessAddress2,
          business_city: businessCity,
          business_state: businessState,
          business_zip: businessZip,
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        setStatus(`Save failed (${res.status}): ${msg}`);
        return;
      }

      setStatus("Saved.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif", maxWidth: 720 }}>
      <h1 style={{ margin: 0 }}>Organization Settings</h1>
      <p style={{ marginTop: 8 }}>Update your organization profile used across iTutorOS.</p>

      <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
        <a href="/dashboard">Dashboard</a>
        <a href="/">Home</a>
      </div>

      {!loaded ? <p style={{ marginTop: 16 }}>Loading…</p> : null}

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
          <div>Business email (optional)</div>
          <input
            type="email"
            value={businessEmail}
            onChange={(e) => setBusinessEmail(e.target.value)}
            style={{ padding: 10 }}
            autoComplete="email"
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

        <Button disabled={busy} type="submit" className="w-full" size="sm">
          {busy ? "Saving..." : "Save"}
        </Button>
      </form>

      {status ? <p style={{ marginTop: 16, padding: 12, background: "#f5f5f5" }}>{status}</p> : null}
    </main>
  );
}
