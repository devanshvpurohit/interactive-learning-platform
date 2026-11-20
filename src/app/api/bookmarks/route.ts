import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: "default-user" },
      include: {
        Question: {
          include: {
            Subject: { select: { code: true, name: true } },
            Unit: { select: { unitNumber: true, title: true } },
            Answer: { select: { summary: true, status: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, bookmarks });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { questionId, notes } = await request.json();
    if (!questionId) {
      return NextResponse.json(
        { success: false, error: "questionId is required" },
        { status: 400 }
      );
    }

    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_questionId: {
          userId: "default-user",
          questionId,
        },
      },
    });

    if (existing) {
      await prisma.bookmark.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ success: true, bookmarked: false });
    } else {
      const created = await prisma.bookmark.create({
        data: {
          userId: "default-user",
          questionId,
          notes: notes || null,
        },
      });
      return NextResponse.json({ success: true, bookmarked: true, bookmark: created });
    }
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
