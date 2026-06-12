"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  FileText,
  Loader2,
  Info,
  Search,
  LogOut,
  Zap,
} from "lucide-react";
import useUser from "@/utils/useUser";

export default function NewAnalysis() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data: user, loading: userLoading } = useUser();

  useEffect(() => {
    if (!userLoading && !user) window.location.href = "/account/signin";
  }, [user, userLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !text) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, text }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to analyze document");
      }

      const data = await response.json();
      window.location.href = `/document/${data.id}`;
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <Loader2
          size={32}
          className="text-blue-600"
          style={{ animation: "spin 1s linear infinite" }}
        />
        <style
          jsx
          global
        >{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft size={20} />
            </a>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Search className="text-white w-4 h-4" />
              </div>
              <h1 className="text-lg font-semibold text-[#111827] tracking-tight">
                LexiClear
              </h1>
            </div>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-medium text-[#6B7280]">
              New Analysis
            </span>
          </div>
          <a
            href="/account/logout"
            className="text-gray-400 hover:text-gray-600 flex items-center gap-1.5 text-sm"
          >
            <LogOut size={14} />
            <span className="hidden md:inline">Sign out</span>
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-1 mb-10 text-center">
          <h2 className="text-3xl font-semibold text-[#111827] tracking-tight">
            New Legal Analysis
          </h2>
          <p className="text-[#6B7280] text-base">
            Paste your contract text below to get a plain English breakdown.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#E5E7EB] rounded-xl p-8 flex flex-col gap-8"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-sm font-semibold text-[#111827]"
            >
              Document Name
            </label>
            <input
              id="title"
              type="text"
              placeholder="e.g. Apartment Lease Agreement"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="text"
              className="text-sm font-semibold text-[#111827]"
            >
              Contract Text
            </label>
            <textarea
              id="text"
              placeholder="Paste the full legal text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows={15}
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all placeholder:text-gray-400 font-mono resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-[#6B7280] text-xs">
              <Info size={14} />
              <span>Analyses typically take 20-40 seconds.</span>
            </div>
            <button
              type="submit"
              disabled={loading || !title || !text}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 min-w-[160px] justify-center"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  <FileText size={18} />
                  Analyze Now
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      <footer className="max-w-4xl mx-auto px-6 py-8 mt-auto">
        <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3">
          <Info className="text-gray-400 shrink-0 mt-0.5" size={16} />
          <p className="text-xs text-gray-500 leading-relaxed">
            LexiClear helps you understand the gist, but it doesn't replace a
            lawyer. This is an AI-generated summary and not professional legal
            advice. Always consult a professional before signing life-altering
            documents.
          </p>
        </div>
      </footer>
      <style
        jsx
        global
      >{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
