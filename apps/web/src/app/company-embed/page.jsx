"use client";

import React, { useMemo } from "react";
import {
  ArrowLeft,
  Check,
  Code,
  Copy,
  Globe,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function CompanyEmbedPage() {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://lexiclear-two.vercel.app";

  const snippet = useMemo(
    () => `<iframe
  src="${origin}/embed?key=YOUR_EMBED_KEY"
  width="100%"
  height="640"
  frameborder="0"
  style="border: 1px solid #E5E7EB; border-radius: 12px; width: 100%;"
  title="LexiClear Contract Analyzer"
></iframe>`,
    [origin],
  );

  const copySnippet = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
    } catch (_error) {
      // Clipboard can be unavailable in some embedded browsers.
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] font-sans">
      <header className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/demo" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Search className="text-white" size={18} />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              LexiClear
            </span>
          </a>
          <a
            href="/demo"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#374151] hover:text-blue-600"
          >
            <ArrowLeft size={15} />
            Demo
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          <div className="pt-3">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5">
              <Code size={12} />
              Website and app embed
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-5">
              Add plain-English contract review to your customer flow.
            </h1>
            <p className="text-lg text-[#4B5563] leading-relaxed mb-7">
              Companies can embed LexiClear into onboarding, HR, leasing,
              marketplace, and client-portal experiences so users can understand
              legal text before they continue.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
              {[
                "Iframe installation",
                "Domain-restricted keys",
                "Plain-English summaries",
                "Risk flag explanations",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white border border-[#E5E7EB] rounded-lg p-4 flex items-center gap-3"
                >
                  <Check size={18} className="text-green-600" />
                  <span className="text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/demo"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg text-sm font-semibold"
              >
                <Zap size={16} />
                View live demo
              </a>
              <a
                href="/account/signup"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-[#E5E7EB] text-[#111827] px-5 py-3 rounded-lg text-sm font-semibold"
              >
                <Globe size={16} />
                Request embed access
              </a>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-blue-600" />
                <span className="font-semibold">Embed snippet preview</span>
              </div>
              <button
                onClick={copySnippet}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                <Copy size={13} />
                Copy
              </button>
            </div>
            <pre className="text-[11px] text-[#374151] font-mono p-5 overflow-x-auto whitespace-pre-wrap leading-relaxed bg-[#FAFAFA] border-b border-[#E5E7EB]">
              {snippet}
            </pre>
            <div className="p-5">
              <div className="border border-[#E5E7EB] rounded-xl bg-[#F8FAFC] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Search className="text-white" size={15} />
                  </div>
                  <span className="text-sm font-semibold">
                    Customer-facing analyzer
                  </span>
                </div>
                <textarea
                  readOnly
                  value="Paste legal text here..."
                  className="w-full h-28 resize-none bg-white border border-[#E5E7EB] rounded-lg p-3 text-sm text-[#6B7280] mb-3"
                />
                <div className="bg-blue-600 text-white rounded-lg text-center py-2.5 text-sm font-semibold">
                  Explain in plain English
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
