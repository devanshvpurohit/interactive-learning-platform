"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Bookmark,
  CheckCircle2,
  Sparkles,
  Flame,
  ArrowRight,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Download,
  Loader2,
} from "lucide-react";

export default function QuestionsExplorerPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex flex-col items-center justify-center py-24 space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-sky-400" />
          <p className="text-xs text-slate-400">Loading Question Bank Explorer...</p>
        </div>
      }
    >
      <QuestionsContent />
    </React.Suspense>
  );
}

function QuestionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filters state initialized from query params
  const [page, setPage] = useState<number>(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [search, setSearch] = useState<string>(searchParams.get("search") || "");
  const [subject, setSubject] = useState<string>(searchParams.get("subject") || "");
  const [unit, setUnit] = useState<string>(searchParams.get("unit") || "");
  const [marks, setMarks] = useState<string>(searchParams.get("marks") || "");
  const [part, setPart] = useState<string>(searchParams.get("part") || "");
  const [difficulty, setDifficulty] = useState<string>(
    searchParams.get("difficulty") || ""
  );
  const [important, setImportant] = useState<boolean>(
    searchParams.get("important") === "true"
  );
  const [repeated, setRepeated] = useState<boolean>(
    searchParams.get("repeated") === "true"
  );
  const [bookmarked, setBookmarked] = useState<boolean>(
    searchParams.get("bookmarked") === "true"
  );

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", "15");
      if (search) params.set("search", search);
      if (subject) params.set("subject", subject);
      if (unit) params.set("unit", unit);
      if (marks) params.set("marks", marks);
      if (part) params.set("part", part);
      if (difficulty) params.set("difficulty", difficulty);
      if (important) params.set("important", "true");
      if (repeated) params.set("repeated", "true");
      if (bookmarked) params.set("bookmarked", "true");

      const res = await fetch(`/api/questions?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setQuestions(data.questions);
        setTotal(data.pagination.total);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error("Failed to load questions:", err);
    } finally {
      setLoading(false);
    }
  }, [page, search, subject, unit, marks, part, difficulty, important, repeated, bookmarked]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleResetFilters = () => {
    setPage(1);
    setSearch("");
    setSubject("");
    setUnit("");
    setMarks("");
    setPart("");
    setDifficulty("");
    setImportant(false);
    setRepeated(false);
    setBookmarked(false);
  };

  const toggleBookmark = async (qId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: qId }),
      });
      const data = await res.json();
      if (data.success) {
        setQuestions((prev) =>
          prev.map((q) => {
            if (q.id === qId) {
              return {
                ...q,
                Bookmark: data.bookmarked ? [{ id: "temp" }] : [],
              };
            }
            return q;
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <HelpCircle className="h-7 w-7 text-sky-400" />
            Central Question Bank Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse, search, and filter all 465 university examination questions with complete model answers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/exam-prep"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-sky-500/20 hover:brightness-110 transition-all"
          >
            Practice Quiz Mode
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl shadow-xl space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by question wording, keywords (e.g. Viterbi, Penetration Testing, BPE, Port Scan), topic or taxonomy..."
            className="w-full rounded-2xl border border-slate-700/80 bg-slate-950 pl-12 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
          />
        </div>

        {/* Filter Controls Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Subject Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-sky-500 focus:outline-none"
            >
              <option value="">All Subjects (2)</option>
              <option value="ACAD40">ACAD40: Language Modelling</option>
              <option value="ACSD53">ACSD53: Ethical Hacking</option>
            </select>
          </div>

          {/* Unit Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Unit / Module
            </label>
            <select
              value={unit}
              onChange={(e) => {
                setUnit(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-sky-500 focus:outline-none"
            >
              <option value="">All Units (1 - 5)</option>
              <option value="1">Unit 1 / Module I</option>
              <option value="2">Unit 2 / Module II</option>
              <option value="3">Unit 3 / Module III</option>
              <option value="4">Unit 4 / Module IV</option>
              <option value="5">Unit 5 / Module V</option>
            </select>
          </div>

          {/* Marks Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Marks
            </label>
            <select
              value={marks}
              onChange={(e) => {
                setMarks(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-sky-500 focus:outline-none"
            >
              <option value="">All Marks</option>
              <option value="2">2 Marks (Short)</option>
              <option value="5">5 Marks (Medium)</option>
              <option value="10">10 Marks (Long / Essay)</option>
            </select>
          </div>

          {/* Part Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Question Part
            </label>
            <select
              value={part}
              onChange={(e) => {
                setPart(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-sky-500 focus:outline-none"
            >
              <option value="">All Parts</option>
              <option value="PART A">Part A (Problem Solving)</option>
              <option value="PART B">Part B (Long Answer)</option>
              <option value="PART C">Part C (Short Answer)</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => {
                setDifficulty(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-sky-500 focus:outline-none"
            >
              <option value="">All Levels</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Reset Action */}
          <div className="flex items-end">
            <button
              onClick={handleResetFilters}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset Filters
            </button>
          </div>
        </div>

        {/* Toggle Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <button
            onClick={() => {
              setImportant(!important);
              setPage(1);
            }}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              important
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200"
            }`}
          >
            <Flame className="h-3.5 w-3.5 text-amber-400" /> Important Only
          </button>

          <button
            onClick={() => {
              setRepeated(!repeated);
              setPage(1);
            }}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              repeated
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-400" /> Frequently Repeated
          </button>

          <button
            onClick={() => {
              setBookmarked(!bookmarked);
              setPage(1);
            }}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              bookmarked
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200"
            }`}
          >
            <Bookmark className="h-3.5 w-3.5 text-rose-400" /> Bookmarked Only
          </button>

          <div className="ml-auto text-xs text-slate-400 font-mono">
            Showing <strong className="text-white">{questions.length}</strong> of{" "}
            <strong className="text-sky-400">{total}</strong> questions
          </div>
        </div>
      </div>

      {/* Questions Listing */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-sky-400" />
          <p className="text-xs text-slate-400">Loading questions from verified question bank...</p>
        </div>
      ) : questions.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-12 text-center space-y-3">
          <HelpCircle className="h-10 w-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No questions matched your query</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your search terms, clearing specific unit or mark filters, or resetting all filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q) => {
            const isSaved = q.Bookmark && q.Bookmark.length > 0;
            const isCompleted = q.StudyProgress?.[0]?.completed;
            const isLM = q.Subject.code === "ACAD40";

            return (
              <div
                key={q.id}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 backdrop-blur-md hover:border-sky-500/40 hover:bg-slate-900/90 transition-all shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    {/* Badges Bar */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono font-bold ${
                          isLM
                            ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}
                      >
                        {q.Subject.code}
                      </span>

                      <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] font-medium text-slate-300">
                        Unit {q.Unit.unitNumber}: {q.Unit.title}
                      </span>

                      <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-[11px] font-semibold text-indigo-300">
                        {q.marks} Marks • {q.part}
                      </span>

                      <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-400">
                        Taxonomy: {q.taxonomy}
                      </span>

                      {q.isImportant && (
                        <span className="flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[11px] font-semibold text-amber-400">
                          <Flame className="h-3 w-3" /> High Yield
                        </span>
                      )}

                      {q.isRepeated && (
                        <span className="rounded-full bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 text-[11px] font-semibold text-purple-300">
                          Frequent
                        </span>
                      )}
                    </div>

                    {/* Question Text */}
                    <Link href={`/questions/${q.id}`} className="block">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors leading-snug pt-1">
                        <span className="text-sky-400 font-mono mr-2">Q{q.qNo}.</span>
                        {q.question}
                      </h3>
                    </Link>

                    {/* Answer Preview / Summary */}
                    {q.Answer?.[0]?.summary && (
                      <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                        {q.Answer[0].summary}
                      </p>
                    )}

                    {/* Topic and Outcome */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
                      <span>Topic: <strong className="text-slate-300">{q.topicName}</strong></span>
                      <span>•</span>
                      <span>Outcome: <strong className="text-slate-300">{q.courseOutcome}</strong></span>
                    </div>
                  </div>

                  {/* Actions Right Side */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 pt-2 sm:pt-0">
                    <button
                      onClick={(e) => toggleBookmark(q.id, e)}
                      className={`rounded-xl p-2.5 transition-all ${
                        isSaved
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                          : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                      }`}
                      title={isSaved ? "Remove Bookmark" : "Save Bookmark"}
                    >
                      <Bookmark className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
                    </button>

                    <Link
                      href={`/questions/${q.id}`}
                      className="flex items-center gap-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 px-3.5 py-2 text-xs font-bold text-sky-300 hover:bg-sky-500/20 hover:text-white transition-all"
                    >
                      View Answer <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-800 pt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 disabled:opacity-40 transition-colors"
          >
            ← Previous
          </button>

          <div className="text-xs text-slate-400 font-medium">
            Page <strong className="text-white">{page}</strong> of{" "}
            <strong className="text-white">{totalPages}</strong>
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 disabled:opacity-40 transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
