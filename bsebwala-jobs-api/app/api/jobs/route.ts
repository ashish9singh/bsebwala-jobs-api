import { db } from '@/lib/db'; import { error, ok, options } from '@/lib/api'; import { serializeJob } from '@/lib/jobs';
export async function OPTIONS(){return options()}
export async function GET(req:Request){
 const u=new URL(req.url), p=Number(u.searchParams.get('page')||1), limit=Math.min(Math.max(Number(u.searchParams.get('limit')||20),1),100), q=u.searchParams.get('q')||'', qualification=u.searchParams.get('qualification'), state=u.searchParams.get('state'), category=u.searchParams.get('category'), status=u.searchParams.get('status'), sort=u.searchParams.get('sort')||'latest';
 if(p<1) return error('page must be >= 1');
 const where:any={};
 if(q) where.OR=[{title:{contains:q,mode:'insensitive'}},{organization:{contains:q,mode:'insensitive'}},{department:{contains:q,mode:'insensitive'}},{posts:{has:q}},{keywords:{has:q}}];
 if(qualification) where.qualifications={has:qualification}; if(state) where.state={equals:state,mode:'insensitive'}; if(category) where.categories={has:category}; if(status) where.status=status;
 const orderBy:any=sort==='deadline'?{applicationEnd:'asc'}:sort==='organization'?{organization:'asc'}:{createdAt:'desc'};
 const [rows,total]=await Promise.all([db.job.findMany({where,include:{source:true},orderBy,skip:(p-1)*limit,take:limit}),db.job.count({where})]);
 return ok(rows.map(serializeJob),{count:rows.length,page:p,limit,total,last_updated:new Date().toISOString()});
}
