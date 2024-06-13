"use client";

import { ClockIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

type Recipe = {
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

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");

  const fetchRecipes = async () => {
    try {
      const response = await fetch("/api/recipes");

      if (response.ok) {
        const data = await response.json();
        setRecipes(data.recipes as Recipe[]);
      } else {
        console.error("Failed to fetch recipes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="flex flex-col items-center justify-center p-24">
      <h1 className="mb-16 text-6xl font-serif">Your Recipes</h1>
      <section>
        <div className="flex items-center w-[30ch] mb-8 mx-auto overflow-hidden bg-white border-2 border-orange-400 rounded-full">
          <SearchIcon className="ml-4 mr-1 size-6" />
          <input
            type="text"
            value={search}
            className="w-full p-2"
            placeholder="Search by name"
            onChange={handleSearchChange}
          />
        </div>
        <section className="flex flex-wrap justify-center gap-8">
          {filteredRecipes.map((recipe) => (
            <article
              key={recipe.id}
              className="flex flex-col gap-2 p-8 w-96 bg-white border-2 border-orange-400 rounded-xl"
            >
              <picture>
                <img
                  className="object-cover mx-auto rounded-full aspect-square"
                  alt="Food image"
                  src={recipe.image_url}
                  width={200}
                  height={200}
                />
              </picture>
              <h2 className="text-lg font-medium">{recipe.title}</h2>
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
              <p className="text-neutral-400">{recipe.description}</p>
              <Link
                className="inline-block w-full p-2 mt-auto text-center text-white bg-orange-400 rounded-lg font-medium"
                href={`/recipe/${recipe.id}`}
              >
                Start cooking
              </Link>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
