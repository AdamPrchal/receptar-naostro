import openDB from "@/database/init";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = await openDB();

  await db.close();

  return Response.json({});
}
