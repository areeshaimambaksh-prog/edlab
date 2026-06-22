"use client";

import Link from "next/link";
import { useState } from "react";
import AIHelp from "@/components/AIHelp";
import NavBar from "@/components/NavBar";

/* ─── Guided question data ─────────────────────────────────────────── */
type Level = "easy" | "medium" | "hard";

const guidedQuestions: Record<Level, {
  label: string;
  emoji: string;
  tint: string;
  border: string;
  ink: string;
  question: string;
  steps: { heading: string; body: string }[];
}> = {
  easy: {
    label: "Easy",
    emoji: "🍎",
    tint: "#e8f9f1",
    border: "rgba(46,196,122,.25)",
    ink: "#196b44",
    question:
      "y is directly proportional to x. When x = 3, y = 12. Find y when x = 7.",
    steps: [
      {
        heading: "Understand the relationship",
        body: "The question says y is directly proportional to x. This means y = kx for some fixed constant k. When x goes up, y goes up by the same factor.",
      },
      {
        heading: "Find the constant k",
        body: "Substitute the known pair x = 3, y = 12 into y = kx:\n\n12 = k × 3\n\nDivide both sides by 3: k = 4.",
      },
      {
        heading: "Write the full formula",
        body: "Now that k = 4, the formula is:\n\ny = 4x\n\nThis works for any value of x in this relationship.",
      },
      {
        heading: "Find y when x = 7",
        body: "Substitute x = 7 into y = 4x:\n\ny = 4 × 7 = 28\n\nAnswer: y = 28 ✓",
      },
    ],
  },
  medium: {
    label: "Medium",
    emoji: "📐",
    tint: "#fff8f3",
    border: "rgba(249,115,22,.2)",
    ink: "#a85820",
    question:
      "y is directly proportional to the square of x. When x = 4, y = 48. Find y when x = 6.",
    steps: [
      {
        heading: "Understand the relationship",
        body: "y ∝ x² means y = kx². Note: it's not x itself that y tracks — it's x squared. So doubling x multiplies y by 4, not 2.",
      },
      {
        heading: "Find the constant k",
        body: "Substitute x = 4, y = 48:\n\n48 = k × 4²\n48 = k × 16\n\nDivide: k = 48 ÷ 16 = 3.",
      },
      {
        heading: "Write the full formula",
        body: "The formula is:\n\ny = 3x²\n\nCheck: when x = 4, y = 3 × 16 = 48 ✓",
      },
      {
        heading: "Find y when x = 6",
        body: "Substitute x = 6:\n\ny = 3 × 6² = 3 × 36 = 108\n\nAnswer: y = 108 ✓",
      },
    ],
  },
  hard: {
    label: "Hard",
    emoji: "🔬",
    tint: "#f0eefe",
    border: "rgba(124,110,240,.25)",
    ink: "#4a3db8",
    question:
      "y is inversely proportional to the square root of (x + 1). When x = 3, y = 10. Find y when x = 24.",
    steps: [
      {
        heading: "Understand the relationship",
        body: "Inversely proportional to √(x+1) means:\n\ny = k / √(x+1)\n\nWhen x+1 gets bigger, the denominator grows and y gets smaller. The key difference from direct: y and √(x+1) move in opposite directions.",
      },
      {
        heading: "Find the constant k",
        body: "Substitute x = 3, y = 10:\n\n10 = k / √(3+1)\n10 = k / √4\n10 = k / 2\n\nMultiply both sides by 2: k = 20.",
      },
      {
        heading: "Write the full formula",
        body: "The formula is:\n\ny = 20 / √(x+1)\n\nCheck: when x = 3, y = 20/√4 = 20/2 = 10 ✓",
      },
      {
        heading: "Find y when x = 24",
        body: "Substitute x = 24:\n\ny = 20 / √(24+1)\ny = 20 / √25\ny = 20 / 5\n\nAnswer: y = 4 ✓",
      },
    ],
  },
};

