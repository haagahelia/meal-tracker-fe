import {
  ingredients,
  recipes,
  recipeIngredients,
} from "@/data/seed/mealTrackerSeed";

export async function getIngredients() {
  return ingredients;
}

export async function getIngredientById(id: number) {
  return ingredients.find((ingredient) => ingredient.id === id);
}

export async function getRecipes() {
  return recipes;
}

export async function getRecipeById(id: number) {
  return recipes.find((recipe) => recipe.id === id);
}

export async function getRecipeDetails(id: number) {
  const recipe = recipes.find((recipe) => recipe.id === id);

  if (!recipe) return undefined;

  const ingredientRows = recipeIngredients.filter(
    (row) => row.recipe_id === id
  );

  return {
    ...recipe,
    ingredients: ingredientRows.map((row) => {
      const ingredient = ingredients.find(
        (item) => item.id === row.ingredient_id
      );

      return {
        ...row,
        ingredient,
      };
    }),
  };
}

/*
Later:
const response = await fetch("/api/ingredients");
return response.json();
*/