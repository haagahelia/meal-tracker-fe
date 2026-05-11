import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Page } from "@/components/ui/Page";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import {
    createRecipe,
    getIngredients,
} from "@/data/mealTrackerRepository";

import type { Ingredient } from "@/domain/mealTrackerTypes";

type FormState = {
    name: string;
    description: string;
};

type SelectedIngredient = {
    ingredient: Ingredient;
    amount: number;
};

export function CreateRecipePage() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
    const [selectedIngredientId, setSelectedIngredientId] = useState<number>(0);
    const [amount, setAmount] = useState("");
    const [search, setSearch] = useState("");

    const [recipeIngredients, setRecipeIngredients] = useState<SelectedIngredient[]>([]);

    const [form, setForm] = useState<FormState>({
        name: "",
        description: "",
    });

    useEffect(() => {
        async function loadIngredients() {
            try {
                const data = await getIngredients();
                setAllIngredients(data);
            } catch {
                setError("Failed to load ingredients");
            }
        }

        loadIngredients();
    }, []);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function addIngredient() {
        const ingredient = allIngredients.find(
            (i) => i.id === Number(selectedIngredientId)
        );

        if (!ingredient || !amount) return;

        setRecipeIngredients((prev) => [
            ...prev,
            {
                ingredient,
                amount: Number(amount),
            },
        ]);

        setAmount("");
        setSelectedIngredientId(0);
    }

    function removeIngredient(index: number) {
        setRecipeIngredients((prev) =>
            prev.filter((_, i) => i !== index)
        );
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);

            // Create recipe
            const createdRecipe = await createRecipe({
                name: form.name,
                description: form.description,
            });

            // Send ingredients to backend (IMPORTANT PART)
            // NOTE: assumes backend supports this endpoint
            await fetch(
                `${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4678/api/mealtracker"
                }/recipeingredients`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        recipe_id: createdRecipe.id,
                        ingredients: recipeIngredients.map((ri) => ({
                            ingredient_id: ri.ingredient.id,
                            amount: ri.amount,
                        })),
                    }),
                }
            );

            navigate("/recipes");
        } catch {
            setError("Failed to create recipe");
        } finally {
            setLoading(false);
        }
    }

    const filteredIngredients = allIngredients.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Page
            title="Create Recipe"
            description="Build a recipe with ingredients"
            actions={
                <Link
                    to="/recipes"
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
                >
                    Back
                </Link>
            }
        >
            <div className="mt-6">
                <Card>
                    <h2 className="text-base font-semibold">New Recipe</h2>

                    {error && (
                        <p className="mt-2 text-sm text-red-500">{error}</p>
                    )}

                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        <Input
                            name="name"
                            placeholder="Recipe name"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <Input
                            name="description"
                            placeholder="Description"
                            value={form.description}
                            onChange={handleChange}
                        />

                        {/* INGREDIENT PICKER */}
                        <div className="rounded-xl border p-3 space-y-3">
                            <h3 className="text-sm font-semibold">
                                Add ingredients
                            </h3>

                            <Input
                                placeholder="Search ingredient..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-auto">
                                {filteredIngredients.map((i) => (
                                    <button
                                        key={i.id}
                                        type="button"
                                        onClick={() => setSelectedIngredientId(i.id)}
                                        className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm hover:bg-slate-50 ${selectedIngredientId === i.id
                                            ? "border-slate-900 bg-slate-100"
                                            : ""
                                            }`}
                                    >
                                        <span>{i.name}</span>
                                        <span className="text-xs text-slate-500">
                                            {i.unit}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    placeholder="Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />

                                <Button type="button" onClick={addIngredient}>
                                    Add
                                </Button>
                            </div>
                        </div>

                        {/* SELECTED INGREDIENTS */}
                        <ul className="space-y-2">
                            {recipeIngredients.map((ri, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm"
                                >
                                    <span>{ri.ingredient.name}</span>

                                    <div className="flex items-center gap-3">
                                        <span className="font-medium">
                                            {ri.amount} {ri.ingredient.unit}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => removeIngredient(index)}
                                            className="text-red-500 text-xs"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={loading}>
                                {loading ? "Creating..." : "Create Recipe"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Page>
    );
}