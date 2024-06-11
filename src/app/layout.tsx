import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChefHatIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe book",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-orange-50`}>
        <nav className="flex justify-between px-32 py-4 items-center bg-white border-b-2 border-orange-400">
          <div className="bg-orange-400 p-1 h-min w-min rounded-full">
            <ChefHatIcon fill="#ffffff" className="size-12 text-orange-400" />
          </div>
          <ul className="flex items-center justify-end gap-16">
            <Link className="" href={"/"}>
              Home
            </Link>
            <Link className="" href={"/favourites"}>
              Favourites
            </Link>
            <Link
              href={"/recipe/add"}
              className="flex items-center gap-2 bg-green-500 rounded-lg h-min w-fit text-white py-3 px-6 border-2 border-green-600"
            >
              <PlusCircleIcon className="size-6" />
              <span className="font-bold">Add recipe</span>
            </Link>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
