"use client";

import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  MarkerType,
} from "@xyflow/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RotateCcw,
  Maximize2,
  Minimize2,
  Download,
  Info,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

interface FlowchartProps {
  title: string;
  category: string;
  description?: string;
  nodesJson: string;
  edgesJson: string;
  stepsJson?: string;
}

export default function InteractiveFlowchart({
  title,
  category,
  description,
  nodesJson,
  edgesJson,
  stepsJson,
}: FlowchartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedNodeData, setSelectedNodeData] = useState<any>(null);

  // Parse steps
  const steps = useMemo(() => {
    if (!stepsJson) return [];
    try {
      return JSON.parse(stepsJson);
    } catch {
      return [];
    }
  }, [stepsJson]);

  // Parse initial nodes and edges
  const initialNodes: Node[] = useMemo(() => {
    try {
      const parsed = JSON.parse(nodesJson);
      return parsed.map((n: any) => ({
        ...n,
        style: {
          background: "rgba(15, 23, 42, 0.95)",
          color: "#f8fafc",
          border: "1px solid rgba(56, 189, 248, 0.3)",
          borderRadius: "12px",
          padding: "12px 18px",
          fontWeight: 500,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
          width: 240,
          textAlign: "center" as const,
        },
      }));
    } catch {
      return [];
    }
  }, [nodesJson]);

  const initialEdges: Edge[] = useMemo(() => {
    try {
      const parsed = JSON.parse(edgesJson);
      return parsed.map((e: any) => ({
        ...e,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#38bdf8",
        },
        style: {
          stroke: "#38bdf8",
          strokeWidth: 2,
        },
      }));
    } catch {
      return [];
    }
  }, [edgesJson]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Step highlight logic
  const highlightStep = useCallback(
    (stepIdx: number) => {
      setCurrentStepIndex(stepIdx);
      if (stepIdx < 0) {
        setNodes(initialNodes);
        return;
      }

      const activeNodeId = String(stepIdx + 1);
      setNodes((nds) =>
        nds.map((n) => {
          const isActive = n.id === activeNodeId;
          return {
            ...n,
            style: {
              ...n.style,
              border: isActive
                ? "2px solid #38bdf8"
                : "1px solid rgba(56, 189, 248, 0.15)",
              background: isActive
                ? "rgba(14, 165, 233, 0.25)"
                : "rgba(15, 23, 42, 0.85)",
              boxShadow: isActive
                ? "0 0 25px rgba(56, 189, 248, 0.5)"
                : "0 4px 15px rgba(0, 0, 0, 0.3)",
              transform: isActive ? "scale(1.05)" : "scale(1)",
              transition: "all 0.3s ease",
            },
          };
        })
      );
    },
    [initialNodes, setNodes]
  );

  // Playback timer
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && steps.length > 0) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          const next = prev + 1;
          if (next >= steps.length) {
            setIsPlaying(false);
            return prev;
          }
          highlightStep(next);
          return next;
        });
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length, highlightStep]);

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      highlightStep(currentStepIndex + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      highlightStep(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    highlightStep(-1);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(console.error);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(console.error);
      setIsFullscreen(false);
    }
  };

  const onNodeClick = (_: any, node: Node) => {
    setSelectedNodeData(node);
  };

  const handleDownloadSvg = () => {
    const svgElement = containerRef.current?.querySelector("svg.react-flow__edges");
    if (!svgElement) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "_")}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col rounded-2xl border border-slate-800 bg-slate-950/90 overflow-hidden shadow-2xl transition-all ${
        isFullscreen ? "h-screen w-screen p-6" : "h-[620px] w-full"
      }`}
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/80 px-5 py-3.5 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-sky-500/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-sky-400 border border-sky-500/20">
              {category}
            </span>
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <Sparkles className="h-3 w-3" /> Interactive Flow
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1">{title}</h3>
          {description && (
            <p className="text-xs text-slate-400 max-w-2xl line-clamp-1">{description}</p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {steps.length > 0 && (
            <div className="flex items-center gap-1 rounded-xl bg-slate-800/80 p-1 border border-slate-700/60">
              <button
                onClick={handlePrevStep}
                disabled={currentStepIndex <= 0}
                className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-700 disabled:opacity-40"
                title="Previous Step"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  if (currentStepIndex === -1) highlightStep(0);
                  setIsPlaying(!isPlaying);
                }}
                className="flex items-center gap-1.5 rounded-lg bg-sky-500/20 px-3 py-1.5 text-xs font-medium text-sky-300 hover:bg-sky-500/30 transition-colors"
                title="Play Step-by-Step"
              >
                <Play className={`h-3.5 w-3.5 ${isPlaying ? "text-amber-400" : ""}`} />
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button
                onClick={handleNextStep}
                disabled={currentStepIndex >= steps.length - 1}
                className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-700 disabled:opacity-40"
                title="Next Step"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={handleReset}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white"
                title="Reset Flow"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          )}

          <button
            onClick={handleDownloadSvg}
            className="rounded-xl border border-slate-700/70 bg-slate-800/80 p-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            title="Download SVG"
          >
            <Download className="h-4 w-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="rounded-xl border border-slate-700/70 bg-slate-800/80 p-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Step Info Banner when active */}
      <AnimatePresence>
        {currentStepIndex >= 0 && steps[currentStepIndex] && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-6 right-6 z-20 flex items-center justify-between rounded-xl bg-gradient-to-r from-sky-900/90 to-slate-900/95 border border-sky-500/40 px-4 py-2.5 shadow-xl backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 font-bold text-slate-950 text-xs">
                {currentStepIndex + 1}
              </span>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white">
                  {steps[currentStepIndex].title}
                </h4>
                <p className="text-xs text-sky-200">
                  {steps[currentStepIndex].detail}
                </p>
              </div>
            </div>
            <span className="text-xs text-slate-400">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* React Flow Canvas */}
      <div className="flex-1 w-full h-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
          attributionPosition="bottom-right"
        >
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#334155" />
          <Controls position="bottom-right" />
        </ReactFlow>

        {/* Node Detail Popup */}
        <AnimatePresence>
          {selectedNodeData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute bottom-5 left-5 z-20 max-w-sm rounded-xl border border-sky-500/40 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold">
                  <Info className="h-4 w-4" /> Node Inspector
                </div>
                <button
                  onClick={() => setSelectedNodeData(null)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <h5 className="text-sm font-bold text-white mt-2">
                {selectedNodeData.data?.label || selectedNodeData.id}
              </h5>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Clicking or hovering through this node represents the computational state transition in this algorithm.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
