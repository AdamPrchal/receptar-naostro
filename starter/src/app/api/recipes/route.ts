import openDB from "@/database/init";

export async function GET() {
  const db = await openDB();
  const recipes = await db.all("SELECT * FROM recipe");
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
  await db.close();
  return Response.json({});
}
