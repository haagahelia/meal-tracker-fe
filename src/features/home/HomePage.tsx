import { Link } from "react-router-dom";
import { Page } from "@/components/ui/Page";
import { Card } from "@/components/ui/Card";

const stats = {
  kcal: 1492,
  kcalTarget: 2000,
  protein: { value: 82, target: 120, unit: "g" },
  fiber: { value: 21, target: 30, unit: "g" },
  budget: { value: 5.8, target: 10, unit: "€" },
};

// safe % calculation helper
function getPercent(value: number, target: number) {
  return (value / target) * 100;
}

// unified color system
function getColor(percent: number) {
  if (percent < 70) return "#22c55e"; // green
  if (percent < 100) return "#f59e0b"; // orange
  return "#3b82f6"; // blue (over)
}

function getTextColor(percent: number) {
  if (percent < 70) return "text-green-600";
  if (percent < 100) return "text-orange-500";
  return "text-blue-600";
}

// robust “exact target” detection
function isExact(percent: number) {
  return percent >= 99.5 && percent <= 100.5;
}

function getInsight(percent: number) {
  if (percent < 50) return "You are below your daily target";
  if (percent < 70) return "You are on track";
  if (percent < 100) return "You are close to your limit";
  if (isExact(percent)) return "You reached your exact daily target";
  return "You are above your daily limit";
}

// Circular calorie chart
function CircularKcal({ value, target }: { value: number; target: number }) {
  const percentRaw = (value / target) * 100;
  const percent = Math.min(percentRaw, 100);

  const size = 200;
  const radius = 70;
  const stroke = 14;

  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  const color = getColor(percentRaw);

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="absolute">
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={stroke}
            fill="transparent"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={color}
            strokeWidth={stroke}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>

        {/* center text */}
        <div className="text-center z-10">
          <div className="text-3xl font-semibold">{value}</div>
          <div className="text-xs text-slate-500">/ {target} kcal</div>
        </div>
      </div>
    </div>
  );
}

export function HomePage() {
  const kcalPercent = getPercent(stats.kcal, stats.kcalTarget);
  const kcalRounded = Math.round(kcalPercent);

  return (
    <Page
      title="Meal Tracker"
      description="Track your nutrition and stay within your daily targets."
      actions={
        <Link
          to="/recipes"
          className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Browse recipes
        </Link>
      }
    >
      {/* HERO */}
      <Card className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <CircularKcal value={stats.kcal} target={stats.kcalTarget} />

        <div>
          <h2 className="text-base font-semibold">Today</h2>

          <p className={`mt-2 text-sm font-medium ${getTextColor(kcalPercent)}`}>
            {getInsight(kcalPercent)}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            You are at{" "}
            <span className="font-semibold">{kcalRounded}%</span> of your calorie
            target.
          </p>
        </div>
      </Card>

      {/* OTHER STATS */}
      <Card className="mt-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {[
            { label: "Protein", ...stats.protein },
            { label: "Fiber", ...stats.fiber },
            { label: "Budget", ...stats.budget },
          ].map((item) => {
            const percent = getPercent(item.value, item.target);
            const color = getColor(percent);

            return (
              <div key={item.label} className="rounded-xl bg-slate-50 p-3">
                <div className="text-xs text-slate-500">{item.label}</div>

                <div className="text-lg font-semibold">
                  {item.value}
                  <span className="text-xs text-slate-500 ml-1">
                    {item.unit}
                  </span>
                </div>

                <div className="mt-2 h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-1 rounded-full"
                    style={{
                      width: `${Math.min(percent, 100)}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* NAV */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="space-y-2 hover:shadow-sm transition">
          <h2 className="text-base font-semibold">Recipes</h2>
          <p className="text-sm text-slate-600">
            Build meals from ingredients and track nutrition automatically.
          </p>
          <Link
            to="/recipes"
            className="text-sm font-medium text-slate-900 underline"
          >
            Open recipes →
          </Link>
        </Card>

        <Card className="space-y-2 hover:shadow-sm transition">
          <h2 className="text-base font-semibold">Daily tracker</h2>
          <p className="text-sm text-slate-600">
            Log meals and track calories, protein and budget.
          </p>
          <Link
            to="/tracker"
            className="text-sm font-medium text-slate-900 underline"
          >
            Open tracker →
          </Link>
        </Card>
      </div>
    </Page>
  );
}