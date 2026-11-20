import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "15", 10);
    const search = searchParams.get("search")?.trim() || "";
    const subjectCode = searchParams.get("subject")?.trim();
    const unitNumber = searchParams.get("unit") ? parseInt(searchParams.get("unit")!, 10) : undefined;
    const marks = searchParams.get("marks") ? parseInt(searchParams.get("marks")!, 10) : undefined;
    const part = searchParams.get("part")?.trim();
    const difficulty = searchParams.get("difficulty")?.trim();
    const isImportant = searchParams.get("important") === "true" ? true : undefined;
    const isRepeated = searchParams.get("repeated") === "true" ? true : undefined;
    const bookmarkedOnly = searchParams.get("bookmarked") === "true";

    const where: any = {};

    if (subjectCode) {
      where.Subject = { code: subjectCode.toUpperCase() };
    }

    if (unitNumber) {
      where.Unit = { unitNumber };
    }

    if (marks) {
      where.marks = marks;
    }

    if (part) {
      where.part = part;
    }

    if (difficulty) {
      where.difficulty = difficulty;
    }

    if (isImportant !== undefined) {
      where.isImportant = isImportant;
    }

    if (isRepeated !== undefined) {
      where.isRepeated = isRepeated;
    }

    if (search) {
      where.OR = [
        { question: { contains: search } },
        { topicName: { contains: search } },
        { keywords: { contains: search } },
        { taxonomy: { contains: search } },
      ];
    }

    if (bookmarkedOnly) {
      where.Bookmark = {
        some: { userId: "default-user" },
      };
    }

    const total = await prisma.question.count({ where });
    const questions = await prisma.question.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: [{ subjectId: "asc" }, { unitId: "asc" }, { part: "asc" }, { qNo: "asc" }],
      include: {
        Subject: {
          select: { code: true, name: true },
        },
        Unit: {
          select: { unitNumber: true, roman: true, title: true },
        },
        Answer: {
          select: { id: true, summary: true, status: true, version: true },
        },
        Bookmark: {
          where: { userId: "default-user" },
          select: { id: true },
        },
        StudyProgress: {
          where: { userId: "default-user" },
          select: { completed: true, confidence: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      questions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
