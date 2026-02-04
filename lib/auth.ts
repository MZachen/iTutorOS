import { prisma } from "@/lib/prisma";
import { badRequest, forbidden, internalError, notFound, unauthorized } from "@/lib/api";
import type { UserRoleType } from "@prisma/client";

type AuthContext = {
  userId: string;
  organization_id: string;
  roles: UserRoleType[];
  isOwner: boolean;
  isAdmin: boolean;
  isTutor: boolean;
};

function getBearerToken(req: Request): string {
  const header = req.headers.get("authorization") ?? req.headers.get("Authorization") ?? "";
  if (!header.toLowerCase().startsWith("bearer ")) {
    unauthorized("Missing Bearer token");
  }
  const token = header.slice(7).trim();
  if (!token) unauthorized("Missing Bearer token");
  return token;
}

async function fetchSupabaseUser(token: string) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) internalError("SUPABASE_URL and SUPABASE_ANON_KEY are required");

  const res = await fetch(`${url}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: key,
    },
  });

  if (!res.ok) unauthorized("Invalid or expired token");

  const data = await res.json();
  if (!data?.id) unauthorized("Invalid token payload");
  return data;
}

export async function requireAuth(req: Request): Promise<AuthContext> {
  const token = getBearerToken(req);
  const sbUser = await fetchSupabaseUser(token);

  const user = await prisma.user.findUnique({
    where: { id: sbUser.id },
    include: { roles: true },
  });

  if (!user) forbidden("User is not registered in this organization");
  if (user.archived_at) forbidden("User is archived");
  if (user.is_active === false) forbidden("User is inactive");

  const roles = user.roles.map((r) => r.role);
  const isOwner = roles.includes("OWNER");
  const isAdmin = roles.includes("ADMIN");
  const isTutor = roles.includes("TUTOR");

  return {
    userId: user.id,
    organization_id: user.organization_id,
    roles,
    isOwner,
    isAdmin,
    isTutor,
  };
}

export function requireAnyRole(auth: AuthContext, allowed: UserRoleType[]) {
  if (!allowed.some((r) => auth.roles.includes(r))) {
    forbidden("Insufficient role permissions");
  }
}

export function requireNotTutor(auth: AuthContext) {
  // Tutors should not perform admin actions, but users can have multiple roles (e.g. OWNER+TUTOR).
  if (auth.isTutor && !auth.isOwner && !auth.isAdmin) {
    forbidden("TUTOR role cannot perform this action");
  }
}

export async function requireLocationInOrg(location_id: string, organization_id: string) {
  const loc = await prisma.location.findUnique({
    where: { id: location_id },
    select: { id: true, organization_id: true },
  });
  if (!loc) notFound("location_id not found");
  if (loc.organization_id !== organization_id) forbidden("location_id does not belong to your organization");
  return loc;
}

export async function requireScheduleEntryInOrg(id: string, organization_id: string) {
  const entry = await prisma.scheduleEntry.findUnique({
    where: { id },
    select: { id: true, organization_id: true },
  });
  if (!entry) notFound("schedule_entry not found");
  if (entry.organization_id !== organization_id) forbidden("schedule_entry does not belong to your organization");
  return entry;
}

export function requireOrgMatch(paramOrgId: string | null, authOrgId: string) {
  if (paramOrgId && paramOrgId !== authOrgId) {
    forbidden("organization_id does not belong to your organization");
  }
}

export function requireStringId(name: string, value: any) {
  if (typeof value !== "string" || value.trim() === "") badRequest(`${name} is required`);
  return value;
}