/* ─── Component ─────────────────────────────────────────────────────── */
export default function ExplanationPage() {
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  const startLevel = (level: Level) => {
    setActiveLevel(level);
    setStepIndex(0);
  };

  const closeBubble = () => setActiveLevel(null);

  const q = activeLevel ? guidedQuestions[activeLevel] : null;
  const totalSteps = q ? q.steps.length : 0;

  return (
    <main style={{ minHeight: "100vh", color: "#1e2333" }}>
      <NavBar />

      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "36px 24px 140px" }}>

        {/* ── Header ── */}
        <header className="card animate-rise" style={{ padding: "40px 44px" }}>
          <p className="eyebrow" style={{ color: "#f4b740" }}>Explanation</p>
          <h1 style={{ marginTop: 12, fontSize: 42, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Direct &amp; Inverse Proportion
          </h1>
          <p style={{ marginTop: 14, fontSize: 17, color: "#64748b", maxWidth: 580, lineHeight: 1.75 }}>
            Proportion is about how two quantities are connected. Sometimes they
            increase together; sometimes one increases while the other decreases.
          </p>
        </header>

        {/* ── Theory cards ── */}
        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>

          {/* Direct */}
          <div className="card animate-rise" style={{ padding: 28, animationDelay: "80ms" }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "#fff1ef", border: "1.5px solid rgba(247,108,94,.2)", display: "grid", placeItems: "center", fontSize: 28 }}>🍎</div>
            <h2 style={{ marginTop: 18, fontSize: 24, fontWeight: 800 }}>Direct proportion</h2>
            <p style={{ marginTop: 10, fontSize: 15, color: "#64748b", lineHeight: 1.75 }}>
              Both quantities move in the same direction. If one goes up, the other goes up too.
            </p>
            <div style={{ marginTop: 16, padding: "10px 16px", borderRadius: 12, background: "#fff1ef", border: "1.5px solid rgba(247,108,94,.18)", fontSize: 17, fontWeight: 800, color: "#a83228" }}>y = kx</div>
            <p style={{ marginTop: 14, fontSize: 15, color: "#64748b", lineHeight: 1.75 }}>
              Example: if one apple costs Rs. 20, then 5 apples cost Rs. 100.
            </p>
            <div style={{ marginTop: 20, padding: 20, borderRadius: 16, background: "#fffaf3", border: "1.5px solid rgba(249,115,22,.12)" }}>
              <p className="eyebrow" style={{ color: "#a83228" }}>Worked example</p>
              <h3 style={{ marginTop: 8, fontSize: 18, fontWeight: 800 }}>8 apples cost how much?</h3>
              <p style={{ marginTop: 8, fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>One apple costs Rs. 20. y = kx, k = 20, x = 8:</p>
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8, fontSize: 14, fontWeight: 600, color: "#475569" }}>
                <span>k = 20</span><span>x = 8</span><span>y = 20 × 8</span>
                <span style={{ padding: "10px 14px", borderRadius: 12, background: "#e8f9f1", border: "1.5px solid rgba(46,196,122,.25)", fontSize: 18, fontWeight: 800, color: "#196b44" }}>y = Rs. 160</span>
              </div>
            </div>
          </div>

          {/* Inverse */}
          <div className="card animate-rise" style={{ padding: 28, animationDelay: "160ms" }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "#edf2fd", border: "1.5px solid rgba(90,142,232,.2)", display: "grid", placeItems: "center", fontSize: 28 }}>👷</div>
            <h2 style={{ marginTop: 18, fontSize: 24, fontWeight: 800 }}>Inverse proportion</h2>
            <p style={{ marginTop: 10, fontSize: 15, color: "#64748b", lineHeight: 1.75 }}>
              The quantities move in opposite directions. If one goes up, the other goes down.
            </p>
            <div style={{ marginTop: 16, padding: "10px 16px", borderRadius: 12, background: "#edf2fd", border: "1.5px solid rgba(90,142,232,.18)", fontSize: 17, fontWeight: 800, color: "#2a4fa0" }}>y = k / x</div>
            <p style={{ marginTop: 14, fontSize: 15, color: "#64748b", lineHeight: 1.75 }}>
              Example: more workers on the same job means fewer days needed.
            </p>
            <div style={{ marginTop: 20, padding: 20, borderRadius: 16, background: "#f5f8ff", border: "1.5px solid rgba(90,142,232,.14)" }}>
              <p className="eyebrow" style={{ color: "#2a4fa0" }}>Worked example</p>
              <h3 style={{ marginTop: 8, fontSize: 18, fontWeight: 800 }}>12 workers → how many days?</h3>
              <p style={{ marginTop: 8, fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>Total work = 48 worker-days. y = k/x, k = 48, x = 12:</p>
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8, fontSize: 14, fontWeight: 600, color: "#475569" }}>
                <span>k = 48</span><span>x = 12</span><span>y = 48 ÷ 12</span>
                <span style={{ padding: "10px 14px", borderRadius: 12, background: "#e8f9f1", border: "1.5px solid rgba(46,196,122,.25)", fontSize: 18, fontWeight: 800, color: "#196b44" }}>y = 4 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Memory aid ── */}
        <div className="card animate-rise" style={{ marginTop: 20, padding: 28, animationDelay: "240ms" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>How to remember it</h2>
          <p style={{ marginTop: 10, fontSize: 16, color: "#64748b" }}>Direct means together. Inverse means opposite.</p>
          <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
            <div style={{ padding: "12px 16px", borderRadius: 12, background: "#fff1ef", border: "1.5px solid rgba(247,108,94,.18)", fontWeight: 700, color: "#a83228", fontSize: 15 }}>📈 Direct: more apples → more cost</div>
            <div style={{ padding: "12px 16px", borderRadius: 12, background: "#edf2fd", border: "1.5px solid rgba(90,142,232,.18)", fontWeight: 700, color: "#2a4fa0", fontSize: 15 }}>📉 Inverse: more workers → fewer days</div>
          </div>
        </div>

        {/* ── Guided question section ── */}
        <div
          className="card animate-rise"
          style={{ marginTop: 20, padding: 32, animationDelay: "300ms" }}
        >
          <p className="eyebrow" style={{ color: "#7c6ef0" }}>Guided Practice</p>
          <h2 style={{ marginTop: 8, fontSize: 24, fontWeight: 800 }}>Try a question — step by step</h2>
          <p style={{ marginTop: 8, fontSize: 15, color: "#64748b", lineHeight: 1.7 }}>
            Pick a difficulty. Your tutor will walk you through the question
            one step at a time, just like the simulation — tap Next to move
            forward, Back to review.
          </p>

          <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14 }}>
            {(["easy","medium","hard"] as Level[]).map(level => {
              const lvl = guidedQuestions[level];
              const isActive = activeLevel === level;
              return (
                <button
                  key={level}
                  onClick={() => startLevel(level)}
                  style={{
                    padding: "18px 16px",
                    borderRadius: 16,
                    background: isActive ? lvl.tint : "#f8fafc",
                    border: `1.5px solid ${isActive ? lvl.border : "rgba(30,35,51,.09)"}`,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background .2s, border-color .2s, transform .2s",
                    outline: isActive ? `2px solid ${lvl.ink}` : "none",
                    outlineOffset: 2,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; }}
                >
                  <div style={{ fontSize: 28 }}>{lvl.emoji}</div>
                  <div style={{ marginTop: 10, fontSize: 16, fontWeight: 800, color: isActive ? lvl.ink : "#1e2333" }}>{lvl.label}</div>
                  <div style={{ marginTop: 4, fontSize: 13, color: "#94a3b8", lineHeight: 1.5 }}>
                    {level === "easy" ? "Direct proportion, y = kx" :
                     level === "medium" ? "Direct, y = kx²" :
                     "Inverse, y = k/√(x+1)"}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Question display */}
          {activeLevel && q && (
            <div
              className="animate-rise"
              style={{
                marginTop: 24,
                padding: "20px 22px",
                borderRadius: 16,
                background: q.tint,
                border: `1.5px solid ${q.border}`,
              }}
            >
              <p className="eyebrow" style={{ color: q.ink }}>Question — {q.label}</p>
              <p style={{ marginTop: 8, fontSize: 16, fontWeight: 700, lineHeight: 1.7, color: "#1e2333" }}>
                {q.question}
              </p>
            </div>
          )}
        </div>

        {/* ── CTA to quiz ── */}
        <div style={{
          marginTop: 24, padding: "24px 32px",
          borderRadius: 20, background: "#fffaf3",
          border: "1.5px solid rgba(249,115,22,.15)",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
        }}>
          <p style={{ fontSize: 17, fontWeight: 700 }}>Feeling confident? Test yourself next.</p>
          <Link href="/quiz" className="btn btn-green" style={{ padding: "12px 24px", fontSize: 15, textDecoration: "none" }}>
            Go to quiz →
          </Link>
        </div>

      </section>

      {/* ── Speech bubble stepper ── */}
      {activeLevel && q && (
        <div style={{
          position: "fixed", inset: "0 0 0 0", zIndex: 50,
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          padding: "0 24px 32px", pointerEvents: "none",
        }}>
          <div
            className="animate-slide-up"
            style={{
              pointerEvents: "all",
              position: "relative",
              width: "100%", maxWidth: 700,
              background: "#fff",
              border: "1.5px solid rgba(30,35,51,.12)",
              borderRadius: 22,
              boxShadow: "0 8px 24px rgba(30,35,51,.12), 0 24px 48px rgba(30,35,51,.10)",
              padding: "24px 26px 20px",
            }}
          >
            {/* Speech tail */}
            <div style={{
              position: "absolute", bottom: -12, left: "50%",
              transform: "translateX(-50%)",
              width: 0, height: 0,
              borderLeft: "13px solid transparent",
              borderRight: "13px solid transparent",
              borderTop: "13px solid #fff",
              filter: "drop-shadow(0 2px 2px rgba(30,35,51,.06))",
            }} />
            <div style={{
              position: "absolute", bottom: -14, left: "50%",
              transform: "translateX(-50%)",
              width: 0, height: 0,
              borderLeft: "14px solid transparent",
              borderRight: "14px solid transparent",
              borderTop: "14px solid rgba(30,35,51,.12)",
              zIndex: -1,
            }} />

            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              {/* Avatar */}
              <div style={{
                width: 46, height: 46, borderRadius: 14, flexShrink: 0,
                background: q.tint, border: `1.5px solid ${q.border}`,
                display: "grid", placeItems: "center", fontSize: 22,
              }}>🧑‍🏫</div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <p className="eyebrow" style={{ color: q.ink }}>
                    Your Tutor · {q.label} question · step {stepIndex + 1} of {totalSteps}
                  </p>
                  <button
                    onClick={closeBubble}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      fontSize: 13, fontWeight: 600, color: "#94a3b8",
                      padding: "4px 8px", borderRadius: 6,
                      transition: "color .15s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#64748b")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
                  >
                    Close ×
                  </button>
                </div>

                {/* Step heading */}
                <p
                  key={`h-${stepIndex}`}
                  className="animate-rise"
                  style={{ marginTop: 6, fontSize: 16, fontWeight: 800, color: "#1e2333" }}
                >
                  {q.steps[stepIndex].heading}
                </p>

                {/* Step body — preserves line breaks */}
                <p
                  key={`b-${stepIndex}`}
                  className="animate-rise"
                  style={{
                    marginTop: 6, fontSize: 15, fontWeight: 500,
                    lineHeight: 1.75, color: "#374151",
                    whiteSpace: "pre-line",
                  }}
                >
                  {q.steps[stepIndex].body}
                </p>
              </div>
            </div>

            {/* Step dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 16 }}>
              {q.steps.map((_, i) => (
                <span key={i} style={{
                  height: 7, borderRadius: 999,
                  width: i === stepIndex ? 22 : 7,
                  background: i === stepIndex ? q.ink : "#e2e8f0",
                  transition: "width .2s ease, background .2s ease",
                }} />
              ))}
            </div>

            {/* Navigation */}
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 8 }}>
                {(["easy","medium","hard"] as Level[]).map(lv => (
                  <button
                    key={lv}
                    onClick={() => startLevel(lv)}
                    style={{
                      padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                      cursor: "pointer", border: "1.5px solid rgba(30,35,51,.1)",
                      background: activeLevel === lv ? guidedQuestions[lv].tint : "#f8fafc",
                      color: activeLevel === lv ? guidedQuestions[lv].ink : "#94a3b8",
                      transition: "background .15s",
                    }}
                  >
                    {guidedQuestions[lv].label}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="btn"
                  onClick={() => setStepIndex(s => Math.max(0, s - 1))}
                  disabled={stepIndex === 0}
                  style={{ padding: "8px 16px", fontSize: 14, cursor: stepIndex === 0 ? "not-allowed" : "pointer" }}
                >
                  ← Back
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    if (stepIndex < totalSteps - 1) setStepIndex(s => s + 1);
                    else closeBubble();
                  }}
                  style={{
                    padding: "8px 18px", fontSize: 14, cursor: "pointer",
                    background: q.ink, borderColor: q.border, color: "#fff",
                  }}
                >
                  {stepIndex === totalSteps - 1 ? "Done 🎉" : "Next →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AIHelp page="explanation" />
    </main>
  );
}
