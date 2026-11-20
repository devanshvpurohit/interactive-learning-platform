import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { mode, subjectCode, unitNumber, limit = 10 } = await request.json();

    const where: any = {};
    if (subjectCode && subjectCode !== "ALL") {
      where.Subject = { code: subjectCode.toUpperCase() };
    }
    if (unitNumber) {
      where.Unit = { unitNumber: parseInt(unitNumber, 10) };
    }

    // Fetch pool of matching questions
    const allMatching = await prisma.question.findMany({
      where,
      include: {
        Subject: { select: { code: true, name: true } },
        Unit: { select: { unitNumber: true, title: true } },
        Answer: { select: { content: true, summary: true, keyPoints: true } },
      },
    });

    if (allMatching.length === 0) {
      return NextResponse.json(
        { success: false, error: "No questions match the selected criteria." },
        { status: 400 }
      );
    }

    // Shuffle and pick limit
    const shuffled = [...allMatching].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(limit, shuffled.length));

    // Create session record
    const session = await prisma.studySession.create({
      data: {
        userId: "default-user",
        mode: mode || "practice",
        totalQuestions: selected.length,
        subjectId: subjectCode !== "ALL" ? selected[0]?.subjectId : null,
        unitNumber: unitNumber ? parseInt(unitNumber, 10) : null,
      },
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      questions: selected,
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
