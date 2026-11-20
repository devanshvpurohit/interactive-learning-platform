import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const record = await prisma.userApiKey.findUnique({
      where: {
        userId_provider: {
          userId: "default-user",
          provider: "gemini",
        },
      },
      select: {
        keyHint: true,
        isValid: true,
        lastTestedAt: true,
        updatedAt: true,
      },
    });

    if (!record) {
      return NextResponse.json({
        success: true,
        configured: false,
      });
    }

    return NextResponse.json({
      success: true,
      configured: true,
      keyHint: record.keyHint,
      isValid: record.isValid,
      lastTestedAt: record.lastTestedAt,
      updatedAt: record.updatedAt,
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
