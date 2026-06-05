"use client";

import React from "react";
import {
  Search,
  Zap,
  Shield,
  FileText,
  BookOpen,
  Check,
  ChevronRight,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: FileText,
      color: "bg-blue-50 text-blue-600",
      title: "Plain English Summaries",
      desc: "Every clause rewritten in language anyone can understand. No law degree required.",
    },
    {
      icon: Shield,
      color: "bg-red-50 text-red-500",
      title: "Risk Assessment",
      desc: "Green, Yellow, and Red flags highlight exactly which parts of a contract need attention.",
    },
    {
      icon: AlertTriangle,
      color: "bg-yellow-50 text-yellow-600",
      title: "Gotcha Detection",
      desc: "AI surfaces hidden clauses — auto-renewals, liability waivers, and buried fees.",
    },
    {
      icon: BookOpen,
      color: "bg-purple-50 text-purple-600",
      title: "Jargon Glossary",
      desc: "Every legal term defined inline so you always know exactly what you're agreeing to.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Paste your contract",
      desc: "Copy in any legal text — lease, NDA, employment agreement, terms of service.",
    },
    {
      num: "02",
      title: "AI analyzes every clause",
      desc: "LexiClear breaks the document into clauses and rates each one for risk.",
    },
    {
      num: "03",
      title: "Read it in plain English",
      desc: "Review the summary, spot the red flags, and sign with confidence.",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="border-b border-[#E5E7EB] sticky top-0 z-10 bg-white/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Search className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-semibold text-[#111827] tracking-tight">
              LexiClear
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/account/signin"
              className="text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors px-3 py-2"
            >
              Sign in
            </a>
            <a
              href="/account/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5"
            >
              Start Free Trial <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-xs text-green-700 font-semibold uppercase tracking-wider mb-8">
          <Zap size={11} /> 7-Day Free Trial · No Credit Card Required
        </div>
        <h1 className="text-5xl md:text-6xl font-semibold text-[#111827] tracking-tight leading-tight mb-6 max-w-3xl mx-auto">
          Understand any contract
          <br />
          <span className="text-blue-600">before you sign it.</span>
        </h1>
        <p className="text-xl text-[#6B7280] max-w-xl mx-auto mb-10 leading-relaxed">
          LexiClear turns dense legal documents into plain English in seconds.
          Spot red flags, understand every clause, and sign with confidence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/account/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-colors flex items-center gap-2 shadow-sm"
          >
            <Zap size={18} />
            Start Free — 7 Days on Us
          </a>
          <a
            href="/account/signin"
            className="text-[#6B7280] hover:text-[#111827] px-6 py-3.5 text-base font-medium transition-colors flex items-center gap-1.5"
          >
            Sign in <ChevronRight size={16} />
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Then $19/month. Cancel anytime.
        </p>
      </section>

      {/* Mock UI Preview */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-gray-400 font-mono">
              Employment Agreement · Analyzed
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                risk: "Red",
                color: "border-red-200 bg-red-50",
                badge: "bg-red-100 text-red-700",
                title: "Non-compete clause",
                plain:
                  "You cannot work for any competitor for 2 years after leaving — even if you're laid off.",
                gotcha: "This applies globally, not just in your country.",
              },
              {
                risk: "Yellow",
                color: "border-yellow-200 bg-yellow-50",
                badge: "bg-yellow-100 text-yellow-700",
                title: "IP assignment",
                plain:
                  "Anything you create — even on weekends — belongs to the company.",
                gotcha:
                  'Includes side projects if they\'re in a "related field."',
              },
              {
                risk: "Green",
                color: "border-green-200 bg-green-50",
                badge: "bg-green-100 text-green-700",
                title: "Termination notice",
                plain:
                  "Either party can end employment with 2 weeks written notice.",
                gotcha: null,
              },
              {
                risk: "Red",
                color: "border-red-200 bg-red-50",
                badge: "bg-red-100 text-red-700",
                title: "Arbitration clause",
                plain:
                  "You give up your right to sue in court. All disputes go to private arbitration.",
                gotcha: "You can't join a class action lawsuit.",
              },
            ].map((clause, i) => (
              <div key={i} className={`border rounded-xl p-4 ${clause.color}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-[#111827]">
                    {clause.title}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${clause.badge}`}
                  >
                    {clause.risk}
                  </span>
                </div>
                <p className="text-sm text-[#374151] leading-relaxed mb-2">
                  {clause.plain}
                </p>
                {clause.gotcha && (
                  <p className="text-xs text-[#6B7280] flex items-start gap-1.5">
                    <AlertTriangle
                      size={11}
                      className="mt-0.5 shrink-0 text-yellow-500"
                    />
                    {clause.gotcha}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#F9FAFB] border-y border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#111827] tracking-tight mb-3">
              How it works
            </h2>
            <p className="text-[#6B7280] text-base max-w-md mx-auto">
              From pasted contract to full analysis in under 60 seconds.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="text-4xl font-bold text-blue-100 tracking-tighter">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold text-[#111827]">
                  {step.title}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#111827] tracking-tight mb-3">
            Everything you need to review a contract
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-6 flex gap-4"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${f.color}`}
              >
                <f.icon size={20} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#111827] mb-1">
                  {f.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing comparison */}
      <section className="bg-[#F9FAFB] border-y border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-[#111827] tracking-tight mb-10">
              Cheaper than one lawyer phone call.
            </h2>
            <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden mb-8">
              {[
                {
                  label: "Lawyer review (1 contract)",
                  price: "$300–$500+",
                  bad: true,
                },
                {
                  label: "LexiClear Pro (unlimited, per month)",
                  price: "$19/mo",
                  bad: false,
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center px-6 py-4 ${i === 0 ? "border-b border-[#E5E7EB]" : ""}`}
                >
                  <span className="text-sm text-[#374151]">{row.label}</span>
                  <span
                    className={`text-sm font-bold ${row.bad ? "text-red-500" : "text-green-600"}`}
                  >
                    {row.price}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 text-sm text-[#374151] mb-10">
              {[
                "Unlimited document analyses",
                "AI risk scoring for every clause",
                "Legal jargon defined in plain English",
                "Cancel anytime",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-green-50 border border-green-200 rounded-full flex items-center justify-center shrink-0">
                    <Check
                      size={11}
                      className="text-green-600"
                      strokeWidth={2.5}
                    />
                  </div>
                  {item}
                </div>
              ))}
            </div>
            <a
              href="/account/signup"
              className="inline-flex bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-colors items-center gap-2"
            >
              <Zap size={18} />
              Start Free Trial
            </a>
            <p className="text-xs text-gray-400 mt-3">
              7 days free · No credit card · $19/mo after
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
            <Search className="text-white w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-semibold text-[#111827]">
            LexiClear
          </span>
        </div>
        <p className="text-xs text-gray-400 text-center max-w-sm">
          AI-generated summaries are not legal advice. Always consult a licensed
          attorney for important decisions.
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <a href="/account/signin" className="hover:text-gray-600">
            Sign in
          </a>
          <a href="/pricing" className="hover:text-gray-600">
            Pricing
          </a>
        </div>
      </footer>
    </div>
  );
}
