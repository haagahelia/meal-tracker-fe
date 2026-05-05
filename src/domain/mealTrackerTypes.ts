export type IngredientUnit = "g" | "ml" | "pcs";

export type Ingredient = {
  id: number;
  name: string;
  unit: IngredientUnit;
  calories_per_100: number;
  protein_per_100: number;
  fiber_per_100: number;
  sugar_per_100: number;
  fat_per_100: number;
  salt_per_100: number;
};

export type Recipe = {
  id: number;
  name: string;
  description: string;
  image_url: string;
};

export type RecipeIngredient = {
  recipe_id: number;
  ingredient_id: number;
  amount: number;
};