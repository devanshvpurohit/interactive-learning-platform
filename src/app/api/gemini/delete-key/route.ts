import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE() {
  try {
    await prisma.userApiKey.deleteMany({
      where: {
        userId: "default-user",
        provider: "gemini",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Stored Gemini API key has been securely removed.",
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
