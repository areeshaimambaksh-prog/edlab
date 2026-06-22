"use client";

import Link from "next/link";
import { useState } from "react";
import AIHelp from "@/components/AIHelp";
import NavBar from "@/components/NavBar";
import { useResponsive } from "@/components/useResponsive";

type Level = "easy" | "medium" | "hard";

const guidedQuestions: Record<Level, {
  label: string; emoji: string; tint: string; border: string; ink: string;
  question: string; steps: { heading: string; body: string }[];
}> = {
  easy: {
    label: "Easy", emoji: "🍎", tint: "#e8f9f1", border: "rgba(46,196,122,.25)", ink: "#196b44",
    question: "y is directly proportional to x. When x = 3, y = 12. Find y when x = 7.",
    steps: [
      { heading: "Understand the relationship", body: "y is directly proportional to x means y = kx for some fixed constant k. When x goes up, y goes up by the same factor." },
      { heading: "Find the constant k", body: "Substitute x = 3, y = 12 into y = kx:\n\n12 = k × 3\n\nDivide both sides by 3:\nk = 4" },
      { heading: "Write the full formula", body: "Now that k = 4, the formula is:\n\ny = 4x\n\nThis works for any x in this relationship." },
      { heading: "Find y when x = 7", body: "Substitute x = 7 into y = 4x:\n\ny = 4 × 7 = 28\n\n✓ Answer: y = 28" },
    ],
  },
  medium: {
    label: "Medium", emoji: "📐", tint: "#fff8f3", border: "rgba(249,115,22,.2)", ink: "#a85820",
    question: "y is directly proportional to the square of x. When x = 4, y = 48. Find y when x = 6.",
    steps: [
      { heading: "Understand the relationship", body: "y ∝ x² means y = kx². It's x squared that y tracks — so doubling x multiplies y by 4, not 2." },
      { heading: "Find the constant k", body: "Substitute x = 4, y = 48:\n\n48 = k × 4² = k × 16\n\nDivide:\nk = 48 ÷ 16 = 3" },
      { heading: "Write the full formula", body: "The formula is:\n\ny = 3x²\n\nCheck: when x = 4, y = 3 × 16 = 48 ✓" },
      { heading: "Find y when x = 6", body: "Substitute x = 6:\n\ny = 3 × 6² = 3 × 36 = 108\n\n✓ Answer: y = 108" },
    ],
  },
  hard: {
    label: "Hard", emoji: "🔬", tint: "#f0eefe", border: "rgba(124,110,240,.25)", ink: "#4a3db8",
    question: "y is inversely proportional to the square root of (x + 1). When x = 3, y = 10. Find y when x = 24.",
    steps: [
      { heading: "Understand the relationship", body: "Inversely proportional to √(x+1) means:\n\ny = k / √(x+1)\n\nAs x+1 grows, y gets smaller — they move in opposite directions." },
      { heading: "Find the constant k", body: "Substitute x = 3, y = 10:\n\n10 = k / √(3+1)\n10 = k / √4\n10 = k / 2\n\nMultiply both sides by 2:\nk = 20" },
      { heading: "Write the full formula", body: "The formula is:\n\ny = 20 / √(x+1)\n\nCheck: when x=3, y = 20/√4 = 20/2 = 10 ✓" },
      { heading: "Find y when x = 24", body: "Substitute x = 24:\n\ny = 20 / √(24+1)\ny = 20 / √25\ny = 20 / 5\n\n✓ Answer: y = 4" },
    ],
  },
};

