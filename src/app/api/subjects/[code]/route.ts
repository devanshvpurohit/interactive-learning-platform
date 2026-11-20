import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code.toUpperCase();
    const subject = await prisma.subject.findUnique({
      where: { code },
      include: {
        Unit: {
          orderBy: { unitNumber: "asc" },
          include: {
            Topic: true,
            _count: {
              select: { Question: true },
            },
          },
        },
        Syllabus: true,
        _count: {
          select: { Question: true },
        },
      },
    });

    if (!subject) {
      return NextResponse.json(
        { success: false, error: "Subject not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, subject });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
