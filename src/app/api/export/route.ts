import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { subjectCode, format = "json" } = await request.json();

    const where: any = {};
    if (subjectCode && subjectCode !== "ALL") {
      where.Subject = { code: subjectCode.toUpperCase() };
    }

    const questions = await prisma.question.findMany({
      where,
      orderBy: [{ subjectId: "asc" }, { unitId: "asc" }, { part: "asc" }, { qNo: "asc" }],
      include: {
        Subject: { select: { code: true, name: true } },
        Unit: { select: { unitNumber: true, title: true } },
        Answer: { select: { content: true, summary: true, status: true } },
      },
    });

    if (format === "csv") {
      const headers = [
        "Subject Code",
        "Subject Name",
        "Unit Number",
        "Unit Title",
        "Part",
        "Q.No",
        "Marks",
        "Taxonomy",
        "Course Outcome",
        "Question",
        "Answer Summary",
        "Answer Status",
      ];

      const csvRows = [headers.join(",")];

      for (const q of questions) {
        const escape = (val: any) =>
          `"${String(val ?? "").replace(/"/g, '""').replace(/[\r\n]+/g, " ")}"`;

        csvRows.push(
          [
            escape(q.Subject.code),
            escape(q.Subject.name),
            escape(q.Unit.unitNumber),
            escape(q.Unit.title),
            escape(q.part),
            escape(q.qNo),
            escape(q.marks),
            escape(q.taxonomy),
            escape(q.courseOutcome),
            escape(q.question),
            escape(q.Answer[0]?.summary || ""),
            escape(q.Answer[0]?.status || ""),
          ].join(",")
        );
      }

      return new NextResponse(csvRows.join("\n"), {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="question_bank_${subjectCode || "all"}.csv"`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
