import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Page } from "@/components/ui/Page";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const productMap: Record<
    string,
    {
        name: string;
        unit: string;
        calories_per_100: number;
        protein_per_100: number;
        fiber_per_100: number;
        sugar_per_100: number;
        fat_per_100: number;
        salt_per_100: number;
    }
> = {
    "1": {
        name: "Oat flakes",
        unit: "g",
        calories_per_100: 370,
        protein_per_100: 13,
        fiber_per_100: 10,
        sugar_per_100: 1,
        fat_per_100: 7,
        salt_per_100: 0.01,
    },
    "2": {
        name: "Chicken breast",
        unit: "g",
        calories_per_100: 165,
        protein_per_100: 31,
        fiber_per_100: 0,
        sugar_per_100: 0,
        fat_per_100: 3.6,
        salt_per_100: 0.18,
    },
    "3": {
        name: "Greek yogurt",
        unit: "g",
        calories_per_100: 97,
        protein_per_100: 10,
        fiber_per_100: 0,
        sugar_per_100: 4,
        fat_per_100: 5,
        salt_per_100: 0.1,
    },
};

export function ProductDetailsPage() {
    const { id } = useParams();

    const product = useMemo(() => {
        if (!id) return undefined;
        return productMap[id];
    }, [id]);

    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState(product);

    if (!product || !form) {
        return (
            <Page title="Product not found" description="No product matched this route parameter.">
                <Card className="space-y-3">
                    <p className="text-sm text-slate-600">
                        Try going back to the product list.
                    </p>
                    <Link to="/products" className="text-sm font-medium underline">
                        Back to products
                    </Link>
                </Card>
            </Page>
        );
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Page
            title={isEditing ? "Edit product" : form.name}
            description={`Unit: ${form.unit}`}
            actions={
                <Link
                    to="/products"
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
                >
                    Back
                </Link>
            }
        >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.5fr_1fr]">

                {/* LEFT: Nutrition */}
                <Card className="space-y-3">
                    <h2 className="text-base font-semibold">
                        Nutrition per 100g
                    </h2>

                    <ul className="space-y-2 text-sm text-slate-700">
                        {[
                            ["Calories", "calories_per_100"],
                            ["Protein", "protein_per_100"],
                            ["Fiber", "fiber_per_100"],
                            ["Sugar", "sugar_per_100"],
                            ["Fat", "fat_per_100"],
                            ["Salt", "salt_per_100"],
                        ].map(([label, key]) => (
                            <li
                                key={key}
                                className="flex justify-between rounded-xl bg-slate-50 px-3 py-2"
                            >
                                <span>{label}</span>

                                {isEditing ? (
                                    <input
                                        name={key}
                                        value={(form as any)[key]}
                                        onChange={handleChange}
                                        className="w-24 rounded-lg border px-2 py-1 text-right text-sm"
                                    />
                                ) : (
                                    <span className="font-medium">
                                        {(form as any)[key]}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </Card>

                {/* RIGHT: Summary */}
                <Card className="space-y-3">
                    <h2 className="text-base font-semibold">Summary</h2>

                    <div className="space-y-2 text-sm text-slate-700">

                        <div className="flex justify-between">
                            <span>Product name</span>

                            {isEditing ? (
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="rounded-lg border px-2 py-1 text-sm text-right"
                                />
                            ) : (
                                <span className="font-medium">{form.name}</span>
                            )}
                        </div>

                        <div className="flex justify-between">
                            <span>Unit</span>

                            {isEditing ? (
                                <input
                                    name="unit"
                                    value={form.unit}
                                    onChange={handleChange}
                                    className="w-20 rounded-lg border px-2 py-1 text-sm text-right"
                                />
                            ) : (
                                <span className="font-medium">{form.unit}</span>
                            )}
                        </div>

                        <div className="flex justify-between">
                            <span>Status</span>
                            <span className="font-medium">Active</span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">

                {isEditing ? (
                    <>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setForm(product);
                                setIsEditing(false);
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="primary"
                            onClick={() => {
                                console.log("Saved:", form);
                                setIsEditing(false);
                            }}
                        >
                            Save
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            variant="secondary"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </Button>

                        <Button
                            variant="primary"
                            onClick={() => console.log("Delete:", id)}
                        >
                            Delete
                        </Button>
                    </>
                )}

            </div>
        </Page>
    );
}