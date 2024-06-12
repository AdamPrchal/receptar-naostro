"use client";

import { useRouter } from "next/navigation";
import { title } from "process";
import { useState } from "react";

export default function AddRecipe() {
  const [title, setTitle] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    alert("Failed to add recipe.");

    router.push("/");
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
