"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

type CreatedLocation = { id: string; location_name: string; is_virtual: boolean };
type CreatedRoom = { id: string; room_name: string; location_id: string };
type CreatedService = { id: string; service_code: string; hourly_rate_cents: number; location_id: string };
type CreatedTutor = { id: string; user_id: string; organization_id: string };

type Step = "LOCATION" | "ROOMS" | "SERVICES" | "DONE";

type DraftRoom = { room_name: string; room_number: string };
type ServiceOption = { key: string; label: string };
type DraftService = { key: string; display_name: string; service_code: string; hourly_rate_dollars: number };

type SetupResult = {
  location: CreatedLocation;
  rooms: CreatedRoom[];
  services: CreatedService[];
  tutor: CreatedTutor | null;
};

const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const SERVICE_OPTIONS: ServiceOption[] = [
  { key: "GENERAL_TUTORING", label: "General Tutoring" },
  { key: "HOMEWORK_HELP", label: "Homework Help" },
  { key: "MATH", label: "Math" },
  { key: "READING", label: "Reading / ELA" },
  { key: "WRITING", label: "Writing" },
  { key: "SCIENCE", label: "Science" },
  { key: "SAT_PREP", label: "SAT Prep" },
  { key: "ACT_PREP", label: "ACT Prep" },
  { key: "TEST_PREP", label: "Other Test Prep" },
  { key: "COLLEGE_ESSAY", label: "College Essay" },
  { key: "STUDY_SKILLS", label: "Study Skills" },
  { key: "COLLEGE_COUNSELING", label: "College Counseling" },
];

function toServiceCode(value: string) {
  const raw = value.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "_");
  const cleaned = raw.replace(/^_+|_+$/g, "");
  return cleaned || "SERVICE";
}

function makeUniqueCode(base: string, existing: Set<string>) {
  const trimmed = toServiceCode(base);
  if (!existing.has(trimmed)) return trimmed;
  let i = 2;
  while (existing.has(`${trimmed}_${i}`)) i++;
  return `${trimmed}_${i}`;
}

