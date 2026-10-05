import { JobStatus } from '@prisma/client';
export const allowedStatuses = Object.values(JobStatus);
export function calculatedStatus(end?: Date|null, current?: JobStatus): JobStatus | undefined {
  if (!end || current === 'APPLICATION_CLOSED' || current === 'COMPLETED' || current === 'CANCELLED') return current;
  const now = Date.now(), t=end.getTime();
  if (t < now) return 'APPLICATION_CLOSED';
  const days=(t-now)/86400000;
  if (days <= 7) return 'APPLICATION_CLOSING_SOON';
  if (current === 'APPLICATION_OPEN') return current;
  return current || 'UPCOMING';
}
export function serializeJob(j:any){
  const status=calculatedStatus(j.applicationEnd,j.status) || j.status;
  const days=j.applicationEnd ? Math.ceil((new Date(j.applicationEnd).getTime()-Date.now())/86400000) : null;
  return {...j,status,days_remaining: days === null ? null : Math.max(days,0),source:j.source?{name:j.source.name,url:j.source.url,type:j.source.type,verified:j.verified}:undefined};
}
