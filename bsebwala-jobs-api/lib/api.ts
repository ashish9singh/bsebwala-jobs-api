import { NextResponse } from 'next/server';
export function json(data: unknown, init: ResponseInit = {}) {
  const origin = process.env.NODE_ENV === 'production' ? 'https://bsebwala.in' : '*';
  const headers = new Headers(init.headers);
  headers.set('Content-Type','application/json');
  headers.set('Access-Control-Allow-Origin', origin);
  headers.set('Access-Control-Allow-Methods','GET,OPTIONS');
  headers.set('Access-Control-Allow-Headers','Content-Type, Authorization');
  headers.set('Cache-Control','s-maxage=300, stale-while-revalidate=600');
  return NextResponse.json(data, {...init, headers});
}
export function error(message:string, status=400, code='BAD_REQUEST'){ return json({success:false,error:{code,message}}, {status}); }
export function ok(data:unknown, extra:Record<string,unknown>={}) { return json({success:true,...extra,data}); }
export function options(){ return new Response(null,{status:204,headers:{'Access-Control-Allow-Origin':process.env.NODE_ENV==='production'?'https://bsebwala.in':'*','Access-Control-Allow-Methods':'GET,OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization'}}); }
