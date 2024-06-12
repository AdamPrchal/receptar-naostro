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
  return (
    <main className="flex justify-center gap-8 p-24">
      <section className="space-y-8 max-w-screen-sm w-1/2">
        <h1 className="text-6xl font-serif">Recipe detail</h1>
       
      </section>
      <picture>
        <img
          className="rounded-full mx-auto aspect-square object-cover"
          alt="Food image"
          src="https://loremflickr.com/500/500/dish,cooking,colorful?lock=1903756899454491"
          width={500}
          height={500}
        />
      </picture>
    </main>
  );
}
