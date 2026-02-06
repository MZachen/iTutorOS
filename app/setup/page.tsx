"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import AppHeader from "@/app/_components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type CreatedLocation = { id: string; location_name: string; is_virtual: boolean };
type CreatedRoom = { id: string; room_name: string; location_id: string };
type CreatedService = { id: string; service_code: string; hourly_rate_cents: number; location_id: string };
type CreatedTutor = { id: string; user_id: string; organization_id: string };
type CreatedSubject = { id: string; subject_name: string };
type CreatedTopic = { id: string; topic_name: string; subject_id: string };

type Step = "LOCATION" | "ROOMS" | "SERVICES" | "SUBJECTS_TOPICS" | "DONE";

type DraftRoom = { room_name: string; room_number: string };
type DraftService = {
  id: string;
  service_name: string;
  hourly_rate_dollars: number;
  checked: boolean;
  is_custom: boolean;
};

type DraftTopic = { id: string; topic_name: string; checked: boolean };
type DraftSubject = { id: string; subject_name: string; checked: boolean; topics: DraftTopic[] };

type SetupResult = {
  location: CreatedLocation;
  rooms: CreatedRoom[];
  services: CreatedService[];
  subjects: CreatedSubject[];
  topics: CreatedTopic[];
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

const DEFAULT_SERVICE_NAMES = [
  "Private Elementary School Tutoring",
  "Private Middle School Tutoring",
  "Private High School Tutoring",
  "Private Test Prep Tutoring",
  "Semi-private Elementary School Tutoring",
  "Semi-private Middle School Tutoring",
  "Semi-private High School Tutoring",
  "Semi-private Test Prep Tutoring",
  "Group Elementary School Classes",
  "Group Middle School Classes",
  "Group High School Classes",
  "Group Test Prep Classes",
  "Elementary School Workshops",
  "Middle School Workshops",
  "High School Workshops",
  "Test Prep Workshops",
  "Elementary School Camps",
  "Middle School Camps",
  "High School Camps",
  "Test Prep Camps",
  "Free Workshops",
  "Assessments",
  "Free/Comped Private Tutoring Sessions",
];

const DEFAULT_SUBJECTS: { subject_name: string; topics: string[] }[] = [
  {
    subject_name: "Math",
    topics: [
      "Arithmetic (add, subtract, multiply, divide)",
      "Pre-Algebra",
      "Algebra I",
      "Algebra II",
      "Geometry",
      "Trigonometry",
      "Pre-Calculus",
      "Calculus (limits, derivatives, integrals)",
      "Statistics",
      "Probability",
      "SAT / ACT Math",
      "Common Core Math",
    ],
  },
  {
    subject_name: "Reading & Language Arts",
    topics: [
      "Reading (phonics, comprehension, fluency)",
      "Writing (grammar, sentence structure, essays)",
      "Spelling",
      "Vocabulary",
      "Literature",
      "ESL Reading/Writing",
    ],
  },
  {
    subject_name: "Science",
    topics: [
      "General Science",
      "Biology",
      "Chemistry",
      "Physics",
      "Earth Science",
      "Environmental Science",
      "Anatomy & Physiology",
      "AP Science",
    ],
  },
  {
    subject_name: "Social Studies",
    topics: ["U.S. History", "World History", "Geography", "Civics / Government", "Economics", "AP History"],
  },
  {
    subject_name: "Test Prep",
    topics: ["SAT", "ACT", "PSAT", "ISEE", "SSAT", "SHSAT", "Regents Exams", "State Assessments", "AP Exams"],
  },
  {
    subject_name: "College & Career Prep",
    topics: [
      "College Essays",
      "College Applications",
      "Study Skills",
      "Note-Taking",
      "Test Anxiety",
      "Career Readiness",
    ],
  },
  {
    subject_name: "Foreign Languages",
    topics: [
      "Spanish",
      "French",
      "Italian",
      "German",
      "Mandarin",
      "Cantonese",
      "Japanese",
      "Korean",
      "Arabic",
      "Hebrew",
      "Portuguese",
    ],
  },
  { subject_name: "ESL / ELL", topics: ["Speaking", "Reading", "Writing", "Grammar", "Conversation"] },
  {
    subject_name: "Special Education & Academic Support",
    topics: [
      "Special Education",
      "IEP Support",
      "504 Support",
      "Learning Differences",
      "ADHD Support",
      "Executive Functioning",
      "Organization & Time Management",
    ],
  },
  {
    subject_name: "Computer & Technology",
    topics: [
      "Computer Basics",
      "Microsoft Word / Excel / PowerPoint",
      "Google Workspace",
      "Coding (Python, JavaScript, Java, Scratch)",
      "Web Development",
      "Data Analysis",
      "Computer Science (K–12)",
    ],
  },
  {
    subject_name: "Business & Finance",
    topics: ["Accounting", "Economics", "Personal Finance", "Entrepreneurship", "Excel for Business"],
  },
  {
    subject_name: "Arts & Music",
    topics: ["Art (drawing, painting)", "Music (piano, guitar, violin, voice)", "Music Theory", "Drama / Theater"],
  },
  {
    subject_name: "Early Childhood / Elementary",
    topics: ["Kindergarten Readiness", "Early Literacy", "Early Math", "General Homework Help"],
  },
];

const PLAN_LABELS: Record<string, string> = {
  basic: "Basic",
  "basic-plus": "Basic+",
  pro: "Pro",
  enterprise: "Enterprise",
};

const PLAN_LOCATION_LIMITS: Record<string, number | null> = {
  basic: 1,
  "basic-plus": 1,
  pro: 1,
  enterprise: null,
};

function getLocationLimit(plan: string) {
  return Object.prototype.hasOwnProperty.call(PLAN_LOCATION_LIMITS, plan) ? PLAN_LOCATION_LIMITS[plan] : 1;
}

function formatOrdinal(value: number) {
  const abs = Math.abs(value);
  const mod100 = abs % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${value}th`;
  switch (abs % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
}

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return Math.random().toString(36).slice(2);
}

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
  const [locationLimit, setLocationLimit] = useState<number | null>(null);
  const [existingLocations, setExistingLocations] = useState(0);
  const [planKey, setPlanKey] = useState("basic");

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

  // Services (pricing lives at the service level)
  const [services, setServices] = useState<DraftService[]>(() =>
    DEFAULT_SERVICE_NAMES.map((name) => ({
      id: makeId(),
      service_name: name,
      hourly_rate_dollars: 100,
      checked: false,
      is_custom: false,
    })),
  );
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState<number>(100);

  // Subjects & topics
  const [subjects, setSubjects] = useState<DraftSubject[]>(() =>
    DEFAULT_SUBJECTS.map((s) => ({
      id: makeId(),
      subject_name: s.subject_name,
      checked: false,
      topics: s.topics.map((t) => ({ id: makeId(), topic_name: t, checked: false })),
    })),
  );
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newTopicDrafts, setNewTopicDrafts] = useState<Record<string, string>>({});

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
      let planKeyValue = "basic";
      if (res.ok) {
        const orgs = await res.json();
        const org = orgs?.[0];
        const plan = typeof org?.subscription_plan === "string" ? org.subscription_plan : "basic";
        planKeyValue = plan;
        setPlanKey(plan);
        setLocationLimit(getLocationLimit(plan));
      }

      const locRes = await fetch("/locations", {
        headers: { Authorization: `Bearer ${data.session.access_token}` },
      });
      if (locRes.ok) {
        const locs = await locRes.json();
        const count = Array.isArray(locs) ? locs.length : 0;
        setExistingLocations(count);
        const limit = getLocationLimit(planKeyValue);
        const canAdd = limit === null || count < limit;
        if (!canAdd) {
          router.replace("/settings");
          return;
        }
      }
    });
  }, [router, supabase]);

  const planLabel = PLAN_LABELS[planKey] ?? planKey;
  const limitReached = locationLimit !== null && existingLocations >= locationLimit;

  useEffect(() => {
    if (limitReached && step !== "DONE") {
      setStep("DONE");
    }
  }, [limitReached, step]);

  function addCustomService() {
    setStatus(null);
    const trimmed = newServiceName.trim();
    if (!trimmed) {
      setStatus("Custom service name is required.");
      return;
    }

    setServices((prev) => [
      ...prev,
      {
        id: makeId(),
        service_name: trimmed,
        hourly_rate_dollars: Number(newServicePrice) || 0,
        checked: true,
        is_custom: true,
      },
    ]);

    setNewServiceName("");
    setNewServicePrice(100);
  }

  function addSubject() {
    setStatus(null);
    const trimmed = newSubjectName.trim();
    if (!trimmed) {
      setStatus("Subject name is required.");
      return;
    }

    setSubjects((prev) => [
      ...prev,
      {
        id: makeId(),
        subject_name: trimmed,
        checked: true,
        topics: [],
      },
    ]);
    setNewSubjectName("");
  }

  function addTopic(subjectId: string) {
    setStatus(null);
    const draft = (newTopicDrafts[subjectId] ?? "").trim();
    if (!draft) {
      setStatus("Topic name is required.");
      return;
    }

    setSubjects((prev) =>
      prev.map((s) => {
        if (s.id !== subjectId) return s;
        return {
          ...s,
          checked: true,
          topics: [...s.topics, { id: makeId(), topic_name: draft, checked: true }],
        };
      }),
    );
    setNewTopicDrafts((prev) => ({ ...prev, [subjectId]: "" }));
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
      return;
    }

    if (step === "SERVICES") {
      const selected = services.filter((s) => s.checked);
      if (selected.length === 0) {
        setStatus("Please select at least one service and enter a price.");
        return;
      }
      const invalid = selected.find((s) => !Number.isFinite(s.hourly_rate_dollars) || Number(s.hourly_rate_dollars) < 0);
      if (invalid) {
        setStatus("Please enter a valid hourly rate (0 or more) for each selected service.");
        return;
      }
      setStep("SUBJECTS_TOPICS");
    }
  }

  function goPrev() {
    setStatus(null);
    if (step === "ROOMS") setStep("LOCATION");
    else if (step === "SERVICES") setStep(isVirtual ? "LOCATION" : "ROOMS");
    else if (step === "SUBJECTS_TOPICS") setStep("SERVICES");
  }

  function startAnotherLocation() {
    if (limitReached) {
      setStatus(`Your ${planLabel} plan allows up to ${locationLimit} location${locationLimit === 1 ? "" : "s"}.`);
      return;
    }
    setLocationName("Main Location");
    setIsVirtual(false);
    setMeetingUrl("");
    setLocationAddress1("");
    setLocationAddress2("");
    setLocationCity("");
    setLocationState("");
    setLocationZip("");
    setRooms([{ room_name: "Room 1", room_number: "" }]);
    setServices(
      DEFAULT_SERVICE_NAMES.map((name) => ({
        id: makeId(),
        service_name: name,
        hourly_rate_dollars: 100,
        checked: false,
        is_custom: false,
      })),
    );
    setNewServiceName("");
    setNewServicePrice(100);
    setSubjects(
      DEFAULT_SUBJECTS.map((s) => ({
        id: makeId(),
        subject_name: s.subject_name,
        checked: false,
        topics: s.topics.map((t) => ({ id: makeId(), topic_name: t, checked: false })),
      })),
    );
    setNewSubjectName("");
    setNewTopicDrafts({});
    setLastResult(null);
    setStatus(null);
    setStep("LOCATION");
  }

  async function finishLocation() {
    setStatus(null);

    if (limitReached) {
      setStatus(`Your ${planLabel} plan allows up to ${locationLimit} location${locationLimit === 1 ? "" : "s"}.`);
      return;
    }

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

    const selectedServices = services.filter((s) => s.checked);
    if (selectedServices.length === 0) {
      setStatus("Please select at least one service and enter a price.");
      return;
    }
    const invalidService = selectedServices.find(
      (s) => !Number.isFinite(s.hourly_rate_dollars) || Number(s.hourly_rate_dollars) < 0,
    );
    if (invalidService) {
      setStatus("Please enter a valid hourly rate (0 or more) for each selected service.");
      return;
    }

    const selectedSubjects = subjects.filter((s) => s.checked);
    if (selectedSubjects.length === 0) {
      setStatus("Please select at least one subject.");
      return;
    }
    const missingTopics = selectedSubjects.find((s) => s.topics.some((t) => t.checked) === false);
    if (missingTopics) {
      setStatus(`Please select at least one topic for "${missingTopics.subject_name}", or uncheck that subject.`);
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
      setExistingLocations((prev) => prev + 1);

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
      for (const s of selectedServices) {
        const code = makeUniqueCode(s.service_name, usedCodes);
        usedCodes.add(code);
        const cents = Math.round(Number(s.hourly_rate_dollars) * 100);

        const svcRes = await fetch("/services-offered", {
          method: "POST",
          headers,
          body: JSON.stringify({
            location_id: location.id,
            service_code: code,
            display_name: s.service_name.trim(),
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

      setStatus("Saving subjects and topics...");
      const createdSubjects: CreatedSubject[] = [];
      const createdTopics: CreatedTopic[] = [];
      for (const subject of selectedSubjects) {
        const subjRes = await fetch("/subjects", {
          method: "POST",
          headers,
          body: JSON.stringify({ subject_name: subject.subject_name.trim() }),
        });
        if (!subjRes.ok) {
          const msg = await subjRes.text();
          setStatus(`Subject create failed (${subjRes.status}): ${msg}`);
          return;
        }
        const createdSubject = (await subjRes.json()) as CreatedSubject;
        createdSubjects.push(createdSubject);

        for (const topic of subject.topics.filter((t) => t.checked)) {
          const topicRes = await fetch("/topics", {
            method: "POST",
            headers,
            body: JSON.stringify({
              subject_id: createdSubject.id,
              topic_name: topic.topic_name.trim(),
            }),
          });
          if (!topicRes.ok) {
            const msg = await topicRes.text();
            setStatus(`Topic create failed (${topicRes.status}): ${msg}`);
            return;
          }
          createdTopics.push((await topicRes.json()) as CreatedTopic);
        }
      }

      const result: SetupResult = {
        location,
        rooms: createdRooms,
        services: createdServices,
        subjects: createdSubjects,
        topics: createdTopics,
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

  const steps: Step[] = isVirtual
    ? ["LOCATION", "SERVICES", "SUBJECTS_TOPICS", "DONE"]
    : ["LOCATION", "ROOMS", "SERVICES", "SUBJECTS_TOPICS", "DONE"];
  const stepLabel =
    step === "LOCATION"
      ? "Location"
      : step === "ROOMS"
        ? "Rooms"
        : step === "SERVICES"
          ? "Services Offered"
          : step === "SUBJECTS_TOPICS"
            ? "Subjects & Topics"
            : "Done";
  const stepNumber = Math.max(1, steps.indexOf(step) + 1);
  const stepTotal = steps.length;

  return (
    <div className="min-h-screen itutoros-soft-gradient">
      <AppHeader />
      <main className="flex justify-center p-6">
        <Card className="w-full max-w-[1000px]">
          <CardContent className="p-6">
            <div style={{ display: "grid", gap: 8 }}>
              <h1 style={{ margin: 0 }}>Setup</h1>
              <p style={{ margin: 0, color: "#333" }}>
                Step {stepNumber} of {stepTotal}: <strong>{stepLabel}</strong>
              </p>
            </div>

        <div style={{ marginTop: 18, borderTop: "1px solid #eee", paddingTop: 18 }}>
          {step === "LOCATION" ? (
            <div style={{ display: "grid", gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Location</h2>
              <p style={{ margin: 0, color: "#333" }}>
                {`Let's set up your ${formatOrdinal(existingLocations + 1)} location. This is where tutoring happens either in-person (a physical space) or online (Zoom/Meet/etc.).`}
                {" "}You can add, edit, or remove locations later in Organization Settings.
              </p>

              <label style={{ display: "grid", gap: 6 }}>
                <div>Location name</div>
                <Input
                  required
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="bg-indigo-50"
                />
              </label>

              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="checkbox" checked={isVirtual} onChange={(e) => setIsVirtual(e.target.checked)} />
                <span>This is a virtual / online location</span>
              </label>

              {isVirtual ? (
                <label style={{ display: "grid", gap: 6 }}>
                  <div>Meeting link (optional)</div>
                  <Input
                    type="url"
                    value={meetingUrl}
                    onChange={(e) => setMeetingUrl(e.target.value)}
                    placeholder="https://zoom.us/j/..."
                    className="bg-indigo-50"
                  />
                </label>
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  <p style={{ margin: 0, color: "#333" }}>
                    If you tutor in-person, add the address so parents can find you. You can always update this later.
                  </p>

                  <label style={{ display: "grid", gap: 6 }}>
                    <div>Address line 1</div>
                    <Input
                      value={locationAddress1}
                      onChange={(e) => setLocationAddress1(e.target.value)}
                      className="bg-indigo-50"
                      autoComplete="address-line1"
                    />
                  </label>

                  <label style={{ display: "grid", gap: 6 }}>
                    <div>Address line 2 (optional)</div>
                    <Input
                      value={locationAddress2}
                      onChange={(e) => setLocationAddress2(e.target.value)}
                      className="bg-indigo-50"
                      autoComplete="address-line2"
                    />
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
                    <label className="grid w-full gap-2 sm:flex-[2_1_240px]">
                      <div>City</div>
                      <Input
                        value={locationCity}
                        onChange={(e) => setLocationCity(e.target.value)}
                        className="bg-indigo-50"
                        autoComplete="address-level2"
                      />
                    </label>
                    <label className="grid w-full gap-2 sm:w-[110px]">
                      <div>State</div>
                      <select
                        value={locationState}
                        onChange={(e) => setLocationState(e.target.value)}
                        className="min-h-10 w-full rounded-xl border border-input bg-indigo-50 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">--</option>
                        {US_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid w-full gap-2 sm:w-[160px]">
                      <div>ZIP</div>
                      <Input
                        value={locationZip}
                        onChange={(e) => setLocationZip(e.target.value)}
                        className="bg-indigo-50"
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
                        <Button
                          type="button"
                          onClick={() => setRooms((prev) => prev.filter((_, i) => i !== idx))}
                          size="sm"
                        >
                          Remove
                        </Button>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <label className="grid w-full gap-2 sm:flex-1">
                        <div>Room name</div>
                        <Input
                          required
                          value={r.room_name}
                          onChange={(e) =>
                            setRooms((prev) => prev.map((x, i) => (i === idx ? { ...x, room_name: e.target.value } : x)))
                          }
                          className="bg-indigo-50"
                        />
                      </label>
                      <label className="grid w-full gap-2 sm:w-[220px]">
                        <div>Room number (optional)</div>
                        <Input
                          value={r.room_number}
                          onChange={(e) =>
                            setRooms((prev) => prev.map((x, i) => (i === idx ? { ...x, room_number: e.target.value } : x)))
                          }
                          className="bg-indigo-50"
                        />
                      </label>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  onClick={() => setRooms((prev) => [...prev, { room_name: `Room ${prev.length + 1}`, room_number: "" }])}
                  size="sm"
                >
                  Add another room
                </Button>
              </div>
            </div>
          ) : null}

          {step === "SERVICES" ? (
            <div style={{ display: "grid", gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Services Offered</h2>
              <p style={{ margin: 0, color: "#333" }}>
                Check every service you offer, and set a price for each. (You can change these later.)
              </p>

              <div style={{ display: "grid", gap: 8 }}>
                {services.map((s) => (
                  <div
                    key={s.id}
                    className="grid gap-3 rounded-xl border border-[#e6e6e6] p-3 sm:grid-cols-[32px_1fr_180px_90px] sm:items-center"
                    style={{ background: s.checked ? "#f2f6ff" : "#fafafa" }}
                  >
                    <input
                      type="checkbox"
                      checked={s.checked}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setServices((prev) => prev.map((x) => (x.id === s.id ? { ...x, checked } : x)));
                      }}
                    />
                    <div style={{ fontWeight: 500 }}>{s.service_name}</div>
                    <Input
                      type="number"
                      min={0}
                      step="0.01"
                      value={s.hourly_rate_dollars}
                      disabled={!s.checked}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setServices((prev) =>
                          prev.map((x) => (x.id === s.id ? { ...x, hourly_rate_dollars: value } : x)),
                        );
                      }}
                      className="bg-indigo-50"
                      placeholder="Price (USD)"
                    />
                    {s.is_custom ? (
                      <Button
                        type="button"
                        onClick={() => setServices((prev) => prev.filter((x) => x.id !== s.id))}
                        size="sm"
                      >
                        Remove
                      </Button>
                    ) : (
                      <div />
                    )}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 8,
                  padding: 12,
                  border: "1px solid #e6e6e6",
                  background: "white",
                }}
              >
                <h3 style={{ margin: 0, fontSize: 16 }}>Add a custom service</h3>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
                  <label className="grid w-full gap-2 sm:flex-[2_1_260px]">
                    <div>Service name</div>
                    <Input value={newServiceName} onChange={(e) => setNewServiceName(e.target.value)} className="bg-indigo-50" />
                  </label>
                  <label className="grid w-full gap-2 sm:w-[180px]">
                    <div>Price (USD)</div>
                    <Input
                      type="number"
                      min={0}
                      step="0.01"
                      value={newServicePrice}
                      onChange={(e) => setNewServicePrice(Number(e.target.value))}
                      className="bg-indigo-50"
                    />
                  </label>
                  <Button type="button" onClick={addCustomService} size="sm">
                    Add service
                  </Button>
                </div>
              </div>
            </div>
          ) : null}

          {step === "SUBJECTS_TOPICS" ? (
            <div style={{ display: "grid", gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Subjects &amp; Topics Offered</h2>
              <p style={{ margin: 0, color: "#333" }}>
                Select the subjects you teach. Then choose the topics you want to offer under each subject.
              </p>

              <div style={{ display: "grid", gap: 12 }}>
                {subjects.map((s) => (
                  <div
                    key={s.id}
                    style={{
                      border: "1px solid #e6e6e6",
                      background: "#fafafa",
                      padding: 12,
                    }}
                  >
                    <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <input
                        type="checkbox"
                        checked={s.checked}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setSubjects((prev) =>
                            prev.map((x) =>
                              x.id === s.id
                                ? {
                                    ...x,
                                    checked,
                                    topics: checked ? x.topics : x.topics.map((t) => ({ ...t, checked: false })),
                                  }
                                : x,
                            ),
                          );
                        }}
                      />
                      <strong>{s.subject_name}</strong>
                    </label>

                    <div style={{ marginTop: 8, display: "grid", gap: 6, opacity: s.checked ? 1 : 0.5 }}>
                      {s.topics.map((t) => (
                        <label key={t.id} style={{ display: "flex", gap: 10, alignItems: "center", marginLeft: 22 }}>
                          <input
                            type="checkbox"
                            checked={t.checked}
                            disabled={!s.checked}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setSubjects((prev) =>
                                prev.map((x) =>
                                  x.id === s.id
                                    ? {
                                        ...x,
                                        topics: x.topics.map((y) => (y.id === t.id ? { ...y, checked } : y)),
                                      }
                                    : x,
                                ),
                              );
                            }}
                          />
                          <span>{t.topic_name}</span>
                        </label>
                      ))}
                    </div>

                    <div style={{ marginTop: 10, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "end" }}>
                      <label style={{ display: "grid", gap: 6, flex: "1 1 260px" }}>
                        <div>Add a topic</div>
                        <Input
                          value={newTopicDrafts[s.id] ?? ""}
                          onChange={(e) => setNewTopicDrafts((prev) => ({ ...prev, [s.id]: e.target.value }))}
                          className="bg-indigo-50"
                        />
                      </label>
                      <Button type="button" onClick={() => addTopic(s.id)} size="sm">
                        Add topic
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 8,
                  padding: 12,
                  border: "1px solid #e6e6e6",
                  background: "white",
                }}
              >
                <h3 style={{ margin: 0, fontSize: 16 }}>Add a subject</h3>
                <div style={{ marginTop: 10, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "end" }}>
                  <label style={{ display: "grid", gap: 6, flex: "1 1 260px" }}>
                    <div>Subject name</div>
                    <Input value={newSubjectName} onChange={(e) => setNewSubjectName(e.target.value)} className="bg-indigo-50" />
                  </label>
                  <Button type="button" onClick={addSubject} size="sm">
                    Add subject
                  </Button>
                </div>
              </div>
            </div>
          ) : null}

          {step === "DONE" ? (
            <div style={{ display: "grid", gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Done</h2>
              <p style={{ margin: 0, color: "#333" }}>
                {limitReached
                  ? "Great! You've reached your plan's location limit. You can manage existing locations in Organization settings, or finish and go to the dashboard."
                  : "Great! You can add another location now, or finish and go to the dashboard."}
              </p>
              {locationLimit !== null ? (
                <p style={{ margin: 0, color: "#333" }}>
                  Plan limit: {locationLimit} location{locationLimit === 1 ? "" : "s"}. You currently have{" "}
                  <strong>{existingLocations}</strong>.
                </p>
              ) : (
                <p style={{ margin: 0, color: "#333" }}>Plan limit: Unlimited locations.</p>
              )}

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
                    <div>
                      <strong>Subjects:</strong> {lastResult.subjects.length}
                    </div>
                    <div>
                      <strong>Topics:</strong> {lastResult.topics.length}
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
        {limitReached ? (
          <p style={{ marginTop: 12, padding: 12, background: "#fff4f4", color: "#7a0b0b" }}>
            Your {planLabel} plan allows up to {locationLimit} location{locationLimit === 1 ? "" : "s"}. You can manage or
            upgrade in Organization settings.
          </p>
        ) : null}

        <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", gap: 12 }}>
          {step === "DONE" ? (
            <>
              <Button type="button" onClick={startAnotherLocation} size="sm" disabled={limitReached}>
                Add another location
              </Button>
              <Button type="button" onClick={() => router.replace("/dashboard")} size="sm">
                Done
              </Button>
            </>
          ) : (
            <>
              {step === "LOCATION" ? (
                <div />
              ) : (
                <Button type="button" disabled={busy} onClick={goPrev} size="sm">
                  Previous
                </Button>
              )}

              {step === "SUBJECTS_TOPICS" ? (
                <Button type="button" disabled={busy || limitReached} onClick={finishLocation} size="sm">
                  {busy ? "Creating..." : "Finish this location"}
                </Button>
              ) : (
                <Button type="button" disabled={busy || limitReached} onClick={goNext} size="sm">
                  Next
                </Button>
              )}
            </>
          )}
        </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
