import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Page } from "@/components/ui/Page";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

import { createIngredient } from "@/data/mealTrackerRepository";
import { IngredientUnit } from "@/domain/mealTrackerTypes";

type FormState = {
    name: string;
    unit: IngredientUnit;
    calories_per_100: number;
    protein_per_100: number;
    fiber_per_100: number;
    sugar_per_100: number;
    fat_per_100: number;
    salt_per_100: number;
};

const numberFields: (keyof Omit<FormState, "name" | "unit">)[] = [
    "calories_per_100",
    "protein_per_100",
    "fiber_per_100",
    "sugar_per_100",
    "fat_per_100",
    "salt_per_100",
];

export function CreateProduct() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState<FormState>({
        name: "",
        unit: "g",
        calories_per_100: 0,
        protein_per_100: 0,
        fiber_per_100: 0,
        sugar_per_100: 0,
        fat_per_100: 0,
        salt_per_100: 0,
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        setForm((prev) => {
            if (name === "unit") {
                return {
                    ...prev,
                    unit: value as IngredientUnit,
                };
            }

            if (numberFields.includes(name as any)) {
                return {
                    ...prev,
                    [name]: value === "" ? 0 : Number(value),
                };
            }

            return {
                ...prev,
                [name]: value,
            };
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);

            await createIngredient(form);

            navigate("/products");
        } catch (err) {
            setError("Failed to create ingredient");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Page
            title="Create Product"
            description="Add a new ingredient to your database"
            actions={
                <Link
                    to="/products"
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
                >
                    Back
                </Link>
            }
        >
            <div className="mt-6">
                <Card>
                    <h2 className="text-base font-semibold">New Ingredient</h2>

                    {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        <Input
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <Select name="unit" value={form.unit} onChange={handleChange}>
                            <option value="g">g</option>
                            <option value="ml">ml</option>
                            <option value="pcs">pcs</option>
                        </Select>

                        <Input
                            name="calories_per_100"
                            type="number"
                            placeholder="Calories"
                            value={form.calories_per_100}
                            onChange={handleChange}
                        />

                        <Input
                            name="protein_per_100"
                            type="number"
                            placeholder="Protein"
                            value={form.protein_per_100}
                            onChange={handleChange}
                        />

                        <Input
                            name="fiber_per_100"
                            type="number"
                            placeholder="Fiber"
                            value={form.fiber_per_100}
                            onChange={handleChange}
                        />

                        <Input
                            name="sugar_per_100"
                            type="number"
                            placeholder="Sugar"
                            value={form.sugar_per_100}
                            onChange={handleChange}
                        />

                        <Input
                            name="fat_per_100"
                            type="number"
                            placeholder="Fat"
                            value={form.fat_per_100}
                            onChange={handleChange}
                        />

                        <Input
                            name="salt_per_100"
                            type="number"
                            placeholder="Salt"
                            value={form.salt_per_100}
                            onChange={handleChange}
                        />

                        <div className="flex justify-end">
                            <Button type="submit" disabled={loading}>
                                {loading ? "Creating..." : "Create Product"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Page>
    );
}
