import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const nlpPipeQ = await prisma.question.findFirst({ where: { question: { contains: "pipeline" } } });
  const bpeQ = await prisma.question.findFirst({ where: { question: { contains: "Byte-Pair" } } });
  const medQ = await prisma.question.findFirst({ where: { question: { contains: "Edit Distance" } } });
  const viterbiQ = await prisma.question.findFirst({ where: { question: { contains: "Viterbi" } } });
  const yarowskyQ = await prisma.question.findFirst({ where: { question: { contains: "Yarowsky" } } });

  const ehLifecycleQ =
    (await prisma.question.findFirst({ where: { question: { contains: "Hacker Framework" } } })) ||
    (await prisma.question.findFirst({ where: { question: { contains: "framework" } } }));
  const vaPtQ = await prisma.question.findFirst({
    where: { question: { contains: "vulnerability assessment and penetration" } },
  });
  const irQ = await prisma.question.findFirst({ where: { question: { contains: "incident" } } });

  if (nlpPipeQ)
    await prisma.flowchart.updateMany({
      where: { title: { contains: "NLP Pipeline" } },
      data: { questionId: nlpPipeQ.id },
    });
  if (bpeQ)
    await prisma.flowchart.updateMany({
      where: { title: { contains: "Byte-Pair" } },
      data: { questionId: bpeQ.id },
    });
  if (medQ)
    await prisma.flowchart.updateMany({
      where: { title: { contains: "Edit Distance" } },
      data: { questionId: medQ.id },
    });
  if (viterbiQ)
    await prisma.flowchart.updateMany({
      where: { title: { contains: "Viterbi" } },
      data: { questionId: viterbiQ.id },
    });
  if (yarowskyQ)
    await prisma.flowchart.updateMany({
      where: { title: { contains: "Yarowsky" } },
      data: { questionId: yarowskyQ.id },
    });

  if (ehLifecycleQ)
    await prisma.flowchart.updateMany({
      where: { title: { contains: "Penetration Testing Lifecycle" } },
      data: { questionId: ehLifecycleQ.id },
    });
  if (vaPtQ)
    await prisma.flowchart.updateMany({
      where: { title: { contains: "Decision Tree" } },
      data: { questionId: vaPtQ.id },
    });
  if (irQ)
    await prisma.flowchart.updateMany({
      where: { title: { contains: "Incident Response" } },
      data: { questionId: irQ.id },
    });

  // Link 3D Visualizations
  const vectorQ = await prisma.question.findFirst({ where: { question: { contains: "semantic representation" } } });
  const hmmQ = await prisma.question.findFirst({ where: { question: { contains: "Hidden Markov" } } });
  const shieldQ = await prisma.question.findFirst({ where: { question: { contains: "Security Architecture" } } });
  const attackQ = await prisma.question.findFirst({ where: { question: { contains: "attack surfaces" } } });
  const ciaQ = await prisma.question.findFirst({ where: { question: { contains: "Information Security Models" } } });

  if (vectorQ)
    await prisma.visualization.updateMany({
      where: { conceptType: "vector_space" },
      data: { questionId: vectorQ.id },
    });
  if (hmmQ)
    await prisma.visualization.updateMany({
      where: { conceptType: "hmm_trellis" },
      data: { questionId: hmmQ.id },
    });
  if (shieldQ)
    await prisma.visualization.updateMany({
      where: { conceptType: "defense_in_depth" },
      data: { questionId: shieldQ.id },
    });
  if (attackQ)
    await prisma.visualization.updateMany({
      where: { conceptType: "attack_surface" },
      data: { questionId: attackQ.id },
    });
  if (ciaQ)
    await prisma.visualization.updateMany({
      where: { conceptType: "cia_triad" },
      data: { questionId: ciaQ.id },
    });

  console.log("Successfully linked flowcharts and 3D visuals to respective questions.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
