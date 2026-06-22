"use client";

import { useState } from "react";
import AIHelp from "@/components/AIHelp";
import NavBar from "@/components/NavBar";
import { useResponsive } from "@/components/useResponsive";

type Question = {
  id: number; marks: number; question: string;
  hints: string[]; answer: string; explanation: string[];
};

const questions: Question[] = [
  { id:1, marks:3, question:"y is directly proportional to the square of (x + 3). When x = 2, y = 5. Find y when x = 1.", hints:["Write the proportionality statement: y ∝ (x + 3)², so y = k(x + 3)² for some constant k.","Substitute x = 2, y = 5: 5 = k(5)² = 25k → k = 0.2.","Substitute x = 1: y = 0.2 × (4)² = 0.2 × 16.","Final step: y = 0.2 × 16 = 3.2. Answer: y = 3.2"], answer:"y = 3.2", explanation:["Since y ∝ (x + 3)², write y = k(x + 3)².","Substitute x = 2, y = 5: 5 = k(25) → k = 0.2.","Substitute x = 1: y = 0.2 × (4)² = 0.2 × 16 = 3.2."] },
  { id:2, marks:3, question:"y is directly proportional to the square root of (x − 3). When x = 28, y = 20. Find y when x = 39.", hints:["Write: y = k√(x − 3).","Substitute x = 28, y = 20: 20 = k√25 = 5k → k = 4.","Substitute x = 39: y = 4 × √36.","Final step: y = 4 × 6 = 24. Answer: y = 24"], answer:"y = 24", explanation:["y = k√(x − 3).","20 = k√25 = 5k → k = 4.","y = 4√36 = 24."] },
  { id:3, marks:3, question:"p is directly proportional to (q + 2)². When q = 1, p = 1. Find p when q = 10.", hints:["Write: p = k(q + 2)².","Substitute q = 1, p = 1: 1 = k(3)² = 9k → k = 1/9.","Substitute q = 10: p = (1/9)(12)².","Final step: 144/9 = 16. Answer: p = 16"], answer:"p = 16", explanation:["p = k(q+2)².","1 = 9k → k = 1/9.","p = (1/9)(144) = 16."] },
  { id:4, marks:3, question:"y is proportional to the square of (x − 7). When x = 12, y = 2. Find y when x = 17.", hints:["Write: y = k(x − 7)².","Substitute x = 12, y = 2: 2 = k(25) → k = 0.08.","Substitute x = 17: y = 0.08 × (10)².","Final step: y = 8. Answer: y = 8"], answer:"y = 8", explanation:["y = k(x−7)².","k = 0.08.","y = 0.08 × 100 = 8."] },
  { id:5, marks:3, question:"y is directly proportional to the cube root of (x + 3). When x = 5, y = 2/3. Find y when x = 24.", hints:["Write: y = k∛(x + 3).","Substitute x = 5, y = 2/3: 2/3 = k∛8 = 2k → k = 1/3.","Substitute x = 24: y = (1/3) × ∛27.","Final step: y = (1/3) × 3 = 1. Answer: y = 1"], answer:"y = 1", explanation:["y = k∛(x+3).","k = 1/3.","y = (1/3)×3 = 1."] },
  { id:6, marks:3, question:"y is inversely proportional to x². When x = 3, y = 2. Find y when x = 2.", hints:["Write: y = k/x².","Substitute x = 3, y = 2: 2 = k/9 → k = 18.","Substitute x = 2: y = 18/4.","Final step: y = 4.5. Answer: y = 4.5"], answer:"y = 4.5", explanation:["y = k/x².","k = 18.","y = 18/4 = 4.5."] },
  { id:7, marks:2, question:"x is inversely proportional to the square root of w. When w = 16, x = 3. Find x in terms of w.", hints:["Write: x = k/√w.","Substitute w = 16, x = 3: 3 = k/4 → k = 12.","Write the formula: x = 12/√w.","Final answer: x = 12/√w"], answer:"x = 12/√w", explanation:["x = k/√w.","k = 12.","x = 12/√w."] },
  { id:8, marks:2, question:"y varies inversely as √x. When x = 9, y = 2. Find y in terms of x.", hints:["Write: y = k/√x.","Substitute x = 9, y = 2: 2 = k/3 → k = 6.","Write the formula: y = 6/√x.","Final answer: y = 6/√x"], answer:"y = 6/√x", explanation:["y = k/√x.","k = 6.","y = 6/√x."] },
  { id:9, marks:3, question:"y ∝ 1/√x. When y = 8, x = 4. Find y when x = 49.", hints:["Write: y = k/√x.","Substitute x = 4, y = 8: 8 = k/2 → k = 16.","Substitute x = 49: y = 16/√49 = 16/7.","Final step: y = 16/7. Answer: y = 16/7"], answer:"y = 16/7", explanation:["y = k/√x.","k = 16.","y = 16/7."] },
  { id:10, marks:3, question:"m is inversely proportional to (t + 2)². m = 0.64 when t = 3. Find m when t = 8.", hints:["Write: m = k/(t + 2)².","Substitute t = 3, m = 0.64: 0.64 = k/25 → k = 16.","Substitute t = 8: m = 16/(10)².","Final step: m = 0.16. Answer: m = 0.16"], answer:"m = 0.16", explanation:["m = k/(t+2)².","k = 16.","m = 16/100 = 0.16."] },
  { id:11, marks:2, question:"y varies inversely as (x − 3)². When x = 1, y = 4. Find y in terms of x.", hints:["Write: y = k/(x − 3)².","Substitute x = 1, y = 4: 4 = k/4 → k = 16.","Write the formula: y = 16/(x − 3)².","Final answer: y = 16/(x − 3)²"], answer:"y = 16/(x − 3)²", explanation:["y = k/(x−3)².","k = 16.","y = 16/(x−3)²."] },
  { id:12, marks:3, question:"y is inversely proportional to the square root of (x + 4). When x = 5, y = 2. Find y when x = 77.", hints:["Write: y = k/√(x + 4).","Substitute x = 5, y = 2: 2 = k/3 → k = 6.","Substitute x = 77: y = 6/√81 = 6/9.","Final step: y = 2/3. Answer: y = 2/3"], answer:"y = 2/3", explanation:["y = k/√(x+4).","k = 6.","y = 6/9 = 2/3."] },
  { id:13, marks:3, question:"y is inversely proportional to the cube root of (x + 5). When x = 3, y = 12. Find y when x = 22.", hints:["Write: y = k/∛(x + 5).","Substitute x = 3, y = 12: 12 = k/2 → k = 24.","Substitute x = 22: y = 24/∛27 = 24/3.","Final step: y = 8. Answer: y = 8"], answer:"y = 8", explanation:["y = k/∛(x+5).","k = 24.","y = 24/3 = 8."] },
  { id:14, marks:3, question:"y is inversely proportional to the cube of (x − 1). y = 9.45 when x = 3. Find y when x = 4.", hints:["Write: y = k/(x − 1)³.","Substitute x = 3, y = 9.45: 9.45 = k/8 → k = 75.6.","Substitute x = 4: y = 75.6/27.","Final step: y = 2.8. Answer: y = 2.8"], answer:"y = 2.8", explanation:["y = k/(x−1)³.","k = 75.6.","y = 75.6/27 = 2.8."] },
  { id:15, marks:3, question:"y varies inversely as x. When x = 3, y = 16. Find x when y = 6.", hints:["Write: xy = k.","k = 3 × 16 = 48.","Substitute y = 6: x = 48/6.","Final step: x = 8. Answer: x = 8"], answer:"x = 8", explanation:["xy = k = 48.","When y=6: x = 8."] },
  { id:16, marks:2, question:"Force F (Newtons) between two magnets is inversely proportional to d² (cm). When d = 1.5, F = 48. Find F in terms of d.", hints:["Write: F = k/d².","Substitute d = 1.5, F = 48: 48 = k/2.25 → k = 108.","Write the formula: F = 108/d².","Final answer: F = 108/d²"], answer:"F = 108/d²", explanation:["F = k/d².","k = 108.","F = 108/d²."] },
  { id:17, marks:1, question:"F ∝ 1/d². When d is doubled, the new force is n times the original. Find n.", hints:["Write F = k/d². New d = 2d.","New F = k/(2d)² = k/4d².","New F = F/4.","So n = 1/4. Answer: n = 0.25"], answer:"n = 1/4 (or 0.25)", explanation:["F_new = k/(2d)² = k/(4d²) = F/4.","n = 1/4."] },
  { id:18, marks:3, question:"y is directly proportional to the cube root of (x + 1). When x = 7, y = 1. Find y when x = 124.", hints:["Write: y = k∛(x + 1).","Substitute x = 7, y = 1: 1 = k∛8 = 2k → k = 0.5.","Substitute x = 124: y = 0.5 × ∛125.","Final step: y = 0.5 × 5 = 2.5. Answer: y = 2.5"], answer:"y = 2.5", explanation:["y = k∛(x+1).","k = 0.5.","y = 0.5×5 = 2.5."] },
  { id:19, marks:1, question:"F ∝ 1/d². Explain what happens to F when d is halved.", hints:["Write F = k/d². New d = d/2.","New F = k/(d/2)² = k/(d²/4) = 4k/d².","F_new = 4F.","F is multiplied by 4 (increases 4 times)."], answer:"F is multiplied by 4", explanation:["F_new = k/(d/2)² = 4k/d² = 4F.","Halving d quadruples F."] },
  { id:20, marks:3, question:"y ∝ 1/√x. When x = 9, y = 2. Find y when x = 36.", hints:["Write: y = k/√x.","Substitute x = 9, y = 2: 2 = k/3 → k = 6.","Substitute x = 36: y = 6/6.","Final step: y = 1. Answer: y = 1"], answer:"y = 1", explanation:["y = k/√x.","k = 6.","y = 6/6 = 1."] },
  { id:21, marks:1, question:"y ∝ 1/√x. When x is multiplied by 4, y changes by factor p. Find p.", hints:["Write y = k/√x. New x = 4x.","New y = k/√(4x) = k/(2√x).","New y = y/2.","p = 1/2. Answer: p = 0.5"], answer:"p = 1/2 (or 0.5)", explanation:["y_new = k/√(4x) = y/2.","p = 0.5."] },
  { id:22, marks:3, question:"y ∝ 1/√x and v ∝ y². When x = 9, y = 2, v = 12. Find v in terms of x.", hints:["y = k₁/√x → sub x=9, y=2: k₁ = 6 → y = 6/√x.","v = k₂y² → sub y=2, v=12: k₂ = 3 → v = 3y².","Combine: v = 3(6/√x)² = 3×36/x = 108/x.","Final answer: v = 108/x"], answer:"v = 108/x", explanation:["y = 6/√x.","v = 3y².","v = 108/x."] },
  { id:23, marks:3, question:"w ∝ √y and y ∝ 1/x. When x = 4, y = 16, w = 8. Find w in terms of x.", hints:["y = k₁/x → sub x=4, y=16: k₁ = 64 → y = 64/x.","w = k₂√y → sub y=16, w=8: k₂ = 2 → w = 2√y.","Combine: w = 2√(64/x) = 16/√x.","Final answer: w = 16/√x"], answer:"w = 16/√x", explanation:["y = 64/x.","w = 2√y.","w = 16/√x."] },
  { id:24, marks:2, question:"y ∝ 1/√x and x ∝ w². When w = 12, y = 12. Find y in terms of w.", hints:["y = k₁/√x and x = k₂w², so √x = w√k₂.","y = k₁/(w√k₂) = A/w.","Sub w = 12, y = 12: A = 144.","Final answer: y = 144/w"], answer:"y = 144/w", explanation:["y = A/w.","A = 144.","y = 144/w."] },
  { id:25, marks:2, question:"E ∝ s² (energy proportional to speed squared). Speed is increased by 30%. Find the % increase in energy.", hints:["Write E = ks². New speed = 1.3s.","New E = k(1.3s)² = 1.69ks².","New E = 1.69E.","% increase = 69%. Answer: 69%"], answer:"69%", explanation:["E_new = k(1.3s)² = 1.69E.","Increase = 69%."] },
];

