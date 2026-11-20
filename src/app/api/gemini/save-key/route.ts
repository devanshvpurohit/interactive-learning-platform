import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { encryptApiKey } from "@/lib/crypto";
import { testApiKey } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();
    if (!apiKey || typeof apiKey !== "string" || apiKey.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "API key is required." },
        { status: 400 }
      );
    }

    const trimmedKey = apiKey.trim();

    // Verify key before saving
    const testRes = await testApiKey(trimmedKey);
    if (!testRes.valid) {
      return NextResponse.json(
        {
          success: false,
          error: testRes.error || "Invalid Gemini API key. Verification failed.",
        },
        { status: 400 }
      );
    }

    // Encrypt securely
    const { encryptedKey, iv, authTag, keyHint } = encryptApiKey(trimmedKey);

    await prisma.userApiKey.upsert({
      where: {
        userId_provider: {
          userId: "default-user",
          provider: "gemini",
        },
      },
      update: {
        encryptedKey,
        iv,
        authTag,
        keyHint,
        isValid: true,
        lastTestedAt: new Date(),
      },
      create: {
        userId: "default-user",
        provider: "gemini",
        encryptedKey,
        iv,
        authTag,
        keyHint,
        isValid: true,
        lastTestedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Gemini API key encrypted and saved securely.",
      keyHint,
      isValid: true,
      lastTestedAt: new Date(),
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
