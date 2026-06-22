"use client";

import { useState, useRef, useEffect } from "react";
import { useResponsive } from "@/components/useResponsive";

type TutorPage = "home" | "simulation" | "explanation" | "quiz";

const greetings: Record<TutorPage, string> = {
  home: "Hi! I'm your tutor 👋 Pick a question and I'll explain.",
  simulation: "Tap a question and I'll explain what the simulation is showing you.",
  explanation: "Want this in simpler words? Tap a question below.",
  quiz: "Stuck? I'll nudge you — not just hand over the answer 😉",
};

const helpOptions: Record<TutorPage, { label: string; response: string }[]> = {
  home: [
    { label: "What will I learn?", response: "You will learn the difference between direct and inverse proportion using simulations, explanations, and practice questions." },
    { label: "Where should I start?", response: "Start with the simulation. Then read the explanation. After that, try the quiz." },
    { label: "What is direct proportion?", response: "Direct proportion means two values move together. If one increases, the other also increases. Example: more apples means more total cost." },
    { label: "What is inverse proportion?", response: "Inverse proportion means one value increases while the other decreases. Example: more workers means fewer days to finish the same job." },
  ],
  simulation: [
    { label: "Explain this simulation", response: "The apple simulation shows direct proportion: more apples means more total cost. The worker simulation shows inverse proportion: more workers means fewer days." },
    { label: "Why is apple cost direct?", response: "Apple cost is direct because each apple has the same price. If you double the number of apples, the total cost also doubles." },
    { label: "Why are workers inverse?", response: "Workers and days are inverse because the job stays the same. When more workers share the same work, fewer days are needed." },
    { label: "What should I notice in the graph?", response: "For direct proportion, the graph goes upward in a straight line. For inverse proportion, the graph curves downward as x increases." },
  ],
  explanation: [
    { label: "Simplify this explanation", response: "Direct proportion means both things go up together. More apples means more cost. Inverse means one goes up while the other goes down. More workers means fewer days." },
    { label: "Explain like I am 10", response: "Imagine apples in a basket. If each apple costs the same, buying more apples costs more money — that is direct proportion. If more people help build a house, it finishes faster — that is inverse proportion." },
    { label: "Summarize in one sentence", response: "Direct proportion means two values move together; inverse proportion means they move in opposite directions." },
    { label: "Give me exam wording", response: "If y is directly proportional to x, then y = kx. If y is inversely proportional to x, then y = k / x, where k is the constant of proportionality." },
  ],
  quiz: [
    { label: "Give me a hint", response: "First decide whether the values move in the same direction or opposite directions. Same direction means direct. Opposite direction means inverse." },
    { label: "Remind me of the formula", response: "Direct proportion: y = kx. Inverse proportion: y = k / x." },
    { label: "Show the first step", response: "Find the constant first. For direct proportion, divide y by x. For inverse proportion, multiply x by y." },
    { label: "How do I check my answer?", response: "Ask yourself if the answer makes sense. If there are more apples, cost should increase. If there are more workers, days should decrease." },
  ],
};

