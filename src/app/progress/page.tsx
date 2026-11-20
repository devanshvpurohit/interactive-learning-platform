"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Flame,
  Award,
  Layers,
  Sparkles,
  BookOpen,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function ProgressTrackerPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/progress");
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-3">
        <Loader2 className="h-8 w-8 animate-spin text-sky-400" />
        <p className="text-xs text-slate-400">Loading progress analytics...</p>
      </div>
    );
  }

  const {
    totalQuestions = 465,
    completedCount = 0,
    remainingCount = 465,
    percent = 0,
    totalBookmarks = 0,
    totalImportant = 0,
    subjects = [],
  } = stats || {};

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* Title */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-2">
          <Sparkles className="h-3.5 w-3.5" /> Learning Velocity & Mastery Analytics
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-emerald-400" />
          Student Exam Preparation & Progress Tracker
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Monitor your syllabus completion, unit-wise coverage, and revision confidence across both semester examination courses.
        </p>
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Overall Completion</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-3 text-3xl font-extrabold text-white">{percent}%</div>
          <div className="mt-2 h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            {completedCount} of {totalQuestions} questions mastered
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Remaining Questions</span>
            <Clock className="h-4 w-4 text-sky-400" />
          </div>
          <div className="mt-3 text-3xl font-extrabold text-white">{remainingCount}</div>
          <div className="text-[11px] text-slate-400 mt-2">
            To reach 100% exam readiness
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>High-Yield Targets</span>
            <Flame className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-3 text-3xl font-extrabold text-amber-400">{totalImportant}</div>
          <div className="text-[11px] text-slate-400 mt-2">
            Prioritized for university exam questions
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Revision Bookmarks</span>
            <Award className="h-4 w-4 text-rose-400" />
          </div>
          <div className="mt-3 text-3xl font-extrabold text-rose-400">{totalBookmarks}</div>
          <div className="text-[11px] text-slate-400 mt-2">
            Personal flagged items
          </div>
        </div>
      </div>

      {/* Subject-Wise Mastery Progress */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-sky-400" />
          Subject-Wise Syllabus Coverage
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subj: any) => {
            const isLM = subj.code === "ACAD40";
            return (
              <div
                key={subj.id}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase">
                      {subj.code}
                    </span>
                    <h3 className="text-lg font-bold text-white">{subj.name}</h3>
                  </div>
                  <span className="text-sm font-bold text-sky-400 font-mono">
                    {subj.percent}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isLM
                        ? "bg-gradient-to-r from-sky-500 to-blue-500"
                        : "bg-gradient-to-r from-emerald-500 to-teal-500"
                    }`}
                    style={{ width: `${subj.percent}%` }}
                  />
                </div>

                {/* Units List */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Unit-wise Distribution:
                  </span>
                  {subj.units?.map((u: any) => (
                    <div
                      key={u.unitNumber}
                      className="flex items-center justify-between text-xs py-1"
                    >
                      <span className="text-slate-300 truncate max-w-xs">
                        Unit {u.unitNumber}: {u.title}
                      </span>
                      <span className="font-mono text-slate-400">
                        {u.completed}/{u.total} Qs
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    href={`/questions?subject=${subj.code}`}
                    className="flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300"
                  >
                    Open Question Bank <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <Link
                    href={`/exam-prep`}
                    className="rounded-lg bg-slate-800 px-3 py-1 text-xs text-slate-300 hover:bg-slate-700"
                  >
                    Test Knowledge
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
