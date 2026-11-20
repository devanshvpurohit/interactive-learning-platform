import React from "react";
import { prisma } from "@/lib/prisma";
import Concept3DViewer from "@/components/three/Concept3DViewer";
import { Box, Sparkles, Layers } from "lucide-react";

export const revalidate = 0;

export default async function VisualizationsPage() {
  const visualizations = await prisma.visualization.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 mb-2">
            <Sparkles className="h-3 w-3" /> Three.js + React Three Fiber
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <Box className="h-7 w-7 text-indigo-400" />
            3D Spatial & Structural Concept Visualizations
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Manipulate 3D geometries, explore vector spaces, examine HMM state lattices, and explode multi-layered defense perimeters with orbit controls.
          </p>
        </div>

        <span className="rounded-full bg-slate-900 border border-slate-800 px-4 py-1.5 text-xs font-mono font-semibold text-indigo-400 self-start sm:self-auto">
          {visualizations.length} 3D Learning Models
        </span>
      </div>

      <div className="space-y-12">
        {visualizations.map((vis) => (
          <div key={vis.id} className="space-y-3">
            <Concept3DViewer
              title={vis.title}
              conceptType={vis.conceptType}
              description={vis.description || ""}
              configJson={vis.config}
              labelsJson={vis.labels || "[]"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
