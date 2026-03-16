import { NextResponse } from 'next/server';

const API_BASE = 'https://app.maiat.io';

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/api/v1/passport/stats`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ passports: 0, queries: 0 });
  }
}
