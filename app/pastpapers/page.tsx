"use client";

import { useState } from "react";
import AIHelp from "@/components/AIHelp";
import NavBar from "@/components/NavBar";

type Question = {
  id: number;
  marks: number;
  question: string;
  hints: string[];
  answer: string;
  explanation: string[];
};

const questions: Question[] = [
  {
    id: 1,
    marks: 3,
    question: "y is directly proportional to the square of (x + 3). When x = 2, y = 5. Find y when x = 1.",
    hints: [
      "Write the proportionality statement: y ∝ (x + 3)², so y = k(x + 3)² for some constant k.",
      "Substitute the known values x = 2, y = 5 to find k: 5 = k(2 + 3)² = k × 25, so k = 5/25 = 0.2.",
      "Now substitute x = 1 into your formula: y = 0.2 × (1 + 3)² = 0.2 × 16.",
      "Final step: y = 0.2 × 16 = 3.2. Answer: y = 3.2",
    ],
    answer: "y = 3.2",
    explanation: [
      "Since y ∝ (x + 3)², write y = k(x + 3)².",
      "Substitute x = 2, y = 5: 5 = k(5)² → 5 = 25k → k = 0.2.",
      "Substitute x = 1: y = 0.2 × (4)² = 0.2 × 16 = 3.2.",
    ],
  },
  {
    id: 2,
    marks: 3,
    question: "y is directly proportional to the square root of (x − 3). When x = 28, y = 20. Find y when x = 39.",
    hints: [
      "Write the proportionality statement: y ∝ √(x − 3), so y = k√(x − 3).",
      "Substitute x = 28, y = 20: 20 = k√(28 − 3) = k√25 = 5k, so k = 4.",
      "Now substitute x = 39: y = 4 × √(39 − 3) = 4 × √36.",
      "Final step: √36 = 6, so y = 4 × 6 = 24. Answer: y = 24",
    ],
    answer: "y = 24",
    explanation: [
      "Since y ∝ √(x − 3), write y = k√(x − 3).",
      "Substitute x = 28, y = 20: 20 = k√25 = 5k → k = 4.",
      "Substitute x = 39: y = 4√(39 − 3) = 4√36 = 4 × 6 = 24.",
    ],
  },
  {
    id: 3,
    marks: 3,
    question: "p is directly proportional to (q + 2)². When q = 1, p = 1. Find p when q = 10.",
    hints: [
      "Write: p = k(q + 2)².",
      "Substitute q = 1, p = 1: 1 = k(3)² = 9k, so k = 1/9.",
      "Substitute q = 10: p = (1/9) × (12)² = (1/9) × 144.",
      "Final step: p = 144/9 = 16. Answer: p = 16",
    ],
    answer: "p = 16",
    explanation: [
      "Since p ∝ (q + 2)², write p = k(q + 2)².",
      "Substitute q = 1, p = 1: 1 = k(3)² → 9k = 1 → k = 1/9.",
      "Substitute q = 10: p = (1/9)(12)² = 144/9 = 16.",
    ],
  },
  {
    id: 4,
    marks: 3,
    question: "y is proportional to the square of (x − 7). When x = 12, y = 2. Find y when x = 17.",
    hints: [
      "Write: y = k(x − 7)².",
      "Substitute x = 12, y = 2: 2 = k(5)² = 25k, so k = 2/25 = 0.08.",
      "Substitute x = 17: y = 0.08 × (10)² = 0.08 × 100.",
      "Final step: y = 8. Answer: y = 8",
    ],
    answer: "y = 8",
    explanation: [
      "Since y ∝ (x − 7)², write y = k(x − 7)².",
      "Substitute x = 12, y = 2: 2 = k(25) → k = 0.08.",
      "Substitute x = 17: y = 0.08 × (10)² = 0.08 × 100 = 8.",
    ],
  },
  {
    id: 5,
    marks: 3,
    question: "y is directly proportional to the cube root of (x + 3). When x = 5, y = 2/3. Find y when x = 24.",
    hints: [
      "Write: y = k∛(x + 3).",
      "Substitute x = 5, y = 2/3: 2/3 = k∛(8) = k × 2, so k = 1/3.",
      "Substitute x = 24: y = (1/3) × ∛(27) = (1/3) × 3.",
      "Final step: y = 1. Answer: y = 1",
    ],
    answer: "y = 1",
    explanation: [
      "Since y ∝ ∛(x + 3), write y = k∛(x + 3).",
      "Substitute x = 5, y = 2/3: 2/3 = k∛8 = 2k → k = 1/3.",
      "Substitute x = 24: y = (1/3) × ∛27 = (1/3) × 3 = 1.",
    ],
  },
  {
    id: 6,
    marks: 3,
    question: "y is inversely proportional to x². When x = 3, y = 2. Find y when x = 2.",
    hints: [
      "Write the inverse proportionality: y ∝ 1/x², so y = k/x².",
      "Substitute x = 3, y = 2: 2 = k/9, so k = 18.",
      "Substitute x = 2: y = 18/(2²) = 18/4.",
      "Final step: y = 4.5. Answer: y = 4.5",
    ],
    answer: "y = 4.5",
    explanation: [
      "Since y ∝ 1/x², write y = k/x².",
      "Substitute x = 3, y = 2: 2 = k/9 → k = 18.",
      "Substitute x = 2: y = 18/4 = 4.5.",
    ],
  },
  {
    id: 7,
    marks: 2,
    question: "x is inversely proportional to the square root of w. When w = 16, x = 3. Find x in terms of w.",
    hints: [
      "Write: x = k/√w.",
      "Substitute w = 16, x = 3: 3 = k/√16 = k/4, so k = 12.",
      "Write the full formula: x = 12/√w.",
      "Final answer: x = 12/√w",
    ],
    answer: "x = 12/√w",
    explanation: [
      "Since x ∝ 1/√w, write x = k/√w.",
      "Substitute w = 16, x = 3: 3 = k/4 → k = 12.",
      "So x = 12/√w.",
    ],
  },
  {
    id: 8,
    marks: 2,
    question: "y varies inversely as √x. When x = 9, y = 2. Find y in terms of x.",
    hints: [
      "Write: y = k/√x.",
      "Substitute x = 9, y = 2: 2 = k/3, so k = 6.",
      "Write the full formula: y = 6/√x.",
      "Final answer: y = 6/√x",
    ],
    answer: "y = 6/√x",
    explanation: [
      "Since y ∝ 1/√x, write y = k/√x.",
      "Substitute x = 9, y = 2: 2 = k/3 → k = 6.",
      "So y = 6/√x.",
    ],
  },
  {
    id: 9,
    marks: 3,
    question: "y ∝ 1/√x. When y = 8, x = 4. Find y when x = 49.",
    hints: [
      "Write: y = k/√x.",
      "Substitute x = 4, y = 8: 8 = k/2, so k = 16.",
      "Substitute x = 49: y = 16/√49 = 16/7.",
      "Final step: y = 16/7 ≈ 2.29. Answer: y = 16/7",
    ],
    answer: "y = 16/7",
    explanation: [
      "Since y ∝ 1/√x, write y = k/√x.",
      "Substitute x = 4, y = 8: 8 = k/2 → k = 16.",
      "Substitute x = 49: y = 16/√49 = 16/7.",
    ],
  },
  {
    id: 10,
    marks: 3,
    question: "m is inversely proportional to (t + 2)². m = 0.64 when t = 3. Find m when t = 8.",
    hints: [
      "Write: m = k/(t + 2)².",
      "Substitute t = 3, m = 0.64: 0.64 = k/(5)² = k/25, so k = 16.",
      "Substitute t = 8: m = 16/(10)² = 16/100.",
      "Final step: m = 0.16. Answer: m = 0.16",
    ],
    answer: "m = 0.16",
    explanation: [
      "Since m ∝ 1/(t + 2)², write m = k/(t + 2)².",
      "Substitute t = 3, m = 0.64: 0.64 = k/25 → k = 16.",
      "Substitute t = 8: m = 16/100 = 0.16.",
    ],
  },
  {
    id: 11,
    marks: 2,
    question: "y varies inversely as (x − 3)². When x = 1, y = 4. Find y in terms of x.",
    hints: [
      "Write: y = k/(x − 3)².",
      "Substitute x = 1, y = 4: 4 = k/(−2)² = k/4, so k = 16.",
      "Write the full formula: y = 16/(x − 3)².",
      "Final answer: y = 16/(x − 3)²",
    ],
    answer: "y = 16/(x − 3)²",
    explanation: [
      "Since y ∝ 1/(x − 3)², write y = k/(x − 3)².",
      "Substitute x = 1, y = 4: 4 = k/(−2)² = k/4 → k = 16.",
      "So y = 16/(x − 3)².",
    ],
  },
  {
    id: 12,
    marks: 3,
    question: "y is inversely proportional to the square root of (x + 4). When x = 5, y = 2. Find y when x = 77.",
    hints: [
      "Write: y = k/√(x + 4).",
      "Substitute x = 5, y = 2: 2 = k/√9 = k/3, so k = 6.",
      "Substitute x = 77: y = 6/√(81) = 6/9.",
      "Final step: y = 2/3. Answer: y = 2/3",
    ],
    answer: "y = 2/3",
    explanation: [
      "Since y ∝ 1/√(x + 4), write y = k/√(x + 4).",
      "Substitute x = 5, y = 2: 2 = k/3 → k = 6.",
      "Substitute x = 77: y = 6/√81 = 6/9 = 2/3.",
    ],
  },
  {
    id: 13,
    marks: 3,
    question: "y is inversely proportional to the cube root of (x + 5). When x = 3, y = 12. Find y when x = 22.",
    hints: [
      "Write: y = k/∛(x + 5).",
      "Substitute x = 3, y = 12: 12 = k/∛8 = k/2, so k = 24.",
      "Substitute x = 22: y = 24/∛(27) = 24/3.",
      "Final step: y = 8. Answer: y = 8",
    ],
    answer: "y = 8",
    explanation: [
      "Since y ∝ 1/∛(x + 5), write y = k/∛(x + 5).",
      "Substitute x = 3, y = 12: 12 = k/2 → k = 24.",
      "Substitute x = 22: y = 24/∛27 = 24/3 = 8.",
    ],
  },
  {
    id: 14,
    marks: 3,
    question: "y is inversely proportional to the cube of (x − 1). y = 9.45 when x = 3. Find y when x = 4.",
    hints: [
      "Write: y = k/(x − 1)³.",
      "Substitute x = 3, y = 9.45: 9.45 = k/(2)³ = k/8, so k = 75.6.",
      "Substitute x = 4: y = 75.6/(3)³ = 75.6/27.",
      "Final step: y = 2.8. Answer: y = 2.8",
    ],
    answer: "y = 2.8",
    explanation: [
      "Since y ∝ 1/(x − 1)³, write y = k/(x − 1)³.",
      "Substitute x = 3, y = 9.45: 9.45 = k/8 → k = 75.6.",
      "Substitute x = 4: y = 75.6/27 = 2.8.",
    ],
  },
  {
    id: 15,
    marks: 3,
    question: "y varies inversely as x. When x = 3, y = 16. Find x when y = 6.",
    hints: [
      "Write: y = k/x, so xy = k (constant).",
      "Find k: k = 3 × 16 = 48.",
      "Substitute y = 6: 6 = 48/x, so x = 48/6.",
      "Final step: x = 8. Answer: x = 8",
    ],
    answer: "x = 8",
    explanation: [
      "Since y ∝ 1/x, write y = k/x, meaning xy = k.",
      "k = 3 × 16 = 48.",
      "When y = 6: x = 48/6 = 8.",
    ],
  },
  {
    id: 16,
    marks: 2,
    question: "The force F (Newtons) between two magnets is inversely proportional to the square of the distance d (cm). When d = 1.5, F = 48. (a) Find an expression for F in terms of d.",
    hints: [
      "Write: F = k/d².",
      "Substitute d = 1.5, F = 48: 48 = k/(1.5)² = k/2.25, so k = 108.",
      "Write the formula: F = 108/d².",
      "Final answer: F = 108/d²",
    ],
    answer: "F = 108/d²",
    explanation: [
      "Since F ∝ 1/d², write F = k/d².",
      "Substitute d = 1.5, F = 48: 48 = k/2.25 → k = 108.",
      "So F = 108/d².",
    ],
  },
  {
    id: 17,
    marks: 1,
    question: "F is inversely proportional to d². When the distance d is doubled, the new force is n times the original force. Find n.",
    hints: [
      "Write F = k/d². If d is doubled, the new distance is 2d.",
      "New force: F_new = k/(2d)² = k/(4d²).",
      "Compare: F_new = (1/4) × (k/d²) = F/4.",
      "So n = 1/4. Answer: n = 0.25",
    ],
    answer: "n = 1/4 (or 0.25)",
    explanation: [
      "Original: F = k/d². New: F_new = k/(2d)² = k/4d².",
      "F_new = F/4, so the force is a quarter of the original.",
      "n = 1/4 = 0.25.",
    ],
  },
  {
    id: 18,
    marks: 3,
    question: "y is directly proportional to the cube root of (x + 1). When x = 7, y = 1. Find y when x = 124.",
    hints: [
      "Write: y = k∛(x + 1).",
      "Substitute x = 7, y = 1: 1 = k∛8 = 2k, so k = 0.5.",
      "Substitute x = 124: y = 0.5 × ∛(125) = 0.5 × 5.",
      "Final step: y = 2.5. Answer: y = 2.5",
    ],
    answer: "y = 2.5",
    explanation: [
      "Since y ∝ ∛(x + 1), write y = k∛(x + 1).",
      "Substitute x = 7, y = 1: 1 = k∛8 = 2k → k = 0.5.",
      "Substitute x = 124: y = 0.5 × ∛125 = 0.5 × 5 = 2.5.",
    ],
  },
  {
    id: 19,
    marks: 1,
    question: "F is inversely proportional to the square of d. Explain what happens to F when d is halved.",
    hints: [
      "Write F = k/d². If d is halved, the new distance is d/2.",
      "New force: F_new = k/(d/2)² = k/(d²/4) = 4k/d².",
      "Compare: F_new = 4 × (k/d²) = 4F.",
      "Final answer: F increases by a factor of 4 (F is multiplied by 4).",
    ],
    answer: "F is multiplied by 4 (F increases 4 times)",
    explanation: [
      "Original F = k/d². New d = d/2.",
      "F_new = k/(d/2)² = k/(d²/4) = 4k/d² = 4F.",
      "Halving the distance quadruples the force.",
    ],
  },
  {
    id: 20,
    marks: 3,
    question: "y ∝ 1/√x. When x = 9, y = 2. (a) Find y when x = 36.",
    hints: [
      "Write: y = k/√x.",
      "Substitute x = 9, y = 2: 2 = k/3, so k = 6.",
      "Substitute x = 36: y = 6/√36 = 6/6.",
      "Final step: y = 1. Answer: y = 1",
    ],
    answer: "y = 1",
    explanation: [
      "Since y ∝ 1/√x, write y = k/√x.",
      "Substitute x = 9, y = 2: 2 = k/3 → k = 6.",
      "Substitute x = 36: y = 6/6 = 1.",
    ],
  },
  {
    id: 21,
    marks: 1,
    question: "y ∝ 1/√x. When x is increased by a factor of 4, the value of y changes by a factor of p. Find p.",
    hints: [
      "Write y = k/√x. New x is 4x.",
      "New y: y_new = k/√(4x) = k/(2√x).",
      "Compare: y_new = (1/2) × (k/√x) = y/2.",
      "So y is halved: p = 1/2. Answer: p = 0.5",
    ],
    answer: "p = 1/2 (or 0.5)",
    explanation: [
      "Original y = k/√x. New y = k/√(4x) = k/(2√x) = y/2.",
      "Multiplying x by 4 divides y by 2.",
      "p = 1/2.",
    ],
  },
  {
    id: 22,
    marks: 3,
    question: "y is inversely proportional to √x and v is directly proportional to y². When x = 9, y = 2 and v = 12. Find v in terms of x.",
    hints: [
      "First: y = k₁/√x. Sub x = 9, y = 2: 2 = k₁/3 → k₁ = 6. So y = 6/√x.",
      "Second: v = k₂y². Sub y = 2, v = 12: 12 = 4k₂ → k₂ = 3. So v = 3y².",
      "Combine: v = 3 × (6/√x)² = 3 × 36/x = 108/x.",
      "Final answer: v = 108/x",
    ],
    answer: "v = 108/x",
    explanation: [
      "y = k₁/√x → sub x=9, y=2: k₁ = 6 → y = 6/√x.",
      "v = k₂y² → sub y=2, v=12: k₂ = 3 → v = 3y².",
      "v = 3 × (6/√x)² = 3 × 36/x = 108/x.",
    ],
  },
  {
    id: 23,
    marks: 3,
    question: "w is proportional to the square root of y. y is inversely proportional to x. When x = 4, y = 16 and w = 8. Find w in terms of x.",
    hints: [
      "First: y = k₁/x. Sub x = 4, y = 16: k₁ = 64. So y = 64/x.",
      "Second: w = k₂√y. Sub y = 16, w = 8: 8 = 4k₂ → k₂ = 2. So w = 2√y.",
      "Combine: w = 2√(64/x) = 2 × 8/√x = 16/√x.",
      "Final answer: w = 16/√x",
    ],
    answer: "w = 16/√x",
    explanation: [
      "y = k₁/x → sub x=4, y=16: k₁ = 64 → y = 64/x.",
      "w = k₂√y → sub y=16, w=8: k₂ = 2 → w = 2√y.",
      "w = 2√(64/x) = 2 × 8/√x = 16/√x.",
    ],
  },
  {
    id: 24,
    marks: 2,
    question: "y is inversely proportional to √x and x is directly proportional to w². When w = 12, y = 12. Find y in terms of w.",
    hints: [
      "Write: y = k₁/√x and x = k₂w².",
      "Sub into y: y = k₁/√(k₂w²) = k₁/(w√k₂) = A/w where A = k₁/√k₂.",
      "Sub w = 12, y = 12: 12 = A/12, so A = 144.",
      "Final answer: y = 144/w",
    ],
    answer: "y = 144/w",
    explanation: [
      "y = k₁/√x and x = k₂w², so √x = w√k₂.",
      "y = k₁/(w√k₂) = A/w.",
      "Sub w = 12, y = 12: A = 144 → y = 144/w.",
    ],
  },
  {
    id: 25,
    marks: 2,
    question: "The energy E of a moving object is directly proportional to the square of its speed s. The speed is increased by 30%. Calculate the percentage increase in energy.",
    hints: [
      "Write: E = ks². New speed = 1.3s (30% increase).",
      "New energy: E_new = k(1.3s)² = k × 1.69s².",
      "Compare: E_new = 1.69 × ks² = 1.69E.",
      "Percentage increase = (1.69 − 1) × 100 = 69%. Answer: 69%",
    ],
    answer: "69%",
    explanation: [
      "E ∝ s², so E = ks². New speed = 1.3s.",
      "E_new = k(1.3s)² = 1.69ks² = 1.69E.",
      "Increase = 69%.",
    ],
  },
];

