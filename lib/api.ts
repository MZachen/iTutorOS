import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export class ApiError extends Error {
  status: number;
  body: Record<string, unknown>;

  constructor(status: number, body: Record<string, unknown>) {
    const message = typeof body.message === "string" ? body.message : `HTTP ${status}`;
    super(message);
    this.status = status;
    this.body = body;
  }
}

export function badRequest(message: string): never {
  throw new ApiError(400, { message });
}

export function notFound(message: string): never {
  throw new ApiError(404, { message });
}

export function conflict(body: Record<string, unknown>): never {
  throw new ApiError(409, body);
}

export async function handleRoute(handler: () => Promise<Response>) {
  try {
    return await handler();
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json(err.body, { status: err.status });
    }

    // Prisma validation errors (often caused by invalid UUID formats, missing required fields, etc.)
    if (err instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return NextResponse.json({ message: "Record not found" }, { status: 404 });
      }
      if (err.code === "P2002") {
        return NextResponse.json({ message: "Unique constraint violation" }, { status: 409 });
      }
      // e.g. invalid UUID formats can show up as "Inconsistent column data"
      if (err.code === "P2023") {
        return NextResponse.json({ message: "Bad Request" }, { status: 400 });
      }
    }

    console.error(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
