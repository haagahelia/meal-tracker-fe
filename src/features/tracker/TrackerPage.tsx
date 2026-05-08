import { useState } from "react";
import { Page } from "@/components/ui/Page";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const metrics = [
  ["Calories", "1,420 / 2,100 kcal"],
  ["Protein", "82 / 120 g"],
  ["Fiber", "21 / 30 g"],
  ["Fat", "43 g"],
  ["Sugars", "18 g"],
  ["Budget", "€5.80 / €10.00"],
];

export function TrackerPage() {
  const [showAddMealForm, setShowAddMealForm] = useState(false);

  return (
    <Page
      title="Tracker"
      description="Simple daily dashboard placeholder."
      actions={
        <Button onClick={() => setShowAddMealForm(true)}>Add Meal</Button>
      }
    >
      {showAddMealForm ? (
        <Card className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Add Meal</h2>
            <p className="text-sm text-slate-600">Log a new meal to your tracker.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1 text-sm text-slate-700">
              Meal name
              <Input placeholder="e.g. Avocado toast" />
            </label>
            <label className="space-y-1 text-sm text-slate-700">
              Calories
              <Input type="number" placeholder="420" />
            </label>
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            <Button variant="secondary" onClick={() => setShowAddMealForm(false)}>
              Cancel
            </Button>
            <Button>Create Meal</Button>
          </div>
        </Card>
      ) : null}

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