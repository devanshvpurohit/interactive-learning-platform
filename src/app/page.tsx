import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Binary,
  ShieldCheck,
  HelpCircle,
  GitFork,
  Box,
  Bot,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Clock,
  Layers,
  Flame,
  Search,
  BookOpen,
} from "lucide-react";

export const revalidate = 0; // Dynamic data

export default async function DashboardPage() {
  const subjects = await prisma.subject.findMany({
    include: {
      Unit: {
        orderBy: { unitNumber: "asc" },
        include: {
          _count: { select: { Question: true } },
        },
      },
      _count: { select: { Question: true } },
    },
    orderBy: { code: "asc" },
  });

  const totalQuestions = await prisma.question.count();
  const totalImportant = await prisma.question.count({ where: { isImportant: true } });
  const totalRepeated = await prisma.question.count({ where: { isRepeated: true } });
  const totalFlowcharts = await prisma.flowchart.count();
  const totalVisualizations = await prisma.visualization.count();
  const totalBookmarks = await prisma.bookmark.count({ where: { userId: "default-user" } });
  const totalCompleted = await prisma.studyProgress.count({
    where: { userId: "default-user", completed: true },
  });

  // Recent questions for rapid access
  const featuredQuestions = await prisma.question.findMany({
    take: 6,
    where: { isImportant: true },
    include: {
      Subject: { select: { code: true, name: true } },
      Unit: { select: { unitNumber: true, title: true } },
      Answer: { select: { summary: true, status: true } },
    },
    orderBy: { qNo: "asc" },
  });

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-[#090d16] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300">
              <Sparkles className="h-3.5 w-3.5" />
              IARE Regulation BT-23 • Semester VII Central Learning Portal
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Master Every Question with{" "}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                Interactive Flowcharts & 3D Learning
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore all 465 university examination questions across <strong>Language Modelling</strong> and{" "}
              <strong>Ethical Hacking & Cyber Defence</strong>, backed by comprehensive model answers, dynamic React Flow process charts, Three.js spatial models, and a personal Gemini AI tutor.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/questions"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/25 hover:brightness-110 transition-all"
            >
              <Search className="h-4 w-4 text-slate-950" />
              Explore 465 Questions
            </Link>
            <Link
              href="/exam-prep"
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-all"
            >
              <GraduationCap className="h-4 w-4 text-amber-400" />
              Practice Test Center
            </Link>
          </div>
        </div>
      </div>

      {/* Two Configurable Subject Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <BookOpen className="h-6 w-6 text-sky-400" />
            Core Subjects Under Study
          </h2>
          <span className="text-xs text-slate-400">Dynamically parsed from question banks</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {subjects.map((subj) => {
            const isLM = subj.code === "ACAD40";
            return (
              <div
                key={subj.id}
                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl transition-all hover:border-slate-700 hover:shadow-2xl"
              >
                <div
                  className={`absolute top-0 right-0 h-40 w-40 rounded-full blur-3xl pointer-events-none ${
                    isLM ? "bg-sky-500/10" : "bg-emerald-500/10"
                  }`}
                />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        isLM
                          ? "bg-sky-500/10 text-sky-400 border border-sky-500/30"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {isLM ? <Binary className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                        {subj.code} • {subj.regulation}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                        {subj.name}
                      </h3>
                    </div>
                  </div>

                  <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs font-semibold text-slate-300 border border-slate-700/60">
                    {subj._count.Question} Questions
                  </span>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                  {subj.description}
                </p>

                {/* Units List */}
                <div className="mt-6 space-y-2 border-t border-slate-800/80 pt-5">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Syllabus Modules (5 Units):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {subj.Unit.map((u) => (
                      <Link
                        key={u.id}
                        href={`/questions?subject=${subj.code}&unit=${u.unitNumber}`}
                        className="flex items-center justify-between rounded-xl bg-slate-950/60 border border-slate-800/80 px-3 py-2 text-xs text-slate-300 hover:border-sky-500/40 hover:text-white hover:bg-slate-800/40 transition-all"
                      >
                        <span className="truncate">
                          Unit {u.unitNumber}: {u.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {u._count.Question} Qs
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <Link
                    href={`/subjects/${subj.code.toLowerCase()}`}
                    className="flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    View Syllabus & Overview <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <Link
                    href={`/questions?subject=${subj.code}`}
                    className="rounded-xl bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    Explore Question Bank →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Metrics & Study Statistics Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <HelpCircle className="h-4 w-4 text-sky-400" /> Total Questions
          </div>
          <div className="mt-2 text-2xl font-bold text-white">{totalQuestions}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Across 2 Subjects</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Completed
          </div>
          <div className="mt-2 text-2xl font-bold text-white">{totalCompleted}</div>
          <div className="text-[11px] text-emerald-400 mt-0.5">
            {totalQuestions > 0 ? Math.round((totalCompleted / totalQuestions) * 100) : 0}% mastered
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <Flame className="h-4 w-4 text-amber-400" /> Important Qs
          </div>
          <div className="mt-2 text-2xl font-bold text-white">{totalImportant}</div>
          <div className="text-[11px] text-amber-400 mt-0.5">High exam probability</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <Bookmark className="h-4 w-4 text-rose-400" /> Bookmarks
          </div>
          <div className="mt-2 text-2xl font-bold text-white">{totalBookmarks}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Saved for revision</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <GitFork className="h-4 w-4 text-cyan-400" /> React Flow
          </div>
          <div className="mt-2 text-2xl font-bold text-white">{totalFlowcharts}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Interactive charts</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <Box className="h-4 w-4 text-purple-400" /> Three.js 3D
          </div>
          <div className="mt-2 text-2xl font-bold text-white">{totalVisualizations}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Interactive models</div>
        </div>
      </div>

      {/* Interactive Flowcharts & 3D Visualizations Showcase Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flowcharts Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/20 p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <GitFork className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Interactive React Flow Diagrams</h3>
              <p className="text-xs text-slate-400">Step-by-step algorithmic playback with Framer Motion</p>
            </div>
          </div>
          <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Understand algorithmic execution paths like the NLP Pipeline, Byte-Pair Encoding, Viterbi HMM Trellis Decoding, Minimum Edit Distance, and the 5-Phase Penetration Testing Lifecycle.
          </p>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs text-cyan-300 font-mono">Zoom • Pan • Step Playback • SVG Export</span>
            <Link
              href="/flowcharts"
              className="flex items-center gap-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 px-4 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-500/30 transition-all"
            >
              Open Flowchart Gallery <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* 3D Visuals Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/20 p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Box className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Three.js 3D Concept Space</h3>
              <p className="text-xs text-slate-400">Spatial depth, orbit controls, and layer explosions</p>
            </div>
          </div>
          <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Manipulate 3D geometries including Word Embedding Vector Spaces, Multi-Layer Defense-in-Depth Shields, Enterprise Attack Surface Topologies, and the CIA Triad Cryptographic Prism.
          </p>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs text-indigo-300 font-mono">Rotate • Orbit • Exploded View</span>
            <Link
              href="/visualizations"
              className="flex items-center gap-1.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 px-4 py-2 text-xs font-bold text-indigo-300 hover:bg-indigo-500/30 transition-all"
            >
              Open 3D Visualizer <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* High-Yield Important Questions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <Flame className="h-6 w-6 text-amber-400" />
              High-Yield Exam Questions
            </h2>
            <p className="text-xs text-slate-400 mt-1">Frequently asked questions with complete model answers</p>
          </div>
          <Link
            href="/questions?important=true"
            className="text-xs font-semibold text-sky-400 hover:text-sky-300"
          >
            View all {totalImportant} Important Questions →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredQuestions.map((q) => (
            <Link
              key={q.id}
              href={`/questions/${q.id}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-sky-500/40 hover:bg-slate-900/90 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="rounded bg-sky-500/10 px-2 py-0.5 text-[11px] font-mono font-bold text-sky-400 border border-sky-500/20">
                    {q.Subject.code} • {q.marks} Marks
                  </span>
                  <span className="text-[11px] text-slate-400">{q.taxonomy}</span>
                </div>
                <h4 className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors line-clamp-2">
                  {q.question}
                </h4>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  {q.Answer[0]?.summary || "Click to review detailed step-by-step model answer."}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                <span className="text-slate-400">{q.Unit.title}</span>
                <span className="text-sky-400 font-semibold group-hover:translate-x-1 transition-transform">
                  Read Answer →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
