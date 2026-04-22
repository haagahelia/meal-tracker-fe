import { Page } from "@/components/ui/Page";
import { Card } from "@/components/ui/Card";

const metrics = [
  ["Calories", "1,420 / 2,100 kcal"],
  ["Protein", "82 / 120 g"],
  ["Fiber", "21 / 30 g"],
  ["Fat", "43 g"],
  ["Sugars", "18 g"],
  ["Budget", "€5.80 / €10.00"],
];

export function TrackerPage() {
  return (
    <Page
      title="Tracker"
      description="Simple daily dashboard placeholder."
    >
      <Card className="space-y-3">
        {metrics.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between border-b border-slate-100 py-2 last:border-b-0"
          >
            <span className="text-sm text-slate-600">{label}</span>
            <span className="text-sm font-semibold text-slate-900">{value}</span>
          </div>
        ))}
      </Card>
    </Page>
  );
}