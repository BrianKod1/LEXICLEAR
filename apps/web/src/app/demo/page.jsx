"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  Code,
  Copy,
  FileText,
  Globe,
  Search,
  ShieldAlert,
  ShieldCheck,
  Zap,
} from "lucide-react";

const samples = [
  {
    label: "Employment",
    title: "Employment Agreement",
    text: "Employee assigns all inventions related to Company business, including inventions created outside working hours. Employee may not work for a competitor for 24 months after termination.",
    clauses: [
      {
        risk_level: "Red",
        original_phrase:
          "Employee may not work for a competitor for 24 months after termination.",
        plain_english:
          "You could be blocked from taking a similar job for two years after leaving.",
        gotcha: "The restriction may still apply even if you are laid off.",
        jargon: [
          {
            term: "Non-compete",
            definition:
              "A clause limiting where you can work after leaving a company.",
          },
        ],
      },
      {
        risk_level: "Yellow",
        original_phrase:
          "Employee assigns all inventions related to Company business.",
        plain_english:
          "Work you create outside normal hours may still belong to the company if it is related to their business.",
        gotcha: "Side projects can be swept in if the wording is broad.",
        jargon: [
          {
            term: "IP assignment",
            definition:
              "A transfer of ownership rights for inventions, designs, or creative work.",
          },
        ],
      },
    ],
  },
  {
    label: "Lease",
    title: "Apartment Lease",
    text: "Tenant waives claims for damages except in cases of gross negligence. Lease renews automatically unless Tenant gives 60 days written notice before the end date.",
    clauses: [
      {
        risk_level: "Yellow",
        original_phrase:
          "Lease renews automatically unless Tenant gives 60 days written notice.",
        plain_english:
          "Your lease may renew by itself if you miss the notice window.",
        gotcha: "You may owe more rent even if you planned to move out.",
        jargon: [
          {
            term: "Auto-renewal",
            definition:
              "A contract term that extends the agreement unless someone cancels in time.",
          },
        ],
      },
      {
        risk_level: "Red",
        original_phrase:
          "Tenant waives claims for damages except in cases of gross negligence.",
        plain_english:
          "You may be giving up the right to recover some losses from the landlord.",
        gotcha: "Ordinary negligence may not be enough to make a claim.",
        jargon: [
          {
            term: "Waiver",
            definition:
              "Giving up a legal right or claim, often before a dispute happens.",
          },
        ],
      },
    ],
  },
];

function riskStyles(level) {
  if (level === "Red") {
    return {
      border: "border-red-200",
      bg: "bg-red-50",
      text: "text-red-700",
      icon: ShieldAlert,
    };
  }
  if (level === "Yellow") {
    return {
      border: "border-amber-200",
      bg: "bg-amber-50",
      text: "text-amber-700",
      icon: AlertTriangle,
    };
  }
  return {
    border: "border-green-200",
    bg: "bg-green-50",
    text: "text-green-700",
    icon: ShieldCheck,
  };
}

export default function DemoPage() {
  const [sampleIndex, setSampleIndex] = useState(0);
  const [showResult, setShowResult] = useState(true);
  const sample = samples[sampleIndex];
  const snippet = useMemo(
    () => `<iframe
  src="https://lexiclear.example/embed?key=demo_key"
  width="100%"
  height="600"
  frameborder="0"
  title="LexiClear Legal Analyzer"
></iframe>`,
    [],
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] font-sans">
      <header className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/landing" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Search className="text-white" size={18} />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              LexiClear
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a
              href="/embed-manager"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#374151] hover:text-blue-600"
            >
              <Code size={16} />
              Embed Manager
            </a>
            <a
              href="/account/signup"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Start Trial
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start mb-10">
          <div className="pt-4">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5">
              <Zap size={12} />
              Live Product Demo
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-5">
              Plain-English contract review for apps, websites, and teams.
            </h1>
            <p className="text-lg text-[#4B5563] leading-relaxed mb-7 max-w-xl">
              LexiClear helps people understand legal text before they sign,
              while companies can embed the same analyzer into customer portals,
              HR flows, marketplaces, and mobile apps.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                ["Web SaaS", FileText],
                ["Iframe Embed", Globe],
                ["App Store Ready", Check],
              ].map(([label, Icon]) => (
                <div
                  key={label}
                  className="bg-white border border-[#E5E7EB] rounded-lg p-4 flex items-center gap-3"
                >
                  <Icon size={18} className="text-blue-600" />
                  <span className="text-sm font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Search className="text-white" size={15} />
                </div>
                <span className="font-semibold">Embedded Analyzer</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#6B7280] bg-gray-50 border border-[#E5E7EB] rounded-full px-2 py-1">
                Demo
              </span>
            </div>

            <div className="p-5">
              <div className="flex gap-2 mb-4">
                {samples.map((item, idx) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setSampleIndex(idx);
                      setShowResult(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${
                      idx === sampleIndex
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-[#374151] border-[#E5E7EB]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">
                {sample.title}
              </label>
              <textarea
                value={sample.text}
                readOnly
                rows={5}
                className="mt-2 w-full resize-none rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] p-3 text-sm leading-relaxed text-[#374151] font-mono"
              />
              <button
                onClick={() => setShowResult(true)}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-semibold inline-flex items-center justify-center gap-2"
              >
                <FileText size={16} />
                Analyze in Plain English
              </button>

              {showResult && (
                <div className="mt-5 flex flex-col gap-3">
                  {sample.clauses.map((clause) => {
                    const styles = riskStyles(clause.risk_level);
                    const Icon = styles.icon;
                    return (
                      <div
                        key={clause.original_phrase}
                        className={`${styles.bg} ${styles.border} border rounded-lg p-4`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className={styles.text} size={18} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-3 mb-2">
                              <p className="font-semibold text-sm">
                                {clause.plain_english}
                              </p>
                              <span
                                className={`${styles.text} bg-white/70 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase`}
                              >
                                {clause.risk_level}
                              </span>
                            </div>
                            <p className="text-xs text-[#4B5563] italic mb-3">
                              {clause.gotcha}
                            </p>
                            <div className="flex items-start gap-2 text-xs text-[#4B5563]">
                              <BookOpen size={13} className="text-blue-600" />
                              <span>
                                <strong>{clause.jargon[0].term}:</strong>{" "}
                                {clause.jargon[0].definition}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Code size={18} className="text-blue-600" />
              <h2 className="text-lg font-semibold">Company Embed</h2>
            </div>
            <p className="text-sm text-[#6B7280] mb-4 leading-relaxed">
              Companies can create a key, restrict it to their domain, and add
              LexiClear with one snippet.
            </p>
            <pre className="bg-[#111827] text-[#F9FAFB] rounded-lg p-4 text-xs overflow-x-auto leading-relaxed">
              {snippet}
            </pre>
            <button
              onClick={() => navigator.clipboard?.writeText(snippet)}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              <Copy size={15} />
              Copy demo snippet
            </button>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">LinkedIn Demo Script</h2>
            <div className="space-y-3 text-sm text-[#374151] leading-relaxed">
              <p>
                I built LexiClear: an AI legal-text explainer that turns dense
                contracts into plain-English summaries, risk flags, gotchas, and
                jargon definitions.
              </p>
              <p>
                The product works as both a standalone SaaS and an embeddable
                iframe widget for companies that want to add legal clarity
                directly inside their websites or apps.
              </p>
              <p className="text-xs text-[#6B7280]">
                Disclaimer: LexiClear is for education and contract
                understanding, not legal advice.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
