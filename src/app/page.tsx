"use client";

import { ClockIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
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

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetch("/api/recipes");

        if (response.ok) {
          const data = await response.json();
          setRecipes(data.recipes as Recipe[]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRecipes();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="flex justify-center flex-col items-center p-24">
      <h1 className="text-6xl mb-16 font-serif">Your Recipes</h1>
      <section>
        <div className="flex mb-8 mx-auto items-center w-[30ch] border-2 border-orange-400 rounded-full bg-white overflow-hidden">
          <SearchIcon className="size-6 ml-4 mr-1" />
          <input
            type="text"
            value={search}
            className=" w-full p-2"
            placeholder="Search by name"
            onChange={handleSearchChange}
          />
        </div>
        <section className="flex justify-center flex-wrap gap-8">
          {filteredRecipes.map((recipe) => (
            <article
              key={recipe.id}
              className="p-8 w-96 bg-white border-2 border-orange-400 rounded-xl flex flex-col gap-2"
            >
              <picture>
                <img
                  className="rounded-full aspect-square object-cover mx-auto"
                  alt="Food image"
                  src={recipe.image_url}
                  width={200}
                  height={200}
                />
              </picture>
              <h2 className="text-lg font-medium">{recipe.title}</h2>
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
              <p className="text-neutral-400">{recipe.description}</p>
              <Link
                className="bg-orange-400 mt-auto inline-block text-center p-2 font-medium rounded-lg  w-full text-white"
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
