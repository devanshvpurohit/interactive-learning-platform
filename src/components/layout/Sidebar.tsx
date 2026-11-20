"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Binary,
  ShieldCheck,
  HelpCircle,
  GitFork,
  Box,
  Bot,
  GraduationCap,
  Bookmark,
  TrendingUp,
  FileText,
  Settings,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    {
      group: "Subjects",
      items: [
        { label: "Language Modelling", href: "/subjects/acad40", icon: Binary, badge: "250 Qs", color: "text-sky-400" },
        { label: "Ethical Hacking & Defence", href: "/subjects/acsd53", icon: ShieldCheck, badge: "215 Qs", color: "text-emerald-400" },
      ],
    },
    {
      group: "Question Explorer",
      items: [
        { label: "All Questions", href: "/questions", icon: HelpCircle, badge: "465 Qs" },
        { label: "Interactive Flowcharts", href: "/flowcharts", icon: GitFork, badge: "React Flow" },
        { label: "3D Visualizations", href: "/visualizations", icon: Box, badge: "Three.js" },
      ],
    },
    {
      group: "Study & Practice",
      items: [
        { label: "AI Study Tutor", href: "/tutor", icon: Bot, badge: "Gemini 2.5" },
        { label: "Exam Prep & Tests", href: "/exam-prep", icon: GraduationCap },
        { label: "Saved Bookmarks", href: "/bookmarks", icon: Bookmark },
        { label: "Progress Tracker", href: "/progress", icon: TrendingUp },
      ],
    },
    {
      group: "Platform Administration",
      items: [
        { label: "Document Management", href: "/admin", icon: FileText },
        { label: "Settings & API Key", href: "/settings", icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-slate-800 bg-[#090d16] transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand / Logo */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-blue-700 text-white shadow-lg shadow-sky-500/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                EduAI <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[10px] font-mono text-sky-400 border border-sky-500/30">2.0</span>
              </span>
              <p className="text-[11px] text-slate-400 font-medium">B.Tech Interactive Hub</p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {links.map((section: any, idx: number) => {
            if (section.items) {
              return (
                <div key={idx} className="space-y-1">
                  <div className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {section.group}
                  </div>
                  {section.items.map((item: any) => {
                    const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                          active
                            ? "bg-gradient-to-r from-sky-500/20 to-indigo-500/10 text-white border border-sky-500/30 shadow-sm"
                            : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`h-4 w-4 ${active ? "text-sky-400" : (item as any).color || "text-slate-400"}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              active
                                ? "bg-sky-400 text-slate-950"
                                : "bg-slate-800 text-slate-300 border border-slate-700/60"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              );
            }

            const active = pathname === section.href;
            const Icon = section.icon;
            return (
              <div key={section.href}>
                <Link
                  href={section.href}
                  onClick={onClose}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                    active
                      ? "bg-gradient-to-r from-sky-500/20 to-indigo-500/10 text-white border border-sky-500/30"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${active ? "text-sky-400" : "text-slate-400"}`} />
                    <span>{section.label}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* User Card / Footer */}
        <div className="border-t border-slate-800/80 p-4 bg-slate-950/60">
          <div className="flex items-center gap-3 rounded-xl bg-slate-900/80 p-3 border border-slate-800">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 font-bold text-xs border border-sky-500/30">
              ES
            </div>
            <div className="flex-1 overflow-hidden">
              <h5 className="truncate text-xs font-semibold text-white">Engineering Scholar</h5>
              <p className="truncate text-[10px] text-slate-400">student@iare.ac.in</p>
            </div>
            <Link href="/settings" title="Settings">
              <Settings className="h-4 w-4 text-slate-400 hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
