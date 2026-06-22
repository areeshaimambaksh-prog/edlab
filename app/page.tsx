import Link from "next/link";
import AIHelp from "@/components/AIHelp";
import NavBar from "@/components/NavBar";

const learningCards = [
  { title: "Try the simulation", description: "Interact with apples, workers, cost, and days.", href: "/simulation", emoji: "🎮", tint: "#fff1ef", border: "rgba(247,108,94,.18)", ink: "#a83228" },
  { title: "Read the explanation", description: "Understand direct and inverse proportion step by step.", href: "/explanation", emoji: "💡", tint: "#fef6e3", border: "rgba(244,183,64,.2)", ink: "#8a5e00" },
  { title: "Take the quiz", description: "Test your understanding with exam-level questions.", href: "/quiz", emoji: "📝", tint: "#e8f9f1", border: "rgba(46,196,122,.2)", ink: "#196b44" },
  { title: "Past Papers", description: "25 real exam questions with hints and worked solutions.", href: "/pastpapers", emoji: "📄", tint: "#f0eefe", border: "rgba(124,110,240,.2)", ink: "#4a3db8" },
];

const formulaChips = [
  { emoji: "📊", label: "Topic", value: "Proportion" },
  { emoji: "📈", label: "Direct", value: "y = kx" },
  { emoji: "📉", label: "Inverse", value: "y = k / x" },
];

const goals = [
  "Understand direct proportion",
  "Understand inverse proportion",
  "Read proportion from a graph",
  "Use formulas to solve problems",
  "Apply proportion to real life",
  "Prepare for exam-style questions",
];

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", color: "#1e2333" }}>
      <NavBar />

      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "clamp(20px,4vw,36px) clamp(16px,4vw,24px) 120px" }}>

        {/* Hero */}
        <header className="card animate-rise" style={{ padding: "clamp(24px,5vw,44px)" }}>
          <p className="eyebrow" style={{ color: "#f97316" }}>EdLab Math</p>

          <h1 style={{
            marginTop: 12,
            fontSize: "clamp(28px, 5vw, 46px)",
            fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em",
          }}>
            Direct &amp; Inverse<br />Proportion
          </h1>

          <p style={{ marginTop: 14, fontSize: "clamp(15px,2vw,17px)", color: "#64748b", maxWidth: 580, lineHeight: 1.75 }}>
            Learn how two quantities change together through interactive
            simulations, clear explanations, quizzes, and a friendly tutor.
          </p>

          {/* Formula chips — wrap on mobile */}
          <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
            {formulaChips.map(chip => (
              <div key={chip.label} className="chip" style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 14px 8px 8px",
              }}>
                <span style={{
                  width: 38, height: 38, borderRadius: 10, background: "#fff",
                  border: "1.5px solid rgba(30,35,51,.08)",
                  boxShadow: "0 1px 4px rgba(30,35,51,.06)",
                  display: "grid", placeItems: "center", fontSize: 18, flexShrink: 0,
                }}>{chip.emoji}</span>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".08em" }}>{chip.label}</div>
                  <div style={{ fontSize: "clamp(14px,2vw,17px)", fontWeight: 800, marginTop: 1 }}>{chip.value}</div>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Cards */}
        <h2 className="animate-rise" style={{ marginTop: 36, marginBottom: 16, fontSize: "clamp(20px,3vw,24px)", fontWeight: 800, animationDelay: "80ms" }}>
          Start learning
        </h2>

        {/* Single column on mobile, 2-col on tablet, 4-col on desktop */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))",
          gap: 16,
        }}>
          {learningCards.map((card, i) => (
            <Link
              key={card.href}
              href={card.href}
              className="card card-link animate-rise"
              style={{
                display: "block", padding: "clamp(18px,3vw,26px)",
                textDecoration: "none", color: "inherit",
                animationDelay: `${120 + i * 60}ms`,
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: card.tint, border: `1.5px solid ${card.border}`,
                display: "grid", placeItems: "center", fontSize: 26,
              }}>{card.emoji}</div>
              <h3 style={{ marginTop: 16, fontSize: "clamp(16px,2vw,19px)", fontWeight: 800 }}>{card.title}</h3>
              <p style={{ marginTop: 6, fontSize: "clamp(13px,1.5vw,15px)", color: "#64748b", lineHeight: 1.7 }}>{card.description}</p>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                marginTop: 14, fontSize: "clamp(13px,1.5vw,15px)", fontWeight: 700, color: card.ink,
              }}>Open →</span>
            </Link>
          ))}
        </div>

        {/* Goals */}
        <section className="card animate-rise" style={{ marginTop: 20, padding: "clamp(20px,4vw,32px)", animationDelay: "320ms" }}>
          <h2 style={{ fontSize: "clamp(18px,2.5vw,22px)", fontWeight: 800 }}>Learning goals</h2>
          <ul style={{
            marginTop: 18, listStyle: "none", padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(260px,100%), 1fr))",
            gap: "12px 28px",
          }}>
            {goals.map(goal => (
              <li key={goal} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "clamp(13px,1.5vw,15px)", color: "#374151" }}>
                <span style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: "#e8f9f1", border: "1.5px solid rgba(46,196,122,.25)",
                  color: "#196b44", fontWeight: 800, fontSize: 12,
                  display: "grid", placeItems: "center", flexShrink: 0,
                }}>✓</span>
                {goal}
              </li>
            ))}
          </ul>
        </section>

      </section>

      <AIHelp page="home" />
    </main>
  );
}

