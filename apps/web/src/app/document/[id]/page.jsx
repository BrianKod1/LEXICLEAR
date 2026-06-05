"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  AlertCircle,
  Info,
  ChevronRight,
  Search,
  FileText,
  ExternalLink,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  LogOut,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import useUser from "@/utils/useUser";
import { useSubscription } from "@/utils/useSubscription";

export default function DocumentDetails({ params }) {
  const { id } = params;
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClause, setSelectedClause] = useState(null);

  const { data: user, loading: userLoading } = useUser();
  const { isSubscribed, loading: subLoading } = useSubscription();

  useEffect(() => {
    if (!userLoading && !user) window.location.href = "/account/signin";
  }, [user, userLoading]);

  useEffect(() => {
    if (!subLoading && isSubscribed === false && user)
      window.location.href = "/pricing";
  }, [isSubscribed, subLoading, user]);

  useEffect(() => {
    if (isSubscribed) fetchDocument();
  }, [id, isSubscribed]);

  const fetchDocument = async () => {
    try {
      const response = await fetch(`/api/documents/${id}`);
      if (!response.ok) throw new Error("Document not found");
      const data = await response.json();
      setDocument(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "Green":
        return "bg-green-500";
      case "Yellow":
        return "bg-orange-500";
      case "Red":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case "Green":
        return <ShieldCheck className="text-green-600" size={14} />;
      case "Yellow":
        return <AlertTriangle className="text-orange-600" size={14} />;
      case "Red":
        return <ShieldAlert className="text-red-600" size={14} />;
      default:
        return <Info className="text-gray-600" size={14} />;
    }
  };

  if (userLoading || subLoading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <Loader2
          size={32}
          style={{ animation: "spin 1s linear infinite" }}
          className="text-blue-600"
        />
        <style
          jsx
          global
        >{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 bg-gray-200 rounded-full"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
        <style
          jsx
          global
        >{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-6">
        <AlertCircle className="text-red-500 mb-4" size={48} />
        <h2 className="text-xl font-semibold text-[#111827] mb-2">{error}</h2>
        <a href="/" className="text-blue-600 hover:underline">
          Back to Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-blue-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
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
              <h1 className="text-lg font-semibold text-[#111827] tracking-tight line-clamp-1 max-w-[200px] md:max-w-md">
                {document.title}
              </h1>
            </div>
            <span className="bg-white border border-[#E5E7EB] rounded-full px-2.5 py-0.5 text-[10px] text-gray-500 uppercase tracking-wider font-bold">
              Analysis Complete
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="hidden md:flex bg-white border border-[#E5E7EB] text-[#111827] px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors items-center gap-2"
            >
              Export PDF
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Column: Clauses List */}
        <div className="w-full lg:w-3/5 overflow-y-auto border-r border-[#E5E7EB] bg-white">
          <div className="p-8 max-w-3xl mx-auto">
            <div className="mb-10">
              <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">
                Detailed Breakdown
              </div>
              <h2 className="text-3xl font-semibold text-[#111827] tracking-tight mb-4">
                Contract Clauses
              </h2>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                We've analyzed {document.clauses.length} key sections. Click on
                a summary to view the original legal language.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {document.clauses.map((clause, idx) => (
                <div
                  key={clause.id}
                  onClick={() => setSelectedClause(clause)}
                  className={`group bg-white rounded-xl border transition-all cursor-pointer p-6 ${
                    selectedClause?.id === clause.id
                      ? "border-blue-600 ring-1 ring-blue-600"
                      : "border-[#E5E7EB] hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-white border border-[#E5E7EB] rounded-full px-3 py-1 text-xs text-gray-700 inline-flex items-center gap-1.5 font-medium">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${getRiskColor(clause.risk_level)}`}
                        />
                        {clause.risk_level} Risk
                      </div>
                      <span className="text-xs text-gray-400 font-mono">
                        0{idx + 1}
                      </span>
                    </div>
                    {selectedClause?.id === clause.id && (
                      <ChevronRight className="text-blue-600" size={18} />
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-[#111827] mb-2 leading-snug">
                    {clause.plain_english}
                  </h3>

                  {clause.gotcha && (
                    <div className="mt-4 bg-gray-50 border border-[#E5E7EB] rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="text-orange-500" size={14} />
                        <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                          The "Gotcha"
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 italic leading-relaxed">
                        "{clause.gotcha}"
                      </p>
                    </div>
                  )}

                  {clause.jargon && clause.jargon.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {clause.jargon.map((j, i) => (
                        <div
                          key={i}
                          className="bg-blue-50 text-blue-600 rounded-full px-2.5 py-1 text-[11px] font-semibold border border-blue-100 flex items-center gap-1"
                        >
                          <Search size={10} />
                          {j.term}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Source & Details */}
        <div className="hidden lg:block w-2/5 overflow-y-auto bg-[#F9FAFB] p-8">
          {selectedClause ? (
            <div className="flex flex-col gap-8 max-w-md mx-auto">
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-[#E5E7EB]">
                      <FileText className="text-gray-400" size={16} />
                    </div>
                    <span className="text-sm font-semibold text-[#111827]">
                      Original Legal Text
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    <ExternalLink size={16} />
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute -left-6 top-0 bottom-0 w-1 bg-blue-600 rounded-full opacity-20" />
                  <p className="text-sm text-gray-500 leading-relaxed font-mono">
                    "{selectedClause.original_phrase}..."
                  </p>
                </div>
              </div>

              {selectedClause.jargon && selectedClause.jargon.length > 0 && (
                <div className="flex flex-col gap-4">
                  <div className="text-xs font-bold text-[#6B7280] uppercase tracking-widest px-1">
                    Jargon Glossary
                  </div>
                  {selectedClause.jargon.map((j, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl border border-[#E5E7EB] p-5"
                    >
                      <h4 className="text-sm font-semibold text-[#111827] mb-1">
                        {j.term}
                      </h4>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        {j.definition}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="text-blue-600" size={18} />
                  <span className="text-sm font-bold text-blue-900">
                    Senior Analyst Recommendation
                  </span>
                </div>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Based on the "{selectedClause.risk_level}" risk level,
                  consider{" "}
                  {selectedClause.risk_level === "Red"
                    ? "discussing this clause with a qualified legal professional before proceeding."
                    : selectedClause.risk_level === "Yellow"
                      ? "carefully reviewing this section and potentially negotiating more favorable terms."
                      : "this section standard, though still worth noting for your records."}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto">
              <div className="w-20 h-20 bg-white rounded-2xl border border-[#E5E7EB] flex items-center justify-center mb-6 rotate-3 shadow-sm">
                <FileText className="text-gray-200" size={40} />
              </div>
              <h3 className="text-lg font-semibold text-[#111827] mb-2">
                Select a clause
              </h3>
              <p className="text-sm text-[#6B7280]">
                Click any clause on the left to see the original legal wording
                and detailed analysis.
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-[#E5E7EB] px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Info className="text-gray-400 shrink-0" size={16} />
            <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed max-w-3xl">
              LexiClear helps you understand the gist, but it doesn't replace a
              lawyer. This is an AI-generated summary and not professional legal
              advice. Always consult a professional before signing life-altering
              documents.
            </p>
          </div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
            v1.0.0 Stable
          </div>
        </div>
      </footer>
    </div>
  );
}