type QState = { hintsShown: number; showAnswer: boolean };

export default function PastPapersPage() {
  const { isMobile } = useResponsive();
  const [states, setStates] = useState<Record<number, QState>>({});

  const getState = (id: number): QState => states[id] ?? { hintsShown: 0, showAnswer: false };
  const showNextHint = (id: number) => {
    const s = getState(id);
    if (s.hintsShown < 4) setStates(prev => ({ ...prev, [id]: { ...getState(id), hintsShown: s.hintsShown + 1 } }));
  };
  const toggleAnswer = (id: number) => setStates(prev => ({ ...prev, [id]: { ...getState(id), showAnswer: !getState(id).showAnswer } }));
  const reset = (id: number) => setStates(prev => ({ ...prev, [id]: { hintsShown: 0, showAnswer: false } }));

  return (
    <main style={{ minHeight: "100vh", color: "#1e2333" }}>
      <NavBar />

      <section style={{ maxWidth: 820, margin: "0 auto", padding: `clamp(20px,4vw,36px) clamp(16px,4vw,24px) 120px` }}>

        <header className="card animate-rise" style={{ padding: "clamp(24px,4vw,40px) clamp(20px,4vw,44px)" }}>
          <p className="eyebrow" style={{ color: "#7c6ef0" }}>Past Paper Practice</p>
          <h1 style={{ marginTop: 12, fontSize: "clamp(26px,5vw,42px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Exam-Style Questions
          </h1>
          <p style={{ marginTop: 12, fontSize: "clamp(14px,2vw,17px)", color: "#64748b", maxWidth: 560, lineHeight: 1.75 }}>
            Real past paper questions. Use hints to get nudged step by step — hint 4 reveals the full working.
          </p>
          <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 8 }}>
            <div style={{ padding: "7px 14px", borderRadius: 10, background: "#f0eefe", border: "1.5px solid rgba(124,110,240,.2)", fontSize: 13, fontWeight: 700, color: "#4a3db8" }}>{questions.length} questions</div>
            <div style={{ padding: "7px 14px", borderRadius: 10, background: "#e8f9f1", border: "1.5px solid rgba(46,196,122,.2)", fontSize: 13, fontWeight: 700, color: "#196b44" }}>4 hints each</div>
            <div style={{ padding: "7px 14px", borderRadius: 10, background: "#fff1ef", border: "1.5px solid rgba(247,108,94,.2)", fontSize: 13, fontWeight: 700, color: "#a83228" }}>Worked solutions</div>
          </div>
        </header>

        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          {questions.map((q, index) => {
            const s = getState(q.id);
            const hintsLeft = 4 - s.hintsShown;
            return (
              <div key={q.id} className="card animate-rise" style={{ padding: "clamp(18px,3vw,28px) clamp(18px,3vw,32px)", animationDelay: `${Math.min(index * 30, 300)}ms` }}>

                {/* Question header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 30, height: 30, borderRadius: 9, background: "#f0eefe", border: "1.5px solid rgba(124,110,240,.2)", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 800, color: "#4a3db8", flexShrink: 0 }}>{index + 1}</span>
                    <span style={{ padding: "3px 8px", borderRadius: 7, background: "#e8f9f1", border: "1.5px solid rgba(46,196,122,.2)", fontSize: 12, fontWeight: 700, color: "#196b44" }}>{q.marks}m</span>
                  </div>
                  <button onClick={() => reset(q.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#94a3b8", padding: "4px 8px", borderRadius: 6 }}>Reset</button>
                </div>

                {/* Question text */}
                <p style={{ marginTop: 14, fontSize: "clamp(14px,1.8vw,17px)", fontWeight: 600, lineHeight: 1.75, color: "#1e2333" }}>{q.question}</p>

                {/* Hints */}
                {s.hintsShown > 0 && (
                  <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                    {q.hints.slice(0, s.hintsShown).map((hint, hi) => (
                      <div key={hi} className="animate-rise" style={{
                        padding: "10px 14px", borderRadius: 12,
                        background: hi === 3 ? "#fef6e3" : "#f8fafc",
                        border: `1.5px solid ${hi === 3 ? "rgba(244,183,64,.25)" : "rgba(30,35,51,.07)"}`,
                        display: "flex", gap: 8, alignItems: "flex-start",
                      }}>
                        <span style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, background: hi === 3 ? "#fef6e3" : "#f0eefe", border: `1.5px solid ${hi === 3 ? "rgba(244,183,64,.3)" : "rgba(124,110,240,.2)"}`, display: "grid", placeItems: "center", fontSize: 10, fontWeight: 800, color: hi === 3 ? "#8a5e00" : "#4a3db8" }}>{hi + 1}</span>
                        <p style={{ fontSize: "clamp(12px,1.5vw,14px)", fontWeight: 500, color: hi === 3 ? "#8a5e00" : "#374151", lineHeight: 1.65, margin: 0 }}>
                          {hi === 3 ? "🔑 " : ""}{hint}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Answer panel */}
                {s.showAnswer && (
                  <div className="animate-rise" style={{ marginTop: 14, padding: "16px 18px", borderRadius: 14, background: "#e8f9f1", border: "1.5px solid rgba(46,196,122,.25)" }}>
                    <p className="eyebrow" style={{ color: "#196b44" }}>Answer</p>
                    <p style={{ marginTop: 6, fontSize: "clamp(16px,2vw,20px)", fontWeight: 800, color: "#196b44" }}>{q.answer}</p>
                    <p className="eyebrow" style={{ color: "#64748b", marginTop: 12 }}>Full working</p>
                    <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                      {q.explanation.map((line, li) => (
                        <div key={li} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                          <span style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, background: "#fff", border: "1.5px solid rgba(46,196,122,.3)", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 800, color: "#196b44" }}>{li + 1}</span>
                          <p style={{ fontSize: "clamp(12px,1.5vw,14px)", fontWeight: 500, color: "#374151", lineHeight: 1.65, margin: 0 }}>{line}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Buttons — stack on mobile */}
                <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {!s.showAnswer && s.hintsShown < 4 && (
                    <button className="btn" onClick={() => showNextHint(q.id)} style={{
                      padding: "10px 16px", fontSize: "clamp(12px,1.5vw,14px)", cursor: "pointer",
                      background: "#f0eefe", borderColor: "rgba(124,110,240,.25)", color: "#4a3db8",
                      flex: isMobile ? "1" : "none", minWidth: isMobile ? 0 : "auto",
                    }}>
                      💡 {s.hintsShown === 0 ? "Get a hint" : s.hintsShown === 3 ? "Final step" : `Hint ${s.hintsShown + 1}/4`}
                      <span style={{ marginLeft: 4, opacity: 0.5, fontSize: 11 }}>({hintsLeft})</span>
                    </button>
                  )}
                  <button className="btn" onClick={() => toggleAnswer(q.id)} style={{
                    padding: "10px 16px", fontSize: "clamp(12px,1.5vw,14px)", cursor: "pointer",
                    background: s.showAnswer ? "#fff1ef" : "#e8f9f1",
                    borderColor: s.showAnswer ? "rgba(247,108,94,.25)" : "rgba(46,196,122,.25)",
                    color: s.showAnswer ? "#a83228" : "#196b44",
                    flex: isMobile ? "1" : "none",
                  }}>
                    {s.showAnswer ? "Hide answer" : "Show answer"}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </section>

      <AIHelp page="home" />
    </main>
  );
}
