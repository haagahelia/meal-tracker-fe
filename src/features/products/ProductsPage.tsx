import { useEffect, useState } from "react";
import { getIngredients } from "@/data/mealTrackerRepository";
import type { Ingredient } from "@/domain/mealTrackerTypes";

import { Link } from "react-router-dom";
import { Page } from "@/components/ui/Page";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function ProductsPage() {
  const [products, setProducts] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getIngredients();
        setProducts(data);
      } catch (e) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <Page
      title="Products"
      description="View the products and add new."
      actions={
        <Link to="/products/create">
          <Button
            variant="primary"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Create Product
          </Button>
        </Link>
      }
    >

      {/* LIST AREA */}
      <div className="mt-6 space-y-3">
        {/* LOADING */}
        {loading && (
          <Card className="text-sm text-slate-500">
            Loading products...
          </Card>
        )}

        {/* ERROR */}
        {error && (
          <Card className="text-sm text-red-500">
            {error}
          </Card>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && products.length === 0 && (
          <Card className="text-sm text-slate-500">
            No products found.
          </Card>
        )}

        {/* PRODUCTS */}
        {!loading &&
          !error &&
          products.map((product) => (
            <Card
              key={product.id}
              className="flex items-center justify-between"
            >
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {product.name}
                </h3>

                <p className="text-sm text-slate-600">
                  {product.calories_per_100} kcal / 100{product.unit}
                </p>
              </div>

              <Link
                to={`/products/${product.id}`}
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