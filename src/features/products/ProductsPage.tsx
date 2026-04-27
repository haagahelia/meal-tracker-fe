import { Link } from "react-router-dom";
import { Page } from "@/components/ui/Page";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const products = [
  { id: "1", name: "Oat flakes", kcal: 370 },
  { id: "2", name: "Chicken breast", kcal: 165 },
  { id: "3", name: "Greek yogurt", kcal: 97 },
];

export function ProductsPage() {

  return (
    <Page
      title="Products"
      description="Later: nutrition values, package prices, origin and sustainability."
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
      {/* EXISTING CONTENT (unchanged) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-base font-semibold">Product database</h2>
          <p className="mt-2 text-sm text-slate-600">
            Connect backend products here later.
          </p>
        </Card>

        <Card>
          <h2 className="text-base font-semibold">Barcode / label reading</h2>
          <p className="mt-2 text-sm text-slate-600">
            Future AI or scanner features can start from this page.
          </p>
        </Card>
      </div>

      {/* NEW: PRODUCTS LIST */}
      <div className="mt-6 space-y-3">
        {products.map((product) => (
          <Card
            key={product.id}
            className="flex items-center justify-between"
          >
            <div>
              <h3 className="text-base font-semibold">
                {product.name}
              </h3>
              <p className="text-sm text-slate-600">
                {product.kcal} kcal / 100g
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