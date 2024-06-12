import openDB from '@/database/init';


export async function GET(request: Request,
  { params }: { params: { id: string } }) {
    const db = await openDB();

    console.log(params.id)
    const recipe = await db.get('SELECT * FROM recipe WHERE id=?', [params.id]);
    await db.close();
    
  return Response.json(recipe)
}