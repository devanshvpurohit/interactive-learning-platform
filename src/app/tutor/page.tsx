import React from "react";
import AITutorChat from "@/components/tutor/AITutorChat";
import { Bot, Sparkles, BookOpen, ShieldAlert } from "lucide-react";

export default function AITutorPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300 mb-2">
          <Sparkles className="h-3.5 w-3.5" /> Google Gemini 2.5 Flash Integration
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
          <Bot className="h-8 w-8 text-sky-400" />
          AI Interactive Study Tutor & Exam Assistant
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Ask questions across both subjects, request simplified Feynman analogies, test yourself with practice questions, or prepare 10-mark university answer structures grounded in your official syllabus.
        </p>
      </div>

      <AITutorChat className="h-[700px]" initialMode="general_tutor" />
    </div>
  );
}
