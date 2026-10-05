import { db } from '@/lib/db'; import { ok } from '@/lib/api';
export async function GET(){const rows=await db.news.findMany({include:{source:true},orderBy:{publishedAt:'desc'},take:20});return ok(rows,{count:rows.length});}
