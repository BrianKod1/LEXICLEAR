"use client";

import React from "react";
import {
  Search,
  Check,
  Loader2,
  Info,
  LogOut,
  Zap,
  Shield,
  FileText,
  BookOpen,
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useSubscription } from "@/utils/useSubscription";

export default function PricingPage() {
  const { data: user } = useUser();
  const { isSubscribed, loading, initiateSubscription } = useSubscription();

  const features = [
    { icon: FileText, text: "Unlimited document analyses" },
    { icon: Zap, text: "AI-powered plain English summaries" },
    { icon: Shield, text: "Red/Yellow/Green risk assessment" },
    { icon: BookOpen, text: "Legal jargon glossary for every clause" },
    { icon: Check, text: "Side-by-side original text comparison" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <Loader2 className="text-blue-600 animate-spin" size={32} />
        <style jsx global>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          .animate-spin { animation: spin 1s linear infinite; }
        `}</style>
      </div>
    );
  }

  // Already subscribed — redirect to home
  if (isSubscribed && typeof window !== "undefined") {
    window.location.href = "/";
    return null;
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
          </div>
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#6B7280] hidden md:block">
                {user.email}
              </span>
              <a
                href="/account/logout"
                className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1.5"
              >
                <LogOut size={14} />
                Sign out
              </a>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-xs text-green-700 font-semibold uppercase tracking-wider mb-6">
            <Zap size={12} />
            7-Day Free Trial — No Card Required
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-[#111827] tracking-tight mb-4">
            Understand every contract.
            <br />
            <span className="text-blue-600">Before you sign.</span>
          </h2>
          <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
            Try LexiClear Pro free for 7 days. Unlimited AI-powered legal
            analysis — know exactly what you're agreeing to.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-md mx-auto">
          <div className="bg-white border-2 border-blue-600 rounded-2xl p-8 relative overflow-hidden">
            {/* Badge */}
            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
              7 Days Free
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#111827] mb-1">
                LexiClear Pro
              </h3>
              <p className="text-sm text-[#6B7280] mb-6">
                Everything you need for airtight contract reviews.
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-[#111827] tracking-tight">
                  $19
                </span>
                <span className="text-[#6B7280] text-base">/month</span>
                <span className="bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  after trial
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Cancel anytime. No contracts, no tricks.
              </p>
            </div>

            <div className="flex flex-col gap-3.5 mb-8">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-50 border border-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check
                      className="text-green-600"
                      size={11}
                      strokeWidth={2.5}
                    />
                  </div>
                  <span className="text-sm text-[#374151]">{f.text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={initiateSubscription}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Zap size={16} />
              Start Free 7-Day Trial
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              No credit card required · Cancel anytime · Secured by Stripe
            </p>
          </div>

          {/* Comparison hint */}
          <div className="mt-8 bg-white border border-[#E5E7EB] rounded-xl p-6">
            <div className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-4">
              What's the alternative?
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#374151]">
                  Lawyer review (1 contract)
                </span>
                <span className="text-sm font-semibold text-red-500">
                  $300–$500+
                </span>
              </div>
              <div className="border-t border-[#E5E7EB]" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#374151]">
                  LexiClear Pro (unlimited)
                </span>
                <span className="text-sm font-semibold text-green-600">
                  $19/mo
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-[#E5E7EB] mt-8">
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

      <style jsx global>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}
