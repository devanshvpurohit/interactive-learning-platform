"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bookmark, HelpCircle, ArrowRight, Trash2, Loader2, Sparkles } from "lucide-react";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookmarks");
      const data = await res.json();
      if (data.success) {
        setBookmarks(data.bookmarks);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const removeBookmark = async (qId: string) => {
    try {
      await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: qId }),
      });
      setBookmarks((prev) => prev.filter((b) => b.Question.id !== qId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      <div className="border-b border-slate-800 pb-6 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-semibold text-rose-300 mb-2">
            <Sparkles className="h-3.5 w-3.5" /> Personal Revision Vault
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <Bookmark className="h-8 w-8 text-rose-400" />
            Bookmarked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Questions you have pinned for quick revision before exams.
          </p>
        </div>

        <span className="rounded-full bg-slate-900 border border-slate-800 px-3.5 py-1 text-xs font-mono font-bold text-rose-400">
          {bookmarks.length} Saved
        </span>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-rose-400" />
          <p className="text-xs text-slate-400">Loading saved bookmarks...</p>
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-4">
          <Bookmark className="h-12 w-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No bookmarked questions yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            While exploring questions, click the bookmark ribbon icon on any question to save it here for fast revision.
          </p>
          <Link
            href="/questions"
            className="inline-flex rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
          >
            Explore Question Bank
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((b) => {
            const q = b.Question;
            return (
              <div
                key={b.id}
                className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 hover:border-rose-500/40 transition-all shadow-lg flex flex-col sm:flex-row items-start justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded bg-sky-500/10 px-2 py-0.5 font-mono text-sky-400 border border-sky-500/20">
                      {q.Subject.code}
                    </span>
                    <span className="text-slate-400 font-medium">
                      Unit {q.Unit.unitNumber}: {q.Unit.title}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-indigo-400 font-semibold">{q.marks} Marks</span>
                  </div>

                  <Link href={`/questions/${q.id}`}>
                    <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors pt-1">
                      {q.question}
                    </h3>
                  </Link>

                  {q.Answer?.[0]?.summary && (
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {q.Answer[0].summary}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => removeBookmark(q.id)}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors"
                    title="Remove from Bookmarks"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <Link
                    href={`/questions/${q.id}`}
                    className="flex items-center gap-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 px-3.5 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-500/20 transition-all"
                  >
                    Study <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
