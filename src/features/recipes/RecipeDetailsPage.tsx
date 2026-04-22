import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Page } from "@/components/ui/Page";
import { Card } from "@/components/ui/Card";

const recipeMap: Record<
  string,
  {
    name: string;
    totalWeight: string;
    portion: string;
    ingredients: { name: string; amount: string }[];
  }
> = {
  "1": {
    name: "Blueberry oatmeal",
    totalWeight: "650 g",
    portion: "300 g",
    ingredients: [
      { name: "Fat-free milk", amount: "2 dl" },
      { name: "Oat flakes", amount: "55 g" },
      { name: "Blueberries", amount: "100 g" },
      { name: "Water", amount: "3 dl" },
    ],
  },
  "2": {
    name: "Chicken rice bowl",
    totalWeight: "900 g",
    portion: "450 g",
    ingredients: [
      { name: "Chicken breast", amount: "300 g" },
      { name: "Rice", amount: "200 g" },
      { name: "Broccoli", amount: "200 g" },
      { name: "Soy sauce", amount: "20 g" },
    ],
  },
  "3": {
    name: "Lentil soup",
    totalWeight: "1,000 g",
    portion: "350 g",
    ingredients: [
      { name: "Red lentils", amount: "200 g" },
      { name: "Carrot", amount: "120 g" },
      { name: "Onion", amount: "80 g" },
      { name: "Vegetable stock", amount: "600 g" },
    ],
  },
};

export function RecipeDetailsPage() {
  const { id } = useParams();

  const recipe = useMemo(() => {
    if (!id) return undefined;
    return recipeMap[id];
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
            {recipe.ingredients.map((ingredient) => (
              <li
                key={ingredient.name}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"
              >
                <span>{ingredient.name}</span>
                <span className="font-medium">{ingredient.amount}</span>
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