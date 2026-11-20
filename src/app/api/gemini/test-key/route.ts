import { NextRequest, NextResponse } from "next/server";
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

    const result = await testApiKey(apiKey.trim());
    if (result.valid) {
      return NextResponse.json({
        success: true,
        message: "Gemini API key is valid and connected successfully!",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to validate Gemini API key. Please check the key.",
        },
        { status: 400 }
      );
    }
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