export default function AIHelp({ page }: { page: TutorPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState(greetings[page]);
  const { isMobile } = useResponsive();
  const options = helpOptions[page];

  // Draggable position state
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const hasDragged = useRef(false);

  // Set initial position once on mount
  useEffect(() => {
    setPos(null); // reset to default CSS bottom-right
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    dragging.current = true;
    hasDragged.current = false;
    const rect = e.currentTarget.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging.current) return;
    hasDragged.current = true;
    const x = e.clientX - dragOffset.current.x;
    const y = e.clientY - dragOffset.current.y;
    // Clamp within viewport
    const btn = btnRef.current;
    if (!btn) return;
    const w = btn.offsetWidth;
    const h = btn.offsetHeight;
    setPos({
      x: Math.max(8, Math.min(window.innerWidth - w - 8, x)),
      y: Math.max(8, Math.min(window.innerHeight - h - 8, y)),
    });
    e.preventDefault();
  };

  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    dragging.current = false;
    // Only open if it was a tap, not a drag
    if (!hasDragged.current) {
      setIsOpen(true);
    }
  };

  const buttonStyle: React.CSSProperties = pos
    ? {
        position: "fixed",
        left: pos.x,
        top: pos.y,
        bottom: "auto",
        right: "auto",
        zIndex: 50,
        touchAction: "none",
      }
    : {
        position: "fixed",
        bottom: isMobile ? 100 : 24,
        right: isMobile ? 16 : 24,
        zIndex: 50,
        touchAction: "none",
      };

  return (
    <>
      {!isOpen && (
        <button
          ref={btnRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          aria-label="Open your tutor"
          className="animate-bob"
          style={{
            ...buttonStyle,
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 8 : 10,
            padding: isMobile ? "10px 16px 10px 12px" : "12px 20px 12px 14px",
            borderRadius: 999,
            background: "#fff",
            border: "1.5px solid rgba(30,35,51,0.13)",
            boxShadow: "0 4px 14px rgba(30,35,51,.10), 0 12px 32px rgba(30,35,51,.10)",
            cursor: "grab",
            fontFamily: "'Nunito', system-ui",
            fontWeight: 800,
            fontSize: isMobile ? 13 : 15,
            color: "#1e2333",
            userSelect: "none",
          }}
        >
          <span style={{
            width: isMobile ? 28 : 34,
            height: isMobile ? 28 : 34,
            borderRadius: "50%",
            background: "#fff3e6",
            border: "1.5px solid rgba(249,115,22,.2)",
            display: "grid",
            placeItems: "center",
            fontSize: isMobile ? 15 : 18,
            flexShrink: 0,
          }}>🧑‍🏫</span>
          Your Tutor
        </button>
      )}

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            background: "rgba(30,35,51,.18)",
            display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
            padding: isMobile ? "0" : "0 24px 24px",
          }}
        >
          <div
            className="animate-slide-up card"
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: isMobile ? "100%" : 420,
              padding: isMobile ? "20px 16px 32px" : 22,
              borderRadius: isMobile ? "20px 20px 0 0" : 20,
              maxHeight: isMobile ? "85vh" : "none",
              overflowY: "auto",
            }}
          >
            {/* Mobile drag handle */}
            {isMobile && (
              <div style={{ width: 40, height: 4, borderRadius: 999, background: "#e2e8f0", margin: "0 auto 16px" }} />
            )}

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: "#fff3e6", border: "1.5px solid rgba(249,115,22,.18)",
                  display: "grid", placeItems: "center", fontSize: 22, flexShrink: 0,
                }}>🧑‍🏫</div>
                <div>
                  <p className="eyebrow" style={{ color: "#f97316" }}>Your Tutor</p>
                  <h2 style={{ fontSize: 18, fontWeight: 800, marginTop: 2 }}>Need a hand?</h2>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: "#f1f5f9", border: "none",
                  cursor: "pointer", fontSize: 16, color: "#64748b",
                  display: "grid", placeItems: "center",
                }}
              >×</button>
            </div>

            <div style={{ marginTop: 18, display: "grid", gap: 8 }}>
              {options.map(option => (
                <button
                  key={option.label}
                  onClick={() => setResponse(option.response)}
                  style={{
                    textAlign: "left", padding: "10px 14px",
                    borderRadius: 12, border: "1.5px solid rgba(249,115,22,.15)",
                    background: "#fff8f3", color: "#a85820",
                    fontFamily: "'Inter', system-ui", fontWeight: 600,
                    fontSize: isMobile ? 13 : 14,
                    cursor: "pointer",
                    transition: "background .15s",
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div style={{
              marginTop: 16, padding: "14px 16px",
              borderRadius: 14, background: "#fffaf3",
              border: "1.5px solid rgba(249,115,22,.12)",
            }}>
              <p className="eyebrow" style={{ color: "#94a3b8" }}>Tutor says</p>
              <p key={response} className="animate-rise" style={{
                marginTop: 8, fontSize: isMobile ? 14 : 15,
                fontWeight: 500, lineHeight: 1.7, color: "#374151",
              }}>
                {response}
              </p>
            </div>

            <p style={{ marginTop: 14, fontSize: 12, color: "#94a3b8" }}>
              Starter version: rule-based hints. A live AI model can be connected later.
            </p>
          </div>
        </div>
      )}
    </>
  );
}