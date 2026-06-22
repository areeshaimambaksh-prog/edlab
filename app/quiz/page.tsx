"use client";

import { useState } from "react";
import AIHelp from "@/components/AIHelp";
import NavBar from "@/components/NavBar";
import { useResponsive } from "@/components/useResponsive";

const questions = [
  { question: "y is directly proportional to x². When x = 3, y = 18. What is y when x = 5?", options: ["30", "50", "90", "18"], answer: "50", explanation: "y = kx². Sub x=3, y=18: 18 = 9k → k = 2. When x=5: y = 2×25 = 50." },
  { question: "y is inversely proportional to x. When x = 4, y = 12. Find y when x = 8.", options: ["24", "3", "6", "48"], answer: "6", explanation: "y = k/x → k = 48. When x=8: y = 48/8 = 6." },
  { question: "p ∝ √q. When q = 9, p = 6. Find p when q = 25.", options: ["8", "10", "12", "15"], answer: "10", explanation: "p = k√q. k=2. When q=25: p = 2×5 = 10." },
  { question: "y is inversely proportional to x². When x = 2, y = 9. Find y when x = 3.", options: ["4", "6", "2", "1"], answer: "4", explanation: "y = k/x². k=36. When x=3: y = 36/9 = 4." },
  { question: "m is directly proportional to (n+1)². When n=2, m=27. Find m when n=4.", options: ["48", "75", "108", "125"], answer: "75", explanation: "m = k(n+1)². k=3. When n=4: m = 3×25 = 75." },
  { question: "Speed s is increased by 20%. E ∝ s². By what factor does E increase?", options: ["1.2", "1.4", "1.44", "1.5"], answer: "1.44", explanation: "E = ks². New E = k(1.2s)² = 1.44ks². Factor = 1.44." },
  { question: "y is inversely proportional to √x. When x=16, y=3. Find y when x=4.", options: ["6", "1.5", "12", "9"], answer: "6", explanation: "y = k/√x. k=12. When x=4: y = 12/2 = 6." },
];

const confettiColors = ["#f76c5e","#f4b740","#2ec47a","#5a8ee8","#7c6ef0","#fb923c"];

