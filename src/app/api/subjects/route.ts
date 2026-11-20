import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        Unit: {
          orderBy: { unitNumber: "asc" },
          include: {
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
      orderBy: { code: "asc" },
    });

    return NextResponse.json({ success: true, subjects });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
