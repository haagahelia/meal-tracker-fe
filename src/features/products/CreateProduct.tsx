import { useState } from "react";
import { Link } from "react-router-dom";
import { Page } from "@/components/ui/Page";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export function CreateProduct() {
    const [form, setForm] = useState({
        name: "",
        unit: "g",
        calories_per_100: "",
        protein_per_100: "",
        fiber_per_100: "",
        sugar_per_100: "",
        fat_per_100: "",
        salt_per_100: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Ingredient created:", form);

        // later:
        // fetch("/api/ingredients", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(form),
        // });
    };
    return (
        <Page
            title="Create Product"
            description="Create a new product."
            actions={
                <Link
                    to="/products"
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
                >
                    Back
                </Link>
            }
        >
            {/* CREATE PRODUCT (INGREDIENT) FORM */}
            <div className="mt-6">
                <Card>
                    <h2 className="text-base font-semibold">Create Product</h2>

                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        <Input
                            name="name"
                            placeholder="Product name"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <Select
                            name="unit"
                            value={form.unit}
                            onChange={handleChange}
                        >
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

                        <div className="flex flex-col md:flex-row md:justify-end">
                            <Button type="submit" className="w-full md:w-auto">
                                Create Product
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Page>
    );
}