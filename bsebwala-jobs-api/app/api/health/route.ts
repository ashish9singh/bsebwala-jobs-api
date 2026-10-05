import { ok } from '@/lib/api';
export async function GET(){ return ok({service:'bsebwala-jobs-api',status:'healthy',time:new Date().toISOString()}); }
