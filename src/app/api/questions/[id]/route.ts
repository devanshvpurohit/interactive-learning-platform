import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const question = await prisma.question.findUnique({
      where: { id },
      include: {
        Subject: true,
        Unit: true,
        Topic: true,
        Answer: true,
        Flowchart: true,
        Visualization: true,
        Bookmark: {
          where: { userId: "default-user" },
        },
        StudyProgress: {
          where: { userId: "default-user" },
        },
      },
    });

    if (!question) {
      return NextResponse.json(
        { success: false, error: "Question not found" },
        { status: 404 }
      );
    }

    // Related questions (same unit or topic, excluding current)
    const relatedQuestions = await prisma.question.findMany({
      where: {
        unitId: question.unitId,
        id: { not: question.id },
      },
      take: 4,
      select: {
        id: true,
        qNo: true,
        question: true,
        marks: true,
        part: true,
        taxonomy: true,
        topicName: true,
      },
    });

    // Next and Previous navigation in same subject
    const prevQuestion = await prisma.question.findFirst({
      where: {
        subjectId: question.subjectId,
        id: { lt: question.id },
      },
      orderBy: { id: "desc" },
      select: { id: true, qNo: true, question: true },
    });

    const nextQuestion = await prisma.question.findFirst({
      where: {
        subjectId: question.subjectId,
        id: { gt: question.id },
      },
      orderBy: { id: "asc" },
      select: { id: true, qNo: true, question: true },
    });

    // If no direct flowchart attached, check if there's a unit/concept level flowchart
    let fallbackFlowchart = null;
    if (!question.Flowchart || question.Flowchart.length === 0) {
      if (question.Subject.code === "ACAD40") {
        if (question.question.toLowerCase().includes("pipeline") || question.unitId.includes("m1")) {
          fallbackFlowchart = await prisma.flowchart.findFirst({ where: { title: { contains: "NLP Pipeline" } } });
        } else if (question.question.toLowerCase().includes("viterbi") || question.question.toLowerCase().includes("hmm")) {
          fallbackFlowchart = await prisma.flowchart.findFirst({ where: { title: { contains: "Viterbi" } } });
        } else if (question.question.toLowerCase().includes("edit distance")) {
          fallbackFlowchart = await prisma.flowchart.findFirst({ where: { title: { contains: "Edit Distance" } } });
        }
      } else {
        if (question.question.toLowerCase().includes("framework") || question.question.toLowerCase().includes("lifecycle")) {
          fallbackFlowchart = await prisma.flowchart.findFirst({ where: { title: { contains: "Penetration Testing" } } });
        } else if (question.question.toLowerCase().includes("vulnerability assessment")) {
          fallbackFlowchart = await prisma.flowchart.findFirst({ where: { title: { contains: "Decision Tree" } } });
        } else if (question.question.toLowerCase().includes("incident")) {
          fallbackFlowchart = await prisma.flowchart.findFirst({ where: { title: { contains: "Incident Response" } } });
        }
      }
    }

    // If no direct 3D visual attached, check if there is a relevant concept visual
    let fallbackVisualization = null;
    if (!question.Visualization || question.Visualization.length === 0) {
      if (question.Subject.code === "ACAD40") {
        if (question.question.toLowerCase().includes("markov") || question.question.toLowerCase().includes("hmm")) {
          fallbackVisualization = await prisma.visualization.findFirst({ where: { conceptType: "hmm_trellis" } });
        } else if (question.question.toLowerCase().includes("semantic") || question.question.toLowerCase().includes("vector")) {
          fallbackVisualization = await prisma.visualization.findFirst({ where: { conceptType: "vector_space" } });
        }
      } else {
        if (question.question.toLowerCase().includes("architecture") || question.question.toLowerCase().includes("security program")) {
          fallbackVisualization = await prisma.visualization.findFirst({ where: { conceptType: "defense_in_depth" } });
        } else if (question.question.toLowerCase().includes("network") || question.question.toLowerCase().includes("reconnaissance") || question.question.toLowerCase().includes("attack")) {
          fallbackVisualization = await prisma.visualization.findFirst({ where: { conceptType: "attack_surface" } });
        } else if (question.question.toLowerCase().includes("model") || question.question.toLowerCase().includes("confidentiality")) {
          fallbackVisualization = await prisma.visualization.findFirst({ where: { conceptType: "cia_triad" } });
        }
      }
    }

    return NextResponse.json({
      success: true,
      question,
      fallbackFlowchart,
      fallbackVisualization,
      relatedQuestions,
      navigation: {
        prev: prevQuestion,
        next: nextQuestion,
      },
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
