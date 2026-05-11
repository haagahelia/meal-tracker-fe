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
    calories_per_100: string;
    protein_per_100: string;
    fiber_per_100: string;
    sugar_per_100: string;
    fat_per_100: string;
    salt_per_100: string;
};

export function CreateProduct() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState<FormState>({
        name: "",
        unit: "g",
        calories_per_100: "",
        protein_per_100: "",
        fiber_per_100: "",
        sugar_per_100: "",
        fat_per_100: "",
        salt_per_100: "",
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);

            await createIngredient({
                name: form.name,
                unit: form.unit,
                calories_per_100: Number(form.calories_per_100),
                protein_per_100: Number(form.protein_per_100),
                fiber_per_100: Number(form.fiber_per_100),
                sugar_per_100: Number(form.sugar_per_100),
                fat_per_100: Number(form.fat_per_100),
                salt_per_100: Number(form.salt_per_100),
            });

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
                            placeholder="Calories per 100"
                            value={form.calories_per_100}
                            onChange={handleChange}
                        />

                        <Input
                            name="protein_per_100"
                            type="number"
                            placeholder="Protein per 100"
                            value={form.protein_per_100}
                            onChange={handleChange}
                        />

                        <Input
                            name="fiber_per_100"
                            type="number"
                            placeholder="Fiber per 100"
                            value={form.fiber_per_100}
                            onChange={handleChange}
                        />

                        <Input
                            name="sugar_per_100"
                            type="number"
                            placeholder="Sugar per 100"
                            value={form.sugar_per_100}
                            onChange={handleChange}
                        />

                        <Input
                            name="fat_per_100"
                            type="number"
                            placeholder="Fat per 100"
                            value={form.fat_per_100}
                            onChange={handleChange}
                        />

                        <Input
                            name="salt_per_100"
                            type="number"
                            placeholder="Salt per 100"
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