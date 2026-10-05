import { db } from '@/lib/db'; import { SOURCES } from '@/lib/sources'; import { ok, error } from '@/lib/api';
export async function GET(req:Request){
 const auth=req.headers.get('authorization'); const expected=process.env.CRON_SECRET;
 if(expected && auth !== `Bearer ${expected}`) return error('Unauthorized',401,'UNAUTHORIZED');
 let upserted=0; for(const s of SOURCES){await db.source.upsert({where:{url:s.url},update:{name:s.name,organization:s.organization,state:s.state,type:s.type as any,priority:s.priority,enabled:true},create:{name:s.name,organization:s.organization,state:s.state,type:s.type as any,priority:s.priority,url:s.url}});upserted++;}
 return ok({message:'Source registry refreshed. Live ingestion adapters are intentionally source-specific.',sources_upserted:upserted,refreshed_at:new Date().toISOString()});
}
