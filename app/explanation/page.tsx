import Link from "next/link";
import AIHelp from "@/components/AIHelp";

export default function ExplanationPage() {
  return (
    <main className="min-h-screen bg-[#fff6ec] text-slate-950">
      <section className="mx-auto max-w-5xl px-5 py-8 md:px-8">
        <Link href="/" className="font-black text-orange-600">
          ← Back to topic
        </Link>

        <div className="mt-5 rounded-[2rem] border-4 border-slate-900 bg-white p-8 shadow-[8px_8px_0px_#111827]">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-500">
            Explanation
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Direct and Inverse Proportion
          </h1>

          <p className="mt-4 text-lg font-medium leading-8 text-slate-700">
            Proportion is about how two quantities are connected. Sometimes they
            increase together. Sometimes one increases while the other
            decreases.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border-4 border-slate-900 bg-red-100 p-6 shadow-[5px_5px_0px_#111827]">
              <p className="text-5xl">🍎</p>
              <h2 className="mt-3 text-3xl font-black">Direct Proportion</h2>

              <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
                In direct proportion, both quantities move in the same
                direction. If one goes up, the other also goes up.
              </p>

              <p className="mt-4 rounded-xl bg-white p-4 text-xl font-black">
                y = kx
              </p>

              <p className="mt-4 text-lg font-medium leading-8 text-slate-700">
                Example: If one apple costs Rs. 20, then 5 apples cost Rs. 100.
                More apples means more total cost.
              </p>

              <div className="mt-5 rounded-2xl border-4 border-slate-900 bg-white p-5">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">
                  Worked Example
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  8 apples cost how much?
                </h3>

                <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
                  Suppose one apple costs Rs. 20. Since cost is directly
                  proportional to the number of apples, we use:
                </p>

                <p className="mt-4 rounded-xl bg-red-100 p-4 text-xl font-black">
                  y = kx
                </p>

                <div className="mt-4 space-y-3 text-lg font-bold text-slate-700">
                  <p>k = 20 because one apple costs Rs. 20</p>
                  <p>x = 8 because there are 8 apples</p>
                  <p>y = 20 × 8</p>
                  <p className="rounded-xl bg-green-200 p-3 text-2xl font-black text-slate-950">
                    y = Rs. 160
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border-4 border-slate-900 bg-blue-100 p-6 shadow-[5px_5px_0px_#111827]">
              <p className="text-5xl">👷</p>
              <h2 className="mt-3 text-3xl font-black">Inverse Proportion</h2>

              <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
                In inverse proportion, the quantities move in opposite
                directions. If one goes up, the other goes down.
              </p>

              <p className="mt-4 rounded-xl bg-white p-4 text-xl font-black">
                y = k / x
              </p>

              <p className="mt-4 text-lg font-medium leading-8 text-slate-700">
                Example: If more workers do the same job, the number of days
                needed becomes smaller.
              </p>

              <div className="mt-5 rounded-2xl border-4 border-slate-900 bg-white p-5">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-500">
                  Worked Example
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  12 workers take how many days?
                </h3>

                <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
                  Suppose the total work is 48 worker-days. Since days are
                  inversely proportional to the number of workers, we use:
                </p>

                <p className="mt-4 rounded-xl bg-blue-100 p-4 text-xl font-black">
                  y = k / x
                </p>

                <div className="mt-4 space-y-3 text-lg font-bold text-slate-700">
                  <p>k = 48 because the total work is fixed</p>
                  <p>x = 12 because there are 12 workers</p>
                  <p>y = 48 / 12</p>
                  <p className="rounded-xl bg-green-200 p-3 text-2xl font-black text-slate-950">
                    y = 4 days
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border-4 border-slate-900 bg-green-100 p-6 shadow-[5px_5px_0px_#111827]">
            <h2 className="text-3xl font-black">How to remember it</h2>
            <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
              Direct means together. Inverse means opposite.
            </p>
            <ul className="mt-4 space-y-2 text-lg font-bold text-slate-700">
              <li>📈 Direct: more apples → more cost</li>
              <li>📉 Inverse: more workers → fewer days</li>
            </ul>
          </div>
        </div>
      </section>

      <AIHelp page="explanation" />
    </main>
  );
}