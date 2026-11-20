import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseQuestionBankPdf, parseDocumentFile } from "@/lib/pdf-parser";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const docType = (formData.get("docType") as string) || "Question Bank";
    const subjectId = (formData.get("subjectId") as string) || null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;
    const fileSize = file.size;
    const fileType = file.type || "application/pdf";

    let extractedCount = 0;
    let validationReport: any = null;

    if (docType === "Question Bank" && (fileType.includes("pdf") || fileName.endsWith(".pdf"))) {
      const parsed = await parseQuestionBankPdf(buffer, fileName);
      extractedCount = parsed.totalQuestions;
      validationReport = parsed.validationReport;
    } else {
      const doc = await parseDocumentFile(buffer, fileName, fileType);
      validationReport = {
        status: "success",
        docType,
        textLength: doc.rawText.length,
        isDocx: doc.isDocx,
        note: `Document processed successfully with ${doc.rawText.length} characters parsed.`,
      };
    }

    // Save document record
    const document = await prisma.uploadedDocument.create({
      data: {
        id: `doc-${Date.now()}`,
        subjectId,
        fileName,
        fileType,
        filePath: `uploads/${fileName}`,
        fileSize,
        docType,
        status: "processed",
        extractedQuestionsCount: extractedCount,
        validationReport: JSON.stringify(validationReport),
      },
    });

    return NextResponse.json({
      success: true,
      document,
      validationReport,
      extractedQuestionsCount: extractedCount,
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
