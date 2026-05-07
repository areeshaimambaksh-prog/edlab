import Link from "next/link";
import AIHelp from "@/components/AIHelp";

const learningCards = [
  {
    title: "Try Simulation",
    description: "Interact with apples, workers, cost, and days.",
    href: "/simulation",
    emoji: "🎮",
    color: "bg-red-200",
  },
  {
    title: "Simulation Explanation",
    description: "Understand direct and inverse proportion in simple steps.",
    href: "/explanation",
    emoji: "💡",
    color: "bg-yellow-200",
  },
  {
    title: "Quiz",
    description: "Test your understanding with practice questions.",
    href: "/quiz",
    emoji: "📝",
    color: "bg-green-200",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fff6ec] text-slate-950">
      <section className="mx-auto max-w-6xl px-5 py-8 md:px-8">
        <header className="rounded-[2rem] border-4 border-slate-900 bg-white p-8 shadow-[8px_8px_0px_#111827]">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">
            EdLab Math
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
            Direct and Inverse Proportion
          </h1>

          <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-slate-700">
            Learn how two quantities change together using interactive
            simulations, explanations, quizzes, and AI help.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InfoBox title="Topic" value="Proportion" emoji="📊" />
            <InfoBox title="Direct Formula" value="y = kx" emoji="📈" />
            <InfoBox title="Inverse Formula" value="y = k / x" emoji="📉" />
          </div>
        </header>

        <section className="mt-8">
          <h2 className="mb-4 text-3xl font-black">Start learning</h2>

          <div className="grid gap-5 md:grid-cols-3">
            {learningCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className={`rounded-[2rem] border-4 border-slate-900 ${card.color} p-6 shadow-[6px_6px_0px_#111827] transition hover:-translate-y-1 hover:shadow-[10px_10px_0px_#111827]`}
              >
                <p className="text-5xl">{card.emoji}</p>
                <h3 className="mt-4 text-2xl font-black">{card.title}</h3>
                <p className="mt-2 text-lg font-medium leading-7 text-slate-700">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border-4 border-slate-900 bg-white p-6 shadow-[8px_8px_0px_#111827]">
          <h2 className="text-2xl font-black">Learning goals</h2>

          <ul className="mt-4 grid gap-3 text-lg font-medium text-slate-700 md:grid-cols-2">
            <li>✅ Understand direct proportion</li>
            <li>✅ Understand inverse proportion</li>
            <li>✅ Read proportion from a graph</li>
            <li>✅ Use formulas to solve problems</li>
            <li>✅ Apply proportion to real-life examples</li>
            <li>✅ Prepare for exam-style questions</li>
          </ul>
        </section>
      </section>

      <AIHelp page="home" />
    </main>
  );
}

function InfoBox({
  title,
  value,
  emoji,
}: {
  title: string;
  value: string;
  emoji: string;
}) {
  return (
    <div className="rounded-2xl border-4 border-slate-900 bg-yellow-200 p-4 shadow-[4px_4px_0px_#111827]">
      <p className="text-3xl">{emoji}</p>
      <p className="mt-2 text-sm font-black uppercase text-slate-600">
        {title}
      </p>
      <p className="mt-1 text-xl font-black">{value}</p>
    </div>
  );
}