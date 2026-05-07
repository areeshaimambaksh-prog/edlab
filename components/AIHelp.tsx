"use client";

import { useState } from "react";

type AIHelpPage = "home" | "simulation" | "explanation" | "quiz";

const helpOptions: Record<
  AIHelpPage,
  {
    label: string;
    response: string;
  }[]
> = {
  home: [
    {
      label: "What will I learn?",
      response:
        "You will learn the difference between direct and inverse proportion using simulations, explanations, and practice questions.",
    },
    {
      label: "Where should I start?",
      response:
        "Start with the simulation. Then read the explanation. After that, try the quiz.",
    },
    {
      label: "What is direct proportion?",
      response:
        "Direct proportion means two values move together. If one increases, the other also increases. Example: more apples means more total cost.",
    },
    {
      label: "What is inverse proportion?",
      response:
        "Inverse proportion means one value increases while the other decreases. Example: more workers means fewer days to finish the same job.",
    },
  ],

  simulation: [
    {
      label: "Explain this simulation",
      response:
        "The apple simulation shows direct proportion: more apples means more total cost. The worker simulation shows inverse proportion: more workers means fewer days.",
    },
    {
      label: "Why is apple cost direct?",
      response:
        "Apple cost is direct because each apple has the same price. If you double the number of apples, the total cost also doubles.",
    },
    {
      label: "Why are workers inverse?",
      response:
        "Workers and days are inverse because the job stays the same. When more workers share the same work, fewer days are needed.",
    },
    {
      label: "What should I notice in the graph?",
      response:
        "For direct proportion, the graph goes upward in a straight line. For inverse proportion, the graph curves downward as x increases.",
    },
  ],

  explanation: [
    {
      label: "Simplify this explanation",
      response:
        "Direct proportion means both things go up together. Example: more apples means more cost. Inverse proportion means one thing goes up while the other goes down. Example: more workers means fewer days.",
    },
    {
      label: "Explain like I am 10",
      response:
        "Imagine apples in a basket. If each apple costs the same, buying more apples costs more money. That is direct proportion. Now imagine people building a house. If more people help, the work finishes faster. That is inverse proportion.",
    },
    {
      label: "Summarize in one sentence",
      response:
        "Direct proportion means two values move together, while inverse proportion means they move in opposite directions.",
    },
    {
      label: "Give me exam wording",
      response:
        "If y is directly proportional to x, then y = kx. If y is inversely proportional to x, then y = k / x, where k is the constant.",
    },
  ],

  quiz: [
    {
      label: "Give me a hint",
      response:
        "First decide whether the values move in the same direction or opposite directions. Same direction means direct. Opposite direction means inverse.",
    },
    {
      label: "Remind me of the formula",
      response:
        "Direct proportion: y = kx. Inverse proportion: y = k / x.",
    },
    {
      label: "Show the first step",
      response:
        "Find the constant first. For direct proportion, divide y by x. For inverse proportion, multiply x by y.",
    },
    {
      label: "How do I check my answer?",
      response:
        "Ask yourself if the answer makes sense. If there are more apples, cost should increase. If there are more workers, days should decrease.",
    },
  ],
};

export default function AIHelp({ page }: { page: AIHelpPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState(
    "Hi! I can help you understand this part of the lesson."
  );

  const options = helpOptions[page];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 rounded-full border-4 border-slate-900 bg-purple-400 px-6 py-4 text-lg font-black text-slate-950 shadow-[5px_5px_0px_#111827] hover:bg-purple-300"
      >
        🤖 AI Help
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/30 p-4 md:p-6">
          <div className="w-full max-w-md rounded-[2rem] border-4 border-slate-900 bg-white p-5 shadow-[8px_8px_0px_#111827]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-purple-500">
                  AI Help
                </p>
                <h2 className="mt-1 text-2xl font-black">Need help?</h2>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full border-4 border-slate-900 bg-red-300 px-3 py-1 font-black"
              >
                ×
              </button>
            </div>

            <div className="mt-5 grid gap-3">
              {options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => setResponse(option.response)}
                  className="rounded-2xl border-4 border-slate-900 bg-purple-100 px-4 py-3 text-left font-black shadow-[3px_3px_0px_#111827] hover:bg-purple-200"
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border-4 border-slate-900 bg-yellow-100 p-4">
              <p className="text-sm font-black uppercase text-slate-600">
                Response
              </p>
              <p className="mt-2 text-lg font-bold leading-7 text-slate-800">
                {response}
              </p>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Starter version: this help is rule-based. Later, we can connect a
              real AI model.
            </p>
          </div>
        </div>
      )}
    </>
  );
}