"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Bot,
  GraduationCap,
  Sparkles,
  Command,
} from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/questions?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-[#090d16]/90 px-4 sm:px-8 backdrop-blur-md">
      {/* Left items: Mobile toggle + Breadcrumb / Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onToggleSidebar}
          className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search 465 questions, algorithms, keywords, formulas..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-10 pr-10 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:border-sky-500/60 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500/60 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-700/60">
            <Command className="h-2.5 w-2.5" /> K
          </kbd>
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        <Link
          href="/tutor"
          className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/30 px-3 py-1.5 text-xs font-semibold text-sky-300 hover:bg-sky-500/20 transition-all shadow-sm"
        >
          <Bot className="h-3.5 w-3.5 text-sky-400" />
          <span className="hidden md:inline">AI Tutor</span>
        </Link>

        <Link
          href="/exam-prep"
          className="flex items-center gap-1.5 rounded-xl border border-slate-700/70 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-all"
        >
          <GraduationCap className="h-3.5 w-3.5 text-amber-400" />
          <span className="hidden md:inline">Practice Exam</span>
        </Link>

        {/* Status Pill */}
        <div className="hidden xl:flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[11px] font-medium text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          IARE BT23 Syllabus Active
        </div>
      </div>
    </header>
  );
}
