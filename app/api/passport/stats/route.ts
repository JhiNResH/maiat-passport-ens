import { NextResponse } from 'next/server';

const API_BASE = 'https://app.maiat.io';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/api/v1/passport/stats`, {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });
    const data = await res.json();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch {
    return NextResponse.json({ passports: 0, queries: 0, agents: 0 });
  }
}
