import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export const runtime = "nodejs";

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export async function GET(req: Request) {
  try {
    const auth = await requireAuth(req);
    const { searchParams } = new URL(req.url);
    const rawSlug = searchParams.get("slug") ?? "";
    const slug = normalizeSlug(rawSlug);

    if (!slug) {
      return NextResponse.json({
        available: false,
        slug,
        message: "Enter a page name.",
      });
    }

    if (!/^[a-z0-9-]{3,40}$/.test(slug)) {
      return NextResponse.json({
        available: false,
        slug,
        message:
          "Use 3-40 characters: lowercase letters, numbers, and hyphens.",
      });
    }

    const existing = await prisma.organization.findFirst({
      where: {
        id: { not: auth.organization_id },
        archived_at: null,
        website_slug: {
          equals: slug,
          mode: "insensitive",
        },
      },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json({
        available: false,
        slug,
        message: "Page name is already taken.",
      });
    }

    return NextResponse.json({
      available: true,
      slug,
      message: "Page name is available.",
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Unable to check page name.";
    return NextResponse.json({ available: false, message }, { status: 401 });
  }
}
