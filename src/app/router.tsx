import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { HomePage } from "@/features/home/HomePage";
import { RecipesPage } from "@/features/recipes/RecipesPage";
import { RecipeDetailsPage } from "@/features/recipes/RecipeDetailsPage";
import { ProductsPage } from "@/features/products/ProductsPage";
import { TrackerPage } from "@/features/tracker/TrackerPage";
import { SettingsPage } from "@/features/settings/SettingsPage";
import { CreateProduct } from "@/features/products/CreateProduct";
import { ProductDetailsPage } from "@/features/products/ProductDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "recipes", element: <RecipesPage /> },
      { path: "recipes/:id", element: <RecipeDetailsPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "tracker", element: <TrackerPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "products/create", element: <CreateProduct /> },
      { path: "products/:id", element: <ProductDetailsPage /> }
    ],
  },
]);