type QuestionState = {
  hintsShown: number;
  showAnswer: boolean;
};

export default function PastPapersPage() {
  const [states, setStates] = useState<Record<number, QuestionState>>({});

  const getState = (id: number): QuestionState =>
    states[id] ?? { hintsShown: 0, showAnswer: false };

  const showNextHint = (id: number) => {
    const s = getState(id);
    if (s.hintsShown < 4) {
      setStates(prev => ({ ...prev, [id]: { ...getState(id), hintsShown: s.hintsShown + 1 } }));
    }
  };

  const toggleAnswer = (id: number) => {
    setStates(prev => ({
      ...prev,
      [id]: { ...getState(id), showAnswer: !getState(id).showAnswer },
    }));
  };

  const reset = (id: number) => {
    setStates(prev => ({ ...prev, [id]: { hintsShown: 0, showAnswer: false } }));
  };

  return (
    <main style={{ minHeight: "100vh", color: "#1e2333" }}>
      <NavBar />

      <section style={{ maxWidth: 820, margin: "0 auto", padding: "36px 24px 120px" }}>

        {/* Header */}
        <header className="card animate-rise" style={{ padding: "40px 44px" }}>
          <p className="eyebrow" style={{ color: "#7c6ef0" }}>Past Paper Practice</p>
          <h1 style={{ marginTop: 12, fontSize: 42, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Exam-Style Questions
          </h1>
          <p style={{ marginTop: 14, fontSize: 17, color: "#64748b", maxWidth: 560, lineHeight: 1.75 }}>
            Real past paper questions on direct and inverse proportion. Use the
            hint button to get nudged step by step — the 4th hint reveals the
            full working. Tap "Show answer" when you're ready to check.
          </p>

          <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 10 }}>
            <div style={{ padding: "8px 16px", borderRadius: 12, background: "#f0eefe", border: "1.5px solid rgba(124,110,240,.2)", fontSize: 14, fontWeight: 700, color: "#4a3db8" }}>
              {questions.length} questions
            </div>
            <div style={{ padding: "8px 16px", borderRadius: 12, background: "#e8f9f1", border: "1.5px solid rgba(46,196,122,.2)", fontSize: 14, fontWeight: 700, color: "#196b44" }}>
              4 hints per question
            </div>
            <div style={{ padding: "8px 16px", borderRadius: 12, background: "#fff1ef", border: "1.5px solid rgba(247,108,94,.2)", fontSize: 14, fontWeight: 700, color: "#a83228" }}>
              Worked explanations
            </div>
          </div>
        </header>

        {/* Questions */}
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 20 }}>
          {questions.map((q, index) => {
            const s = getState(q.id);
            const hintsLeft = 4 - s.hintsShown;

            return (
              <div
                key={q.id}
                className="card animate-rise"
                style={{ padding: "28px 32px", animationDelay: `${Math.min(index * 30, 300)}ms` }}
              >
                {/* Question header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{
                      width: 32, height: 32, borderRadius: 10,
                      background: "#f0eefe", border: "1.5px solid rgba(124,110,240,.2)",
                      display: "grid", placeItems: "center",
                      fontSize: 13, fontWeight: 800, color: "#4a3db8", flexShrink: 0,
                    }}>{index + 1}</span>
                    <span style={{
                      padding: "4px 10px", borderRadius: 8,
                      background: "#e8f9f1", border: "1.5px solid rgba(46,196,122,.2)",
                      fontSize: 12, fontWeight: 700, color: "#196b44",
                    }}>{q.marks} mark{q.marks > 1 ? "s" : ""}</span>
                  </div>

                  <button
                    onClick={() => reset(q.id)}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      fontSize: 12, fontWeight: 600, color: "#94a3b8",
                      padding: "4px 8px", borderRadius: 6,
                      transition: "color .15s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#64748b")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
                  >
                    Reset
                  </button>
                </div>

                {/* Question text */}
                <p style={{ marginTop: 16, fontSize: 17, fontWeight: 600, lineHeight: 1.75, color: "#1e2333" }}>
                  {q.question}
                </p>

                {/* Hints */}
                {s.hintsShown > 0 && (
                  <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                    {q.hints.slice(0, s.hintsShown).map((hint, hi) => (
                      <div
                        key={hi}
                        className="animate-rise"
                        style={{
                          padding: "12px 16px", borderRadius: 12,
                          background: hi === 3 ? "#fef6e3" : "#f8fafc",
                          border: `1.5px solid ${hi === 3 ? "rgba(244,183,64,.25)" : "rgba(30,35,51,.07)"}`,
                          display: "flex", gap: 10, alignItems: "flex-start",
                        }}
                      >
                        <span style={{
                          width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                          background: hi === 3 ? "#fef6e3" : "#f0eefe",
                          border: `1.5px solid ${hi === 3 ? "rgba(244,183,64,.3)" : "rgba(124,110,240,.2)"}`,
                          display: "grid", placeItems: "center",
                          fontSize: 11, fontWeight: 800,
                          color: hi === 3 ? "#8a5e00" : "#4a3db8",
                        }}>{hi + 1}</span>
                        <p style={{ fontSize: 14, fontWeight: 500, color: hi === 3 ? "#8a5e00" : "#374151", lineHeight: 1.65, margin: 0 }}>
                          {hi === 3 ? "🔑 " : ""}{hint}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Show answer panel */}
                {s.showAnswer && (
                  <div
                    className="animate-rise"
                    style={{
                      marginTop: 16, padding: "18px 20px", borderRadius: 14,
                      background: "#e8f9f1", border: "1.5px solid rgba(46,196,122,.25)",
                    }}
                  >
                    <p className="eyebrow" style={{ color: "#196b44" }}>Answer</p>
                    <p style={{ marginTop: 8, fontSize: 20, fontWeight: 800, color: "#196b44" }}>{q.answer}</p>

                    <p className="eyebrow" style={{ color: "#64748b", marginTop: 14 }}>Full working</p>
                    <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                      {q.explanation.map((line, li) => (
                        <div key={li} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={{
                            width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                            background: "#fff", border: "1.5px solid rgba(46,196,122,.3)",
                            display: "grid", placeItems: "center",
                            fontSize: 11, fontWeight: 800, color: "#196b44",
                          }}>{li + 1}</span>
                          <p style={{ fontSize: 14, fontWeight: 500, color: "#374151", lineHeight: 1.65, margin: 0 }}>{line}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {/* Hint button */}
                  {!s.showAnswer && s.hintsShown < 4 && (
                    <button
                      className="btn"
                      onClick={() => showNextHint(q.id)}
                      style={{
                        padding: "10px 18px", fontSize: 14, cursor: "pointer",
                        background: "#f0eefe", borderColor: "rgba(124,110,240,.25)", color: "#4a3db8",
                      }}
                    >
                      💡 {s.hintsShown === 0 ? "Get a hint" : s.hintsShown === 3 ? "Show final step" : `Hint ${s.hintsShown + 1} of 4`}
                      <span style={{ marginLeft: 6, opacity: 0.5, fontSize: 12 }}>({hintsLeft} left)</span>
                    </button>
                  )}

                  {/* Show/hide answer */}
                  <button
                    className="btn"
                    onClick={() => toggleAnswer(q.id)}
                    style={{
                      padding: "10px 18px", fontSize: 14, cursor: "pointer",
                      background: s.showAnswer ? "#fff1ef" : "#e8f9f1",
                      borderColor: s.showAnswer ? "rgba(247,108,94,.25)" : "rgba(46,196,122,.25)",
                      color: s.showAnswer ? "#a83228" : "#196b44",
                    }}
                  >
                    {s.showAnswer ? "Hide answer" : "Show answer & explanation"}
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