export default function QuizPage() {
  const { isMobile } = useResponsive();
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; left: number; color: string; delay: number; dur: number }[]>([]);

  const answered = Object.keys(selected).length;
  const score = questions.reduce((t, q, i) => selected[i] === q.answer ? t + 1 : t, 0);

  const launch = () => {
    const p = Array.from({ length: 90 }, (_, id) => ({
      id, left: Math.random() * 100, color: confettiColors[id % confettiColors.length],
      delay: Math.random() * 0.6, dur: 1.8 + Math.random() * 1.4,
    }));
    setConfetti(p);
    setTimeout(() => setConfetti([]), 3600);
  };

  const handleSubmit = () => { setSubmitted(true); if (score === questions.length) launch(); };
  const handleReset = () => { setSelected({}); setSubmitted(false); setConfetti([]); };

  const resultMsg =
    score === questions.length ? "Perfect score! Exam-ready. 🎉" :
    score >= Math.ceil(questions.length * 0.6) ? "Good work! Review the ones you missed. 💪" :
    "Keep practising — try the Past Papers section. 📘";

  return (
    <main style={{ minHeight: "100vh", color: "#1e2333" }}>
      <NavBar />

      {confetti.map(p => (
        <span key={p.id} className="confetti-piece" style={{
          left: `${p.left}%`, backgroundColor: p.color,
          animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
        }} />
      ))}

      <section style={{ maxWidth: 760, margin: "0 auto", padding: `clamp(20px,4vw,36px) clamp(16px,4vw,24px) 120px` }}>

        <header className="card animate-rise" style={{ padding: "clamp(22px,4vw,36px) clamp(20px,4vw,40px)" }}>
          <p className="eyebrow" style={{ color: "#2ec47a" }}>Quiz</p>
          <h1 style={{ marginTop: 10, fontSize: "clamp(26px,5vw,38px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Check your understanding
          </h1>
          <p style={{ marginTop: 10, fontSize: "clamp(14px,2vw,16px)", color: "#64748b" }}>
            Exam-level questions. Tap "Your Tutor" if you need a hint.
          </p>

          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, fontWeight: 600, color: "#94a3b8" }}>
              <span>Progress</span>
              <span>{answered} / {questions.length} answered</span>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: "#f1f5f9", overflow: "hidden", border: "1px solid rgba(30,35,51,.07)" }}>
              <div style={{
                height: "100%", borderRadius: 999, background: "#2ec47a",
                width: `${Math.round(answered / questions.length * 100)}%`,
                transition: "width .5s ease",
              }} />
            </div>
          </div>
        </header>

        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 14 }}>
          {questions.map((q, index) => {
            const chosen = selected[index];
            const correct = chosen === q.answer;
            return (
              <div key={q.question} className="card animate-rise" style={{ padding: "clamp(18px,3vw,24px)", animationDelay: `${index * 50}ms` }}>
                <h2 style={{ fontSize: "clamp(14px,2vw,17px)", fontWeight: 700, lineHeight: 1.65 }}>
                  {index + 1}. {q.question}
                </h2>

                {/* On mobile: single column. On wider: two columns */}
                <div style={{
                  marginTop: 12,
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: 8,
                }}>
                  {q.options.map(opt => {
                    const sel = chosen === opt;
                    let bg = "#f8fafc", border = "rgba(30,35,51,.1)", color = "#374151";
                    if (sel && !submitted) { bg = "#fff8f3"; border = "rgba(249,115,22,.3)"; color = "#a85820"; }
                    if (submitted) {
                      if (opt === q.answer) { bg = "#e8f9f1"; border = "rgba(46,196,122,.35)"; color = "#196b44"; }
                      else if (sel) { bg = "#fff1ef"; border = "rgba(247,108,94,.3)"; color = "#a83228"; }
                      else { bg = "#f8fafc"; color = "#94a3b8"; border = "rgba(30,35,51,.07)"; }
                    }
                    return (
                      <button
                        key={opt}
                        disabled={submitted}
                        onClick={() => setSelected(prev => ({ ...prev, [index]: opt }))}
                        style={{
                          textAlign: "left", padding: "11px 14px",
                          borderRadius: 12, border: `1.5px solid ${border}`,
                          background: bg, color,
                          cursor: submitted ? "not-allowed" : "pointer",
                          fontFamily: "'Inter', system-ui", fontWeight: 600,
                          fontSize: "clamp(13px,1.5vw,14px)",
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          transition: "background .15s, border-color .15s",
                          minHeight: 44,
                        }}
                      >
                        <span>{opt}</span>
                        {sel && !submitted && <span style={{ fontSize: 12 }}>●</span>}
                        {submitted && opt === q.answer && <span>✓</span>}
                        {submitted && sel && !correct && <span>✕</span>}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="animate-rise" style={{
                    marginTop: 12, padding: "12px 14px", borderRadius: 12,
                    background: correct ? "#e8f9f1" : "#fff1ef",
                    border: `1.5px solid ${correct ? "rgba(46,196,122,.25)" : "rgba(247,108,94,.25)"}`,
                    fontSize: "clamp(13px,1.5vw,14px)", fontWeight: 600,
                    color: correct ? "#196b44" : "#a83228",
                  }}>
                    {correct ? "Correct!" : `Not quite. Answer: ${q.answer}`}
                    <p style={{ marginTop: 6, fontWeight: 500, color: "#64748b" }}>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!submitted && answered < questions.length && (
          <div style={{
            marginTop: 12, padding: "12px 16px", borderRadius: 12,
            background: "#fef6e3", border: "1.5px solid rgba(244,183,64,.25)",
            fontSize: 14, fontWeight: 600, color: "#8a5e00",
          }}>
            {questions.length - answered} question{questions.length - answered > 1 ? "s" : ""} still unanswered — you can submit anyway.
          </div>
        )}

        <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
          {!submitted ? (
            <button className="btn btn-green" onClick={handleSubmit} style={{ padding: "14px 28px", fontSize: 16, cursor: "pointer", width: isMobile ? "100%" : "auto" }}>
              Submit quiz
            </button>
          ) : (
            <button className="btn btn-blue" onClick={handleReset} style={{ padding: "14px 28px", fontSize: 16, cursor: "pointer", width: isMobile ? "100%" : "auto" }}>
              Try again
            </button>
          )}
        </div>

        {submitted && (
          <div className="card animate-slide-up" style={{ marginTop: 18, padding: "clamp(20px,4vw,28px) clamp(20px,4vw,32px)" }}>
            <p style={{ fontSize: "clamp(22px,4vw,28px)", fontWeight: 800 }}>Score: {score} / {questions.length}</p>
            <p style={{ marginTop: 8, fontSize: "clamp(14px,2vw,16px)", color: "#64748b" }}>{resultMsg}</p>
            {score < questions.length && (
              <a href="/pastpapers" style={{
                display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14,
                padding: "10px 20px", borderRadius: 12, fontSize: 14, fontWeight: 700,
                background: "#f0eefe", border: "1.5px solid rgba(124,110,240,.2)",
                color: "#4a3db8", textDecoration: "none", cursor: "pointer",
              }}>
                Practice more in Past Papers →
              </a>
            )}
          </div>
        )}

      </section>

      <AIHelp page="quiz" />
    </main>
  );
}