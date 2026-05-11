import type { Ingredient, Recipe } from "@/domain/mealTrackerTypes";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4678/api/mealtracker";

export async function getIngredients(): Promise<Ingredient[]> {
  const response = await fetch(`${API_BASE_URL}/ingredients`);
  if (!response.ok) throw new Error("Failed to fetch ingredients");
  return response.json();
}

export async function getIngredientById(id: number): Promise<Ingredient | undefined> {
  const response = await fetch(`${API_BASE_URL}/ingredients/${id}`);

  if (response.status === 404) return undefined;
  if (!response.ok) throw new Error("Failed to fetch ingredient");

  return response.json();
}

export async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${API_BASE_URL}/recipes`);
  if (!response.ok) throw new Error("Failed to fetch recipes");
  return response.json();
}

export async function getRecipeById(id: number): Promise<Recipe | undefined> {
  const response = await fetch(`${API_BASE_URL}/recipes/${id}`);

  if (response.status === 404) return undefined;
  if (!response.ok) throw new Error("Failed to fetch recipe");

  return response.json();
}

export async function getRecipeDetails(id: number) {
  const response = await fetch(`${API_BASE_URL}/recipes/${id}/details`);

  if (response.status === 404) return undefined;
  if (!response.ok) throw new Error("Failed to fetch recipe details");

  return response.json();
}

export async function getRecipeIngredients(recipeId: number) {
  const response = await fetch(`${API_BASE_URL}/recipeingredients/${recipeId}`);

  if (!response.ok) throw new Error("Failed to fetch recipe ingredients");

  return response.json();
}

export async function createIngredient(
  ingredient: Omit<Ingredient, "id">
): Promise<Ingredient> {
  const response = await fetch(`${API_BASE_URL}/ingredients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingredient),
  });

  if (!response.ok) {
    throw new Error("Failed to create ingredient");
  }

  return response.json();
}