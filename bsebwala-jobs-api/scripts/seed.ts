import { PrismaClient, SourceType, JobStatus } from '@prisma/client'; import { SOURCES } from '../lib/sources';
const db=new PrismaClient();
async function main(){
 const sourceMap:any={}; for(const s of SOURCES) sourceMap[s.organization||s.name]=await db.source.upsert({where:{url:s.url},update:{...s,type:s.type as SourceType},create:{...s,type:s.type as SourceType}});
 const bpsc=sourceMap.BPSC;
 await db.job.upsert({where:{slug:'sample-bihar-government-recruitment'} ,update:{},create:{slug:'sample-bihar-government-recruitment',title:'Sample Bihar Government Recruitment',organization:'BPSC',state:'Bihar',qualifications:['12th','Graduate'],categories:['Bihar Government'],posts:['Sample Post'],status:JobStatus.UPCOMING,sourceId:bpsc.id,sourceUrl:bpsc.url,verified:false,keywords:['bihar','government','recruitment'],seoTitle:'Sample Bihar Government Recruitment',seoDescription:'Sample record for testing BSEBWALA jobs API.'}});
 console.log('Seed complete');
 await db.$disconnect();
}
main().catch(e=>{console.error(e);process.exit(1)});
