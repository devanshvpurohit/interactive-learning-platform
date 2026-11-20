"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  User,
  Send,
  Sparkles,
  KeyRound,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Lightbulb,
  GraduationCap,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import MarkdownRenderer from "../markdown/MarkdownRenderer";

export type TutorMode =
  | "general_tutor"
  | "explain_answer"
  | "simplify_topic"
  | "exam_prep"
  | "practice_questions";

interface Message {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AITutorChatProps {
  questionId?: string;
  questionText?: string;
  subjectCode?: string;
  initialMode?: TutorMode;
  className?: string;
}

const MODES: Array<{ id: TutorMode; label: string; icon: any; desc: string }> = [
  { id: "general_tutor", label: "General Tutor", icon: Bot, desc: "Comprehensive academic guidance across both subjects" },
  { id: "explain_answer", label: "Explain Answer", icon: Lightbulb, desc: "Step-by-step intuition and formula breakdown" },
  { id: "simplify_topic", label: "Simplify Topic", icon: Sparkles, desc: "Feynman technique, easy everyday analogies" },
  { id: "exam_prep", label: "Exam Prep", icon: GraduationCap, desc: "2M/5M/10M marking criteria, keywords & traps" },
  { id: "practice_questions", label: "Practice Questions", icon: HelpCircle, desc: "High-yield practice problems with model keys" },
];

const SUGGESTIONS: Record<TutorMode, string[]> = {
  general_tutor: [
    "What are the major differences between HMMs and N-gram models?",
    "Explain the CEH ethical hacking lifecycle phases.",
    "How does Byte-Pair Encoding handle rare words?",
  ],
  explain_answer: [
    "Break down the math in this answer step-by-step.",
    "Why is this algorithm computationally efficient?",
    "What are the key keywords an examiner expects for this question?",
  ],
  simplify_topic: [
    "Explain this like I am 10 years old with an analogy.",
    "Can you explain Viterbi decoding with a real-life scenario?",
    "Explain passive vs active reconnaissance simply.",
  ],
  exam_prep: [
    "How should I structure a 10-mark answer for this in university exams?",
    "What are common mistakes students make on this topic?",
    "Give me 3 high-probability 2-mark definitions from this unit.",
  ],
  practice_questions: [
    "Generate 3 tricky multiple-choice questions with answers.",
    "Give me one 10-mark essay question and its marking rubric.",
    "Give me 5 rapid-fire revision flashcard questions.",
  ],
};

export default function AITutorChat({
  questionId,
  questionText,
  subjectCode,
  initialMode = "general_tutor",
  className = "",
}: AITutorChatProps) {
  const [mode, setMode] = useState<TutorMode>(initialMode);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyConfigured, setKeyConfigured] = useState<boolean | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if API key is configured
  useEffect(() => {
    async function checkKey() {
      try {
        const res = await fetch("/api/gemini/key-status");
        const data = await res.json();
        setKeyConfigured(data.configured === true);
      } catch {
        setKeyConfigured(false);
      }
    }
    checkKey();
  }, []);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "assistant",
          content: questionText
            ? `👋 Hello! I am your **AI Study Tutor**. I see you are studying:\n\n> **"${questionText}"**\n\nHow can I help you master this concept? Choose any mode above or ask a question directly!`
            : `👋 Hello! I am your **AI Study Tutor** for **Language Modelling (ACAD40)** and **Ethical Hacking & Cyber Defence (ACSD53)**.\n\nAsk me any concept, request simplified analogies, practice questions, or exam tips!`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [questionText, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      content: textToSend.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== "welcome")
        .slice(-6)
        .map((m) => ({ sender: m.sender, content: m.content }));

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend.trim(),
          mode,
          questionId,
          subjectCode,
          history,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.needsApiKey) {
          setKeyConfigured(false);
        }
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            sender: "assistant",
            content: `⚠️ **Notice:** ${data.error || "Failed to generate tutor response."}\n\n👉 [Configure your Gemini API Key in Settings](/settings) to enable live interactive tutoring.`,
            timestamp: new Date(),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            sender: "assistant",
            content: data.reply,
            timestamp: new Date(),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "assistant",
          content: "⚠️ Network error connecting to AI tutor. Please check your internet connection.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className={`flex flex-col rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden ${className}`}
    >
      {/* Header & Modes Selector */}
      <div className="border-b border-slate-800 bg-slate-900/90 px-5 py-4 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Gemini AI Study Tutor
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-xs text-slate-400">
                Grounding against syllabus & question banks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {keyConfigured === false && (
              <Link
                href="/settings"
                className="flex items-center gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-colors"
              >
                <KeyRound className="h-3.5 w-3.5" /> Set API Key
              </Link>
            )}
            <button
              onClick={() => setMessages([])}
              className="rounded-lg border border-slate-700/60 p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              title="Reset Conversation"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mode Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {MODES.map((m) => {
            const Icon = m.icon;
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? "bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/30 scale-[1.02]"
                    : "bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:bg-slate-700 hover:text-white"
                }`}
                title={m.desc}
              >
                <Icon className={`h-3.5 w-3.5 ${active ? "text-slate-950" : "text-sky-400"}`} />
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-[350px] max-h-[520px]">
        {messages.map((m) => {
          const isUser = m.sender === "user";
          return (
            <div
              key={m.id}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 mt-1">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`relative group max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-md ${
                  isUser
                    ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-tr-none"
                    : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none"
                }`}
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                ) : (
                  <MarkdownRenderer content={m.content} />
                )}

                {!isUser && (
                  <button
                    onClick={() => handleCopy(m.id, m.content)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-opacity"
                    title="Copy Answer"
                  >
                    {copiedId === m.id ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                )}
              </div>

              {isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-slate-300 mt-1">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 justify-start items-center">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Bot className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 px-4 py-3 text-xs text-slate-400">
              <Loader2 className="h-4 w-4 animate-spin text-sky-400" />
              Tutor is thinking with Google Gemini 2.5 Flash...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="border-t border-slate-800/70 bg-slate-950/60 px-4 py-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Suggested:
          </span>
          {SUGGESTIONS[mode]?.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="shrink-0 rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-slate-300 hover:border-sky-500/40 hover:text-sky-300 hover:bg-slate-800 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="border-t border-slate-800 bg-slate-900/90 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask a question in "${MODES.find((m) => m.id === mode)?.label}" mode...`}
            className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-slate-950 hover:brightness-110 disabled:opacity-40 transition-all shadow-md shadow-sky-500/20"
          >
            <Send className="h-4 w-4 text-slate-950" />
          </button>
        </form>
      </div>
    </div>
  );
}
