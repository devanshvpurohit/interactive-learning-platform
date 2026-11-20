import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import QuestionClientView from "./QuestionClientView";

export const revalidate = 0;

export default async function QuestionDetailPage({
  params,
}: {
  params: { id: string };
}) {
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
    notFound();
  }

  // Related questions
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

  // Previous and Next Question Navigation
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

  // Flowchart fallback matching if question doesn't have direct link
  let activeFlowchart: any = question.Flowchart[0] || null;
  if (!activeFlowchart) {
    const qLower = question.question.toLowerCase();
    if (question.Subject.code === "ACAD40") {
      if (qLower.includes("pipeline") || question.unitId.includes("m1")) {
        activeFlowchart = await prisma.flowchart.findFirst({ where: { title: { contains: "NLP Pipeline" } } });
      } else if (qLower.includes("byte-pair") || qLower.includes("bpe")) {
        activeFlowchart = await prisma.flowchart.findFirst({ where: { title: { contains: "Byte-Pair" } } });
      } else if (qLower.includes("edit distance")) {
        activeFlowchart = await prisma.flowchart.findFirst({ where: { title: { contains: "Edit Distance" } } });
      } else if (qLower.includes("viterbi") || qLower.includes("hmm")) {
        activeFlowchart = await prisma.flowchart.findFirst({ where: { title: { contains: "Viterbi" } } });
      } else if (qLower.includes("yarowsky")) {
        activeFlowchart = await prisma.flowchart.findFirst({ where: { title: { contains: "Yarowsky" } } });
      }
    } else {
      if (qLower.includes("framework") || qLower.includes("lifecycle") || qLower.includes("penetration test")) {
        activeFlowchart = await prisma.flowchart.findFirst({ where: { title: { contains: "Penetration Testing Lifecycle" } } });
      } else if (qLower.includes("vulnerability assessment")) {
        activeFlowchart = await prisma.flowchart.findFirst({ where: { title: { contains: "Decision Tree" } } });
      } else if (qLower.includes("incident")) {
        activeFlowchart = await prisma.flowchart.findFirst({ where: { title: { contains: "Incident Response" } } });
      }
    }
  }

  // 3D Visualization fallback matching
  let activeVisualization: any = question.Visualization[0] || null;
  if (!activeVisualization) {
    const qLower = question.question.toLowerCase();
    if (question.Subject.code === "ACAD40") {
      if (qLower.includes("semantic") || qLower.includes("wordnet") || qLower.includes("vector")) {
        activeVisualization = await prisma.visualization.findFirst({ where: { conceptType: "vector_space" } });
      } else if (qLower.includes("markov") || qLower.includes("hmm") || qLower.includes("viterbi")) {
        activeVisualization = await prisma.visualization.findFirst({ where: { conceptType: "hmm_trellis" } });
      }
    } else {
      if (qLower.includes("architecture") || qLower.includes("security program") || qLower.includes("layer")) {
        activeVisualization = await prisma.visualization.findFirst({ where: { conceptType: "defense_in_depth" } });
      } else if (qLower.includes("network") || qLower.includes("attack") || qLower.includes("reconnaissance") || qLower.includes("discovery")) {
        activeVisualization = await prisma.visualization.findFirst({ where: { conceptType: "attack_surface" } });
      } else if (qLower.includes("model") || qLower.includes("cia") || qLower.includes("confidentiality") || qLower.includes("integrity")) {
        activeVisualization = await prisma.visualization.findFirst({ where: { conceptType: "cia_triad" } });
      }
    }
  }

  return (
    <QuestionClientView
      question={question}
      flowchart={activeFlowchart}
      visualization={activeVisualization}
      relatedQuestions={relatedQuestions}
      navigation={{ prev: prevQuestion, next: nextQuestion }}
    />
  );
}
