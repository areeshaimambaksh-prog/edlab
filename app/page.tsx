import Link from "next/link";
import AIHelp from "@/components/AIHelp";
import NavBar from "@/components/NavBar";

const learningCards = [
  { title: "Try the simulation", description: "Interact with apples, workers, cost, and days.", href: "/simulation", emoji: "🎮", tint: "#fff1ef", border: "rgba(247,108,94,.18)", ink: "#a83228" },
  { title: "Read the explanation", description: "Understand direct and inverse proportion step by step.", href: "/explanation", emoji: "💡", tint: "#fef6e3", border: "rgba(244,183,64,.2)", ink: "#8a5e00" },
  { title: "Take the quiz", description: "Test your understanding with practice questions.", href: "/quiz", emoji: "📝", tint: "#e8f9f1", border: "rgba(46,196,122,.2)", ink: "#196b44" },
];

const formulaChips = [
  { emoji: "📊", label: "Topic", value: "Proportion" },
  { emoji: "📈", label: "Direct formula", value: "y = kx" },
  { emoji: "📉", label: "Inverse formula", value: "y = k / x" },
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

      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "36px 24px 120px" }}>

        {/* Hero card */}
        <header
          className="card animate-rise"
          style={{ padding: "40px 44px" }}
        >
          <p className="eyebrow" style={{ color: "#f97316" }}>EdLab Math</p>

          <h1 style={{ marginTop: 12, fontSize: 46, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
            Direct &amp; Inverse<br />Proportion
          </h1>

          <p style={{ marginTop: 16, fontSize: 17, color: "#64748b", maxWidth: 580, lineHeight: 1.75 }}>
            Learn how two quantities change together through interactive
            simulations, clear explanations, quizzes, and a friendly tutor.
          </p>

          {/* Formula chips */}
          <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
            {formulaChips.map(chip => (
              <div
                key={chip.label}
                className="chip"
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px 10px 10px" }}
              >
                <span style={{
                  width: 42, height: 42, borderRadius: 12, background: "#fff",
                  border: "1.5px solid rgba(30,35,51,.08)",
                  boxShadow: "0 1px 4px rgba(30,35,51,.06)",
                  display: "grid", placeItems: "center", fontSize: 20, flexShrink: 0,
                }}>
                  {chip.emoji}
                </span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".08em" }}>{chip.label}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, marginTop: 1 }}>{chip.value}</div>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Start learning */}
        <h2
          className="animate-rise"
          style={{ marginTop: 40, marginBottom: 18, fontSize: 24, fontWeight: 800, animationDelay: "80ms" }}
        >
          Start learning
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {learningCards.map((card, i) => (
            <Link
              key={card.href}
              href={card.href}
              className="card card-link animate-rise"
              style={{
                display: "block",
                padding: 28,
                textDecoration: "none",
                color: "inherit",
                animationDelay: `${120 + i * 60}ms`,
              }}
            >
              <div style={{
                width: 58, height: 58, borderRadius: 18,
                background: card.tint,
                border: `1.5px solid ${card.border}`,
                display: "grid", placeItems: "center", fontSize: 28,
              }}>
                {card.emoji}
              </div>

              <h3 style={{ marginTop: 18, fontSize: 19, fontWeight: 800 }}>{card.title}</h3>
              <p style={{ marginTop: 8, fontSize: 15, color: "#64748b", lineHeight: 1.7 }}>{card.description}</p>

              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                marginTop: 18, fontSize: 15, fontWeight: 700,
                color: card.ink,
              }}>
                Open <span style={{ transition: "transform .2s ease" }} className="card-arrow">→</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Learning goals */}
        <section
          className="card animate-rise"
          style={{ marginTop: 24, padding: "32px 36px", animationDelay: "320ms" }}
        >
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>Learning goals</h2>
          <ul style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 32px", listStyle: "none", padding: 0 }}>
            {goals.map(goal => (
              <li key={goal} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "#374151" }}>
                <span style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: "#e8f9f1", border: "1.5px solid rgba(46,196,122,.25)",
                  color: "#196b44", fontWeight: 800, fontSize: 13,
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
