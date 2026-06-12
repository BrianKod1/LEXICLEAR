"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Trash2,
  Copy,
  Check,
  Code,
  Key,
  Globe,
  Info,
  ArrowLeft,
  Loader2,
  AlertCircle,
  LogOut,
  Zap,
} from "lucide-react";
import useUser from "@/utils/useUser";

export default function EmbedManager() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [allowedOrigin, setAllowedOrigin] = useState("");
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);

  const { data: user, loading: userLoading } = useUser();

  useEffect(() => {
    if (!userLoading && !user) window.location.href = "/account/signin";
  }, [user, userLoading]);

  useEffect(() => {
    if (user) fetchKeys();
  }, [user]);

  const fetchKeys = async () => {
    try {
      const res = await fetch("/api/embed/keys");
      if (!res.ok) throw new Error("Failed to fetch keys");
      const data = await res.json();
      setKeys(data);
    } catch (err) {
      console.error(err);
      setError("Could not load embed keys.");
    } finally {
      setLoading(false);
    }
  };

  const createKey = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/embed/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, allowed_origin: allowedOrigin || null }),
      });
      if (!res.ok) throw new Error("Failed to create key");
      const key = await res.json();
      setKeys([key, ...keys]);
      setSelectedKey(key);
      setName("");
      setAllowedOrigin("");
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setError("Could not create embed key.");
    } finally {
      setCreating(false);
    }
  };

  const deleteKey = async (id) => {
    if (
      !confirm("Delete this embed key? Any sites using it will stop working.")
    )
      return;
    try {
      const res = await fetch("/api/embed/keys", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete key");
      setKeys(keys.filter((k) => k.id !== id));
      if (selectedKey?.id === id) setSelectedKey(null);
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const getSnippet = (key) => {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://your-app.com";
    return `<!-- LexiClear Embed -->
<iframe
  src="${origin}/embed?key=${key.api_key}"
  width="100%"
  height="600"
  frameborder="0"
  style="border: 1px solid #E5E7EB; border-radius: 12px; width: 100%;"
  title="LexiClear Legal Analyzer"
></iframe>`;
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
    <div className="min-h-screen bg-[#F9FAFB] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft size={20} />
            </a>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="text-white w-4 h-4" />
              </div>
              <span className="text-lg font-semibold text-[#111827] tracking-tight">
                LexiClear
              </span>
            </div>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-medium text-[#6B7280] flex items-center gap-1.5">
              <Code size={14} /> Embed Manager
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/account/logout"
              className="text-gray-400 hover:text-gray-600 flex items-center gap-1.5 text-sm"
            >
              <LogOut size={14} />
              <span className="hidden md:inline">Sign out</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-semibold text-[#111827] tracking-tight mb-1">
              Embed LexiClear
            </h2>
            <p className="text-[#6B7280] text-base">
              Add the LexiClear legal analyzer to any website with a single
              iframe.
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 self-start md:self-auto"
          >
            <Plus size={16} />
            New Embed Key
          </button>
        </div>

        {/* How it works */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
          <h3 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
            <Info size={15} /> How embedding works
          </h3>
          <ol className="text-sm text-blue-800 flex flex-col gap-2 list-none pl-0 m-0">
            <li className="flex gap-3">
              <span className="font-bold text-blue-400">1.</span> Create an
              embed key for each website or client.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-400">2.</span> Copy the
              iframe snippet and paste it into the target site's HTML.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-400">3.</span> Optionally
              lock the key to a specific domain for security.
            </li>
          </ol>
        </div>

        {/* Create key form */}
        {showForm && (
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-8">
            <h3 className="text-base font-semibold text-[#111827] mb-5">
              New Embed Key
            </h3>
            <form onSubmit={createKey} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#374151] flex items-center gap-1.5">
                    <Key size={12} /> Key Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Acme Corp Legal Page"
                    className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 placeholder:text-gray-400"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#374151] flex items-center gap-1.5">
                    <Globe size={12} /> Allowed Origin{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={allowedOrigin}
                    onChange={(e) => setAllowedOrigin(e.target.value)}
                    placeholder="https://company.com"
                    className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 placeholder:text-gray-400"
                  />
                </div>
              </div>
              {error && (
                <div className="text-red-600 text-sm flex items-center gap-2">
                  <AlertCircle size={14} /> {error}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={creating}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
                >
                  {creating ? (
                    <Loader2
                      size={14}
                      style={{ animation: "spin 1s linear infinite" }}
                    />
                  ) : (
                    <Plus size={14} />
                  )}
                  Create Key
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setError(null);
                  }}
                  className="text-[#6B7280] hover:text-[#111827] px-5 py-2 rounded-lg text-sm font-medium border border-[#E5E7EB] bg-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Keys list */}
          <div>
            <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-4">
              Your Embed Keys
            </h3>
            {loading ? (
              <div className="flex flex-col gap-3">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#E5E7EB] rounded-xl h-24 animate-pulse"
                  />
                ))}
              </div>
            ) : keys.length === 0 ? (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-10 text-center">
                <Code className="mx-auto text-gray-300 mb-3" size={36} />
                <p className="text-sm font-semibold text-[#111827] mb-1">
                  No embed keys yet
                </p>
                <p className="text-xs text-[#6B7280]">
                  Create your first key to embed LexiClear.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {keys.map((key) => (
                  <button
                    key={key.id}
                    onClick={() => setSelectedKey(key)}
                    className={`bg-white border rounded-xl p-5 text-left transition-all w-full ${
                      selectedKey?.id === key.id
                        ? "border-blue-600 ring-1 ring-blue-600"
                        : "border-[#E5E7EB] hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-[#111827]">
                          {key.name}
                        </p>
                        {key.allowed_origin && (
                          <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-0.5">
                            <Globe size={10} /> {key.allowed_origin}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteKey(key.id);
                        }}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-[10px] text-[#6B7280] bg-gray-50 border border-[#E5E7EB] rounded px-2 py-1 font-mono truncate flex-1">
                        {key.api_key}
                      </code>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(key.api_key, key.id + "-key");
                        }}
                        className="text-gray-400 hover:text-blue-600 transition-colors p-1 shrink-0"
                      >
                        {copiedId === key.id + "-key" ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Snippet panel */}
          <div>
            <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-4">
              Embed Snippet
            </h3>
            {selectedKey ? (
              <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5E7EB] bg-gray-50">
                  <span className="text-xs font-semibold text-[#374151]">
                    {selectedKey.name}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        getSnippet(selectedKey),
                        selectedKey.id + "-snippet",
                      )
                    }
                    className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    {copiedId === selectedKey.id + "-snippet" ? (
                      <>
                        <Check size={13} className="text-green-500" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={13} /> Copy snippet
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[11px] text-[#374151] font-mono p-5 overflow-x-auto whitespace-pre-wrap leading-relaxed bg-[#FAFAFA]">
                  {getSnippet(selectedKey)}
                </pre>

                <div className="px-5 py-4 border-t border-[#E5E7EB]">
                  <p className="text-xs font-semibold text-[#374151] mb-3 flex items-center gap-1.5">
                    <Zap size={12} className="text-blue-600" /> Preview
                  </p>
                  <a
                    href={`/embed?key=${selectedKey.api_key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg px-4 py-2 text-xs font-semibold transition-colors"
                  >
                    Open live preview →
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-10 text-center h-64 flex flex-col items-center justify-center">
                <Code className="text-gray-200 mb-3" size={36} />
                <p className="text-sm text-[#6B7280]">
                  Select an embed key to see its snippet.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-[#E5E7EB] mt-auto">
        <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3">
          <Info className="text-gray-400 shrink-0 mt-0.5" size={16} />
          <p className="text-xs text-gray-500 leading-relaxed">
            LexiClear helps you understand the gist, but it doesn't replace a
            lawyer. AI-generated summaries are not professional legal advice.
            Always consult a professional before signing.
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
