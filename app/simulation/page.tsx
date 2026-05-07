"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AIHelp from "@/components/AIHelp";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Mode = "direct" | "inverse";

export default function SimulationPage() {
  const [mode, setMode] = useState<Mode>("direct");

  const [apples, setApples] = useState(5);
  const [pricePerApple, setPricePerApple] = useState(20);

  const [workers, setWorkers] = useState(4);
  const [totalWork, setTotalWork] = useState(24);

  const currentX = mode === "direct" ? apples : workers;
  const currentK = mode === "direct" ? pricePerApple : totalWork;
  const currentY =
    mode === "direct" ? apples * pricePerApple : totalWork / workers;

  const graphData = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => {
      const x = index + 1;

      return {
        x,
        y:
          mode === "direct"
            ? x * pricePerApple
            : Number((totalWork / x).toFixed(2)),
      };
    });
  }, [mode, pricePerApple, totalWork]);

  return (
    <main className="min-h-screen bg-[#fff6ec] text-slate-950">
      <section className="mx-auto max-w-7xl px-5 py-6 md:px-8">
        <Link href="/" className="font-black text-orange-600">
          ← Back to topic
        </Link>

        <header className="mt-5 mb-5 flex flex-col gap-4 rounded-[2rem] border-4 border-slate-900 bg-white p-6 shadow-[8px_8px_0px_#111827] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">
              EdLab Math Simulation
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
              Direct and Inverse Proportion
            </h1>
            <p className="mt-3 max-w-3xl text-lg font-medium text-slate-700">
              Use playful simulations to see how quantities change together.
            </p>
          </div>

          <div className="rounded-2xl border-4 border-slate-900 bg-yellow-300 px-5 py-4 text-center shadow-[5px_5px_0px_#111827]">
            <p className="text-sm font-black uppercase">Current Mode</p>
            <p className="mt-1 text-2xl font-black">
              {mode === "direct" ? "🍎 Direct" : "👷 Inverse"}
            </p>
          </div>
        </header>

        <section className="mb-5 grid gap-3 md:grid-cols-2">
          <button
            onClick={() => setMode("direct")}
            className={`rounded-[1.5rem] border-4 border-slate-900 p-5 text-left shadow-[6px_6px_0px_#111827] transition hover:-translate-y-1 ${
              mode === "direct" ? "bg-red-200" : "bg-white"
            }`}
          >
            <p className="text-3xl">🍎</p>
            <h2 className="mt-2 text-2xl font-black">
              Direct Proportion: Apple Cost
            </h2>
            <p className="mt-2 font-medium text-slate-700">
              More apples means higher total cost.
            </p>
          </button>

          <button
            onClick={() => setMode("inverse")}
            className={`rounded-[1.5rem] border-4 border-slate-900 p-5 text-left shadow-[6px_6px_0px_#111827] transition hover:-translate-y-1 ${
              mode === "inverse" ? "bg-blue-200" : "bg-white"
            }`}
          >
            <p className="text-3xl">👷</p>
            <h2 className="mt-2 text-2xl font-black">
              Inverse Proportion: Workers and Days
            </h2>
            <p className="mt-2 font-medium text-slate-700">
              More workers means fewer days.
            </p>
          </button>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {mode === "direct" ? (
            <AppleShopSimulation
              apples={apples}
              pricePerApple={pricePerApple}
              totalCost={currentY}
              setApples={setApples}
              setPricePerApple={setPricePerApple}
            />
          ) : (
            <WorkerSimulation
              workers={workers}
              totalWork={totalWork}
              days={currentY}
              setWorkers={setWorkers}
              setTotalWork={setTotalWork}
            />
          )}

          <GraphPanel
            mode={mode}
            data={graphData}
            currentX={currentX}
            currentK={currentK}
            currentY={currentY}
          />
        </section>
      </section>

      <AIHelp page="simulation" />
    </main>
  );
}

