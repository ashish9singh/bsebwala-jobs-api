import { db } from '@/lib/db'; import { ok } from '@/lib/api'; import { serializeJob } from '@/lib/jobs';
export async function GET(){const [latest,closing,bihar,central,ten,twelve,railway,ssc,defence,police,teaching,news]=await Promise.all([
 db.job.findMany({include:{source:true},orderBy:{createdAt:'desc'},take:8}),
 db.job.findMany({include:{source:true},where:{applicationEnd:{gte:new Date()}},orderBy:{applicationEnd:'asc'},take:8}),
 db.job.findMany({include:{source:true},where:{state:'Bihar'},orderBy:{createdAt:'desc'},take:8}),
 db.job.findMany({include:{source:true},where:{state:'Central'},orderBy:{createdAt:'desc'},take:8}),
 db.job.findMany({include:{source:true},where:{qualifications:{has:'10th'}},orderBy:{createdAt:'desc'},take:8}),
 db.job.findMany({include:{source:true},where:{qualifications:{has:'12th'}},orderBy:{createdAt:'desc'},take:8}),
 db.job.findMany({include:{source:true},where:{categories:{has:'Railway'}},orderBy:{createdAt:'desc'},take:8}),
 db.job.findMany({include:{source:true},where:{categories:{has:'SSC'}},orderBy:{createdAt:'desc'},take:8}),
 db.job.findMany({include:{source:true},where:{categories:{has:'Defence'}},orderBy:{createdAt:'desc'},take:8}),
 db.job.findMany({include:{source:true},where:{categories:{has:'Police'}},orderBy:{createdAt:'desc'},take:8}),
 db.job.findMany({include:{source:true},where:{categories:{has:'Teaching'}},orderBy:{createdAt:'desc'},take:8}),
 db.news.findMany({include:{source:true},orderBy:{publishedAt:'desc'},take:10})
]); return ok({latest_jobs:latest.map(serializeJob),closing_soon:closing.map(serializeJob),bihar_jobs:bihar.map(serializeJob),central_jobs:central.map(serializeJob),jobs_10th:ten.map(serializeJob),jobs_12th:twelve.map(serializeJob),railway_jobs:railway.map(serializeJob),ssc_jobs:ssc.map(serializeJob),defence_jobs:defence.map(serializeJob),police_jobs:police.map(serializeJob),teaching_jobs:teaching.map(serializeJob),latest_news:news});}
