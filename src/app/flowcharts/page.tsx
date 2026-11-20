import React from "react";
import { prisma } from "@/lib/prisma";
import InteractiveFlowchart from "@/components/flowchart/InteractiveFlowchart";
import { GitFork, Sparkles, Layers } from "lucide-react";

export const revalidate = 0;

export default async function FlowchartsPage() {
  const flowcharts = await prisma.flowchart.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 mb-2">
            <Sparkles className="h-3 w-3" /> React Flow + Framer Motion
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <GitFork className="h-7 w-7 text-cyan-400" />
            Interactive Algorithm & Process Flowcharts
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Every diagram represents a core university syllabus algorithm or process. Use step-by-step playback, click nodes for details, and zoom/pan to study.
          </p>
        </div>

        <span className="rounded-full bg-slate-900 border border-slate-800 px-4 py-1.5 text-xs font-mono font-semibold text-cyan-400 self-start sm:self-auto">
          {flowcharts.length} Interactive Diagrams
        </span>
      </div>

      <div className="space-y-12">
        {flowcharts.map((fc) => (
          <div key={fc.id} className="space-y-3">
            <InteractiveFlowchart
              title={fc.title}
              category={fc.category}
              description={fc.description || ""}
              nodesJson={fc.nodes}
              edgesJson={fc.edges}
              stepsJson={fc.steps || "[]"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
