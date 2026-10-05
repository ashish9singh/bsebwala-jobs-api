import { db } from '@/lib/db'; import { ok } from '@/lib/api'; import { serializeJob } from '@/lib/jobs';
export async function GET(){const rows=await db.job.findMany({include:{source:true},orderBy:{createdAt:'desc'},take:20});return ok(rows.map(serializeJob),{count:rows.length});}
