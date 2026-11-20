"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Trash2,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Loader2,
} from "lucide-react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gemini/key-status");
      const data = await res.json();
      if (data.success) {
        setStatus(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      setFeedback({ type: "error", message: "Please enter an API key to test." });
      return;
    }

    setActionLoading(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/gemini/test-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: "success",
          message: "Connection test succeeded! Gemini API responded normally.",
        });
      } else {
        setFeedback({
          type: "error",
          message: data.error || "Failed to validate API key with Google servers.",
        });
      }
    } catch {
      setFeedback({ type: "error", message: "Network error during test." });
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setActionLoading(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/gemini/save-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: "success",
          message: "API key encrypted with AES-256-GCM and saved securely!",
        });
        setApiKey("");
        fetchStatus();
      } else {
        setFeedback({
          type: "error",
          message: data.error || "Failed to save API key.",
        });
      }
    } catch {
      setFeedback({ type: "error", message: "Network error while saving key." });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteKey = async () => {
    if (!confirm("Are you sure you want to securely remove your stored Gemini API key?")) return;
    setActionLoading(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/gemini/delete-key", { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: "success",
          message: "Stored API key permanently wiped from database.",
        });
        fetchStatus();
      }
    } catch {
      setFeedback({ type: "error", message: "Failed to delete key." });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-16">
      {/* Title */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300 mb-2">
          <Sparkles className="h-3.5 w-3.5" /> Security & AI Preferences
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
          <Settings className="h-8 w-8 text-sky-400" />
          Settings & Gemini API Key Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
          Configure your personal Google Gemini API key to activate the live AI Study Assistant across all questions and tutor modes.
        </p>
      </div>

      {/* Security Notice Box */}
      <div className="rounded-3xl border border-sky-500/30 bg-sky-950/20 p-6 sm:p-8 backdrop-blur-md space-y-3">
        <div className="flex items-center gap-2.5 text-sky-400 font-bold text-sm">
          <ShieldCheck className="h-5 w-5" /> Enterprise-Grade API Key Security Architecture
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pl-2">
          <li className="flex items-start gap-2">
            <span className="text-sky-400 font-bold">•</span>
            <span><strong>Never exposed to browser:</strong> Your API key is encrypted on the server side using AES-256-GCM with randomized initialization vectors and authenticated tags.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-400 font-bold">•</span>
            <span><strong>Zero Developer Fallback:</strong> We strictly avoid shared fallback keys to prevent unexpected rate-limiting and ensure you retain full control over your quota.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-400 font-bold">•</span>
            <span><strong>User Controlled Billing:</strong> All Gemini requests leverage your free-tier or paid Google AI Studio quota. Get a free key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-sky-400 underline inline-flex items-center gap-0.5">Google AI Studio <ExternalLink className="h-3 w-3" /></a>.</span>
          </li>
        </ul>
      </div>

      {/* Status Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                status?.configured
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}
            >
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Google Gemini API Key Status</h3>
              <p className="text-xs text-slate-400">
                {status?.configured ? `Connected: ${status.keyHint}` : "No API key configured"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${
                status?.configured
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/30"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  status?.configured ? "bg-emerald-400" : "bg-amber-400"
                }`}
              />
              {status?.configured ? "Active & Verified" : "Not Configured"}
            </span>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`flex items-center gap-3 rounded-2xl p-4 text-xs font-medium border ${
              feedback.type === "success"
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                : "bg-red-500/10 text-red-300 border-red-500/30"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Key Input Form */}
        <form onSubmit={handleSaveKey} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              {status?.configured ? "Update Your Google Gemini API Key" : "Enter Your Google Gemini API Key"}
            </label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={status?.configured ? "Paste new key to replace existing..." : "AIzaSy..."}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 pl-4 pr-12 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                title={showKey ? "Hide Key" : "Show Key"}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500">
              Keys are encrypted at rest with AES-256-GCM. We never log or expose your secret.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={!apiKey.trim() || actionLoading}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 disabled:opacity-40 transition-colors"
              >
                Test Connection
              </button>

              <button
                type="submit"
                disabled={!apiKey.trim() || actionLoading}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-2 text-xs font-bold text-slate-950 hover:brightness-110 disabled:opacity-40 transition-all shadow-md shadow-sky-500/20"
              >
                {actionLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Save & Encrypt Key
              </button>
            </div>

            {status?.configured && (
              <button
                type="button"
                onClick={handleDeleteKey}
                disabled={actionLoading}
                className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove Key
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