function AppleShopSimulation({
  apples,
  pricePerApple,
  totalCost,
  setApples,
  setPricePerApple,
}: {
  apples: number;
  pricePerApple: number;
  totalCost: number;
  setApples: (value: number) => void;
  setPricePerApple: (value: number) => void;
}) {
  return (
    <div className="rounded-[2rem] border-4 border-slate-900 bg-white p-6 shadow-[8px_8px_0px_#111827]">
      <div className="mb-5">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-red-500">
          Direct Proportion Simulation
        </p>
        <h2 className="mt-2 text-4xl font-black">Apple Cost Shop</h2>
        <p className="mt-2 text-lg font-medium text-slate-700">
          Add apples to the crate and watch the total cost increase.
        </p>
      </div>

      <div className="rounded-[2rem] border-4 border-slate-900 bg-[#fff0dd] p-5">
        <div className="mb-5 grid gap-4 md:grid-cols-[1fr_230px]">
          <div>
            <div className="relative mx-auto h-72 w-full max-w-xl">
              <div className="absolute left-10 right-10 top-10 h-52 overflow-hidden rounded-xl border-4 border-[#6b4423] bg-[#b9824f] shadow-xl">
                <div className="absolute left-4 right-4 top-4 h-12 border-b-4 border-[#6b4423] bg-[#c99663]" />
                <div className="absolute bottom-0 left-0 right-0 h-20 border-t-4 border-[#6b4423] bg-[#c99663]" />

                <div className="absolute bottom-16 left-6 right-6">
                  <div className="grid grid-cols-4 place-items-center gap-x-2 gap-y-3">
                    {Array.from({ length: apples }, (_, index) => (
                      <div key={index} className="text-5xl leading-none">
                        🍎
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute left-20 top-4 h-10 w-4 -rotate-12 rounded bg-[#6b4423]" />
              <div className="absolute right-20 top-4 h-10 w-4 rotate-12 rounded bg-[#6b4423]" />

              <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-3">
                <button
                  onClick={() => setApples(Math.max(0, apples - 1))}
                  className="rounded-2xl border-4 border-slate-900 bg-white px-5 py-3 text-lg font-black shadow-[4px_4px_0px_#111827] hover:bg-red-100"
                >
                  − Apple
                </button>

                <button
                  onClick={() => setApples(Math.min(12, apples + 1))}
                  className="rounded-2xl border-4 border-slate-900 bg-red-400 px-5 py-3 text-lg font-black shadow-[4px_4px_0px_#111827] hover:bg-red-300"
                >
                  + Apple
                </button>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-3">
              <button
                onClick={() => setApples(0)}
                className="rounded-full border-4 border-slate-900 bg-orange-300 px-5 py-3 text-lg font-black shadow-[4px_4px_0px_#111827]"
              >
                Reset
              </button>

              <button
                onClick={() => setApples(5)}
                className="rounded-full border-4 border-slate-900 bg-yellow-300 px-5 py-3 text-lg font-black shadow-[4px_4px_0px_#111827]"
              >
                Start with 5
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <CounterBox label="Apples" value={String(apples)} emoji="🍎" />
            <CounterBox
              label="Price each"
              value={`Rs. ${pricePerApple}`}
              emoji="🏷️"
            />
            <CounterBox
              label="Total cost"
              value={`Rs. ${totalCost}`}
              emoji="💰"
              highlight
            />
          </div>
        </div>

        <div className="rounded-[1.5rem] border-4 border-slate-900 bg-white p-5">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-lg font-black">Price of one apple</label>
            <span className="rounded-full border-4 border-slate-900 bg-yellow-300 px-4 py-1 font-black">
              Rs. {pricePerApple}
            </span>
          </div>

          <input
            type="range"
            min={5}
            max={100}
            step={5}
            value={pricePerApple}
            onChange={(event) => setPricePerApple(Number(event.target.value))}
            className="w-full accent-red-500"
          />

          <p className="mt-4 rounded-xl bg-slate-100 p-4 text-lg font-bold">
            Formula: total cost = apples × price per apple
            <br />
            Rs. {totalCost} = {apples} × Rs. {pricePerApple}
          </p>
        </div>
      </div>
    </div>
  );
}

function WorkerSimulation({
  workers,
  totalWork,
  days,
  setWorkers,
  setTotalWork,
}: {
  workers: number;
  totalWork: number;
  days: number;
  setWorkers: (value: number) => void;
  setTotalWork: (value: number) => void;
}) {
  return (
    <div className="rounded-[2rem] border-4 border-slate-900 bg-white p-6 shadow-[8px_8px_0px_#111827]">
      <div className="mb-5">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-500">
          Inverse Proportion Simulation
        </p>
        <h2 className="mt-2 text-4xl font-black">Workers and Days</h2>
        <p className="mt-2 text-lg font-medium text-slate-700">
          Add workers to the same job and watch the number of days decrease.
        </p>
      </div>

      <div className="rounded-[2rem] border-4 border-slate-900 bg-[#eaf5ff] p-5">
        <div className="mb-5 grid gap-4 md:grid-cols-[1fr_230px]">
          <div>
            <div className="relative mx-auto flex min-h-72 max-w-xl flex-col items-center justify-center rounded-[2rem] border-4 border-slate-900 bg-white p-6">
              <div className="mb-6 rounded-2xl border-4 border-slate-900 bg-orange-200 px-8 py-5 text-center shadow-[5px_5px_0px_#111827]">
                <p className="text-lg font-black">Same Job</p>
                <p className="text-5xl">🏠</p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {Array.from({ length: workers }, (_, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border-4 border-slate-900 bg-blue-300 p-3 text-4xl shadow-[3px_3px_0px_#111827]"
                  >
                    👷
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => setWorkers(Math.max(1, workers - 1))}
                className="rounded-2xl border-4 border-slate-900 bg-white px-5 py-3 text-lg font-black shadow-[4px_4px_0px_#111827] hover:bg-blue-100"
              >
                − Worker
              </button>

              <button
                onClick={() => setWorkers(Math.min(12, workers + 1))}
                className="rounded-2xl border-4 border-slate-900 bg-blue-400 px-5 py-3 text-lg font-black shadow-[4px_4px_0px_#111827] hover:bg-blue-300"
              >
                + Worker
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <CounterBox label="Workers" value={String(workers)} emoji="👷" />
            <CounterBox label="Total work" value={`${totalWork}`} emoji="🧱" />
            <CounterBox
              label="Days needed"
              value={days.toFixed(2)}
              emoji="📅"
              highlight
            />
          </div>
        </div>

        <div className="rounded-[1.5rem] border-4 border-slate-900 bg-white p-5">
          <SliderControl
            label="Number of workers"
            value={workers}
            min={1}
            max={12}
            suffix=" workers"
            onChange={setWorkers}
          />

          <SliderControl
            label="Total work"
            value={totalWork}
            min={12}
            max={120}
            step={12}
            suffix=" worker-days"
            onChange={setTotalWork}
          />

          <p className="mt-4 rounded-xl bg-slate-100 p-4 text-lg font-bold">
            Formula: days = total work ÷ workers
            <br />
            {days.toFixed(2)} days = {totalWork} ÷ {workers}
          </p>
        </div>
      </div>
    </div>
  );
}

function GraphPanel({
  mode,
  data,
  currentX,
  currentK,
  currentY,
}: {
  mode: Mode;
  data: { x: number; y: number }[];
  currentX: number;
  currentK: number;
  currentY: number;
}) {
  return (
    <div className="rounded-[2rem] border-4 border-slate-900 bg-white p-6 shadow-[8px_8px_0px_#111827]">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-purple-500">
            Live Graph
          </p>
          <h2 className="mt-2 text-4xl font-black">
            {mode === "direct" ? "Apple Cost Graph" : "Workers vs Days Graph"}
          </h2>
        </div>

        <div className="rounded-2xl border-4 border-slate-900 bg-purple-200 px-4 py-3 text-sm font-black">
          {mode === "direct" ? "Direct: y = kx" : "Inverse: y = k / x"}
        </div>
      </div>

      <div className="h-80 rounded-[2rem] border-4 border-slate-900 bg-[#f8fbff] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 25, left: 0, bottom: 10 }}
          >
            <CartesianGrid stroke="#cbd5e1" strokeDasharray="4 4" />
            <XAxis
              dataKey="x"
              stroke="#111827"
              tick={{ fill: "#111827", fontWeight: 700 }}
            />
            <YAxis
              stroke="#111827"
              tick={{ fill: "#111827", fontWeight: 700 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "4px solid #111827",
                borderRadius: "16px",
                color: "#111827",
                fontWeight: 800,
              }}
              labelStyle={{ color: "#111827" }}
            />
            <Line
              type={mode === "direct" ? "linear" : "monotone"}
              dataKey="y"
              stroke={mode === "direct" ? "#ef4444" : "#3b82f6"}
              strokeWidth={5}
              dot={{
                r: 5,
                fill: mode === "direct" ? "#ef4444" : "#3b82f6",
                stroke: "#111827",
                strokeWidth: 2,
              }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <CounterBox
          label={mode === "direct" ? "Apples" : "Workers"}
          value={String(currentX)}
          emoji={mode === "direct" ? "🍎" : "👷"}
        />
        <CounterBox
          label={mode === "direct" ? "Price each" : "Total work"}
          value={mode === "direct" ? `Rs. ${currentK}` : `${currentK}`}
          emoji={mode === "direct" ? "🏷️" : "🧱"}
        />
        <CounterBox
          label={mode === "direct" ? "Total cost" : "Days"}
          value={
            mode === "direct" ? `Rs. ${currentY}` : currentY.toFixed(2)
          }
          emoji={mode === "direct" ? "💰" : "📅"}
          highlight
        />
      </div>
    </div>
  );
}

function CounterBox({
  label,
  value,
  emoji,
  highlight = false,
}: {
  label: string;
  value: string;
  emoji: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.25rem] border-4 border-slate-900 p-4 shadow-[4px_4px_0px_#111827] ${
        highlight ? "bg-green-200" : "bg-white"
      }`}
    >
      <p className="text-3xl">{emoji}</p>
      <p className="mt-1 text-sm font-black uppercase text-slate-600">
        {label}
      </p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}

function SliderControl({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="mb-5">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-lg font-black">{label}</label>
        <span className="rounded-full border-4 border-slate-900 bg-yellow-300 px-3 py-1 text-sm font-black">
          {value}
          {suffix}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-orange-500"
      />
    </div>
  );
}