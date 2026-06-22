"use client";

import { useEffect, useMemo, useState } from "react";
import AIHelp from "@/components/AIHelp";
import NavBar from "@/components/NavBar";
import {
  CartesianGrid, Line, LineChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";

type Mode = "direct" | "inverse";

const tourSteps = [
  { text: "Hi! I'm your tutor 👋 This simulation shows how two quantities change together. Let's start with direct proportion — buying apples 🍎." },
  { text: "Here's 1 apple at Rs. 20 each. Total cost = 1 × 20 = Rs. 20. Keep your eye on the 'Total cost' box as we go." },
  { text: "Watch as I add apples one by one. Notice the total cost climbing with every apple added…" },
  { text: "More apples → more cost. They rise together — that's direct proportion. The graph is a straight line going up." },
  { text: "Now let's flip the idea. Switch to inverse proportion 👷 — one fixed job split between workers." },
  { text: "Watch the 'Days needed' box as I add more workers. The job stays the same size…" },
  { text: "More workers → fewer days. They move in opposite directions — that's inverse proportion. The graph curves down." },
  { text: "That's it! 🎉 Now try the controls yourself. Tap 'Your Tutor' anytime you need help." },
];

export default function SimulationPage() {
  const [mode, setMode] = useState<Mode>("direct");
  const [apples, setApples] = useState(5);
  const [pricePerApple, setPricePerApple] = useState(20);
  const [workers, setWorkers] = useState(4);
  const [totalWork, setTotalWork] = useState(24);
  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const currentY = mode === "direct" ? apples * pricePerApple : totalWork / workers;
  const currentX = mode === "direct" ? apples : workers;
  const currentK = mode === "direct" ? pricePerApple : totalWork;

  const graphData = useMemo(() => Array.from({ length: 12 }, (_, i) => {
    const x = i + 1;
    return { x, y: mode === "direct" ? x * pricePerApple : Number((totalWork / x).toFixed(2)) };
  }), [mode, pricePerApple, totalWork]);

  useEffect(() => {
    try {
      if (!localStorage.getItem("edlab_tour_done")) {
        setTimeout(() => { setTourStep(0); setTourActive(true); }, 700);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (!tourActive) return;
    let iv: ReturnType<typeof setInterval> | undefined;
    if (tourStep === 0) setMode("direct");
    if (tourStep === 1) { setMode("direct"); setPricePerApple(20); setApples(1); }
    if (tourStep === 2) {
      setApples(1);
      iv = setInterval(() => setApples(p => { if (p >= 8) { clearInterval(iv); return p; } return p + 1; }), 250);
    }
    if (tourStep === 3) setApples(8);
    if (tourStep === 4) { setMode("inverse"); setTotalWork(24); setWorkers(2); }
    if (tourStep === 5) {
      setWorkers(2);
      iv = setInterval(() => setWorkers(p => { if (p >= 8) { clearInterval(iv); return p; } return p + 1; }), 280);
    }
    if (tourStep === 6) setWorkers(8);
    return () => { if (iv) clearInterval(iv); };
  }, [tourActive, tourStep]);

  const startTour = () => { setTourStep(0); setTourActive(true); };
  const endTour   = () => {
    setTourActive(false);
    try { localStorage.setItem("edlab_tour_done", "1"); } catch { /* ignore */ }
  };
  const nextStep = () => tourStep >= tourSteps.length - 1 ? endTour() : setTourStep(s => s + 1);
  const prevStep = () => setTourStep(s => Math.max(0, s - 1));

  return (
    <main style={{ minHeight: "100vh", color: "#1e2333" }}>
      <NavBar />

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 24px 140px" }}>

        {/* Header */}
        <header className="card animate-rise" style={{ padding: "36px 44px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <p className="eyebrow" style={{ color: "#f97316" }}>EdLab Math · Simulation</p>
            <h1 style={{ marginTop: 10, fontSize: 38, fontWeight: 800, letterSpacing: "-0.02em" }}>Direct &amp; Inverse Proportion</h1>
            <p style={{ marginTop: 10, fontSize: 16, color: "#64748b", maxWidth: 520 }}>Play with the controls to see how quantities change together.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "stretch" }}>
            <div style={{ padding: "12px 20px", borderRadius: 14, background: "#fff8f3", border: "1.5px solid rgba(249,115,22,.18)", textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".12em" }}>Current mode</div>
              <div style={{ marginTop: 4, fontSize: 19, fontWeight: 800 }}>{mode === "direct" ? "🍎 Direct" : "👷 Inverse"}</div>
            </div>
            <button
              className="btn btn-purple"
              onClick={startTour}
              style={{ padding: "10px 18px", fontSize: 14, cursor: "pointer" }}
            >
              ▶ Start walkthrough
            </button>
          </div>
        </header>

        {/* Mode toggle */}
        <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[
            { m: "direct" as Mode, emoji: "🍎", title: "Direct: apple cost", sub: "More apples → higher cost.", accent: "#f76c5e" },
            { m: "inverse" as Mode, emoji: "👷", title: "Inverse: workers & days", sub: "More workers → fewer days.", accent: "#5a8ee8" },
          ].map(card => (
            <button
              key={card.m}
              onClick={() => setMode(card.m)}
              className="card card-link"
              style={{
                padding: 18, textAlign: "left", cursor: "pointer",
                outline: mode === card.m ? `2px solid ${card.accent}` : "none",
                outlineOffset: 2,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{
                  width: 46, height: 46, borderRadius: 14,
                  background: mode === card.m ? (card.m === "direct" ? "#fff1ef" : "#edf2fd") : "#f8fafc",
                  border: "1.5px solid rgba(30,35,51,.08)",
                  display: "grid", placeItems: "center", fontSize: 22, flexShrink: 0,
                }}>{card.emoji}</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{card.title}</div>
                  <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>{card.sub}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Simulation + Graph grid */}
        <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Sim panel */}
          <div className="card" style={{ padding: 28 }}>
            {mode === "direct" ? (
              <DirectSim apples={apples} price={pricePerApple} total={currentY}
                setApples={setApples} setPrice={setPricePerApple} />
            ) : (
              <InverseSim workers={workers} totalWork={totalWork} days={currentY}
                setWorkers={setWorkers} setTotalWork={setTotalWork} />
            )}
          </div>

          {/* Graph panel */}
          <div className="card" style={{ padding: 28 }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
              <div>
                <p className="eyebrow" style={{ color: "#7c6ef0" }}>Live graph</p>
                <h2 style={{ marginTop: 6, fontSize: 20, fontWeight: 800 }}>
                  {mode === "direct" ? "Apple cost graph" : "Workers vs days"}
                </h2>
              </div>
              <span style={{
                padding: "6px 14px", borderRadius: 999, fontSize: 13, fontWeight: 700,
                background: mode === "direct" ? "#fff1ef" : "#edf2fd",
                border: `1.5px solid ${mode === "direct" ? "rgba(247,108,94,.2)" : "rgba(90,142,232,.2)"}`,
                color: mode === "direct" ? "#a83228" : "#2a4fa0",
              }}>
                {mode === "direct" ? "Direct: y = kx" : "Inverse: y = k / x"}
              </span>
            </div>

            <div style={{ height: 240, borderRadius: 14, background: "#fbfcfe", border: "1.5px solid rgba(30,35,51,.07)", padding: "12px 8px 8px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={graphData} margin={{ top: 10, right: 18, left: -8, bottom: 4 }}>
                  <CartesianGrid stroke="#eef0f4" strokeDasharray="4 4" />
                  <XAxis dataKey="x" stroke="#cbd5e1" tick={{ fill: "#94a3b8", fontWeight: 500, fontSize: 12 }} />
                  <YAxis stroke="#cbd5e1" tick={{ fill: "#94a3b8", fontWeight: 500, fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      background: "#fff", border: "1.5px solid rgba(30,35,51,.1)",
                      borderRadius: 12, boxShadow: "0 6px 18px rgba(30,35,51,.09)", fontWeight: 600, fontSize: 13,
                    }}
                    labelStyle={{ color: "#64748b" }}
                  />
                  <Line
                    type={mode === "direct" ? "linear" : "monotone"}
                    dataKey="y"
                    stroke={mode === "direct" ? "#f76c5e" : "#5a8ee8"}
                    strokeWidth={3.5}
                    dot={{ r: 4, fill: mode === "direct" ? "#f76c5e" : "#5a8ee8", stroke: "#fff", strokeWidth: 2 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              <StatBox emoji={mode === "direct" ? "🍎" : "👷"} label={mode === "direct" ? "Apples" : "Workers"} value={String(currentX)} />
              <StatBox emoji={mode === "direct" ? "🏷️" : "🧱"} label={mode === "direct" ? "Price each" : "Total work"} value={mode === "direct" ? `Rs.${currentK}` : String(currentK)} />
              <StatBox emoji={mode === "direct" ? "💰" : "📅"} label={mode === "direct" ? "Total cost" : "Days"} value={mode === "direct" ? `Rs.${currentY}` : currentY.toFixed(2)} highlight />
            </div>
          </div>
        </div>
      </section>

      {/* ── Speech-bubble walkthrough ── */}
      {tourActive && (
        <div style={{
          position: "fixed", inset: "0 0 0 0", zIndex: 50,
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          padding: "0 24px 28px", pointerEvents: "none",
        }}>
          {/* The bubble */}
          <div
            className="animate-slide-up"
            style={{
              pointerEvents: "all",
              position: "relative",
              width: "100%", maxWidth: 660,
              background: "#fff",
              border: "1.5px solid rgba(30,35,51,.12)",
              borderRadius: 20,
              boxShadow: "0 8px 24px rgba(30,35,51,.12), 0 24px 48px rgba(30,35,51,.10)",
              padding: "22px 24px 18px",
            }}
          >
            {/* Speech tail pointing downward */}
            <div style={{
              position: "absolute", bottom: -12, left: "50%",
              transform: "translateX(-50%)",
              width: 0, height: 0,
              borderLeft: "12px solid transparent",
              borderRight: "12px solid transparent",
              borderTop: "12px solid #fff",
              filter: "drop-shadow(0 2px 2px rgba(30,35,51,.08))",
            }} />
            {/* Tail border */}
            <div style={{
              position: "absolute", bottom: -14, left: "50%",
              transform: "translateX(-50%)",
              width: 0, height: 0,
              borderLeft: "13px solid transparent",
              borderRight: "13px solid transparent",
              borderTop: "13px solid rgba(30,35,51,.12)",
              zIndex: -1,
            }} />

            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{
                width: 46, height: 46, borderRadius: 14, flexShrink: 0,
                background: "#fff8f3", border: "1.5px solid rgba(249,115,22,.2)",
                display: "grid", placeItems: "center", fontSize: 22,
              }}>🧑‍🏫</div>

              <div style={{ flex: 1 }}>
                <p className="eyebrow" style={{ color: "#7c6ef0" }}>
                  Your Tutor · step {tourStep + 1} of {tourSteps.length}
                </p>
                <p
                  key={tourStep}
                  className="animate-rise"
                  style={{ marginTop: 6, fontSize: 16, fontWeight: 500, lineHeight: 1.7, color: "#374151" }}
                >
                  {tourSteps[tourStep].text}
                </p>
              </div>
            </div>

            {/* Step dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 16 }}>
              {tourSteps.map((_, i) => (
                <span key={i} style={{
                  height: 7, borderRadius: 999,
                  width: i === tourStep ? 20 : 7,
                  background: i === tourStep ? "#7c6ef0" : "#e2e8f0",
                  transition: "width .2s ease, background .2s ease",
                }} />
              ))}
            </div>

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
              <button
                onClick={endTour}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 14, fontWeight: 600, color: "#94a3b8",
                  padding: "6px 10px", borderRadius: 8,
                  transition: "color .15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#64748b")}
                onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
              >
                Skip
              </button>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="btn"
                  onClick={prevStep}
                  disabled={tourStep === 0}
                  style={{ padding: "8px 16px", fontSize: 14, cursor: tourStep === 0 ? "not-allowed" : "pointer" }}
                >
                  ← Back
                </button>
                <button
                  className="btn btn-purple"
                  onClick={nextStep}
                  style={{ padding: "8px 18px", fontSize: 14, cursor: "pointer" }}
                >
                  {tourStep === tourSteps.length - 1 ? "Finish 🎉" : "Next →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AIHelp page="simulation" />
    </main>
  );
}

/* ── Sub-components ─────────────────────────────── */

function DirectSim({ apples, price, total, setApples, setPrice }:
  { apples: number; price: number; total: number; setApples: (v: number) => void; setPrice: (v: number) => void }) {
  return (
    <>
      <p className="eyebrow" style={{ color: "#a83228" }}>Direct proportion</p>
      <h2 style={{ marginTop: 6, fontSize: 22, fontWeight: 800 }}>Apple cost shop</h2>
      <p style={{ marginTop: 6, fontSize: 14, color: "#64748b" }}>Add apples and watch the total cost rise.</p>

      {/* Crate */}
      <div style={{ marginTop: 20, minHeight: 140, borderRadius: 16, background: "#fffaf3", border: "1.5px solid rgba(249,115,22,.12)", padding: 16, display: "flex", flexWrap: "wrap", gap: 8, alignContent: "flex-start" }}>
        {apples === 0 && <p style={{ width: "100%", textAlign: "center", color: "#94a3b8", fontSize: 14, paddingTop: 32 }}>Crate is empty — add an apple.</p>}
        {Array.from({ length: apples }, (_, i) => (
          <span key={i} className="animate-pop" style={{ fontSize: 32 }}>🍎</span>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
        <button className="btn btn-red" onClick={() => setApples(Math.min(12, apples + 1))} style={{ padding: "10px 18px", cursor: "pointer" }}>+ Apple</button>
        <button className="btn" onClick={() => setApples(Math.max(0, apples - 1))} style={{ padding: "10px 18px", cursor: "pointer" }}>− Apple</button>
        <button className="btn" onClick={() => setApples(0)} style={{ padding: "10px 14px", fontSize: 13, cursor: "pointer" }}>Reset</button>
        <button className="btn" onClick={() => setApples(5)} style={{ padding: "10px 14px", fontSize: 13, cursor: "pointer" }}>Start with 5</button>
      </div>

      {/* Stats */}
      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <StatBox emoji="🍎" label="Apples" value={String(apples)} />
        <StatBox emoji="🏷️" label="Price each" value={`Rs.${price}`} />
        <StatBox emoji="💰" label="Total cost" value={`Rs.${total}`} highlight />
      </div>

      {/* Insight */}
      <p style={{ marginTop: 14, padding: "10px 14px", borderRadius: 12, background: "#fff1ef", border: "1.5px solid rgba(247,108,94,.15)", fontSize: 14, fontWeight: 500, color: "#8a4339", lineHeight: 1.6 }}>
        💡 {apples} apple{apples !== 1 ? "s" : ""} × Rs.{price} each = Rs.{total}. More apples → more cost. That&apos;s direct proportion.
      </p>

      {/* Slider */}
      <div style={{ marginTop: 14, padding: "14px 16px", borderRadius: 14, background: "#f8fafc", border: "1.5px solid rgba(30,35,51,.07)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14, fontWeight: 700 }}>
          <span>Price per apple</span>
          <span style={{ padding: "2px 10px", borderRadius: 999, background: "#fff8f3", border: "1.5px solid rgba(249,115,22,.18)", color: "#a85820", fontSize: 13, fontWeight: 700 }}>Rs.{price}</span>
        </div>
        <input type="range" min={5} max={100} step={5} value={price} onChange={e => setPrice(Number(e.target.value))} style={{ width: "100%" }} />
        <p style={{ marginTop: 8, fontSize: 13, color: "#94a3b8" }}>total = apples × price → Rs.{total} = {apples} × Rs.{price}</p>
      </div>
    </>
  );
}

function InverseSim({ workers, totalWork, days, setWorkers, setTotalWork }:
  { workers: number; totalWork: number; days: number; setWorkers: (v: number) => void; setTotalWork: (v: number) => void }) {
  return (
    <>
      <p className="eyebrow" style={{ color: "#2a4fa0" }}>Inverse proportion</p>
      <h2 style={{ marginTop: 6, fontSize: 22, fontWeight: 800 }}>Workers &amp; days</h2>
      <p style={{ marginTop: 6, fontSize: 14, color: "#64748b" }}>Add workers and watch the days needed drop.</p>

      {/* Job site */}
      <div style={{ marginTop: 20, minHeight: 140, borderRadius: 16, background: "#f5f8ff", border: "1.5px solid rgba(90,142,232,.14)", padding: 16 }}>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <span style={{ padding: "4px 14px", borderRadius: 999, background: "#fff8f3", border: "1.5px solid rgba(249,115,22,.18)", fontSize: 13, fontWeight: 700, color: "#a85820" }}>🏠 Same job</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          {Array.from({ length: workers }, (_, i) => (
            <span key={i} className="animate-pop" style={{
              width: 42, height: 42, borderRadius: 12,
              background: "#dbe8ff", border: "1.5px solid rgba(90,142,232,.2)",
              display: "grid", placeItems: "center", fontSize: 20,
            }}>👷</span>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="btn btn-blue" onClick={() => setWorkers(Math.min(12, workers + 1))} style={{ padding: "10px 18px", cursor: "pointer" }}>+ Worker</button>
        <button className="btn" onClick={() => setWorkers(Math.max(1, workers - 1))} style={{ padding: "10px 18px", cursor: "pointer" }}>− Worker</button>
      </div>

      {/* Stats */}
      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <StatBox emoji="👷" label="Workers" value={String(workers)} />
        <StatBox emoji="🧱" label="Total work" value={String(totalWork)} />
        <StatBox emoji="📅" label="Days needed" value={days.toFixed(2)} highlight />
      </div>

      {/* Insight */}
      <p style={{ marginTop: 14, padding: "10px 14px", borderRadius: 12, background: "#edf2fd", border: "1.5px solid rgba(90,142,232,.15)", fontSize: 14, fontWeight: 500, color: "#2a4fa0", lineHeight: 1.6 }}>
        💡 {workers} worker{workers !== 1 ? "s" : ""} share {totalWork} worker-days → {days.toFixed(2)} day{days === 1 ? "" : "s"}. More workers = fewer days. That&apos;s inverse proportion.
      </p>

      {/* Sliders */}
      <div style={{ marginTop: 14, padding: "14px 16px", borderRadius: 14, background: "#f8fafc", border: "1.5px solid rgba(30,35,51,.07)" }}>
        {[
          { label: "Workers", value: workers, min: 1, max: 12, step: 1, set: setWorkers, suffix: "" },
          { label: "Total work", value: totalWork, min: 12, max: 120, step: 12, set: setTotalWork, suffix: " worker-days" },
        ].map(s => (
          <div key={s.label} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 14, fontWeight: 700 }}>
              <span>{s.label}</span>
              <span style={{ padding: "2px 10px", borderRadius: 999, background: "#fff8f3", border: "1.5px solid rgba(249,115,22,.18)", color: "#a85820", fontSize: 13 }}>{s.value}{s.suffix}</span>
            </div>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.value} onChange={e => s.set(Number(e.target.value))} style={{ width: "100%" }} />
          </div>
        ))}
        <p style={{ fontSize: 13, color: "#94a3b8" }}>days = totalWork ÷ workers → {days.toFixed(2)} = {totalWork} ÷ {workers}</p>
      </div>
    </>
  );
}

function StatBox({ emoji, label, value, highlight = false }:
  { emoji: string; label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{
      padding: "12px 14px", borderRadius: 14,
      background: highlight ? "#e8f9f1" : "#f8fafc",
      border: `1.5px solid ${highlight ? "rgba(46,196,122,.25)" : "rgba(30,35,51,.07)"}`,
    }}>
      <div style={{ fontSize: 22 }}>{emoji}</div>
      <div style={{ marginTop: 4, fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".1em" }}>{label}</div>
      <div key={value} className="animate-pop" style={{ marginTop: 2, fontSize: 18, fontWeight: 800, color: highlight ? "#196b44" : "#1e2333" }}>{value}</div>
    </div>
  );
}
