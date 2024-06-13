"use client";

import { ClockIcon, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

type RecipeDetail = {
  id: number;
  title: string;
  description: string;
  is_vegetarian: boolean;
  cuisine: string;
  preparation_time: number;
  image_url: string;
  ingredients: string;
  steps: string;
};

export default function RecipeDetail({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState(false);

  const fetchRecipe = async (recipeId: string) => {
    try {
      const response = await fetch(`/api/recipes/${recipeId}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setRecipe(data as RecipeDetail);
    } catch (err) {
      console.log(err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipe(params.id);
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-4 py-32">
        <LoaderCircle className="animate-spin size-8" />
        <span>Loading recipe...</span>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex items-center justify-center gap-4 py-32 text-red-500">
        <span>Recipe with ID {params.id} not found.</span>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex items-center justify-center gap-4 py-32">
        <span>No recipe found.</span>
      </div>
    );
  }

  return (
    <main className="flex justify-center gap-8 p-24">
      <section className="w-1/2 max-w-screen-sm space-y-8">
        <h1 className="text-6xl font-serif">{recipe.title}</h1>
        <p className="text-neutral-500">{recipe.description}</p>
        <div className="flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-white ${
              recipe.is_vegetarian ? "bg-green-500" : "bg-red-400"
            }`}
          >
            {recipe.is_vegetarian ? "Vegetarian" : "Meat"}
          </span>
          <span className="px-3 py-1 text-white bg-orange-400 rounded-full">
            {recipe.cuisine}
          </span>
        </div>
        <div className="flex gap-2">
          <ClockIcon className="size-6" />
          {recipe.preparation_time}m
        </div>
        <article>
          <h2 className="mb-4 text-6xl font-serif">Ingredients</h2>
          <p className="whitespace-pre-line">{recipe.ingredients}</p>
        </article>
        <article>
          <h2 className="mb-4 text-6xl font-serif">Steps</h2>
          <p className="whitespace-pre-line">{recipe.steps}</p>
        </article>
      </section>
      <picture>
        <img
          className="object-cover mx-auto rounded-full aspect-square"
          alt={recipe.title}
          src={recipe.image_url}
          width={500}
          height={500}
        />
      </picture>
    </main>
  );
}
