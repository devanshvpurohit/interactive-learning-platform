import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decryptApiKey } from "@/lib/crypto";
import { callGeminiTutor, TutorMode } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const {
      message,
      mode = "general_tutor",
      questionId,
      subjectCode,
      history = [],
      sessionKey,
    } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    // Resolve API key
    let activeKey = sessionKey?.trim();

    if (!activeKey) {
      // Retrieve from database
      const keyRecord = await prisma.userApiKey.findUnique({
        where: {
          userId_provider: {
            userId: "default-user",
            provider: "gemini",
          },
        },
      });

      if (keyRecord) {
        try {
          activeKey = decryptApiKey({
            encryptedKey: keyRecord.encryptedKey,
            iv: keyRecord.iv,
            authTag: keyRecord.authTag,
          });
        } catch {
          return NextResponse.json(
            {
              success: false,
              error: "Failed to decrypt stored API key. Please re-enter your key in Settings.",
            },
            { status: 401 }
          );
        }
      }
    }

    if (!activeKey) {
      return NextResponse.json(
        {
          success: false,
          needsApiKey: true,
          error:
            "No Gemini API key configured. Please add your personal Google Gemini API key in Settings to unlock the AI Study Assistant.",
        },
        { status: 401 }
      );
    }

    // Gather contextual info if a questionId or subjectCode was provided
    let context: any = { history };

    if (questionId) {
      const q = await prisma.question.findUnique({
        where: { id: questionId },
        include: {
          Subject: true,
          Unit: true,
          Answer: true,
        },
      });

      if (q) {
        context = {
          ...context,
          subjectName: q.Subject.name,
          subjectCode: q.Subject.code,
          unitName: q.Unit.title,
          questionText: q.question,
          answerText: q.Answer[0]?.content,
        };
      }
    } else if (subjectCode) {
      const subj = await prisma.subject.findUnique({
        where: { code: subjectCode.toUpperCase() },
        include: { Syllabus: true },
      });
      if (subj) {
        context = {
          ...context,
          subjectName: subj.name,
          subjectCode: subj.code,
        };
      }
    }

    const reply = await callGeminiTutor({
      apiKey: activeKey,
      mode: mode as TutorMode,
      userMessage: message,
      context,
    });

    return NextResponse.json({
      success: true,
      reply,
      mode,
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
