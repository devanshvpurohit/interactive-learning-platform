"use client";

import React, { useMemo } from "react";
import katex from "katex";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const renderedHtml = useMemo(() => {
    if (!content) return "";

    let text = content;

    // 1. Process display math: $$...$$
    text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
      try {
        const rendered = katex.renderToString(math.trim(), {
          displayMode: true,
          throwOnError: false,
        });
        return `<div class="katex-display my-3 overflow-x-auto text-sky-400">${rendered}</div>`;
      } catch {
        return `<pre class="text-sky-300 font-mono text-sm bg-slate-900/80 p-2 rounded">${math}</pre>`;
      }
    });

    // 2. Process inline math: $...$
    text = text.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
      try {
        const rendered = katex.renderToString(math.trim(), {
          displayMode: false,
          throwOnError: false,
        });
        return `<span class="katex-inline text-sky-400">${rendered}</span>`;
      } catch {
        return `<code class="text-sky-300 font-mono text-xs bg-slate-900 px-1 py-0.5 rounded">${math}</code>`;
      }
    });

    // 3. Process Code blocks: ```...```
    text = text.replace(/```([a-zA-Z]*)\n([\s\S]+?)```/g, (_, lang, code) => {
      return `<div class="my-4 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950">
        ${lang ? `<div class="bg-slate-900 px-4 py-1.5 text-xs text-slate-400 font-mono border-b border-slate-800">${lang}</div>` : ""}
        <pre class="p-4 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed"><code>${code.trim()}</code></pre>
      </div>`;
    });

    // 4. Process Tables
    const lines = text.split("\n");
    const processedLines: string[] = [];
    let inTable = false;
    let tableRows: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
        if (!inTable) {
          inTable = true;
          tableRows = [];
        }
        tableRows.push(line);
      } else {
        if (inTable) {
          // Render table
          processedLines.push(renderTableHtml(tableRows));
          inTable = false;
          tableRows = [];
        }
        processedLines.push(line);
      }
    }
    if (inTable) {
      processedLines.push(renderTableHtml(tableRows));
    }
    text = processedLines.join("\n");

    // 5. Headings
    text = text.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-slate-100 mt-5 mb-2 flex items-center gap-2">$1</h3>');
    text = text.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-sky-300 mt-6 mb-3 pb-1 border-b border-slate-800">$1</h2>');
    text = text.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-extrabold text-white mt-7 mb-4">$1</h1>');

    // 6. Blockquotes
    text = text.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-sky-500 bg-sky-950/20 px-4 py-2.5 rounded-r-lg text-slate-300 italic my-3">$1</blockquote>');

    // 7. Bold & Italic
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-100">$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em class="text-slate-300 italic">$1</em>');

    // 8. Unordered Lists
    text = text.replace(/^\s*-\s+(.*$)/gim, '<li class="ml-4 list-disc text-slate-300 leading-relaxed">$1</li>');

    // 9. Ordered Lists
    text = text.replace(/^\s*(\d+)\.\s+(.*$)/gim, '<li class="ml-4 list-decimal text-slate-300 leading-relaxed"><span class="font-medium">$2</span></li>');

    // 10. Horizontal rule
    text = text.replace(/^---$/gim, '<hr class="my-5 border-slate-800" />');

    // Wrap consecutive list items
    text = text.replace(/(<li class="[^"]*list-disc[^"]*">[\s\S]+?<\/li>)+/g, '<ul class="my-3 space-y-1.5 pl-2">$0</ul>');
    text = text.replace(/(<li class="[^"]*list-decimal[^"]*">[\s\S]+?<\/li>)+/g, '<ol class="my-3 space-y-1.5 pl-2">$0</ol>');

    // 11. Paragraphs (lines that aren't tags)
    const finalLines = text.split("\n\n").map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<div") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<table") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<hr")
      ) {
        return trimmed;
      }
      return `<p class="my-2.5 leading-relaxed text-slate-300">${trimmed}</p>`;
    });

    return finalLines.join("\n");
  }, [content]);

  return (
    <div
      className={`prose prose-invert max-w-none text-slate-300 text-sm sm:text-base ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}

function renderTableHtml(rows: string[]): string {
  if (rows.length < 2) return rows.join("\n");

  const headerCells = rows[0]
    .split("|")
    .map((c) => c.trim())
    .filter((c) => c.length > 0);

  // Skip delimiter row (row 1 with ---)
  const bodyRows = rows.slice(2);

  let html = `<div class="my-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
    <table class="w-full border-collapse text-left text-xs sm:text-sm">
      <thead>
        <tr class="border-b border-slate-800 bg-slate-800/80">`;

  headerCells.forEach((c) => {
    html += `<th class="px-4 py-3 font-semibold text-sky-300">${c}</th>`;
  });

  html += `</tr></thead><tbody class="divide-y divide-slate-800/60">`;

  bodyRows.forEach((r, idx) => {
    const cells = r
      .split("|")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    const bgClass = idx % 2 === 0 ? "bg-slate-950/30" : "bg-slate-900/20";
    html += `<tr class="${bgClass} hover:bg-slate-800/40 transition-colors">`;
    cells.forEach((cell) => {
      html += `<td class="px-4 py-2.5 text-slate-300">${cell}</td>`;
    });
    html += `</tr>`;
  });

  html += `</tbody></table></div>`;
  return html;
}
