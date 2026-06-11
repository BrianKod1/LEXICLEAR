"use client";

import React from "react";
import { Search } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] font-sans">
      <header className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/demo" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Search className="text-white" size={18} />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              LexiClear
            </span>
          </a>
          <a href="/privacy" className="text-sm font-semibold text-blue-600">
            Privacy
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-semibold tracking-tight mb-3">
          Terms of Use
        </h1>
        <p className="text-sm text-[#6B7280] mb-10">
          Effective date: June 11, 2026
        </p>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 md:p-8 space-y-7 text-sm leading-relaxed text-[#374151]">
          <section>
            <h2 className="text-lg font-semibold text-[#111827] mb-2">
              Educational Use Only
            </h2>
            <p>
              LexiClear provides AI-generated summaries to help users understand
              legal text. LexiClear is not a law firm, does not provide legal
              advice, and does not create an attorney-client relationship. You
              should consult a qualified lawyer before signing important
              documents or making legal decisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#111827] mb-2">
              AI Output
            </h2>
            <p>
              AI-generated analysis may be incomplete, inaccurate, or
              misleading. You are responsible for reviewing all output and
              deciding whether it is appropriate for your use.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#111827] mb-2">
              User Responsibilities
            </h2>
            <p>
              You must only submit content you have the right to process. You
              may not use LexiClear for unlawful activity, to infringe others'
              rights, or to upload malicious, abusive, or prohibited content.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#111827] mb-2">
              Subscriptions and Embedded Use
            </h2>
            <p>
              Some LexiClear features may require a subscription. Business users
              may embed LexiClear where permitted by their plan and must protect
              embed keys from misuse.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#111827] mb-2">
              Limitation of Liability
            </h2>
            <p>
              LexiClear is provided as-is. To the maximum extent allowed by law,
              the operator is not liable for losses arising from reliance on AI
              summaries, unavailable service, or use of the app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#111827] mb-2">
              Changes
            </h2>
            <p>
              These terms may be updated over time. Continued use of LexiClear
              after updates means you accept the updated terms.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
