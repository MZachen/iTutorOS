import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { badRequest, handleRoute, internalError } from "@/lib/api";
import { requireAuth } from "@/lib/auth";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

const WEBSITE_IMAGE_BUCKET =
  process.env.SUPABASE_WEBSITE_IMAGE_BUCKET || "website-images";
const MAX_UPLOAD_BYTES = 100 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/ogg",
]);

let bucketEnsured = false;

function getSupabaseAdminClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    internalError(
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for website media uploads",
    );
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function getExtension(fileName: string, mimeType: string) {
  const byMime: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
    "image/avif": "avif",
    "video/mp4": "mp4",
    "video/webm": "webm",
    "video/quicktime": "mov",
    "video/ogg": "ogv",
  };
  if (byMime[mimeType]) return byMime[mimeType];
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex !== -1 && dotIndex < fileName.length - 1) {
    const raw = fileName.slice(dotIndex + 1).toLowerCase();
    if (/^[a-z0-9]{1,8}$/.test(raw)) return raw;
  }
  return "bin";
}

async function ensureBucket() {
  if (bucketEnsured) return;
  const supabase = getSupabaseAdminClient();
  const { data: bucket, error: getError } = await supabase.storage.getBucket(
    WEBSITE_IMAGE_BUCKET,
  );
  if (!getError && bucket) {
    bucketEnsured = true;
    return;
  }

  const { error: createError } = await supabase.storage.createBucket(
    WEBSITE_IMAGE_BUCKET,
    {
      public: true,
      fileSizeLimit: `${Math.floor(MAX_UPLOAD_BYTES / (1024 * 1024))}MB`,
      allowedMimeTypes: Array.from(ALLOWED_MIME_TYPES),
    },
  );
  if (
    createError &&
    !/already exists/i.test(createError.message || "") &&
    createError.statusCode !== "409"
  ) {
    internalError(`Unable to create storage bucket: ${createError.message}`);
  }
  bucketEnsured = true;
}

type StorageListItem = {
  name: string;
  id?: string | null;
  metadata?: Record<string, unknown> | null;
};

async function listAllObjectPathsForOrg(orgId: string): Promise<string[]> {
  const supabase = getSupabaseAdminClient();
  const queue: string[] = [orgId];
  const visited = new Set<string>();
  const files: string[] = [];

  while (queue.length > 0) {
    const prefix = queue.shift();
    if (!prefix) continue;
    if (visited.has(prefix)) continue;
    visited.add(prefix);

    let offset = 0;
    while (true) {
      const { data, error } = await supabase.storage
        .from(WEBSITE_IMAGE_BUCKET)
        .list(prefix, {
          limit: 1000,
          offset,
          sortBy: { column: "name", order: "asc" },
        });
      if (error) {
        internalError(`Unable to list images: ${error.message}`);
      }
      const items = (data ?? []) as StorageListItem[];
      if (items.length === 0) break;

      for (const item of items) {
        if (!item?.name) continue;
        const fullPath = `${prefix}/${item.name}`;
        const looksLikeFileName = /\.[a-z0-9]{2,8}$/i.test(item.name);
        const hasFileMetadata =
          !!item.metadata &&
          typeof item.metadata === "object" &&
          Object.keys(item.metadata).length > 0;
        const isFile = Boolean(item.id) || hasFileMetadata || looksLikeFileName;
        if (isFile) {
          files.push(fullPath);
        } else {
          queue.push(fullPath);
        }
      }

      if (items.length < 1000) break;
      offset += items.length;
    }
  }

  return files;
}

export async function GET(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    await ensureBucket();
    const supabase = getSupabaseAdminClient();

    const objectPaths = await listAllObjectPathsForOrg(auth.organization_id);
    const urls = objectPaths
      .map((path) => {
        const {
          data: { publicUrl },
        } = supabase.storage.from(WEBSITE_IMAGE_BUCKET).getPublicUrl(path);
        return publicUrl;
      })
      .filter((url): url is string => typeof url === "string" && url.trim().length > 0);

    return NextResponse.json({ images: urls });
  });
}

export async function POST(req: Request) {
  return handleRoute(async () => {
    const auth = await requireAuth(req);
    await ensureBucket();

    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      badRequest("file is required");
    }
    if (
      !file.type ||
      (!file.type.startsWith("image/") && !file.type.startsWith("video/"))
    ) {
      badRequest("Only image and video files are supported");
    }
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      badRequest("Unsupported image type");
    }
    if (file.size <= 0) {
      badRequest("File is empty");
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      badRequest(
        `Image exceeds max size (${Math.floor(MAX_UPLOAD_BYTES / (1024 * 1024))}MB)`,
      );
    }

    const ext = getExtension(file.name || "upload", file.type);
    const date = new Date();
    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(date.getUTCDate()).padStart(2, "0");
    const objectPath = `${auth.organization_id}/${yyyy}/${mm}/${dd}/${randomUUID()}.${ext}`;

    const supabase = getSupabaseAdminClient();
    const bytes = Buffer.from(await file.arrayBuffer());
    const { error: uploadError } = await supabase.storage
      .from(WEBSITE_IMAGE_BUCKET)
      .upload(objectPath, bytes, {
        contentType: file.type,
        cacheControl: "31536000",
        upsert: false,
      });
    if (uploadError) {
      internalError(`Upload failed: ${uploadError.message}`);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(WEBSITE_IMAGE_BUCKET).getPublicUrl(objectPath);
    if (!publicUrl) {
      internalError("Upload succeeded but no public URL was generated");
    }

    return NextResponse.json({
      url: publicUrl,
      bucket: WEBSITE_IMAGE_BUCKET,
      path: objectPath,
    });
  });
}
