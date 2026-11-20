import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Binary,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  HelpCircle,
  GraduationCap,
  Sparkles,
  Flame,
  CheckCircle2,
  Clock,
  Layers,
} from "lucide-react";

export const revalidate = 0;

export default async function SubjectOverviewPage({
  params,
}: {
  params: { code: string };
}) {
  const code = params.code.toUpperCase();

  const subject = await prisma.subject.findUnique({
    where: { code },
    include: {
      Syllabus: true,
      Unit: {
        orderBy: { unitNumber: "asc" },
        include: {
          Topic: true,
          Question: {
            select: { id: true, marks: true, part: true, isImportant: true },
          },
        },
      },
      Question: {
        select: { id: true, isImportant: true, isRepeated: true, marks: true },
      },
    },
  });

  if (!subject) {
    notFound();
  }

  const syllabus = subject.Syllabus[0];
  const outcomes = syllabus?.outcomes ? JSON.parse(syllabus.outcomes) : [];
  const objectives = syllabus?.objectives ? JSON.parse(syllabus.objectives) : [];
  const textbooks = syllabus?.textbooks ? JSON.parse(syllabus.textbooks) : [];
  const references = syllabus?.references ? JSON.parse(syllabus.references) : [];

  const totalQuestions = subject.Question.length;
  const importantCount = subject.Question.filter((q) => q.isImportant).length;
  const repeatedCount = subject.Question.filter((q) => q.isRepeated).length;

  const isLM = subject.code === "ACAD40";

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-16">
      {/* Subject Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-[#090d16] p-6 sm:p-10 shadow-2xl">
        <div
          className={`absolute top-0 right-0 -mt-12 -mr-12 h-96 w-96 rounded-full blur-3xl pointer-events-none ${
            isLM ? "bg-sky-500/10" : "bg-emerald-500/10"
          }`}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-mono font-bold text-sky-400 border border-slate-700">
                Course Code: {subject.code}
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                Department: {subject.department}
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                Regulation: {subject.regulation} • Semester {subject.semester}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {subject.name}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {subject.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href={`/questions?subject=${subject.code}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/20 hover:brightness-110 transition-all"
            >
              <HelpCircle className="h-4 w-4" />
              Explore All {totalQuestions} Questions
            </Link>

            <Link
              href={`/exam-prep`}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700"
            >
              <GraduationCap className="h-4 w-4 text-amber-400" />
              Mock Exam
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-xs text-slate-400">Total Questions</div>
          <div className="text-2xl font-bold text-white mt-1">{totalQuestions}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">5 Units fully indexed</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-xs text-slate-400">High-Yield Questions</div>
          <div className="text-2xl font-bold text-amber-400 mt-1">{importantCount}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Focus revision targets</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-xs text-slate-400">Frequently Repeated</div>
          <div className="text-2xl font-bold text-purple-400 mt-1">{repeatedCount}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Multi-year trend analysis</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-xs text-slate-400">Contact Hours / Credits</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{subject.totalHours}h / {subject.credits}C</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Core B.Tech standard</div>
        </div>
      </div>

      {/* 5 Units Learning Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <Layers className="h-6 w-6 text-sky-400" />
            Unit-wise Modules & Learning Hub
          </h2>
          <span className="text-xs text-slate-400">Click any unit to open question bank</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subject.Unit.map((u) => {
            const count2M = u.Question.filter((q) => q.marks === 2).length;
            const count10M = u.Question.filter((q) => q.marks >= 10).length;

            return (
              <div
                key={u.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md hover:border-sky-500/40 hover:bg-slate-900/90 transition-all shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-mono font-bold text-sky-400">
                      Module {u.roman}
                    </span>
                    <span>{u.hours} Lecture Hours</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {u.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {u.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-300">
                    <span className="rounded-lg bg-slate-950 px-2 py-1 border border-slate-800">
                      Total: <strong className="text-white">{u.Question.length} Qs</strong>
                    </span>
                    <span className="rounded-lg bg-slate-950 px-2 py-1 border border-slate-800">
                      2M: <strong className="text-sky-400">{count2M}</strong>
                    </span>
                    <span className="rounded-lg bg-slate-950 px-2 py-1 border border-slate-800">
                      10M: <strong className="text-indigo-400">{count10M}</strong>
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    href={`/questions?subject=${subject.code}&unit=${u.unitNumber}`}
                    className="flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    Open Unit Questions <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <Link
                    href={`/exam-prep`}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Practice Unit
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Course Outcomes & Syllabus Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Outcomes */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-sky-400" />
            Course Outcomes (COs)
          </h3>
          <div className="space-y-3">
            {outcomes.map((co: any, idx: number) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3.5 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sky-400">{co.code}</span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                    {co.level}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">{co.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Textbooks & Objectives */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-400" />
              Prescribed Textbooks
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pl-2">
              {textbooks.map((tb: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{tb}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-purple-400" />
              Course Objectives
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pl-2">
              {objectives.map((obj: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
