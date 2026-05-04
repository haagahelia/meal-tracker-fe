import { useEffect, useState, useMemo } from "react";
import { getRecipeDetails } from "@/data/mealTrackerRepository";
import { Link, useParams } from "react-router-dom";
import { Page } from "@/components/ui/Page";
import { Card } from "@/components/ui/Card";



export function RecipeDetailsPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>();

  useEffect(() => {
    if (!id) return;

    getRecipeDetails(Number(id)).then(setRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <Page title="Recipe not found" description="No recipe matched this route parameter.">
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
      description={`Dynamic route example: /recipes/${id}`}
      actions={
        <Link
          to="/recipes"
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
        >
          Back
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.5fr_1fr]">
        <Card className="space-y-3">
          <h2 className="text-base font-semibold">Ingredients</h2>
          <ul className="space-y-2 text-sm text-slate-700">
            {recipe.ingredients.map((row: any) => (
              <li
                key={row.ingredient_id}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"
              >
                <span>{row.ingredient?.name}</span>
                <span className="font-medium">
                  {row.amount} {row.ingredient?.unit}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="space-y-3">
          <h2 className="text-base font-semibold">Summary</h2>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span>Total recipe size</span>
              <span className="font-medium">{recipe.totalWeight}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Portion size</span>
              <span className="font-medium">{recipe.portion}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Status</span>
              <span className="font-medium">Placeholder</span>
            </div>
          </div>
        </Card>
      </div>
    </Page>
  );
}