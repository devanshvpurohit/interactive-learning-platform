"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Eye,
  EyeOff,
  Flame,
  Clock,
  Award,
  ChevronRight,
  ChevronLeft,
  BookOpen,
} from "lucide-react";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";

interface QuizQuestion {
  id: string;
  qNo: number;
  question: string;
  marks: number;
  part: string;
  taxonomy: string;
  Subject: { code: string; name: string };
  Unit: { unitNumber: number; title: string };
  Answer?: Array<{ content: string; summary: string }>;
}

export default function ExamPrepPage() {
  const [selectedSubject, setSelectedSubject] = useState("ALL");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [mode, setMode] = useState<"practice" | "timed" | "flashcards">("practice");
  const [numQuestions, setNumQuestions] = useState(10);

  // Active Test State
  const [inTest, setInTest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const startTest = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/study-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          subjectCode: selectedSubject,
          unitNumber: selectedUnit ? parseInt(selectedUnit, 10) : undefined,
          limit: numQuestions,
        }),
      });
      const data = await res.json();
      if (data.success && data.questions.length > 0) {
        setQuestions(data.questions);
        setCurrentIndex(0);
        setRevealed(false);
        setRatings({});
        setIsFinished(false);
        setInTest(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRate = (score: number) => {
    setRatings((prev) => ({ ...prev, [currentIndex]: score }));
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((idx) => idx + 1);
      setRevealed(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetTest = () => {
    setInTest(false);
    setIsFinished(false);
    setQuestions([]);
    setCurrentIndex(0);
    setRevealed(false);
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Title Bar */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300 mb-2">
          <Sparkles className="h-3.5 w-3.5" /> Exam Preparation & Practice Center
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-amber-400" />
          Interactive Mock Test & Flashcard Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Test your preparation with randomized subject tests, unit-wise practice questions, and answer-reveal flashcards. Assess your confidence on Bloom&apos;s taxonomy.
        </p>
      </div>

      {!inTest ? (
        /* Configuration Form */
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Subject Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Target Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  setSelectedUnit("");
                }}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 p-3 text-sm text-white focus:border-sky-500 focus:outline-none"
              >
                <option value="ALL">Both Subjects (465 Questions Pool)</option>
                <option value="ACAD40">ACAD40: Language Modelling (250 Qs)</option>
                <option value="ACSD53">ACSD53: Ethical Hacking (215 Qs)</option>
              </select>
            </div>

            {/* Unit Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Unit / Module (Optional)
              </label>
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 p-3 text-sm text-white focus:border-sky-500 focus:outline-none"
              >
                <option value="">All Units Combined</option>
                <option value="1">Unit 1 / Module I</option>
                <option value="2">Unit 2 / Module II</option>
                <option value="3">Unit 3 / Module III</option>
                <option value="4">Unit 4 / Module IV</option>
                <option value="5">Unit 5 / Module V</option>
              </select>
            </div>

            {/* Test Mode */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Study Format
              </label>
              <select
                value={mode}
                onChange={(e: any) => setMode(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 p-3 text-sm text-white focus:border-sky-500 focus:outline-none"
              >
                <option value="practice">Practice Mode (Instant Answer Reveal)</option>
                <option value="flashcards">Flashcard Mode (Rapid Fire)</option>
                <option value="timed">Exam Simulation</option>
              </select>
            </div>
          </div>

          {/* Number of Questions */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Question Count: <strong className="text-amber-400">{numQuestions} Questions</strong>
            </label>
            <div className="flex items-center gap-3">
              {[5, 10, 15, 20, 30].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setNumQuestions(num)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    numQuestions === num
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {num} Qs
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startTest}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 p-4 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110 disabled:opacity-40 transition-all"
          >
            <Play className="h-4 w-4" />
            {loading ? "Preparing Exam Questions..." : "Begin Practice Test"}
          </button>
        </div>
      ) : isFinished ? (
        /* Results View */
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 sm:p-12 text-center space-y-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto border border-emerald-500/30">
            <Award className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Practice Test Completed!</h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            You reviewed {questions.length} questions from {selectedSubject} across multiple Bloom&apos;s taxonomy categories.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={startTest}
              className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400"
            >
              <RotateCcw className="h-4 w-4" /> Retake Another Test
            </button>
            <button
              onClick={resetTest}
              className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
            >
              Back to Configuration
            </button>
          </div>
        </div>
      ) : (
        /* Active Test Question Card */
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="text-slate-500">•</span>
              <span className="rounded bg-sky-500/10 px-2 py-0.5 font-mono text-sky-400 border border-sky-500/20">
                {currentQ.Subject.code}
              </span>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300">
                {currentQ.marks} Marks
              </span>
            </div>

            <button
              onClick={resetTest}
              className="text-slate-400 hover:text-white"
            >
              Exit Test
            </button>
          </div>

          {/* Question Text */}
          <div className="py-4">
            <h3 className="text-lg sm:text-2xl font-bold text-white leading-relaxed">
              {currentQ.question}
            </h3>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <span>Unit {currentQ.Unit.unitNumber}: {currentQ.Unit.title}</span>
              <span>•</span>
              <span>Taxonomy: {currentQ.taxonomy}</span>
            </div>
          </div>

          {/* Reveal Button */}
          <div className="pt-2">
            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="flex items-center gap-2 rounded-xl bg-sky-500/20 border border-sky-500/40 px-5 py-2.5 text-xs font-bold text-sky-300 hover:bg-sky-500/30 transition-all"
              >
                <Eye className="h-4 w-4" /> Reveal Model Answer
              </button>
            ) : (
              <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950 p-6">
                <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" /> Verified Model Answer ({currentQ.marks} Marks)
                  </span>
                  <button
                    onClick={() => setRevealed(false)}
                    className="text-slate-400 hover:text-slate-200"
                  >
                    Hide
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <MarkdownRenderer
                    content={currentQ.Answer?.[0]?.content || "Model answer preview."}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Confidence Self-Assessment Rating */}
          <div className="border-t border-slate-800 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-400 font-medium">
                How well did you know this answer?
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRate(1)}
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/20"
                >
                  Need Review ❌
                </button>
                <button
                  onClick={() => handleRate(3)}
                  className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-400 hover:bg-amber-500/20"
                >
                  Partially Knew ⚠️
                </button>
                <button
                  onClick={() => handleRate(5)}
                  className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20"
                >
                  Mastered It ✅
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
