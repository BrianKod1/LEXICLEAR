"use client";

import React from "react";
import { Search } from "lucide-react";

export default function PrivacyPage() {
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
          <a href="/terms" className="text-sm font-semibold text-blue-600">
            Terms
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-semibold tracking-tight mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#6B7280] mb-10">
          Effective date: June 11, 2026
        </p>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 md:p-8 space-y-7 text-sm leading-relaxed text-[#374151]">
          <section>
            <h2 className="text-lg font-semibold text-[#111827] mb-2">
              What LexiClear Does
            </h2>
            <p>
              LexiClear helps users understand legal text by generating
              plain-English summaries, risk labels, gotcha warnings, and jargon
              explanations. LexiClear is educational software and does not
              provide legal advice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#111827] mb-2">
              Information We Collect
            </h2>
            <p>
              Depending on how you use LexiClear, we may collect account
              information such as your name and email address, legal text you
              choose to submit for analysis, generated analysis results, billing
              status from our payment provider, and basic technical information
              such as device, browser, and usage data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#111827] mb-2">
              How We Use Information
            </h2>
            <p>
              We use information to operate the app, generate analyses, maintain
              account access, provide embedded tools to business customers,
              process subscriptions, improve reliability, prevent abuse, and
              comply with legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#111827] mb-2">
              Sharing
            </h2>
            <p>
              We may share information with service providers that help us run
              LexiClear, including hosting, database, AI processing,
              authentication, analytics, and payment providers. We do not sell
              your submitted legal text.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#111827] mb-2">
              Legal Text You Submit
            </h2>
            <p>
              You should avoid submitting confidential, privileged, or highly
              sensitive legal documents unless you are comfortable with the
              processing required to provide the service. AI-generated summaries
              may be inaccurate and should be reviewed carefully.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#111827] mb-2">
              Your Choices
            </h2>
            <p>
              You may request access, correction, or deletion of your account
              information by contacting the app operator. Some records may be
              retained where required for security, billing, compliance, or
              legitimate business purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#111827] mb-2">
              Contact
            </h2>
            <p>
              For privacy questions, contact the LexiClear operator through the
              developer contact listed on the Google Play store listing.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
