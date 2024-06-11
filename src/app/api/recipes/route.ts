import openDB from "@/database/init";

export async function GET() {
  const db = await openDB();
  const recipes = await db.all("SELECT * FROM recipes");
  await db.close();

  return Response.json({ recipes });
}

export async function POST(req: Request) {
  const {
    title,
    description,
    isVegetarian,
    cuisine,
    preparationTime,
    imageUrl,
    ingredients,
    steps,
  } = await req.json();

  const db = await openDB();
  try {
    await db.run(
      `INSERT INTO recipes (title, description, is_vegetarian, cuisine, preparation_time, image_url, ingredients, steps) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        isVegetarian,
        cuisine,
        preparationTime,
        imageUrl,
        ingredients,
        steps,
      ]
    );
    return new Response(
      JSON.stringify({ message: "Recipe added successfully!" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Failed to add recipe:", error);
    return new Response(JSON.stringify({ error: "Failed to add recipe." }), {
      status: 200,
    });
  } finally {
    await db.close();
  }
}
