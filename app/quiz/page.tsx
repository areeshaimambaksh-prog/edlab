"use client";

import Link from "next/link";
import { useState } from "react";
import AIHelp from "@/components/AIHelp";

const questions = [
  {
    question: "If one apple costs Rs. 20, how much do 5 apples cost?",
    options: ["Rs. 25", "Rs. 50", "Rs. 100", "Rs. 200"],
    answer: "Rs. 100",
    explanation:
      "This is direct proportion. 5 apples cost 5 × 20 = Rs. 100.",
  },
  {
    question:
      "If 4 workers complete a job in 6 days, what happens if we use 8 workers?",
    options: [
      "It takes more days",
      "It takes fewer days",
      "The cost doubles",
      "Nothing changes",
    ],
    answer: "It takes fewer days",
    explanation:
      "This is inverse proportion. More workers means fewer days for the same job.",
  },
  {
    question: "Which formula shows direct proportion?",
    options: ["y = kx", "y = k / x", "x + y = k", "y = x - k"],
    answer: "y = kx",
    explanation: "Direct proportion uses the formula y = kx.",
  },
];

export default function QuizPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce((total, q, index) => {
    return selectedAnswers[index] === q.answer ? total + 1 : total;
  }, 0);

  return (
    <main className="min-h-screen bg-[#fff6ec] text-slate-950">
      <section className="mx-auto max-w-5xl px-5 py-8 md:px-8">
        <Link href="/" className="font-black text-orange-600">
          ← Back to topic
        </Link>

        <div className="mt-5 rounded-[2rem] border-4 border-slate-900 bg-white p-8 shadow-[8px_8px_0px_#111827]">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-green-500">
            Quiz
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Check your understanding
          </h1>

          <p className="mt-4 text-lg font-medium leading-8 text-slate-700">
            Try these quick questions. Use AI Help if you need a hint.
          </p>

          <div className="mt-8 space-y-6">
            {questions.map((q, index) => (
              <div
                key={q.question}
                className="rounded-2xl border-4 border-slate-900 bg-green-100 p-6 shadow-[5px_5px_0px_#111827]"
              >
                <h2 className="text-2xl font-black">
                  {index + 1}. {q.question}
                </h2>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {q.options.map((option) => (
                    <button
                      key={option}
                      onClick={() =>
                        setSelectedAnswers((prev) => ({
                          ...prev,
                          [index]: option,
                        }))
                      }
                      className={`rounded-xl border-4 border-slate-900 px-4 py-3 text-left font-black shadow-[3px_3px_0px_#111827] ${
                        selectedAnswers[index] === option
                          ? "bg-yellow-300"
                          : "bg-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {submitted && (
                  <div
                    className={`mt-4 rounded-xl border-4 border-slate-900 p-4 font-bold ${
                      selectedAnswers[index] === q.answer
                        ? "bg-green-300"
                        : "bg-red-200"
                    }`}
                  >
                    {selectedAnswers[index] === q.answer
                      ? "Correct!"
                      : `Not quite. Correct answer: ${q.answer}`}
                    <p className="mt-2">{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setSubmitted(true)}
            className="mt-8 rounded-2xl border-4 border-slate-900 bg-green-400 px-6 py-4 text-xl font-black shadow-[5px_5px_0px_#111827] hover:bg-green-300"
          >
            Submit Quiz
          </button>

          {submitted && (
            <div className="mt-6 rounded-2xl border-4 border-slate-900 bg-yellow-200 p-6 text-2xl font-black shadow-[5px_5px_0px_#111827]">
              Score: {score} / {questions.length}
            </div>
          )}
        </div>
      </section>

      <AIHelp page="quiz" />
    </main>
  );
}