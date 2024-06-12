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
  return (
    <main className="flex justify-center flex-col items-center p-24">
      <h1 className="text-6xl mb-16 font-serif">Your Recipes</h1>
    </main>
  );
}
