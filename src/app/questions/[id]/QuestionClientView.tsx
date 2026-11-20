"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GitFork,
  Box,
  Bot,
  AlertTriangle,
  Flag,
  Share2,
  Sparkles,
  BookOpen,
  HelpCircle,
  Flame,
  Check,
  RotateCcw,
} from "lucide-react";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";
import InteractiveFlowchart from "@/components/flowchart/InteractiveFlowchart";
import Concept3DViewer from "@/components/three/Concept3DViewer";
import AITutorChat from "@/components/tutor/AITutorChat";

interface QuestionClientViewProps {
  question: any;
  flowchart?: any;
  visualization?: any;
  relatedQuestions: any[];
  navigation: {
    prev?: any;
    next?: any;
  };
}

export default function QuestionClientView({
  question,
  flowchart,
  visualization,
  relatedQuestions,
  navigation,
}: QuestionClientViewProps) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"answer" | "flowchart" | "3d" | "tutor">("answer");
  const [isBookmarked, setIsBookmarked] = useState(
    Boolean(question.Bookmark && question.Bookmark.length > 0)
  );
  const [isCompleted, setIsCompleted] = useState(
    Boolean(question.StudyProgress?.[0]?.completed)
  );
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportSuccess, setReportSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft" && navigation.prev) {
        router.push(`/questions/${navigation.prev.id}`);
      } else if (e.key === "ArrowRight" && navigation.next) {
        router.push(`/questions/${navigation.next.id}`);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigation, router]);

  const toggleBookmark = async () => {
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: question.id }),
      });
      const data = await res.json();
      if (data.success) {
        setIsBookmarked(data.bookmarked);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCompleted = async () => {
    try {
      const newStatus = !isCompleted;
      setIsCompleted(newStatus);
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: question.id,
          completed: newStatus,
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const submitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/questions/${question.id}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: reportReason }),
      });
      const data = await res.json();
      if (data.success) {
        setReportSuccess(true);
        setTimeout(() => {
          setReportOpen(false);
          setReportSuccess(false);
          setReportReason("");
        }, 1800);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const answer = question.Answer?.[0];
  const keywords: string[] = question.keywords ? JSON.parse(question.keywords) : [];
  const keyPoints: string[] = answer?.keyPoints ? JSON.parse(answer.keyPoints) : [];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Top Breadcrumb & Next/Prev Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/questions" className="hover:text-white transition-colors">
            Questions
          </Link>
          <span>/</span>
          <Link
            href={`/subjects/${question.Subject.code.toLowerCase()}`}
            className="text-sky-400 hover:underline"
          >
            {question.Subject.code}
          </Link>
          <span>/</span>
          <span className="truncate max-w-xs text-slate-300">
            Unit {question.Unit.unitNumber}
          </span>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          {navigation.prev ? (
            <Link
              href={`/questions/${navigation.prev.id}`}
              className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              title="Previous Question (← Arrow Key)"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Prev (Q{navigation.prev.qNo})</span>
            </Link>
          ) : (
            <span className="rounded-xl border border-slate-800/40 px-3 py-1.5 text-xs text-slate-400 opacity-40">
              Start of Subject
            </span>
          )}

          {navigation.next ? (
            <Link
              href={`/questions/${navigation.next.id}`}
              className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              title="Next Question (→ Arrow Key)"
            >
              <span className="hidden sm:inline">Next (Q{navigation.next.qNo})</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="rounded-xl border border-slate-800/40 px-3 py-1.5 text-xs text-slate-400 opacity-40">
              End of Subject
            </span>
          )}
        </div>
      </div>

      {/* Main Question Header Card */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900 to-[#090d16] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* Meta Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-mono font-bold text-sky-400 border border-sky-500/30">
              {question.Subject.code} • {question.Subject.name}
            </span>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
              {question.marks} Marks • {question.part}
            </span>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
              Unit {question.Unit.unitNumber}: {question.Unit.title}
            </span>
            <span className="rounded-full bg-slate-800/80 px-2.5 py-1 text-xs text-slate-400">
              Taxonomy: {question.taxonomy}
            </span>
            <span className="rounded-full bg-slate-800/80 px-2.5 py-1 text-xs text-slate-400">
              {question.courseOutcome}
            </span>
          </div>

          {/* Answer Status Badge */}
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold border ${
                answer?.status === "Reviewed"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : answer?.status === "Needs Verification"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                  : "bg-sky-500/10 text-sky-400 border-sky-500/30"
              }`}
            >
              Status: {answer?.status || "AI Generated"}
            </span>
          </div>
        </div>

        {/* Question Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-relaxed tracking-tight">
          <span className="text-sky-400 font-mono mr-2.5">Q{question.qNo}.</span>
          {question.question}
        </h1>

        {/* Topic and Subsume level */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-3 border-t border-slate-800/80">
          <div>
            Topic: <span className="text-slate-200 font-semibold">{question.topicName}</span>
          </div>
          {question.subsumeLevel && (
            <div>
              Level: <span className="text-slate-300">{question.subsumeLevel}</span>
            </div>
          )}
        </div>

        {/* Keywords */}
        {keywords.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 mr-1">Keywords:</span>
            {keywords.map((kw, i) => (
              <Link
                key={i}
                href={`/questions?search=${encodeURIComponent(kw)}`}
                className="rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:text-sky-300 border border-slate-700/60 px-2 py-0.5 text-xs text-slate-300 transition-colors"
              >
                #{kw}
              </Link>
            ))}
          </div>
        )}

        {/* Interactive Action Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            {/* Mark as Completed */}
            <button
              onClick={toggleCompleted}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                isCompleted
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                  : "border border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              {isCompleted ? "Mastered / Completed" : "Mark as Completed"}
            </button>

            {/* Bookmark */}
            <button
              onClick={toggleBookmark}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
                isBookmarked
                  ? "border-rose-500/40 bg-rose-500/20 text-rose-300"
                  : "border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
              {isBookmarked ? "Saved" : "Bookmark"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyUrl}
              className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Copy Question Link"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
              {copiedLink ? "Copied" : "Share"}
            </button>

            <button
              onClick={() => setReportOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
            >
              <Flag className="h-3.5 w-3.5" />
              Report Inaccuracy
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab("answer")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold transition-all ${
            activeTab === "answer"
              ? "border-sky-400 text-sky-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          Model Answer
        </button>

        {flowchart && (
          <button
            onClick={() => setActiveTab("flowchart")}
            className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold transition-all ${
              activeTab === "flowchart"
                ? "border-cyan-400 text-cyan-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <GitFork className="h-4 w-4" />
            Interactive Flowchart
            <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
              React Flow
            </span>
          </button>
        )}

        {visualization && (
          <button
            onClick={() => setActiveTab("3d")}
            className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold transition-all ${
              activeTab === "3d"
                ? "border-indigo-400 text-indigo-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Box className="h-4 w-4" />
            3D Concept Space
            <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-mono text-indigo-300">
              Three.js
            </span>
          </button>
        )}

        <button
          onClick={() => setActiveTab("tutor")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold transition-all ${
            activeTab === "tutor"
              ? "border-amber-400 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Bot className="h-4 w-4" />
          AI Tutor Assistance
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {/* Tab 1: Answer */}
        {activeTab === "answer" && (
          <div className="space-y-6">
            {/* Key Points Summary Callout */}
            {keyPoints.length > 0 && (
              <div className="rounded-2xl border border-sky-500/30 bg-sky-950/20 p-5 shadow-lg">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm mb-3">
                  <Sparkles className="h-4 w-4" /> High-Yield Exam Key Points ({question.marks} Marks):
                </div>
                <ul className="space-y-1.5 pl-2">
                  {keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                      <span className="text-sky-400 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Answer Content */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 shadow-xl backdrop-blur-md">
              {answer ? (
                <MarkdownRenderer content={answer.content} />
              ) : (
                <p className="text-slate-400">Answer is being generated...</p>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Flowchart */}
        {activeTab === "flowchart" && flowchart && (
          <div className="space-y-4">
            <InteractiveFlowchart
              title={flowchart.title}
              category={flowchart.category}
              description={flowchart.description}
              nodesJson={flowchart.nodes}
              edgesJson={flowchart.edges}
              stepsJson={flowchart.steps}
            />
          </div>
        )}

        {/* Tab 3: 3D Visualization */}
        {activeTab === "3d" && visualization && (
          <div className="space-y-4">
            <Concept3DViewer
              title={visualization.title}
              conceptType={visualization.conceptType}
              description={visualization.description}
              configJson={visualization.config}
              labelsJson={visualization.labels}
            />
          </div>
        )}

        {/* Tab 4: AI Tutor */}
        {activeTab === "tutor" && (
          <AITutorChat
            questionId={question.id}
            questionText={question.question}
            subjectCode={question.Subject.code}
            initialMode="explain_answer"
          />
        )}
      </div>

      {/* Related Questions Section */}
      {relatedQuestions.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-sky-400" />
            Related Questions from Unit {question.Unit.unitNumber}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedQuestions.map((rq) => (
              <Link
                key={rq.id}
                href={`/questions/${rq.id}`}
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-sky-500/40 hover:bg-slate-900 transition-all"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span className="font-mono text-sky-400">Q{rq.qNo} • {rq.marks}M</span>
                  <span>{rq.taxonomy}</span>
                </div>
                <h5 className="text-sm font-semibold text-slate-200 group-hover:text-sky-300 transition-colors line-clamp-2">
                  {rq.question}
                </h5>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Flag className="h-4 w-4 text-amber-400" /> Report Answer Inaccuracy
              </h4>
              <button
                onClick={() => setReportOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {reportSuccess ? (
              <div className="py-8 text-center space-y-2">
                <Check className="h-10 w-10 text-emerald-400 mx-auto" />
                <h5 className="text-sm font-bold text-white">Report Submitted</h5>
                <p className="text-xs text-slate-400">
                  This answer has been flagged for administrator verification.
                </p>
              </div>
            ) : (
              <form onSubmit={submitReport} className="mt-4 space-y-4">
                <p className="text-xs text-slate-300">
                  Please let us know what part of the answer needs correction or clarification:
                </p>
                <textarea
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder="e.g. In step 3, the formula should use transition probability a_{ij}..."
                  required
                  rows={4}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportOpen(false)}
                    className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
