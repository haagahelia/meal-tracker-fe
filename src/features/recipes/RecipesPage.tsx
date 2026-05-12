import { useEffect, useState } from "react";
import { getRecipes } from "@/data/mealTrackerRepository";
import type { Recipe } from "@/domain/mealTrackerTypes";
import { Link } from "react-router-dom";
import { Page } from "@/components/ui/Page";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadRecipes() {
      try {
        setLoading(true);
        const data = await getRecipes();

        if (isMounted) {
          setRecipes(data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load recipes");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadRecipes();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Page
      title="Recipes"
      description="View all your recipes."
      actions={
        <Link to="/recipes/create">
          <Button className="rounded-xl px-4 py-2 text-sm font-medium">
            Add recipe
          </Button>
        </Link>
      }
    >
      {loading && (
        <Card className="text-sm text-slate-500">
          Loading recipes...
        </Card>
      )}

      {error && (
        <Card className="text-sm text-red-500">
          {error}
        </Card>
      )}

      {!loading && !error && (
        <div className="grid gap-3">
          {recipes.length === 0 ? (
            <p className="text-sm text-slate-500">No recipes found.</p>
          ) : (
            recipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="flex items-center justify-between gap-4 p-4"
              >
                <div>
                  <h2 className="text-base font-semibold">{recipe.name}</h2>
                  <p className="text-sm text-slate-600">
                    {recipe.description}
                  </p>
                </div>

                <Link
                  to={`/recipes/${recipe.id}`}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Open
                </Link>
              </Card>
            ))
          )}
        </div>
      )}
    </Page>
  );
}