export default function SetupPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();

  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("LOCATION");

  const [results, setResults] = useState<SetupResult[]>([]);
  const [lastResult, setLastResult] = useState<SetupResult | null>(null);

  // Location
  const [locationName, setLocationName] = useState("Main Location");
  const [isVirtual, setIsVirtual] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState("");
  const [locationAddress1, setLocationAddress1] = useState("");
  const [locationAddress2, setLocationAddress2] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [locationState, setLocationState] = useState<string>("");
  const [locationZip, setLocationZip] = useState("");

  // Rooms (physical only)
  const [rooms, setRooms] = useState<DraftRoom[]>([{ room_name: "Room 1", room_number: "" }]);

  // Services
  const [services, setServices] = useState<DraftService[]>([
    { key: "GENERAL_TUTORING", display_name: "General Tutoring", service_code: "GENERAL_TUTORING", hourly_rate_dollars: 100 },
  ]);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session?.access_token) {
        router.replace("/login");
        return;
      }

      // If the user isn't registered in an org yet, send them to onboarding.
      const res = await fetch("/organizations", {
        headers: { Authorization: `Bearer ${data.session.access_token}` },
      });
      if (res.status === 403) {
        router.replace("/onboarding");
        return;
      }
    });
  }, [router, supabase]);

  function toggleService(option: ServiceOption) {
    const exists = services.some((s) => s.key === option.key);
    if (exists) {
      setServices((prev) => prev.filter((s) => s.key !== option.key));
      return;
    }

    const existingCodes = new Set(services.map((s) => toServiceCode(s.service_code)));
    const code = makeUniqueCode(toServiceCode(option.label), existingCodes);
    setServices((prev) => [
      ...prev,
      { key: option.key, display_name: option.label, service_code: code, hourly_rate_dollars: 100 },
    ]);
  }

  function goNext() {
    setStatus(null);
    if (step === "LOCATION") {
      if (!locationName.trim()) {
        setStatus("Location name is required.");
        return;
      }
      setStep(isVirtual ? "SERVICES" : "ROOMS");
      return;
    }

    if (step === "ROOMS") {
      const anyBlank = rooms.some((r) => !r.room_name.trim());
      if (anyBlank) {
        setStatus("Each room needs a room name.");
        return;
      }
      if (rooms.length === 0) {
        setStatus("Please add at least one room.");
        return;
      }
      setStep("SERVICES");
    }
  }

  function goPrev() {
    setStatus(null);
    if (step === "ROOMS") setStep("LOCATION");
    else if (step === "SERVICES") setStep(isVirtual ? "LOCATION" : "ROOMS");
  }

  function startAnotherLocation() {
    setLocationName("Main Location");
    setIsVirtual(false);
    setMeetingUrl("");
    setLocationAddress1("");
    setLocationAddress2("");
    setLocationCity("");
    setLocationState("");
    setLocationZip("");
    setRooms([{ room_name: "Room 1", room_number: "" }]);
    setServices([{ key: "GENERAL_TUTORING", display_name: "General Tutoring", service_code: "GENERAL_TUTORING", hourly_rate_dollars: 100 }]);
    setLastResult(null);
    setStatus(null);
    setStep("LOCATION");
  }

  async function finishLocation() {
    setStatus(null);

    if (!locationName.trim()) {
      setStatus("Location name is required.");
      return;
    }

    if (!isVirtual) {
      if (rooms.length === 0) {
        setStatus("Please add at least one room.");
        return;
      }
      const anyBlank = rooms.some((r) => !r.room_name.trim());
      if (anyBlank) {
        setStatus("Each room needs a room name.");
        return;
      }
    }

    if (services.length === 0) {
      setStatus("Please select at least one service offered.");
      return;
    }

    setBusy(true);
    try {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session?.access_token || !session.user?.id || !session.user.email) {
        router.replace("/login");
        return;
      }

      const headers = {
        Authorization: `Bearer ${session.access_token}`,
        "content-type": "application/json",
      };

      setStatus("Creating location...");
      const locRes = await fetch("/locations", {
        method: "POST",
        headers,
        body: JSON.stringify({
          location_name: locationName.trim(),
          is_virtual: isVirtual,
          location_address_1: (isVirtual ? meetingUrl : locationAddress1).trim() || null,
          location_address_2: isVirtual ? null : locationAddress2.trim() || null,
          location_city: isVirtual ? null : locationCity.trim() || null,
          location_state: isVirtual ? null : locationState.trim() || null,
          location_zip: isVirtual ? null : locationZip.trim() || null,
        }),
      });
      if (!locRes.ok) {
        const msg = await locRes.text();
        setStatus(`Location create failed (${locRes.status}): ${msg}`);
        return;
      }
      const location = (await locRes.json()) as CreatedLocation;

      const createdRooms: CreatedRoom[] = [];
      if (!isVirtual) {
        setStatus("Creating rooms...");
        for (const r of rooms) {
          const roomRes = await fetch("/rooms", {
            method: "POST",
            headers,
            body: JSON.stringify({
              location_id: location.id,
              room_name: r.room_name.trim(),
              room_number: r.room_number.trim() || null,
            }),
          });
          if (!roomRes.ok) {
            const msg = await roomRes.text();
            setStatus(`Room create failed (${roomRes.status}): ${msg}`);
            return;
          }
          createdRooms.push((await roomRes.json()) as CreatedRoom);
        }
      }

      setStatus("Creating services offered...");
      const createdServices: CreatedService[] = [];
      const usedCodes = new Set<string>();
      for (const s of services) {
        const code = makeUniqueCode(s.service_code, usedCodes);
        usedCodes.add(code);
        const cents = Math.round(Number(s.hourly_rate_dollars) * 100);

        const svcRes = await fetch("/services-offered", {
          method: "POST",
          headers,
          body: JSON.stringify({
            location_id: location.id,
            service_code: code,
            display_name: s.display_name.trim(),
            hourly_rate_cents: cents,
            is_active: true,
          }),
        });
        if (!svcRes.ok) {
          const msg = await svcRes.text();
          setStatus(`Service create failed (${svcRes.status}): ${msg}`);
          return;
        }
        createdServices.push((await svcRes.json()) as CreatedService);
      }

      setStatus("Finalizing your account...");
      const tutorRes = await fetch("/tutors", {
        method: "POST",
        headers,
        body: JSON.stringify({
          user_id: session.user.id,
          email: session.user.email,
          location_ids: [location.id],
        }),
      });
      if (!tutorRes.ok) {
        const msg = await tutorRes.text();
        setStatus(`Tutor create failed (${tutorRes.status}): ${msg}`);
        return;
      }
      const createdTutor = ((await tutorRes.json()) as { tutor: CreatedTutor }).tutor;

      const result: SetupResult = {
        location,
        rooms: createdRooms,
        services: createdServices,
        tutor: createdTutor,
      };
      setResults((prev) => [...prev, result]);
      setLastResult(result);
      setStatus("Setup complete.");
      setStep("DONE");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Setup failed");
    } finally {
      setBusy(false);
    }
  }

  const steps: Step[] = isVirtual ? ["LOCATION", "SERVICES", "DONE"] : ["LOCATION", "ROOMS", "SERVICES", "DONE"];
  const stepLabel = step === "LOCATION" ? "Location" : step === "ROOMS" ? "Rooms" : step === "SERVICES" ? "Services Offered" : "Done";
  const stepNumber = Math.max(1, steps.indexOf(step) + 1);
  const stepTotal = steps.length;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 24,
        display: "grid",
        placeItems: "center",
        background: "#f6f7fb",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          background: "white",
          border: "1px solid #e6e6e6",
          boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
          padding: 24,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
          <div>
            <h1 style={{ margin: 0 }}>Setup</h1>
            <p style={{ marginTop: 8, marginBottom: 0, color: "#333" }}>
              Step {stepNumber} of {stepTotal}: <strong>{stepLabel}</strong>
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <a href="/dashboard">Dashboard</a>
            <a href="/settings/organization">Organization settings</a>
          </div>
        </div>

        <div style={{ marginTop: 18, borderTop: "1px solid #eee", paddingTop: 18 }}>
          {step === "LOCATION" ? (
            <div style={{ display: "grid", gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Location</h2>
              <p style={{ margin: 0, color: "#333" }}>
                Let’s set up your first location. This is where tutoring happens — either in-person (a physical space) or online (Zoom/Meet/etc.).
                You can add, edit, or remove locations later in Organization Settings.
              </p>

              <label style={{ display: "grid", gap: 6 }}>
                <div>Location name</div>
                <input
                  required
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  style={{ padding: 10 }}
                />
              </label>

              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="checkbox" checked={isVirtual} onChange={(e) => setIsVirtual(e.target.checked)} />
                <span>This is a virtual / online location</span>
              </label>

              {isVirtual ? (
                <label style={{ display: "grid", gap: 6 }}>
                  <div>Meeting link (optional)</div>
                  <input
                    type="url"
                    value={meetingUrl}
                    onChange={(e) => setMeetingUrl(e.target.value)}
                    placeholder="https://zoom.us/j/..."
                    style={{ padding: 10 }}
                  />
                </label>
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  <p style={{ margin: 0, color: "#333" }}>
                    If you tutor in-person, add the address so parents can find you. You can always update this later.
                  </p>

                  <label style={{ display: "grid", gap: 6 }}>
                    <div>Address line 1</div>
                    <input
                      value={locationAddress1}
                      onChange={(e) => setLocationAddress1(e.target.value)}
                      style={{ padding: 10 }}
                      autoComplete="address-line1"
                    />
                  </label>

                  <label style={{ display: "grid", gap: 6 }}>
                    <div>Address line 2 (optional)</div>
                    <input
                      value={locationAddress2}
                      onChange={(e) => setLocationAddress2(e.target.value)}
                      style={{ padding: 10 }}
                      autoComplete="address-line2"
                    />
                  </label>

                  <div style={{ display: "flex", gap: 12, alignItems: "end" }}>
                    <label style={{ display: "grid", gap: 6, flex: 1 }}>
                      <div>City</div>
                      <input
                        value={locationCity}
                        onChange={(e) => setLocationCity(e.target.value)}
                        style={{ padding: 10 }}
                        autoComplete="address-level2"
                      />
                    </label>
                    <label style={{ display: "grid", gap: 6, width: 110 }}>
                      <div>State</div>
                      <select value={locationState} onChange={(e) => setLocationState(e.target.value)} style={{ padding: 10 }}>
                        <option value="">--</option>
                        {US_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label style={{ display: "grid", gap: 6, width: 140 }}>
                      <div>ZIP</div>
                      <input
                        value={locationZip}
                        onChange={(e) => setLocationZip(e.target.value)}
                        style={{ padding: 10 }}
                        autoComplete="postal-code"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {step === "ROOMS" ? (
            <div style={{ display: "grid", gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Rooms</h2>
              <p style={{ margin: 0, color: "#333" }}>
                Rooms are the physical spaces inside this location. They help prevent scheduling conflicts (two sessions in the same room at the same time).
                If you only have one space, just keep a single room.
              </p>

              <div style={{ display: "grid", gap: 10 }}>
                {rooms.map((r, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "grid",
                      gap: 10,
                      padding: 12,
                      border: "1px solid #e6e6e6",
                      background: "#fafafa",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <strong>Room {idx + 1}</strong>
                      {rooms.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => setRooms((prev) => prev.filter((_, i) => i !== idx))}
                          style={{ padding: "6px 10px" }}
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                      <label style={{ display: "grid", gap: 6, flex: 1 }}>
                        <div>Room name</div>
                        <input
                          required
                          value={r.room_name}
                          onChange={(e) =>
                            setRooms((prev) => prev.map((x, i) => (i === idx ? { ...x, room_name: e.target.value } : x)))
                          }
                          style={{ padding: 10 }}
                        />
                      </label>
                      <label style={{ display: "grid", gap: 6, width: 220 }}>
                        <div>Room number (optional)</div>
                        <input
                          value={r.room_number}
                          onChange={(e) =>
                            setRooms((prev) => prev.map((x, i) => (i === idx ? { ...x, room_number: e.target.value } : x)))
                          }
                          style={{ padding: 10 }}
                        />
                      </label>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => setRooms((prev) => [...prev, { room_name: `Room ${prev.length + 1}`, room_number: "" }])}
                  style={{ padding: 10, width: "fit-content" }}
                >
                  Add another room
                </button>
              </div>
            </div>
          ) : null}

          {step === "SERVICES" ? (
            <div style={{ display: "grid", gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Services Offered</h2>
              <p style={{ margin: 0, color: "#333" }}>
                Select everything you offer (services/topics). Then set a default hourly rate for each.
                You can change pricing later, and you can offer different services at different locations.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
                {SERVICE_OPTIONS.map((opt) => {
                  const checked = services.some((s) => s.key === opt.key);
                  return (
                    <label
                      key={opt.key}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                        padding: 10,
                        border: "1px solid #e6e6e6",
                        background: checked ? "#f2f6ff" : "white",
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    >
                      <input type="checkbox" checked={checked} onChange={() => toggleService(opt)} />
                      <span>{opt.label}</span>
                    </label>
                  );
                })}
              </div>

              {services.length ? (
                <div style={{ marginTop: 8, display: "grid", gap: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 16 }}>Pricing</h3>
                  {services.map((s, idx) => (
                    <div
                      key={s.key}
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "end",
                        padding: 12,
                        border: "1px solid #e6e6e6",
                        background: "#fafafa",
                      }}
                    >
                      <label style={{ display: "grid", gap: 6, flex: 2 }}>
                        <div>Service name</div>
                        <input
                          required
                          value={s.display_name}
                          onChange={(e) =>
                            setServices((prev) => prev.map((x, i) => (i === idx ? { ...x, display_name: e.target.value } : x)))
                          }
                          style={{ padding: 10 }}
                        />
                      </label>

                      <label style={{ display: "grid", gap: 6, flex: 1 }}>
                        <div>Service code</div>
                        <input
                          required
                          value={s.service_code}
                          onChange={(e) =>
                            setServices((prev) => prev.map((x, i) => (i === idx ? { ...x, service_code: e.target.value } : x)))
                          }
                          style={{ padding: 10 }}
                        />
                      </label>

                      <label style={{ display: "grid", gap: 6, width: 180 }}>
                        <div>Hourly rate (USD)</div>
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          required
                          value={s.hourly_rate_dollars}
                          onChange={(e) =>
                            setServices((prev) =>
                              prev.map((x, i) => (i === idx ? { ...x, hourly_rate_dollars: Number(e.target.value) } : x)),
                            )
                          }
                          style={{ padding: 10 }}
                        />
                      </label>

                      <button type="button" onClick={() => setServices((prev) => prev.filter((x) => x.key !== s.key))} style={{ padding: "10px 12px" }}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ margin: 0, color: "#333" }}>Select at least one service to continue.</p>
              )}
            </div>
          ) : null}

          {step === "DONE" ? (
            <div style={{ display: "grid", gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Done</h2>
              <p style={{ margin: 0, color: "#333" }}>
                Great! You can add another location now, or finish and go to the dashboard.
              </p>

              {lastResult ? (
                <>
                  <div style={{ display: "grid", gap: 6 }}>
                    <div>
                      <strong>Location:</strong> {lastResult.location.location_name} {lastResult.location.is_virtual ? "(virtual)" : "(physical)"}
                    </div>
                    {!lastResult.location.is_virtual ? (
                      <div>
                        <strong>Rooms:</strong> {lastResult.rooms.length}
                      </div>
                    ) : null}
                    <div>
                      <strong>Services:</strong> {lastResult.services.length}
                    </div>
                  </div>

                  <details style={{ marginTop: 6 }}>
                    <summary style={{ cursor: "pointer" }}>Technical details (JSON)</summary>
                    <pre style={{ margin: 0, marginTop: 8, padding: 12, background: "#0b1020", color: "#e6e6e6", overflow: "auto" }}>
                      {JSON.stringify(lastResult, null, 2)}
                    </pre>
                  </details>
                </>
              ) : null}

              {results.length > 1 ? (
                <p style={{ margin: 0, color: "#333" }}>
                  Locations created in this session: <strong>{results.length}</strong>
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        {status ? <p style={{ marginTop: 16, padding: 12, background: "#f5f5f5" }}>{status}</p> : null}

        <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", gap: 12 }}>
          {step === "DONE" ? (
            <>
              <button type="button" onClick={startAnotherLocation} style={{ padding: 10 }}>
                Add another location
              </button>
              <button type="button" onClick={() => router.replace("/dashboard")} style={{ padding: 10 }}>
                Done
              </button>
            </>
          ) : (
            <>
              <button type="button" disabled={busy || step === "LOCATION"} onClick={goPrev} style={{ padding: 10 }}>
                Previous
              </button>

              {step === "SERVICES" ? (
                <button type="button" disabled={busy} onClick={finishLocation} style={{ padding: 10 }}>
                  {busy ? "Creating..." : "Finish this location"}
                </button>
              ) : (
                <button type="button" disabled={busy} onClick={goNext} style={{ padding: 10 }}>
                  Next
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
