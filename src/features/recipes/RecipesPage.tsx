import { useEffect, useState } from "react";
import { getRecipes } from "@/data/mealTrackerRepository";
import type { Recipe } from "@/domain/mealTrackerTypes";
import { Link } from "react-router-dom";
import { Page } from "@/components/ui/Page";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    getRecipes().then(setRecipes);
  }, []);

  return (
    <Page
      title="Recipes"
      description="Example recipe list with dynamic route support."
      actions={
        <Button variant="primary" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
          Add recipe
        </Button>
      }
    >
      <div className="space-y-3">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold">{recipe.name}</h2>
              <p className="text-sm text-slate-600">{recipe.description}</p>
            </div>

            <Link
              to={`/recipes/${recipe.id}`}
              className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Open
            </Link>
          </Card>
        ))}
      </div>
    </Page>
  );
}