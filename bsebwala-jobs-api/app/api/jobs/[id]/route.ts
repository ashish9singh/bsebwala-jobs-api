import { db } from '@/lib/db'; import { error, ok } from '@/lib/api'; import { serializeJob } from '@/lib/jobs';
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const j=await db.job.findFirst({where:{OR:[{id},{slug:id}]},include:{source:true,news:true}});if(!j)return error('Job not found',404,'NOT_FOUND');return ok(serializeJob(j));}
