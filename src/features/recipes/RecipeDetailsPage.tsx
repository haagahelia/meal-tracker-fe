import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Page } from "@/components/ui/Page";
import { Card } from "@/components/ui/Card";

import {
  getRecipeById,
  getRecipeIngredients,
  getIngredientById,
  getRecipeDetails,
} from "@/data/mealTrackerRepository";

type EnrichedIngredientRow = {
  recipe_id: number;
  ingredient_id: number;
  amount: number;
  ingredient?: {
    id: number;
    name: string;
    unit: string;
  };
};

export function RecipeDetailsPage() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        setLoading(true);

        // Get recipe
        const recipeData = await getRecipeById(Number(id));

        if (!recipeData) {
          setRecipe(null);
          return;
        }

        // Get recipe ingredients (raw relations)
        const recipeIngredients = await getRecipeIngredients(Number(id));

        // Enrich with ingredient details (API calls)
        const enriched: EnrichedIngredientRow[] = await Promise.all(
          recipeIngredients.map(async (ri: any) => {
            const ingredient = await getIngredientById(ri.ingredient_id);

            return {
              ...ri,
              ingredient: ingredient
                ? {
                  id: ingredient.id,
                  name: ingredient.name,
                  unit: ingredient.unit,
                }
                : undefined,
            };
          })
        );

        setRecipe({
          ...recipeData,
          ingredients: enriched,
        });
      } catch {
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  // update amount (LOCAL only for now)
  function updateAmount(index: number, value: string) {
    setRecipe((prev: any) => {
      const updated = [...prev.ingredients];

      updated[index] = {
        ...updated[index],
        amount: Number(value),
      };

      return {
        ...prev,
        ingredients: updated,
      };
    });

    // OPTIONAL API SYNC (if backend supports PATCH)
    // await fetch(`${API_BASE_URL}/recipeingredients/...`, { method: "PATCH" })
  }

  // delete ingredient (LOCAL only for now)
  function deleteIngredient(index: number) {
    setRecipe((prev: any) => {
      const updated = prev.ingredients.filter(
        (_: any, i: number) => i !== index
      );

      return {
        ...prev,
        ingredients: updated,
      };
    });

    // OPTIONAL API SYNC (DELETE endpoint)
  }

  const totals = useMemo(() => {
    if (!recipe?.ingredients) return null;

    const totalWeight = recipe.ingredients.reduce(
      (sum: number, row: any) => sum + (row.amount || 0),
      0
    );

    return {
      totalWeight,
      portion: `${Math.round(totalWeight / 2)} g`,
    };
  }, [recipe]);

  // loading state
  if (loading) {
    return (
      <Page title="Loading..." description="Fetching recipe details">
        <Card>
          <p className="text-sm text-slate-600">Loading recipe...</p>
        </Card>
      </Page>
    );
  }

  // not found
  if (!recipe) {
    return (
      <Page
        title="Recipe not found"
        description="No recipe matched this route parameter."
      >
        <Card className="space-y-3">
          <p className="text-sm text-slate-600">
            Try going back to the recipe list.
          </p>
          <Link to="/recipes" className="text-sm font-medium underline">
            Back to recipes
          </Link>
        </Card>
      </Page>
    );
  }

  return (
    <Page
      title={recipe.name}
      description={recipe.description}
      actions={
        <div className="flex gap-2">
          <Link
            to="/recipes"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
          >
            Back
          </Link>

          <button
            onClick={() => setIsEditing((v: boolean) => !v)}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
          >
            {isEditing ? "Done" : "Edit"}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.5fr_1fr]">
        {/* INGREDIENTS */}
        <Card className="space-y-3">
          <h2 className="text-base font-semibold">Ingredients</h2>

          <ul className="space-y-2 text-sm text-slate-700">
            {recipe.ingredients.map((row: any, index: number) => (
              <li
                key={`${row.recipe_id}-${row.ingredient_id}`}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"
              >
                <span>{row.ingredient?.name ?? "Unknown"}</span>

                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <input
                      type="number"
                      value={row.amount}
                      onChange={(e) =>
                        updateAmount(index, e.target.value)
                      }
                      className="w-20 rounded-lg border px-2 py-1 text-sm text-right"
                    />
                  ) : (
                    <span className="font-medium">
                      {row.amount} {row.ingredient?.unit}
                    </span>
                  )}

                  {isEditing && (
                    <button
                      onClick={() => deleteIngredient(index)}
                      className="text-red-500 text-xs"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* SUMMARY */}
        <Card className="space-y-3">
          <h2 className="text-base font-semibold">Summary</h2>

          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span>Total recipe size</span>
              <span className="font-medium">
                {totals?.totalWeight ?? 0} g
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Portion size</span>
              <span className="font-medium">
                {totals?.portion ?? "—"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Status</span>
              <span className="font-medium text-green-600">
                Active
              </span>
            </div>
          </div>
        </Card>
      </div>
    </Page>
  );
}
