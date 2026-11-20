import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalQuestions = await prisma.question.count();
    const completedProgress = await prisma.studyProgress.findMany({
      where: { userId: "default-user", completed: true },
      select: { questionId: true },
    });

    const completedQuestionIds = new Set(completedProgress.map((p) => p.questionId));
    const completedCount = completedQuestionIds.size;
    const remainingCount = totalQuestions - completedCount;

    // Subject-wise completion
    const subjects = await prisma.subject.findMany({
      include: {
        Question: {
          select: { id: true, unitId: true, isImportant: true, isRepeated: true },
        },
        Unit: {
          orderBy: { unitNumber: "asc" },
          select: { id: true, unitNumber: true, title: true },
        },
      },
    });

    const subjectStats = subjects.map((subj) => {
      const totalInSubj = subj.Question.length;
      const completedInSubj = subj.Question.filter((q) =>
        completedQuestionIds.has(q.id)
      ).length;

      // Unit-wise completion
      const unitStats = subj.Unit.map((u) => {
        const totalInUnit = subj.Question.filter((q) => q.unitId === u.id).length;
        const completedInUnit = subj.Question.filter(
          (q) => q.unitId === u.id && completedQuestionIds.has(q.id)
        ).length;
        return {
          unitNumber: u.unitNumber,
          title: u.title,
          total: totalInUnit,
          completed: completedInUnit,
          percent: totalInUnit > 0 ? Math.round((completedInUnit / totalInUnit) * 100) : 0,
        };
      });

      return {
        id: subj.id,
        code: subj.code,
        name: subj.name,
        total: totalInSubj,
        completed: completedInSubj,
        percent: totalInSubj > 0 ? Math.round((completedInSubj / totalInSubj) * 100) : 0,
        units: unitStats,
      };
    });

    const totalBookmarks = await prisma.bookmark.count({
      where: { userId: "default-user" },
    });

    const totalImportant = await prisma.question.count({
      where: { isImportant: true },
    });

    const totalRepeated = await prisma.question.count({
      where: { isRepeated: true },
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalQuestions,
        completedCount,
        remainingCount,
        percent: totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0,
        totalBookmarks,
        totalImportant,
        totalRepeated,
        subjects: subjectStats,
      },
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { questionId, completed, confidence, timeSpent } = await request.json();
    if (!questionId) {
      return NextResponse.json(
        { success: false, error: "questionId is required" },
        { status: 400 }
      );
    }

    const progress = await prisma.studyProgress.upsert({
      where: {
        userId_questionId: {
          userId: "default-user",
          questionId,
        },
      },
      update: {
        completed: completed !== undefined ? completed : undefined,
        confidence: confidence !== undefined ? confidence : undefined,
        timeSpent: timeSpent !== undefined ? { increment: timeSpent } : undefined,
        lastStudied: new Date(),
      },
      create: {
        userId: "default-user",
        questionId,
        completed: completed ?? true,
        confidence: confidence ?? 3,
        timeSpent: timeSpent ?? 30,
        lastStudied: new Date(),
      },
    });

    return NextResponse.json({ success: true, progress });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
