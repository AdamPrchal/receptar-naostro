"use client";

import { ClockIcon, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

type Recipe = {
  id: number;
  title: string;
  description: string;
  is_vegetarian: string;
  cuisine: string;
  preparation_time: number;
  image_url: string;
  ingredients: string;
  steps: string;
};

export default function RecipeDetail({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${params.id}`);

        if (response.ok) {
          const data = await response.json();
          setRecipe(data as Recipe);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRecipe();
  }, []);

  if (recipe === null) {
    return (
      <div className="flex gap-4 items-center justify-center py-32">
        <LoaderCircle className="size-8 animate-spin" />
        <span className="">Loading recipe</span>
      </div>
    );
  }

  return (
    <main className="flex justify-center gap-8 p-24">
      <section className="space-y-8 max-w-screen-sm w-1/2">
        <h1 className="text-6xl font-serif">{recipe.title}</h1>
        <p className="text-neutral-500">{recipe.description}</p>

        <div className="flex gap-2">
          {recipe.is_vegetarian ? (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full">
              Vegetarian
            </span>
          ) : (
            <span className="bg-red-400 text-white px-3 py-1 rounded-full">
              Meat
            </span>
          )}
          <span className="bg-orange-400 text-white px-3 py-1 rounded-full">
            {recipe.cuisine}
          </span>
        </div>
        <div className="flex gap-2">
          <ClockIcon className="size-6" />
          {recipe.preparation_time}m
        </div>

        <article>
          <h2 className="text-6xl font-serif mb-4">Ingredients</h2>
          <p className="whitespace-pre-line">{recipe.ingredients}</p>
        </article>
        <article>
          <h2 className="text-6xl mb-4 font-serif">Steps</h2>
          <p className="whitespace-pre-line">{recipe.steps}</p>
        </article>
      </section>
      <picture>
        <img
          className="rounded-full mx-auto aspect-square object-cover"
          alt="Food image"
          src={recipe.image_url}
          width={500}
          height={500}
        />
      </picture>
    </main>
  );
}
