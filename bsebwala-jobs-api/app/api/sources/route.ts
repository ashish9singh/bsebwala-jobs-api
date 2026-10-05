import { db } from '@/lib/db'; import { ok } from '@/lib/api';
export async function GET(){ const sources=await db.source.findMany({orderBy:{priority:'asc'}}); return ok(sources); }
