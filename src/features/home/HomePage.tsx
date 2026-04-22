import { Link } from "react-router-dom";
import { Page } from "@/components/ui/Page";
import { Card } from "@/components/ui/Card";

const quickStats = [
  { label: "Today kcal", value: "1,420" },
  { label: "Protein", value: "82 g" },
  { label: "Fiber", value: "21 g" },
  { label: "Budget", value: "€5.80" },
];


export function HomePage() {
  return (
    <Page
      title="Meal Tracker"
      description="Mobile-first starter page for recipes, products and nutrition tracking."
      actions={
        <Link
          to="/recipes"
          className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Browse recipes
        </Link>
      }
    >
      <div className="bg-red-500 p-8 text-white rounded-2xl">
        Tailwind test
      </div>
      <Card className="space-y-3">
        <p className="text-sm text-slate-600">
          This is the starter frontend shell. Keep it minimal now, then connect
          backend endpoints later.
        </p>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {quickStats.map((item) => (
            <div
              key={item.label}
              className="rounded-xl bg-slate-50 p-3"
            >
              <div className="text-xs text-slate-500">{item.label}</div>
              <div className="mt-1 text-lg font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="space-y-2">
          <h2 className="text-base font-semibold">Recipes</h2>
          <p className="text-sm text-slate-600">
            Manage recipe totals, portion sizes and ingredient-based nutrition.
          </p>
          <Link to="/recipes" className="text-sm font-medium text-slate-900 underline">
            Open recipes
          </Link>
        </Card>

        <Card className="space-y-2">
          <h2 className="text-base font-semibold">Daily tracking</h2>
          <p className="text-sm text-slate-600">
            Follow calories, protein, fiber, fats, sugars and spending.
          </p>
          <Link to="/tracker" className="text-sm font-medium text-slate-900 underline">
            Open tracker
          </Link>
        </Card>
      </div>
    </Page>
  );
}