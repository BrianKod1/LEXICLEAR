"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  FileText,
  Trash2,
  ChevronRight,
  AlertCircle,
  Search,
  Info,
  LogOut,
  Loader2,
  Zap,
  Settings,
  Code,
} from "lucide-react";
import { format } from "date-fns";
import useUser from "@/utils/useUser";
import { useSubscription } from "@/utils/useSubscription";
import LandingPage from "@/app/landing/page";

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data: user, loading: userLoading } = useUser();
  const {
    isSubscribed,
    statusStr,
    loading: subLoading,
    manageSubscription,
  } = useSubscription();

  // Redirect unsubscribed (but authenticated) users to pricing
  useEffect(() => {
    if (!subLoading && isSubscribed === false && user) {
      window.location.href = "/pricing";
    }
  }, [isSubscribed, subLoading, user]);

  useEffect(() => {
    if (isSubscribed) fetchDocuments();
  }, [isSubscribed]);

  const fetchDocuments = async () => {
    try {
      const response = await fetch("/api/documents");
      if (!response.ok) throw new Error("Failed to fetch documents");
      const data = await response.json();
      setDocuments(data);
    } catch (err) {
      console.error(err);
      setError("Could not load your documents.");
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this analysis?")) return;

    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");
      setDocuments(documents.filter((doc) => doc.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete document");
    }
  };

  // Show landing page for unauthenticated visitors
  if (!userLoading && !user) {
    return <LandingPage />;
  }

  // Loading spinner while checking auth/subscription
  if (userLoading || subLoading || (!isSubscribed && user)) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <Loader2
          className="text-blue-600"
          size={32}
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
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Search className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-semibold text-[#111827] tracking-tight">
              LexiClear
            </h1>
            {statusStr === "trialing" ? (
              <span className="hidden md:inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ml-1">
                <Zap size={9} /> Free Trial
              </span>
            ) : (
              <span className="hidden md:inline-flex items-center gap-1 bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ml-1">
                <Zap size={9} /> Pro
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <span className="text-sm text-[#6B7280] hidden md:block">
                {user.email}
              </span>
            )}
            <button
              onClick={manageSubscription}
              className="text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1.5 text-sm"
            >
              <Settings size={15} />
              <span className="hidden md:inline">Manage Plan</span>
            </button>
            <a
              href="/embed-manager"
              className="text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1.5 text-sm"
            >
              <Code size={15} />
              <span className="hidden md:inline">Embed</span>
            </a>
            <a
              href="/account/logout"
              className="text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1.5 text-sm"
            >
              <LogOut size={15} />
              <span className="hidden md:inline">Sign out</span>
            </a>
            <a
              href="/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <Plus size={18} />
              New Analysis
            </a>
          </div>
        </div>
      </header>

      {statusStr === "trialing" && (
        <div className="bg-green-50 border-b border-green-100">
          <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between">
            <p className="text-sm text-green-700 font-medium flex items-center gap-2">
              <Zap size={14} />
              You're on a free trial. Enjoy full access to LexiClear Pro!
            </p>
            <button
              onClick={manageSubscription}
              className="text-xs font-semibold text-green-700 hover:underline underline-offset-2"
            >
              Add payment method →
            </button>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-1 mb-10">
          <h2 className="text-3xl font-semibold text-[#111827] tracking-tight">
            Your Documents
          </h2>
          <p className="text-[#6B7280] text-base">
            Simplify and review your legal contracts in plain English.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-[#E5E7EB] rounded-xl p-6 h-48 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-12 text-center">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-[#111827] mb-2">
              {error}
            </h3>
            <button
              onClick={fetchDocuments}
              className="text-blue-600 font-medium hover:underline"
            >
              Try again
            </button>
          </div>
        ) : documents.length === 0 ? (
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="text-[#6B7280]" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-[#111827] mb-2">
              No documents yet
            </h3>
            <p className="text-[#6B7280] mb-8 max-w-sm mx-auto">
              Upload your first legal document to see LexiClear in action.
            </p>
            <a
              href="/new"
              className="inline-flex bg-blue-50 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold hover:bg-blue-100 transition-colors items-center gap-2"
            >
              <Plus size={18} />
              Start First Analysis
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <a
                key={doc.id}
                href={`/document/${doc.id}`}
                className="group bg-white border border-[#E5E7EB] rounded-xl p-6 hover:border-gray-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-blue-50 transition-colors">
                      <FileText
                        className="text-[#6B7280] group-hover:text-blue-600"
                        size={20}
                      />
                    </div>
                    <button
                      onClick={(e) => deleteDocument(doc.id, e)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-1 line-clamp-1">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] font-medium mb-4">
                    Analyzed on{" "}
                    {format(new Date(doc.created_at), "MMM d, yyyy")}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="bg-white border border-[#E5E7EB] rounded-full px-3 py-1 text-xs text-gray-700 inline-flex items-center gap-1.5 font-medium">
                    {doc.clause_count} Clauses
                  </span>
                  <ChevronRight
                    className="text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
                    size={18}
                  />
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-[#E5E7EB] mt-auto">
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
    </div>
  );
}
