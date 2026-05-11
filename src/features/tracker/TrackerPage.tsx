import { useState } from "react";
import { Page } from "@/components/ui/Page";
import { Card } from "@/components/ui/Card";

import {
  ingredients,
  recipes,
  recipeIngredients,
} from "@/data/seed/mealTrackerSeed";

type MealType = "breakfast" | "lunch" | "dinner" | "snack";

type MealEntry = {
  id: number;
  date: string;
  recipe_id: number;
  servings: number;
  meal_type: MealType;
};

const initialMeals: MealEntry[] = [
  { id: 1, date: "2026-05-11", recipe_id: 1, servings: 1, meal_type: "breakfast" },
  { id: 2, date: "2026-05-11", recipe_id: 3, servings: 1, meal_type: "lunch" },
];

const GOALS = {
  calories: 2100,
  protein: 120,
  fiber: 30,
};

function calcNutrition(recipeId: number, servings: number) {
  const links = recipeIngredients.filter((ri) => ri.recipe_id === recipeId);

  return links.reduce(
    (acc, ri) => {
      const ing = ingredients.find((i) => i.id === ri.ingredient_id);
      if (!ing) return acc;

      const factor = (ri.amount * servings) / 100;

      return {
        calories: acc.calories + ing.calories_per_100 * factor,
        protein: acc.protein + ing.protein_per_100 * factor,
        fiber: acc.fiber + ing.fiber_per_100 * factor,
      };
    },
    { calories: 0, protein: 0, fiber: 0 }
  );
}

function getBarStyle(current: number, goal: number) {
  const ratio = current / goal;

  // over goal → calm "attention" color (not red)
  if (ratio > 1) {
    return "bg-gradient-to-r from-indigo-400 to-indigo-500 shadow-indigo-100";
  }

  // near limit → warm warning (soft amber)
  if (ratio > 0.9) {
    return "bg-gradient-to-r from-amber-300 to-amber-400 shadow-amber-100";
  }

  // normal → healthy green
  return "bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-emerald-100";
}

export function TrackerPage() {
  const today = "2026-05-11";

  const [meals, setMeals] = useState<MealEntry[]>(initialMeals);

  // Modal state instead of inline picker
  const [pickerType, setPickerType] = useState<MealType | null>(null);

  const filtered = meals.filter((m) => m.date === today);

  const grouped = {
    breakfast: filtered.filter((m) => m.meal_type === "breakfast"),
    lunch: filtered.filter((m) => m.meal_type === "lunch"),
    dinner: filtered.filter((m) => m.meal_type === "dinner"),
    snack: filtered.filter((m) => m.meal_type === "snack"),
  };

  const totals = filtered.reduce(
    (acc, meal) => {
      const n = calcNutrition(meal.recipe_id, meal.servings);

      return {
        calories: acc.calories + n.calories,
        protein: acc.protein + n.protein,
        fiber: acc.fiber + n.fiber,
      };
    },
    { calories: 0, protein: 0, fiber: 0 }
  );

  const metrics = [
    { label: "Calories", current: totals.calories, goal: GOALS.calories },
    { label: "Protein", current: totals.protein, goal: GOALS.protein },
    { label: "Fiber", current: totals.fiber, goal: GOALS.fiber },
  ];

  function addMeal(type: MealType, recipeId: number) {
    setMeals((prev) => [
      ...prev,
      {
        id: Date.now(),
        date: today,
        recipe_id: recipeId,
        servings: 1,
        meal_type: type,
      },
    ]);

    setPickerType(null);
  }

  function deleteMeal(id: number) {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  }

  function MealSection({
    title,
    type,
    meals,
  }: {
    title: string;
    type: MealType;
    meals: MealEntry[];
  }) {
    const colorMap: Record<MealType, string> = {
      breakfast: "bg-amber-50 text-amber-700",
      lunch: "bg-emerald-50 text-emerald-700",
      dinner: "bg-indigo-50 text-indigo-700",
      snack: "bg-pink-50 text-pink-700",
    };

    return (
      <Card className="space-y-3 border border-slate-100 bg-white shadow-sm">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${colorMap[type]}`}
          >
            {title}
          </span>

          <button
            onClick={() => setPickerType(type)}
            className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white"
          >
            + Add
          </button>
        </div>

        {/* MEALS */}
        {meals.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-3 text-center">
            <p className="text-xs text-slate-400">No meals added yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {meals.map((meal) => {
              const recipe = recipes.find((r) => r.id === meal.recipe_id);
              const nutrition = calcNutrition(meal.recipe_id, meal.servings);

              return (
                <div
                  key={meal.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3 transition hover:shadow-sm"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {recipe?.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {meal.servings} serving
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-slate-900">
                      {Math.round(nutrition.calories)} kcal
                    </span>

                    <button
                      onClick={() => deleteMeal(meal.id)}
                      className="rounded-full p-1 text-xs text-slate-400 hover:bg-red-50 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    );
  }

  return (
    <Page title="Tracker" description="Track your daily nutrition.">
      <div className="space-y-4">
        {/* METRICS */}
        {metrics.map((m) => {
          const progress = (m.current / m.goal) * 100;
          const isOver = m.current > m.goal;

          return (
            <Card key={m.label} className="space-y-3">
              {/* HEADER */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">
                  {m.label}
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  {Math.round(m.current)} / {m.goal}
                </span>
              </div>

              {/* BAR */}
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`
            h-full rounded-full 
            transition-all duration-700 ease-out
            ${getBarStyle(m.current, m.goal)}
            ${isOver ? "shadow-lg" : ""}
          `}
                  style={{
                    width: `${Math.min(progress, 120)}%`,
                  }}
                />
              </div>

              {/* OPTIONAL: subtle hint text */}
              {isOver && (
                <p className="text-xs text-indigo-500 font-medium">
                  Above goal
                </p>
              )}
            </Card>
          );
        })}

        {/* SECTIONS */}
        <MealSection title="Breakfast" type="breakfast" meals={grouped.breakfast} />
        <MealSection title="Lunch" type="lunch" meals={grouped.lunch} />
        <MealSection title="Dinner" type="dinner" meals={grouped.dinner} />
        <MealSection title="Snacks" type="snack" meals={grouped.snack} />
      </div>

      {/* MODAL PICKER */}
      {pickerType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[92%] max-w-sm rounded-2xl bg-white p-4 shadow-xl">

            {/* HEADER */}
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">
                Add {pickerType}
              </p>

              <button
                onClick={() => setPickerType(null)}
                className="text-sm text-slate-400"
              >
                Close
              </button>
            </div>

            {/* LIST */}
            <div className="max-h-80 space-y-2 overflow-y-auto">
              {recipes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => addMeal(pickerType, r.id)}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 text-left transition hover:bg-slate-100"
                >
                  <span className="text-sm font-medium">{r.name}</span>
                  <span className="text-xs text-emerald-600">+</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}