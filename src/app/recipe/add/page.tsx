"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [cuisine, setCuisine] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        isVegetarian,
        cuisine,
        preparationTime: parseInt(preparationTime),
        imageUrl,
        ingredients,
        steps,
      }),
    });

    if (response.ok) {
      // Handle success
      alert("Recipe added successfully!");
      router.push("/");
      // Reset form fields
      setTitle("");
      setDescription("");
      setIsVegetarian(false);
      setCuisine("");
      setPreparationTime("");
      setImageUrl("");
      setIngredients("");
      setSteps("");
    } else {
      // Handle error
      alert("Failed to add recipe.");
    }
  };

  return (
    <main className="max-w-screen-md mx-auto p-24">
      <h1 className="text-6xl font-serif mb-16">Add a New Recipe</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Title
          <input
            className="w-full block border-2 border-orange-400 rounded-full px-4 py-2"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <textarea
            className="w-full block border-2 border-orange-400 rounded-lg px-4 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </label>

        <label className="flex items-center">
          Is Vegetarian
          <input
            className="ml-4 size-8 rounded accent-orange-500"
            type="checkbox"
            checked={isVegetarian}
            onChange={(e) => setIsVegetarian(e.target.checked)}
          />
        </label>

        <label>
          Cuisine
          <input
            className="w-full block border-2 border-orange-400 rounded-full px-4 py-2"
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            required
          />
        </label>
        <label>
          Preparation Time (minutes)
          <input
            className="w-full block border-2 border-orange-400 rounded-full px-4 py-2"
            type="number"
            value={preparationTime}
            onChange={(e) => setPreparationTime(e.target.value)}
            required
          />
        </label>
        <label>
          Image URL
          <input
            className="w-full block border-2 border-orange-400 rounded-full px-4 py-2"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </label>
        <label>
          Ingredients
          <textarea
            className="w-full block border-2 border-orange-400 rounded-lg px-4 py-2"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          ></textarea>
        </label>
        <label>
          Steps
          <textarea
            className="w-full block border-2 border-orange-400 rounded-lg px-4 py-2"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
          ></textarea>
        </label>
        <button
          className="w-full block bg-orange-500 text-white rounded-full px-4 py-2 mt-4"
          type="submit"
        >
          Add Recipe
        </button>
      </form>
    </main>
  );
}