export default function ExplanationPage() {
  const { isMobile } = useResponsive();
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  const startLevel = (level: Level) => { setActiveLevel(level); setStepIndex(0); };
  const closeBubble = () => setActiveLevel(null);

  const q = activeLevel ? guidedQuestions[activeLevel] : null;
  const totalSteps = q ? q.steps.length : 0;

  const pad = "clamp(20px,4vw,44px)";

  return (
    <main style={{ minHeight: "100vh", color: "#1e2333" }}>
      <NavBar />

      <section style={{ maxWidth: 1000, margin: "0 auto", padding: `clamp(20px,4vw,36px) clamp(16px,4vw,24px) 160px` }}>

        {/* Header */}
        <header className="card animate-rise" style={{ padding: pad }}>
          <p className="eyebrow" style={{ color: "#f4b740" }}>Explanation</p>
          <h1 style={{ marginTop: 12, fontSize: "clamp(26px,5vw,42px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Direct &amp; Inverse Proportion
          </h1>
          <p style={{ marginTop: 12, fontSize: "clamp(14px,2vw,17px)", color: "#64748b", maxWidth: 580, lineHeight: 1.75 }}>
            Proportion is about how two quantities are connected. Sometimes they
            increase together; sometimes one increases while the other decreases.
          </p>
        </header>

        {/* Theory cards — stack on mobile */}
        <div style={{
          marginTop: 20,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
          gap: 16,
        }}>
          {/* Direct */}
          <div className="card animate-rise" style={{ padding: "clamp(20px,3vw,28px)", animationDelay: "80ms" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "#fff1ef", border: "1.5px solid rgba(247,108,94,.2)", display: "grid", placeItems: "center", fontSize: 26 }}>🍎</div>
            <h2 style={{ marginTop: 16, fontSize: "clamp(20px,2.5vw,24px)", fontWeight: 800 }}>Direct proportion</h2>
            <p style={{ marginTop: 8, fontSize: "clamp(13px,1.5vw,15px)", color: "#64748b", lineHeight: 1.75 }}>
              Both quantities move in the same direction. If one goes up, the other goes up too.
            </p>
            <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 12, background: "#fff1ef", border: "1.5px solid rgba(247,108,94,.18)", fontSize: "clamp(15px,2vw,17px)", fontWeight: 800, color: "#a83228" }}>y = kx</div>
            <p style={{ marginTop: 12, fontSize: "clamp(13px,1.5vw,15px)", color: "#64748b", lineHeight: 1.75 }}>
              Example: if one apple costs Rs. 20, then 5 apples cost Rs. 100.
            </p>
            <div style={{ marginTop: 16, padding: 18, borderRadius: 14, background: "#fffaf3", border: "1.5px solid rgba(249,115,22,.12)" }}>
              <p className="eyebrow" style={{ color: "#a83228" }}>Worked example</p>
              <h3 style={{ marginTop: 8, fontSize: "clamp(15px,2vw,18px)", fontWeight: 800 }}>8 apples cost how much?</h3>
              <p style={{ marginTop: 6, fontSize: "clamp(12px,1.5vw,14px)", color: "#64748b", lineHeight: 1.7 }}>y = kx, k = 20, x = 8:</p>
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6, fontSize: "clamp(12px,1.5vw,14px)", fontWeight: 600, color: "#475569" }}>
                <span>k = 20</span><span>x = 8</span><span>y = 20 × 8</span>
                <span style={{ padding: "10px 14px", borderRadius: 12, background: "#e8f9f1", border: "1.5px solid rgba(46,196,122,.25)", fontSize: "clamp(15px,2vw,18px)", fontWeight: 800, color: "#196b44" }}>y = Rs. 160</span>
              </div>
            </div>
          </div>

          {/* Inverse */}
          <div className="card animate-rise" style={{ padding: "clamp(20px,3vw,28px)", animationDelay: "160ms" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "#edf2fd", border: "1.5px solid rgba(90,142,232,.2)", display: "grid", placeItems: "center", fontSize: 26 }}>👷</div>
            <h2 style={{ marginTop: 16, fontSize: "clamp(20px,2.5vw,24px)", fontWeight: 800 }}>Inverse proportion</h2>
            <p style={{ marginTop: 8, fontSize: "clamp(13px,1.5vw,15px)", color: "#64748b", lineHeight: 1.75 }}>
              The quantities move in opposite directions. If one goes up, the other goes down.
            </p>
            <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 12, background: "#edf2fd", border: "1.5px solid rgba(90,142,232,.18)", fontSize: "clamp(15px,2vw,17px)", fontWeight: 800, color: "#2a4fa0" }}>y = k / x</div>
            <p style={{ marginTop: 12, fontSize: "clamp(13px,1.5vw,15px)", color: "#64748b", lineHeight: 1.75 }}>
              Example: more workers on the same job means fewer days needed.
            </p>
            <div style={{ marginTop: 16, padding: 18, borderRadius: 14, background: "#f5f8ff", border: "1.5px solid rgba(90,142,232,.14)" }}>
              <p className="eyebrow" style={{ color: "#2a4fa0" }}>Worked example</p>
              <h3 style={{ marginTop: 8, fontSize: "clamp(15px,2vw,18px)", fontWeight: 800 }}>12 workers → how many days?</h3>
              <p style={{ marginTop: 6, fontSize: "clamp(12px,1.5vw,14px)", color: "#64748b", lineHeight: 1.7 }}>y = k/x, k = 48, x = 12:</p>
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6, fontSize: "clamp(12px,1.5vw,14px)", fontWeight: 600, color: "#475569" }}>
                <span>k = 48</span><span>x = 12</span><span>y = 48 ÷ 12</span>
                <span style={{ padding: "10px 14px", borderRadius: 12, background: "#e8f9f1", border: "1.5px solid rgba(46,196,122,.25)", fontSize: "clamp(15px,2vw,18px)", fontWeight: 800, color: "#196b44" }}>y = 4 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Memory aid */}
        <div className="card animate-rise" style={{ marginTop: 16, padding: "clamp(20px,3vw,28px)", animationDelay: "240ms" }}>
          <h2 style={{ fontSize: "clamp(18px,2.5vw,22px)", fontWeight: 800 }}>How to remember it</h2>
          <p style={{ marginTop: 8, fontSize: "clamp(13px,1.5vw,16px)", color: "#64748b" }}>Direct means together. Inverse means opposite.</p>
          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(200px,100%),1fr))", gap: 10 }}>
            <div style={{ padding: "12px 14px", borderRadius: 12, background: "#fff1ef", border: "1.5px solid rgba(247,108,94,.18)", fontWeight: 700, color: "#a83228", fontSize: "clamp(13px,1.5vw,15px)" }}>📈 Direct: more apples → more cost</div>
            <div style={{ padding: "12px 14px", borderRadius: 12, background: "#edf2fd", border: "1.5px solid rgba(90,142,232,.18)", fontWeight: 700, color: "#2a4fa0", fontSize: "clamp(13px,1.5vw,15px)" }}>📉 Inverse: more workers → fewer days</div>
          </div>
        </div>

        {/* Guided question section */}
        <div className="card animate-rise" style={{ marginTop: 16, padding: "clamp(20px,3vw,32px)", animationDelay: "300ms" }}>
          <p className="eyebrow" style={{ color: "#7c6ef0" }}>Guided Practice</p>
          <h2 style={{ marginTop: 8, fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 800 }}>Try a question — step by step</h2>
          <p style={{ marginTop: 8, fontSize: "clamp(13px,1.5vw,15px)", color: "#64748b", lineHeight: 1.7 }}>
            Pick a difficulty. Your tutor walks you through the question one step at a time.
          </p>

          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(160px,100%),1fr))", gap: 12 }}>
            {(["easy","medium","hard"] as Level[]).map(level => {
              const lvl = guidedQuestions[level];
              const isActive = activeLevel === level;
              return (
                <button
                  key={level}
                  onClick={() => startLevel(level)}
                  style={{
                    padding: "clamp(14px,2vw,18px) 14px",
                    borderRadius: 14,
                    background: isActive ? lvl.tint : "#f8fafc",
                    border: `1.5px solid ${isActive ? lvl.border : "rgba(30,35,51,.09)"}`,
                    cursor: "pointer", textAlign: "left",
                    outline: isActive ? `2px solid ${lvl.ink}` : "none",
                    outlineOffset: 2,
                    transition: "background .2s, border-color .2s",
                  }}
                >
                  <div style={{ fontSize: 24 }}>{lvl.emoji}</div>
                  <div style={{ marginTop: 8, fontSize: "clamp(14px,2vw,16px)", fontWeight: 800, color: isActive ? lvl.ink : "#1e2333" }}>{lvl.label}</div>
                  <div style={{ marginTop: 4, fontSize: "clamp(11px,1.2vw,13px)", color: "#94a3b8", lineHeight: 1.5 }}>
                    {level === "easy" ? "y = kx" : level === "medium" ? "y = kx²" : "y = k/√(x+1)"}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Question display */}
          {activeLevel && q && (
            <div className="animate-rise" style={{
              marginTop: 20, padding: "clamp(14px,2vw,20px) clamp(16px,2vw,22px)",
              borderRadius: 14, background: q.tint, border: `1.5px solid ${q.border}`,
            }}>
              <p className="eyebrow" style={{ color: q.ink }}>Question — {q.label}</p>
              <p style={{ marginTop: 8, fontSize: "clamp(14px,2vw,16px)", fontWeight: 700, lineHeight: 1.7, color: "#1e2333" }}>{q.question}</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 18, padding: "clamp(18px,3vw,24px) clamp(20px,3vw,32px)",
          borderRadius: 20, background: "#fffaf3", border: "1.5px solid rgba(249,115,22,.15)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 14,
        }}>
          <p style={{ fontSize: "clamp(14px,2vw,17px)", fontWeight: 700 }}>Feeling confident? Test yourself next.</p>
          <Link href="/quiz" className="btn btn-green" style={{ padding: "12px 22px", fontSize: 15, textDecoration: "none" }}>
            Go to quiz →
          </Link>
        </div>

      </section>

      {/* Speech bubble stepper */}
      {activeLevel && q && (
        <div style={{
          position: "fixed", inset: "0 0 0 0", zIndex: 50,
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          padding: isMobile ? "0" : "0 24px 32px",
          pointerEvents: "none",
        }}>
          <div
            className="animate-slide-up"
            style={{
              pointerEvents: "all",
              position: "relative",
              width: "100%", maxWidth: isMobile ? "100%" : 700,
              background: "#fff",
              border: isMobile ? "none" : "1.5px solid rgba(30,35,51,.12)",
              borderTop: "1.5px solid rgba(30,35,51,.12)",
              borderRadius: isMobile ? "20px 20px 0 0" : 22,
              boxShadow: "0 -4px 24px rgba(30,35,51,.10), 0 -12px 40px rgba(30,35,51,.08)",
              padding: isMobile ? "20px 16px 32px" : "24px 26px 20px",
              maxHeight: isMobile ? "70vh" : "none",
              overflowY: "auto",
            }}
          >
            {/* Speech tail — desktop only */}
            {!isMobile && (
              <>
                <div style={{ position: "absolute", bottom: -12, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "13px solid transparent", borderRight: "13px solid transparent", borderTop: "13px solid #fff", filter: "drop-shadow(0 2px 2px rgba(30,35,51,.06))" }} />
                <div style={{ position: "absolute", bottom: -14, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "14px solid transparent", borderRight: "14px solid transparent", borderTop: "14px solid rgba(30,35,51,.12)", zIndex: -1 }} />
              </>
            )}

            {/* Drag handle on mobile */}
            {isMobile && (
              <div style={{ width: 40, height: 4, borderRadius: 999, background: "#e2e8f0", margin: "0 auto 16px" }} />
            )}

            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{
                width: isMobile ? 40 : 46, height: isMobile ? 40 : 46,
                borderRadius: 14, flexShrink: 0,
                background: q.tint, border: `1.5px solid ${q.border}`,
                display: "grid", placeItems: "center", fontSize: isMobile ? 20 : 22,
              }}>🧑‍🏫</div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
                  <p className="eyebrow" style={{ color: q.ink, fontSize: 10 }}>
                    {q.label} · step {stepIndex + 1} of {totalSteps}
                  </p>
                  <button onClick={closeBubble} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#94a3b8", padding: "4px 8px", borderRadius: 6 }}>
                    Close ×
                  </button>
                </div>

                <p key={`h-${stepIndex}`} className="animate-rise" style={{ marginTop: 6, fontSize: "clamp(14px,2vw,16px)", fontWeight: 800, color: "#1e2333" }}>
                  {q.steps[stepIndex].heading}
                </p>

                <p key={`b-${stepIndex}`} className="animate-rise" style={{ marginTop: 6, fontSize: "clamp(13px,1.5vw,15px)", fontWeight: 500, lineHeight: 1.8, color: "#374151", whiteSpace: "pre-line" }}>
                  {q.steps[stepIndex].body}
                </p>
              </div>
            </div>

            {/* Step dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
              {q.steps.map((_, i) => (
                <span key={i} style={{ height: 7, borderRadius: 999, width: i === stepIndex ? 22 : 7, background: i === stepIndex ? q.ink : "#e2e8f0", transition: "width .2s ease, background .2s ease" }} />
              ))}
            </div>

            {/* Controls */}
            <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              {/* Level switchers */}
              <div style={{ display: "flex", gap: 6 }}>
                {(["easy","medium","hard"] as Level[]).map(lv => (
                  <button key={lv} onClick={() => startLevel(lv)} style={{
                    padding: "6px 10px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                    cursor: "pointer", border: "1.5px solid rgba(30,35,51,.1)",
                    background: activeLevel === lv ? guidedQuestions[lv].tint : "#f8fafc",
                    color: activeLevel === lv ? guidedQuestions[lv].ink : "#94a3b8",
                    transition: "background .15s",
                  }}>{guidedQuestions[lv].label}</button>
                ))}
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn" onClick={() => setStepIndex(s => Math.max(0, s - 1))} disabled={stepIndex === 0} style={{ padding: "8px 14px", fontSize: 14, cursor: stepIndex === 0 ? "not-allowed" : "pointer" }}>← Back</button>
                <button className="btn" onClick={() => { if (stepIndex < totalSteps - 1) setStepIndex(s => s + 1); else closeBubble(); }} style={{ padding: "8px 16px", fontSize: 14, cursor: "pointer", background: q.ink, borderColor: q.border, color: "#fff" }}>
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
