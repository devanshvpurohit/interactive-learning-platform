import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();

    const {
      questionText,
      marks,
      difficulty,
      isImportant,
      isRepeated,
      answerContent,
      answerStatus,
      reviewedBy,
    } = body;

    // Update question if fields provided
    const questionUpdate: any = {};
    if (questionText !== undefined) questionUpdate.question = questionText;
    if (marks !== undefined) questionUpdate.marks = marks;
    if (difficulty !== undefined) questionUpdate.difficulty = difficulty;
    if (isImportant !== undefined) questionUpdate.isImportant = isImportant;
    if (isRepeated !== undefined) questionUpdate.isRepeated = isRepeated;

    if (Object.keys(questionUpdate).length > 0) {
      await prisma.question.update({
        where: { id },
        data: questionUpdate,
      });
    }

    // Update answer if fields provided
    if (answerContent !== undefined || answerStatus !== undefined) {
      const existingAns = await prisma.answer.findFirst({
        where: { questionId: id },
      });

      if (existingAns) {
        await prisma.answer.update({
          where: { id: existingAns.id },
          data: {
            content: answerContent !== undefined ? answerContent : existingAns.content,
            status: answerStatus !== undefined ? answerStatus : existingAns.status,
            reviewedBy: reviewedBy || "Admin",
            version: { increment: 1 },
            reported: false,
            reportReason: null,
          },
        });
      }
    }

    const updated = await prisma.question.findUnique({
      where: { id },
      include: {
        Answer: true,
        Subject: true,
        Unit: true,
      },
    });

    return NextResponse.json({ success: true, question: updated });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
