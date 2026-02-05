"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import AppHeader from "@/app/_components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
  subscription_plan?: string | null;
};

type Location = {
  id: string;
  location_name: string;
  is_virtual: boolean;
  location_address_1?: string | null;
  location_address_2?: string | null;
  location_city?: string | null;
  location_state?: string | null;
  location_zip?: string | null;
};

type Room = {
  id: string;
  location_id: string;
  room_name: string;
  room_number?: string | null;
  floor_number?: string | null;
};

type ServiceOffered = {
  id: string;
  location_id: string;
  service_code: string;
  hourly_rate_cents: number;
  display_name?: string | null;
  description_text?: string | null;
  is_active: boolean;
};

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

export default function OrganizationSettingsPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [billingBusy, setBillingBusy] = useState(false);
  const [billingStatus, setBillingStatus] = useState<string | null>(null);

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
  const [initialOrg, setInitialOrg] = useState<Org | null>(null);
  const [planKey, setPlanKey] = useState("basic");
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

  const [locations, setLocations] = useState<Location[]>([]);
  const [locationsLoaded, setLocationsLoaded] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [roomsByLocation, setRoomsByLocation] = useState<Record<string, Room[]>>({});
  const [servicesByLocation, setServicesByLocation] = useState<Record<string, ServiceOffered[]>>({});
  const [roomsLoaded, setRoomsLoaded] = useState(false);
  const [servicesLoaded, setServicesLoaded] = useState(false);
  const [roomStatus, setRoomStatus] = useState<string | null>(null);
  const [serviceStatus, setServiceStatus] = useState<string | null>(null);

  const [editLocationId, setEditLocationId] = useState<string | null>(null);
  const [editLocationName, setEditLocationName] = useState("");
  const [editIsVirtual, setEditIsVirtual] = useState(false);
  const [editMeetingUrl, setEditMeetingUrl] = useState("");
  const [editAddress1, setEditAddress1] = useState("");
  const [editAddress2, setEditAddress2] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editState, setEditState] = useState("");
  const [editZip, setEditZip] = useState("");
  const [editBusy, setEditBusy] = useState(false);

  const [removeLocationId, setRemoveLocationId] = useState<string | null>(null);
  const [removePassword, setRemovePassword] = useState("");
  const [removeBusy, setRemoveBusy] = useState(false);
  const [removeStatus, setRemoveStatus] = useState<string | null>(null);

  const [editRoomId, setEditRoomId] = useState<string | null>(null);
  const [editRoomName, setEditRoomName] = useState("");
  const [editRoomNumber, setEditRoomNumber] = useState("");
  const [editFloorNumber, setEditFloorNumber] = useState("");
  const [editRoomBusy, setEditRoomBusy] = useState(false);

  const [removeRoomId, setRemoveRoomId] = useState<string | null>(null);
  const [removeRoomPassword, setRemoveRoomPassword] = useState("");
  const [removeRoomBusy, setRemoveRoomBusy] = useState(false);
  const [removeRoomStatus, setRemoveRoomStatus] = useState<string | null>(null);

  const [editServiceId, setEditServiceId] = useState<string | null>(null);
  const [editServiceName, setEditServiceName] = useState("");
  const [editServiceRate, setEditServiceRate] = useState("");
  const [editServiceDescription, setEditServiceDescription] = useState("");
  const [editServiceBusy, setEditServiceBusy] = useState(false);

  const [removeServiceId, setRemoveServiceId] = useState<string | null>(null);
  const [removeServicePassword, setRemoveServicePassword] = useState("");
  const [removeServiceBusy, setRemoveServiceBusy] = useState(false);
  const [removeServiceStatus, setRemoveServiceStatus] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session?.access_token) {
        router.replace("/login");
        return;
      }
      if (session.user?.email) setUserEmail(session.user.email);

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
      setInitialOrg(org);
      setPlanKey(typeof org.subscription_plan === "string" ? org.subscription_plan : "basic");
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

      const locRes = await fetch("/locations", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (locRes.ok) {
        const data = (await locRes.json()) as Location[];
        setLocations(Array.isArray(data) ? data : []);
        setLocationsLoaded(true);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  useEffect(() => {
    if (!locationsLoaded) return;
    let cancelled = false;

    async function run() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session?.access_token) return;
      const headers = { Authorization: `Bearer ${session.access_token}` };

      const roomEntries = await Promise.all(
        locations.map(async (loc) => {
          const res = await fetch(`/rooms?location_id=${loc.id}`, { headers });
          if (!res.ok) return [loc.id, []] as const;
          const rows = await res.json();
          return [loc.id, Array.isArray(rows) ? (rows as Room[]) : []] as const;
        }),
      );
      if (cancelled) return;
      setRoomsByLocation(Object.fromEntries(roomEntries));
      setRoomsLoaded(true);

      const serviceEntries = await Promise.all(
        locations.map(async (loc) => {
          const res = await fetch(`/services-offered?location_id=${loc.id}`, { headers });
          if (!res.ok) return [loc.id, []] as const;
          const rows = await res.json();
          return [loc.id, Array.isArray(rows) ? (rows as ServiceOffered[]) : []] as const;
        }),
      );
      if (cancelled) return;
      setServicesByLocation(Object.fromEntries(serviceEntries));
      setServicesLoaded(true);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [locations, locationsLoaded, supabase]);

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

  async function onManageBilling() {
    setBillingStatus(null);
    setBillingBusy(true);
    try {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session?.user?.email) {
        setBillingStatus("Missing email. Please log in again.");
        return;
      }

      const res = await fetch("/api/stripe/create-billing-portal", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: session.user.email, returnUrl: window.location.href }),
      });
      if (!res.ok) {
        const msg = await res.text();
        setBillingStatus(`Unable to open billing (${res.status}): ${msg}`);
        return;
      }
      const dataRes = await res.json();
      if (!dataRes.url) {
        setBillingStatus("Billing portal did not return a URL.");
        return;
      }
      window.location.href = dataRes.url as string;
    } catch (err) {
      setBillingStatus(err instanceof Error ? err.message : "Billing portal failed.");
    } finally {
      setBillingBusy(false);
    }
  }

  const planLabel = PLAN_LABELS[planKey] ?? planKey;
  const locationLimit = Object.prototype.hasOwnProperty.call(PLAN_LOCATION_LIMITS, planKey)
    ? PLAN_LOCATION_LIMITS[planKey]
    : 1;
  const currentLocationCount = locations.length;
  const canAddLocation = locationLimit === null || currentLocationCount < locationLimit;

  function onCancel() {
    if (!initialOrg) return;
    setBusinessName(initialOrg.business_name ?? "");
    setTimezone(initialOrg.timezone ?? "America/New_York");
    setDefaultBufferMinutes(initialOrg.default_buffer_minutes ?? 15);
    setBusinessPhone(initialOrg.business_phone ?? "");
    setBusinessEmail(initialOrg.business_email ?? "");
    setBusinessAddress1(initialOrg.business_address_1 ?? "");
    setBusinessAddress2(initialOrg.business_address_2 ?? "");
    setBusinessCity(initialOrg.business_city ?? "");
    setBusinessState(initialOrg.business_state ?? "");
    setBusinessZip(initialOrg.business_zip ?? "");
    setStatus(null);
  }

  function startEditLocation(loc: Location) {
    setEditLocationId(loc.id);
    setEditLocationName(loc.location_name ?? "");
    setEditIsVirtual(Boolean(loc.is_virtual));
    if (loc.is_virtual) {
      setEditMeetingUrl(loc.location_address_1 ?? "");
      setEditAddress1("");
      setEditAddress2("");
      setEditCity("");
      setEditState("");
      setEditZip("");
    } else {
      setEditMeetingUrl("");
      setEditAddress1(loc.location_address_1 ?? "");
      setEditAddress2(loc.location_address_2 ?? "");
      setEditCity(loc.location_city ?? "");
      setEditState(loc.location_state ?? "");
      setEditZip(loc.location_zip ?? "");
    }
    setLocationStatus(null);
  }

  function cancelEditLocation() {
    setEditLocationId(null);
    setEditLocationName("");
    setEditIsVirtual(false);
    setEditMeetingUrl("");
    setEditAddress1("");
    setEditAddress2("");
    setEditCity("");
    setEditState("");
    setEditZip("");
  }

  async function saveEditLocation() {
    if (!editLocationId) return;
    if (!editLocationName.trim()) {
      setLocationStatus("Location name is required.");
      return;
    }
    setEditBusy(true);
    setLocationStatus(null);
    try {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session?.access_token) {
        router.replace("/login");
        return;
      }
      const res = await fetch("/locations", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          location_id: editLocationId,
          location_name: editLocationName.trim(),
          is_virtual: editIsVirtual,
          location_address_1: (editIsVirtual ? editMeetingUrl : editAddress1).trim() || null,
          location_address_2: editIsVirtual ? null : editAddress2.trim() || null,
          location_city: editIsVirtual ? null : editCity.trim() || null,
          location_state: editIsVirtual ? null : editState.trim() || null,
          location_zip: editIsVirtual ? null : editZip.trim() || null,
        }),
      });
      if (!res.ok) {
        const msg = await res.text();
        setLocationStatus(`Location update failed (${res.status}): ${msg}`);
        return;
      }
      const updated = (await res.json()) as Location;
      setLocations((prev) => prev.map((loc) => (loc.id === updated.id ? { ...loc, ...updated } : loc)));
      setLocationStatus("Location updated.");
      cancelEditLocation();
    } catch (err) {
      setLocationStatus(err instanceof Error ? err.message : "Location update failed.");
    } finally {
      setEditBusy(false);
    }
  }

  function startRemoveLocation(id: string) {
    setRemoveLocationId(id);
    setRemovePassword("");
    setRemoveStatus(null);
  }

  function cancelRemoveLocation() {
    setRemoveLocationId(null);
    setRemovePassword("");
    setRemoveStatus(null);
  }

  async function confirmRemoveLocation() {
    if (!removeLocationId) return;
    if (!removePassword) {
      setRemoveStatus("Please enter your password to confirm.");
      return;
    }
    if (!userEmail) {
      setRemoveStatus("Missing user email. Please log in again.");
      return;
    }
    setRemoveBusy(true);
    setRemoveStatus(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: removePassword,
      });
      if (error) {
        setRemoveStatus("Password is incorrect.");
        return;
      }
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session?.access_token) {
        setRemoveStatus("Session expired. Please log in again.");
        return;
      }
      const res = await fetch("/locations", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ location_id: removeLocationId }),
      });
      if (!res.ok) {
        const msg = await res.text();
        setRemoveStatus(`Archive failed (${res.status}): ${msg}`);
        return;
      }
      setLocations((prev) => prev.filter((loc) => loc.id !== removeLocationId));
      setRoomsByLocation((prev) => {
        const next = { ...prev };
        delete next[removeLocationId];
        return next;
      });
      setServicesByLocation((prev) => {
        const next = { ...prev };
        delete next[removeLocationId];
        return next;
      });
      setRemoveStatus(null);
      cancelRemoveLocation();
      setLocationStatus("Location archived.");
    } catch (err) {
      setRemoveStatus(err instanceof Error ? err.message : "Archive failed.");
    } finally {
      setRemoveBusy(false);
    }
  }

  function startEditRoom(room: Room) {
    setEditRoomId(room.id);
    setEditRoomName(room.room_name ?? "");
    setEditRoomNumber(room.room_number ?? "");
    setEditFloorNumber(room.floor_number ?? "");
    setRoomStatus(null);
  }

  function cancelEditRoom() {
    setEditRoomId(null);
    setEditRoomName("");
    setEditRoomNumber("");
    setEditFloorNumber("");
  }

  async function saveEditRoom() {
    if (!editRoomId) return;
    if (!editRoomName.trim()) {
      setRoomStatus("Room name is required.");
      return;
    }
    setEditRoomBusy(true);
    setRoomStatus(null);
    try {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session?.access_token) {
        router.replace("/login");
        return;
      }
      const res = await fetch("/rooms", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          room_id: editRoomId,
          room_name: editRoomName.trim(),
          room_number: editRoomNumber.trim() || null,
          floor_number: editFloorNumber.trim() || null,
        }),
      });
      if (!res.ok) {
        const msg = await res.text();
        setRoomStatus(`Room update failed (${res.status}): ${msg}`);
        return;
      }
      const updated = (await res.json()) as Room;
      setRoomsByLocation((prev) => ({
        ...prev,
        [updated.location_id]: (prev[updated.location_id] ?? []).map((room) =>
          room.id === updated.id ? { ...room, ...updated } : room,
        ),
      }));
      setRoomStatus("Room updated.");
      cancelEditRoom();
    } catch (err) {
      setRoomStatus(err instanceof Error ? err.message : "Room update failed.");
    } finally {
      setEditRoomBusy(false);
    }
  }

  function startRemoveRoom(roomId: string) {
    setRemoveRoomId(roomId);
    setRemoveRoomPassword("");
    setRemoveRoomStatus(null);
  }

  function cancelRemoveRoom() {
    setRemoveRoomId(null);
    setRemoveRoomPassword("");
    setRemoveRoomStatus(null);
  }

  async function confirmRemoveRoom() {
    if (!removeRoomId) return;
    if (!removeRoomPassword) {
      setRemoveRoomStatus("Please enter your password to confirm.");
      return;
    }
    if (!userEmail) {
      setRemoveRoomStatus("Missing user email. Please log in again.");
      return;
    }
    setRemoveRoomBusy(true);
    setRemoveRoomStatus(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: removeRoomPassword,
      });
      if (error) {
        setRemoveRoomStatus("Password is incorrect.");
        return;
      }
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session?.access_token) {
        setRemoveRoomStatus("Session expired. Please log in again.");
        return;
      }
      const res = await fetch("/rooms", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ room_id: removeRoomId }),
      });
      if (!res.ok) {
        const msg = await res.text();
        setRemoveRoomStatus(`Remove failed (${res.status}): ${msg}`);
        return;
      }
      setRoomsByLocation((prev) => {
        const next: Record<string, Room[]> = {};
        for (const [locId, rooms] of Object.entries(prev)) {
          next[locId] = rooms.filter((room) => room.id !== removeRoomId);
        }
        return next;
      });
      setRemoveRoomStatus(null);
      cancelRemoveRoom();
      setRoomStatus("Room removed.");
    } catch (err) {
      setRemoveRoomStatus(err instanceof Error ? err.message : "Remove failed.");
    } finally {
      setRemoveRoomBusy(false);
    }
  }

  function startEditService(service: ServiceOffered) {
    setEditServiceId(service.id);
    setEditServiceName(service.display_name ?? service.service_code);
    setEditServiceRate((service.hourly_rate_cents / 100).toFixed(2));
    setEditServiceDescription(service.description_text ?? "");
    setServiceStatus(null);
  }

  function cancelEditService() {
    setEditServiceId(null);
    setEditServiceName("");
    setEditServiceRate("");
    setEditServiceDescription("");
  }

  async function saveEditService() {
    if (!editServiceId) return;
    const dollars = Number(editServiceRate);
    if (!Number.isFinite(dollars) || dollars <= 0) {
      setServiceStatus("Hourly rate must be a positive number.");
      return;
    }
    setEditServiceBusy(true);
    setServiceStatus(null);
    try {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session?.access_token) {
        router.replace("/login");
        return;
      }
      const res = await fetch("/services-offered", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          service_offered_id: editServiceId,
          display_name: editServiceName.trim() || null,
          hourly_rate_cents: Math.round(dollars * 100),
          description_text: editServiceDescription.trim() || null,
        }),
      });
      if (!res.ok) {
        const msg = await res.text();
        setServiceStatus(`Service update failed (${res.status}): ${msg}`);
        return;
      }
      const updated = (await res.json()) as ServiceOffered;
      setServicesByLocation((prev) => ({
        ...prev,
        [updated.location_id]: (prev[updated.location_id] ?? []).map((svc) =>
          svc.id === updated.id ? { ...svc, ...updated } : svc,
        ),
      }));
      setServiceStatus("Service updated.");
      cancelEditService();
    } catch (err) {
      setServiceStatus(err instanceof Error ? err.message : "Service update failed.");
    } finally {
      setEditServiceBusy(false);
    }
  }

  function startRemoveService(serviceId: string) {
    setRemoveServiceId(serviceId);
    setRemoveServicePassword("");
    setRemoveServiceStatus(null);
  }

  function cancelRemoveService() {
    setRemoveServiceId(null);
    setRemoveServicePassword("");
    setRemoveServiceStatus(null);
  }

  async function confirmRemoveService() {
    if (!removeServiceId) return;
    if (!removeServicePassword) {
      setRemoveServiceStatus("Please enter your password to confirm.");
      return;
    }
    if (!userEmail) {
      setRemoveServiceStatus("Missing user email. Please log in again.");
      return;
    }
    setRemoveServiceBusy(true);
    setRemoveServiceStatus(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: removeServicePassword,
      });
      if (error) {
        setRemoveServiceStatus("Password is incorrect.");
        return;
      }
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session?.access_token) {
        setRemoveServiceStatus("Session expired. Please log in again.");
        return;
      }
      const res = await fetch("/services-offered", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ service_offered_id: removeServiceId }),
      });
      if (!res.ok) {
        const msg = await res.text();
        setRemoveServiceStatus(`Remove failed (${res.status}): ${msg}`);
        return;
      }
      setServicesByLocation((prev) => {
        const next: Record<string, ServiceOffered[]> = {};
        for (const [locId, services] of Object.entries(prev)) {
          next[locId] = services.filter((svc) => svc.id !== removeServiceId);
        }
        return next;
      });
      setRemoveServiceStatus(null);
      cancelRemoveService();
      setServiceStatus("Service removed.");
    } catch (err) {
      setRemoveServiceStatus(err instanceof Error ? err.message : "Remove failed.");
    } finally {
      setRemoveServiceBusy(false);
    }
  }


  return (
    <div className="min-h-screen itutoros-soft-gradient">
      <AppHeader />
      <main className="mx-auto w-full max-w-[1000px] p-6">
        <Card className="itutoros-card-2">
          <CardContent className="p-8">
            <h1 style={{ margin: 0 }}>Organization Settings</h1>
            <p style={{ marginTop: 8 }}>Update your organization profile used across iTutorOS.</p>

      <div style={{ marginTop: 16 }}>
        <Button type="button" disabled={billingBusy} onClick={onManageBilling}>
          {billingBusy ? "Opening billing..." : "Manage billing"}
        </Button>
        {billingStatus ? <p style={{ marginTop: 8 }}>{billingStatus}</p> : null}
      </div>

      {!loaded ? <p style={{ marginTop: 16 }}>Loading…</p> : null}

        <form onSubmit={onSubmit} style={{ marginTop: 16, display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <div>Business name</div>
          <Input
            required
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="bg-indigo-50"
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <div>Timezone</div>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="min-h-10 w-full rounded-xl border border-input bg-indigo-50 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          >
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
          <Input
            type="number"
            min={0}
            required
            value={defaultBufferMinutes}
            onChange={(e) => setDefaultBufferMinutes(Number(e.target.value))}
            placeholder="Minutes"
            className="bg-indigo-50"
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <div>Business phone number</div>
          <Input
            required
            type="tel"
            value={businessPhone}
            onChange={(e) => setBusinessPhone(e.target.value)}
            className="bg-indigo-50"
            autoComplete="tel"
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <div>Business email (optional)</div>
          <Input
            type="email"
            value={businessEmail}
            onChange={(e) => setBusinessEmail(e.target.value)}
            className="bg-indigo-50"
            autoComplete="email"
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <div>Business address line 1</div>
          <Input
            required
            value={businessAddress1}
            onChange={(e) => setBusinessAddress1(e.target.value)}
            className="bg-indigo-50"
            autoComplete="address-line1"
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <div>Business address line 2 (optional)</div>
          <Input
            value={businessAddress2}
            onChange={(e) => setBusinessAddress2(e.target.value)}
            className="bg-indigo-50"
            autoComplete="address-line2"
          />
        </label>

        <div style={{ display: "flex", gap: 12 }}>
          <label style={{ display: "grid", gap: 6, flex: 1 }}>
            <div>City</div>
            <Input
              required
              value={businessCity}
              onChange={(e) => setBusinessCity(e.target.value)}
              className="bg-indigo-50"
              autoComplete="address-level2"
            />
          </label>
          <label style={{ display: "grid", gap: 6, flex: 1 }}>
            <div>State</div>
            <Input
              required
              value={businessState}
              onChange={(e) => setBusinessState(e.target.value)}
              className="bg-indigo-50"
              autoComplete="address-level1"
            />
          </label>
          <label style={{ display: "grid", gap: 6, width: 160 }}>
            <div>ZIP</div>
            <Input
              required
              value={businessZip}
              onChange={(e) => setBusinessZip(e.target.value)}
              className="bg-indigo-50"
              autoComplete="postal-code"
            />
          </label>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <Button disabled={busy} type="submit" size="sm">
            {busy ? "Saving..." : "Save"}
          </Button>
          <Button type="button" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>

      {status ? <p style={{ marginTop: 16, padding: 12, background: "#f5f5f5" }}>{status}</p> : null}

      <section style={{ marginTop: 32 }}>
        <h2 style={{ margin: 0 }}>Locations</h2>
        <p style={{ marginTop: 6 }}>
          Plan limit:{" "}
          {locationLimit === null ? "Unlimited" : `${locationLimit} location${locationLimit === 1 ? "" : "s"}`} (
          {planLabel}). Current: {currentLocationCount}
        </p>

        {locationsLoaded && locations.length > 0 ? (
          <div style={{ marginTop: 10, display: "grid", gap: 6 }}>
            {locations.map((loc) => (
              <div key={loc.id} style={{ padding: 12, border: "1px solid #e6e6e6", borderRadius: 8, background: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <div>
                    <strong>{loc.location_name}</strong> {loc.is_virtual ? "(virtual)" : "(physical)"}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button type="button" size="sm" onClick={() => startEditLocation(loc)}>
                      Edit
                    </Button>
                    <Button type="button" size="sm" onClick={() => startRemoveLocation(loc.id)}>
                      Archive
                    </Button>
                  </div>
                </div>

                {editLocationId === loc.id ? (
                  <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                    <label style={{ display: "grid", gap: 6 }}>
                      <div>Location name</div>
                      <Input
                        value={editLocationName}
                        onChange={(e) => setEditLocationName(e.target.value)}
                        className="bg-indigo-50"
                      />
                    </label>

                    <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input
                        type="checkbox"
                        checked={editIsVirtual}
                        onChange={(e) => setEditIsVirtual(e.target.checked)}
                      />
                      <span>This is a virtual / online location</span>
                    </label>

                    {editIsVirtual ? (
                      <label style={{ display: "grid", gap: 6 }}>
                        <div>Meeting link (optional)</div>
                        <Input
                          type="url"
                          value={editMeetingUrl}
                          onChange={(e) => setEditMeetingUrl(e.target.value)}
                          className="bg-indigo-50"
                        />
                      </label>
                    ) : (
                      <div style={{ display: "grid", gap: 10 }}>
                        <label style={{ display: "grid", gap: 6 }}>
                          <div>Address line 1</div>
                          <Input
                            value={editAddress1}
                            onChange={(e) => setEditAddress1(e.target.value)}
                            className="bg-indigo-50"
                          />
                        </label>
                        <label style={{ display: "grid", gap: 6 }}>
                          <div>Address line 2 (optional)</div>
                          <Input
                            value={editAddress2}
                            onChange={(e) => setEditAddress2(e.target.value)}
                            className="bg-indigo-50"
                          />
                        </label>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "end" }}>
                          <label style={{ display: "grid", gap: 6, flex: "2 1 240px" }}>
                            <div>City</div>
                            <Input value={editCity} onChange={(e) => setEditCity(e.target.value)} className="bg-indigo-50" />
                          </label>
                          <label style={{ display: "grid", gap: 6, flex: 1 }}>
                            <div>State</div>
                            <Input value={editState} onChange={(e) => setEditState(e.target.value)} className="bg-indigo-50" />
                          </label>
                          <label style={{ display: "grid", gap: 6, width: 160 }}>
                            <div>ZIP</div>
                            <Input value={editZip} onChange={(e) => setEditZip(e.target.value)} className="bg-indigo-50" />
                          </label>
                        </div>
                      </div>
                    )}

                    <div style={{ display: "flex", gap: 8 }}>
                      <Button type="button" size="sm" disabled={editBusy} onClick={saveEditLocation}>
                        {editBusy ? "Saving..." : "Save changes"}
                      </Button>
                      <Button type="button" size="sm" onClick={cancelEditLocation}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : null}

                {removeLocationId === loc.id ? (
                  <div style={{ marginTop: 12, padding: 12, border: "1px solid #f3c7c7", background: "#fff4f4" }}>
                    <p style={{ margin: 0, fontWeight: 600 }}>Archive this location?</p>
                    <p style={{ marginTop: 6 }}>
                      Archiving hides the location but keeps historical data. You can add a new location later.
                    </p>
                    <label style={{ display: "grid", gap: 6, marginTop: 8 }}>
                      <div>Enter your password to confirm</div>
                      <Input
                        type="password"
                        value={removePassword}
                        onChange={(e) => setRemovePassword(e.target.value)}
                        className="bg-indigo-50"
                      />
                    </label>
                    <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                      <Button type="button" size="sm" disabled={removeBusy} onClick={confirmRemoveLocation}>
                        {removeBusy ? "Archiving..." : "Archive location"}
                      </Button>
                      <Button type="button" size="sm" onClick={cancelRemoveLocation}>
                        Cancel
                      </Button>
                    </div>
                    {removeStatus ? <p style={{ marginTop: 8 }}>{removeStatus}</p> : null}
                  </div>
                ) : null}

                <div style={{ marginTop: 16 }}>
                  <h4 style={{ margin: 0 }}>Rooms</h4>
                  {!roomsLoaded ? (
                    <p style={{ marginTop: 8 }}>Loading rooms...</p>
                  ) : (roomsByLocation[loc.id] ?? []).length === 0 ? (
                    <p style={{ marginTop: 8 }}>No rooms added yet.</p>
                  ) : (
                    <div style={{ marginTop: 8, display: "grid", gap: 8 }}>
                      {(roomsByLocation[loc.id] ?? []).map((room) => (
                        <div
                          key={room.id}
                          style={{ padding: 10, border: "1px solid #ececec", borderRadius: 8, background: "#fafafa" }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                            <div>
                              <strong>{room.room_name}</strong>
                              {room.room_number ? <span> · Room {room.room_number}</span> : null}
                              {room.floor_number ? <span> · Floor {room.floor_number}</span> : null}
                            </div>
                            <div style={{ display: "flex", gap: 8 }}>
                              <Button type="button" size="sm" onClick={() => startEditRoom(room)}>
                                Edit
                              </Button>
                              <Button type="button" size="sm" onClick={() => startRemoveRoom(room.id)}>
                                Remove
                              </Button>
                            </div>
                          </div>

                          {editRoomId === room.id ? (
                            <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                              <label style={{ display: "grid", gap: 6 }}>
                                <div>Room name</div>
                                <Input
                                  value={editRoomName}
                                  onChange={(e) => setEditRoomName(e.target.value)}
                                  className="bg-indigo-50"
                                />
                              </label>
                              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                <label style={{ display: "grid", gap: 6, flex: 1 }}>
                                  <div>Room number (optional)</div>
                                  <Input
                                    value={editRoomNumber}
                                    onChange={(e) => setEditRoomNumber(e.target.value)}
                                    className="bg-indigo-50"
                                  />
                                </label>
                                <label style={{ display: "grid", gap: 6, flex: 1 }}>
                                  <div>Floor (optional)</div>
                                  <Input
                                    value={editFloorNumber}
                                    onChange={(e) => setEditFloorNumber(e.target.value)}
                                    className="bg-indigo-50"
                                  />
                                </label>
                              </div>
                              <div style={{ display: "flex", gap: 8 }}>
                                <Button type="button" size="sm" disabled={editRoomBusy} onClick={saveEditRoom}>
                                  {editRoomBusy ? "Saving..." : "Save changes"}
                                </Button>
                                <Button type="button" size="sm" onClick={cancelEditRoom}>
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : null}

                          {removeRoomId === room.id ? (
                            <div style={{ marginTop: 10, padding: 10, border: "1px solid #f3c7c7", background: "#fff4f4" }}>
                              <p style={{ margin: 0, fontWeight: 600 }}>Confirm room removal</p>
                              <p style={{ marginTop: 6 }}>
                                Removing a room is permanent and may fail if schedules are attached.
                              </p>
                              <label style={{ display: "grid", gap: 6, marginTop: 8 }}>
                                <div>Enter your password to confirm</div>
                                <Input
                                  type="password"
                                  value={removeRoomPassword}
                                  onChange={(e) => setRemoveRoomPassword(e.target.value)}
                                  className="bg-indigo-50"
                                />
                              </label>
                              <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                                <Button type="button" size="sm" disabled={removeRoomBusy} onClick={confirmRemoveRoom}>
                                  {removeRoomBusy ? "Removing..." : "Remove room"}
                                </Button>
                                <Button type="button" size="sm" onClick={cancelRemoveRoom}>
                                  Cancel
                                </Button>
                              </div>
                              {removeRoomStatus ? <p style={{ marginTop: 8 }}>{removeRoomStatus}</p> : null}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  )}
                  {roomStatus ? <p style={{ marginTop: 10, padding: 10, background: "#f5f5f5" }}>{roomStatus}</p> : null}
                </div>

                <div style={{ marginTop: 20 }}>
                  <h4 style={{ margin: 0 }}>Services Offered</h4>
                  {!servicesLoaded ? (
                    <p style={{ marginTop: 8 }}>Loading services...</p>
                  ) : (servicesByLocation[loc.id] ?? []).filter((svc) => svc.is_active).length === 0 ? (
                    <p style={{ marginTop: 8 }}>No active services yet.</p>
                  ) : (
                    <div style={{ marginTop: 8, display: "grid", gap: 8 }}>
                      {(servicesByLocation[loc.id] ?? [])
                        .filter((svc) => svc.is_active)
                        .map((svc) => (
                          <div
                            key={svc.id}
                            style={{ padding: 10, border: "1px solid #ececec", borderRadius: 8, background: "#fafafa" }}
                          >
                            <div
                              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}
                            >
                              <div>
                                <strong>{svc.display_name ?? svc.service_code}</strong>
                                <span> · ${(svc.hourly_rate_cents / 100).toFixed(2)}/hr</span>
                                <div style={{ fontSize: 12, color: "#666" }}>Code: {svc.service_code}</div>
                              </div>
                              <div style={{ display: "flex", gap: 8 }}>
                                <Button type="button" size="sm" onClick={() => startEditService(svc)}>
                                  Edit
                                </Button>
                                <Button type="button" size="sm" onClick={() => startRemoveService(svc.id)}>
                                  Remove
                                </Button>
                              </div>
                            </div>

                            {editServiceId === svc.id ? (
                              <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                                <label style={{ display: "grid", gap: 6 }}>
                                  <div>Service name</div>
                                  <Input
                                    value={editServiceName}
                                    onChange={(e) => setEditServiceName(e.target.value)}
                                    className="bg-indigo-50"
                                  />
                                </label>
                                <label style={{ display: "grid", gap: 6 }}>
                                  <div>Hourly rate (USD)</div>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={editServiceRate}
                                    onChange={(e) => setEditServiceRate(e.target.value)}
                                    className="bg-indigo-50"
                                  />
                                </label>
                                <label style={{ display: "grid", gap: 6 }}>
                                  <div>Description (optional)</div>
                                  <Input
                                    value={editServiceDescription}
                                    onChange={(e) => setEditServiceDescription(e.target.value)}
                                    className="bg-indigo-50"
                                  />
                                </label>
                                <div style={{ display: "flex", gap: 8 }}>
                                  <Button type="button" size="sm" disabled={editServiceBusy} onClick={saveEditService}>
                                    {editServiceBusy ? "Saving..." : "Save changes"}
                                  </Button>
                                  <Button type="button" size="sm" onClick={cancelEditService}>
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : null}

                            {removeServiceId === svc.id ? (
                              <div style={{ marginTop: 10, padding: 10, border: "1px solid #f3c7c7", background: "#fff4f4" }}>
                                <p style={{ margin: 0, fontWeight: 600 }}>Confirm service removal</p>
                                <p style={{ marginTop: 6 }}>
                                  Removing a service deactivates it for new schedules. Existing schedules stay intact.
                                </p>
                                <label style={{ display: "grid", gap: 6, marginTop: 8 }}>
                                  <div>Enter your password to confirm</div>
                                  <Input
                                    type="password"
                                    value={removeServicePassword}
                                    onChange={(e) => setRemoveServicePassword(e.target.value)}
                                    className="bg-indigo-50"
                                  />
                                </label>
                                <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                                  <Button type="button" size="sm" disabled={removeServiceBusy} onClick={confirmRemoveService}>
                                    {removeServiceBusy ? "Removing..." : "Remove service"}
                                  </Button>
                                  <Button type="button" size="sm" onClick={cancelRemoveService}>
                                    Cancel
                                  </Button>
                                </div>
                                {removeServiceStatus ? <p style={{ marginTop: 8 }}>{removeServiceStatus}</p> : null}
                              </div>
                            ) : null}
                          </div>
                        ))}
                    </div>
                  )}
                  {serviceStatus ? (
                    <p style={{ marginTop: 10, padding: 10, background: "#f5f5f5" }}>{serviceStatus}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {!canAddLocation ? (
          <p style={{ marginTop: 12, padding: 12, background: "#fff4f4", color: "#7a0b0b" }}>
            Your {planLabel} plan allows up to {locationLimit} location{locationLimit === 1 ? "" : "s"}. Upgrade to add more.
          </p>
        ) : null}

        <div style={{ marginTop: 16 }}>
          <Button type="button" disabled={!canAddLocation} size="sm" onClick={() => router.push("/setup")}>
            Add location
          </Button>
        </div>

        {locationStatus ? <p style={{ marginTop: 12, padding: 12, background: "#f5f5f5" }}>{locationStatus}</p> : null}
      </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
