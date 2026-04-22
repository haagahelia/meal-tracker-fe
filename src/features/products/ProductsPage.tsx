import { Page } from "@/components/ui/Page";
import { Card } from "@/components/ui/Card";

export function ProductsPage() {
  return (
    <Page
      title="Products"
      description="Later: nutrition values, package prices, origin and sustainability."
    >
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
    </Page>
  );
}