import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const questionId = params.id;
    const { reason } = await request.json();

    const answer = await prisma.answer.findFirst({
      where: { questionId },
    });

    if (!answer) {
      return NextResponse.json(
        { success: false, error: "Answer not found for question" },
        { status: 404 }
      );
    }

    const updated = await prisma.answer.update({
      where: { id: answer.id },
      data: {
        reported: true,
        reportReason: reason || "User reported review request",
        status: "Needs Verification",
      },
    });

    return NextResponse.json({ success: true, answer: updated });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
