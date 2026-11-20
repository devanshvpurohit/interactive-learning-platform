"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Download,
  Edit3,
  Sparkles,
  Layers,
  Database,
  ExternalLink,
  Loader2,
} from "lucide-react";

export default function AdminPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docType, setDocType] = useState("Question Bank");
  const [subjectId, setSubjectId] = useState("");
  const [feedback, setFeedback] = useState<any>(null);

  // Export states
  const [exportSubject, setExportSubject] = useState("ALL");
  const [exportFormat, setExportFormat] = useState("json");
  const [exporting, setExporting] = useState(false);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/documents");
      const data = await res.json();
      if (data.success) {
        setDocuments(data.documents);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    setFeedback(null);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("docType", docType);
      if (subjectId) formData.append("subjectId", subjectId);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: "success",
          message: `File "${selectedFile.name}" processed! Extracted: ${data.extractedQuestionsCount} questions.`,
          report: data.validationReport,
        });
        setSelectedFile(null);
        fetchDocs();
      } else {
        setFeedback({
          type: "error",
          message: data.error || "Document upload and processing failed.",
        });
      }
    } catch {
      setFeedback({ type: "error", message: "Network error during upload." });
    } finally {
      setUploading(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      if (exportFormat === "csv") {
        const res = await fetch("/api/export", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subjectCode: exportSubject, format: "csv" }),
        });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `question_bank_${exportSubject}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        const res = await fetch("/api/export", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subjectCode: exportSubject, format: "json" }),
        });
        const data = await res.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `question_bank_${exportSubject}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-16">
      {/* Title */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300 mb-2">
          <Sparkles className="h-3.5 w-3.5" /> Administration & Content Ingestion
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
          <FileText className="h-8 w-8 text-sky-400" />
          Document Upload & Question Bank Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Upload syllabi and question bank PDFs or Word documents. Review extraction validation reports, reprocess documents, and export complete question archives.
        </p>
      </div>

      {/* Upload Box */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Upload className="h-5 w-5 text-sky-400" /> Upload New Syllabus or Question Bank
        </h3>

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Document Type
              </label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 p-3 text-xs text-white focus:border-sky-500 focus:outline-none"
              >
                <option value="Question Bank">Question Bank (PDF / Word)</option>
                <option value="Syllabus">Course Syllabus (PDF / Word)</option>
                <option value="Reference Material">Reference & Study Notes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Select File (.pdf, .docx)
              </label>
              <input
                type="file"
                accept=".pdf,.docx,.doc"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                required
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 p-2 text-xs text-slate-300 file:mr-3 file:rounded-xl file:border-0 file:bg-slate-800 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-sky-400 hover:file:bg-slate-700"
              />
            </div>
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              disabled={!selectedFile || uploading}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-2.5 text-xs font-bold text-slate-950 hover:brightness-110 disabled:opacity-40 transition-all shadow-md shadow-sky-500/20"
            >
              {uploading && <Loader2 className="h-4 w-4 animate-spin text-slate-950" />}
              {uploading ? "Extracting & Validating..." : "Process & Extract Document"}
            </button>
          </div>
        </form>

        {/* Validation Feedback */}
        {feedback && (
          <div
            className={`rounded-2xl p-4 text-xs space-y-2 border ${
              feedback.type === "success"
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                : "bg-red-500/10 text-red-300 border-red-500/30"
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              {feedback.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-400" />
              )}
              {feedback.message}
            </div>
            {feedback.report && (
              <pre className="mt-2 rounded-xl bg-slate-950/80 p-3 text-[11px] font-mono text-slate-300 overflow-x-auto">
                {JSON.stringify(feedback.report, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>

      {/* Registered Documents & Validation Reports */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Database className="h-5 w-5 text-emerald-400" />
          Ingested Documents & Validation Reports
        </h3>

        {loading ? (
          <div className="py-8 text-center text-xs text-slate-400">Loading documents...</div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => {
              let valReport: any = null;
              try {
                valReport = JSON.parse(doc.validationReport);
              } catch {}

              return (
                <div
                  key={doc.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{doc.fileName}</span>
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                          {doc.docType}
                        </span>
                        <span className="rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold">
                          {doc.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Size: {Math.round(doc.fileSize / 1024)} KB • Extracted:{" "}
                        <strong className="text-sky-400">{doc.extractedQuestionsCount} Questions</strong>
                      </p>
                    </div>

                    <span className="text-[11px] text-slate-500 font-mono">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Breakdown if present */}
                  {valReport?.breakdown && (
                    <div className="mt-2 rounded-xl bg-slate-950/60 p-3 border border-slate-800/80">
                      <div className="text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                        Extraction Validation Breakdown:
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                        {Object.entries(valReport.breakdown).map(([mod, cnt]: any) => (
                          <div key={mod} className="rounded-lg bg-slate-900 p-2 border border-slate-800">
                            <div className="text-[10px] text-slate-400 font-bold">{mod}</div>
                            <div className="text-white font-mono text-xs mt-0.5">
                              {cnt.total} Qs
                            </div>
                            <div className="text-[10px] text-slate-500">
                              A:{cnt.partA} • B:{cnt.partB} • C:{cnt.partC}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Export Section */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Download className="h-5 w-5 text-indigo-400" /> Export Full Question Bank Archive
        </h3>
        <p className="text-xs text-slate-400">
          Download structured question banks with answers, marks, Bloom&apos;s taxonomies, and course outcomes in JSON or CSV.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <div>
            <select
              value={exportSubject}
              onChange={(e) => setExportSubject(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="ALL">All Subjects (465 Questions)</option>
              <option value="ACAD40">Language Modelling (ACAD40)</option>
              <option value="ACSD53">Ethical Hacking (ACSD53)</option>
            </select>
          </div>

          <div>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="json">JSON Format (.json)</option>
              <option value="csv">CSV Spreadsheet (.csv)</option>
            </select>
          </div>

          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2 rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white disabled:opacity-40 transition-colors"
          >
            {exporting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Download Question Bank
          </button>
        </div>
      </div>
    </div>
  );
}
