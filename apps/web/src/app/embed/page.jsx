"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  FileText,
  Loader2,
  AlertCircle,
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function EmbedWidget() {
  const [apiKey, setApiKey] = useState(null);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clauses, setClauses] = useState(null);
  const [expanded, setExpanded] = useState({});

  // Read apiKey from URL param
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    if (key) setApiKey(key);
  }, []);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setClauses(null);

    try {
      const response = await fetch("/api/embed/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-embed-key": apiKey || "",
        },
        body: JSON.stringify({ title: title || "Legal Document", text }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Analysis failed");
      }

      const data = await response.json();
      setClauses(data.clauses);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRiskStyles = (level) => {
    switch (level) {
      case "Red":
        return {
          border: "#FECACA",
          bg: "#FEF2F2",
          badge: "#FEE2E2",
          badgeText: "#991B1B",
          icon: <ShieldAlert size={13} color="#DC2626" />,
          dot: "#EF4444",
        };
      case "Yellow":
        return {
          border: "#FDE68A",
          bg: "#FFFBEB",
          badge: "#FEF3C7",
          badgeText: "#92400E",
          icon: <AlertTriangle size={13} color="#D97706" />,
          dot: "#F59E0B",
        };
      default:
        return {
          border: "#BBF7D0",
          bg: "#F0FDF4",
          badge: "#DCFCE7",
          badgeText: "#166534",
          icon: <ShieldCheck size={13} color="#16A34A" />,
          dot: "#22C55E",
        };
    }
  };

  const toggleExpand = (idx) => {
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background: "#ffffff",
        minHeight: "100vh",
        padding: "0",
        margin: "0",
        color: "#111827",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid #E5E7EB",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "#fff",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            background: "#2563EB",
            borderRadius: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Search size={15} color="#fff" />
        </div>
        <span
          style={{
            fontWeight: 600,
            fontSize: 15,
            color: "#111827",
            letterSpacing: "-0.02em",
          }}
        >
          LexiClear
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 10,
            fontWeight: 700,
            color: "#6B7280",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            background: "#F3F4F6",
            borderRadius: 999,
            padding: "2px 8px",
            border: "1px solid #E5E7EB",
          }}
        >
          Legal Analyzer
        </span>
      </div>

      <div style={{ padding: "20px" }}>
        {!clauses ? (
          /* Input Form */
          <form onSubmit={handleAnalyze}>
            <div style={{ marginBottom: 14 }}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#374151",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Document Name (optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Terms of Service, NDA..."
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "8px 12px",
                  border: "1px solid #E5E7EB",
                  borderRadius: 8,
                  fontSize: 13,
                  color: "#111827",
                  outline: "none",
                  background: "#FAFAFA",
                }}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#374151",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Paste Legal Text
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                placeholder="Paste the contract or legal clause here..."
                rows={8}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "10px 12px",
                  border: "1px solid #E5E7EB",
                  borderRadius: 8,
                  fontSize: 12,
                  fontFamily: "monospace",
                  color: "#374151",
                  resize: "vertical",
                  outline: "none",
                  background: "#FAFAFA",
                  lineHeight: 1.6,
                }}
              />
            </div>

            {error && (
              <div
                style={{
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontSize: 12,
                  color: "#991B1B",
                  marginBottom: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !text.trim()}
              style={{
                width: "100%",
                background: loading || !text.trim() ? "#93C5FD" : "#2563EB",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 0",
                fontSize: 13,
                fontWeight: 600,
                cursor: loading || !text.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "background 0.15s",
              }}
            >
              {loading ? (
                <>
                  <Loader2
                    size={15}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  <FileText size={15} />
                  Analyze in Plain English
                </>
              )}
            </button>

            <p
              style={{
                fontSize: 10,
                color: "#9CA3AF",
                marginTop: 10,
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              AI-generated summary · Not legal advice · Powered by LexiClear
            </p>
          </form>
        ) : (
          /* Results View */
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 11,
                    color: "#6B7280",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    margin: 0,
                  }}
                >
                  Analysis Complete
                </p>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#111827",
                    margin: "2px 0 0",
                  }}
                >
                  {clauses.length} clauses reviewed
                </p>
              </div>
              <button
                onClick={() => {
                  setClauses(null);
                  setText("");
                  setTitle("");
                  setExpanded({});
                }}
                style={{
                  background: "#F3F4F6",
                  border: "1px solid #E5E7EB",
                  borderRadius: 8,
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#374151",
                  cursor: "pointer",
                }}
              >
                New Analysis
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {clauses.map((clause, idx) => {
                const styles = getRiskStyles(clause.risk_level);
                const isExpanded = expanded[idx];
                return (
                  <div
                    key={idx}
                    style={{
                      border: `1px solid ${styles.border}`,
                      background: styles.bg,
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={() => toggleExpand(idx)}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        padding: "12px 14px",
                        cursor: "pointer",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                      }}
                    >
                      <span style={{ marginTop: 1 }}>{styles.icon}</span>
                      <span
                        style={{
                          flex: 1,
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#111827",
                          lineHeight: 1.4,
                        }}
                      >
                        {clause.plain_english}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: styles.badgeText,
                            background: styles.badge,
                            borderRadius: 999,
                            padding: "2px 8px",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {clause.risk_level}
                        </span>
                        {isExpanded ? (
                          <ChevronUp size={14} color="#6B7280" />
                        ) : (
                          <ChevronDown size={14} color="#6B7280" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div
                        style={{
                          padding: "0 14px 14px",
                          borderTop: `1px solid ${styles.border}`,
                          paddingTop: 12,
                        }}
                      >
                        {clause.gotcha && (
                          <div
                            style={{
                              background: "rgba(255,255,255,0.6)",
                              border: "1px solid #E5E7EB",
                              borderRadius: 7,
                              padding: "8px 12px",
                              marginBottom: 10,
                            }}
                          >
                            <p
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "#374151",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                margin: "0 0 4px",
                              }}
                            >
                              ⚠ The Gotcha
                            </p>
                            <p
                              style={{
                                fontSize: 12,
                                color: "#6B7280",
                                margin: 0,
                                lineHeight: 1.5,
                                fontStyle: "italic",
                              }}
                            >
                              "{clause.gotcha}"
                            </p>
                          </div>
                        )}

                        {clause.original_phrase && (
                          <div style={{ marginBottom: 10 }}>
                            <p
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "#374151",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                margin: "0 0 4px",
                              }}
                            >
                              Original text
                            </p>
                            <p
                              style={{
                                fontSize: 11,
                                color: "#6B7280",
                                fontFamily: "monospace",
                                margin: 0,
                                lineHeight: 1.5,
                              }}
                            >
                              "{clause.original_phrase}..."
                            </p>
                          </div>
                        )}

                        {clause.jargon && clause.jargon.length > 0 && (
                          <div>
                            <p
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "#374151",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                margin: "0 0 6px",
                              }}
                            >
                              Jargon
                            </p>
                            {clause.jargon.map((j, i) => (
                              <div
                                key={i}
                                style={{
                                  display: "flex",
                                  gap: 8,
                                  marginBottom: 4,
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: "#2563EB",
                                    minWidth: 80,
                                  }}
                                >
                                  {j.term}
                                </span>
                                <span
                                  style={{ fontSize: 11, color: "#6B7280" }}
                                >
                                  {j.definition}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                marginTop: 16,
                padding: "10px 14px",
                background: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: 8,
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <Info
                size={12}
                color="#9CA3AF"
                style={{ marginTop: 1, flexShrink: 0 }}
              />
              <p
                style={{
                  fontSize: 10,
                  color: "#9CA3AF",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                AI-generated summary — not professional legal advice. Always
                consult a licensed attorney before signing.
              </p>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
