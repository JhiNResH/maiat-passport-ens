import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const name = searchParams.get('name') || 'agent';
  const score = searchParams.get('score') || '—';
  const type = searchParams.get('type') || 'human';
  const icon = type === 'agent' ? 'A' : 'M';

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A0A0A' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '72px', height: '72px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', fontSize: '32px', fontWeight: 900, color: '#3B82F6', marginBottom: '28px' }}>{icon}</div>
        <div style={{ display: 'flex', fontSize: '60px', fontWeight: 900, color: 'white', letterSpacing: '-2px', marginBottom: '28px' }}>{`${name}.maiat.eth`}</div>
        <div style={{ display: 'flex', gap: '14px', marginBottom: '44px' }}>
          <div style={{ display: 'flex', backgroundColor: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)', borderRadius: '999px', padding: '10px 24px', fontSize: '20px', fontWeight: 700, color: '#34D399' }}>{`Trust Score: ${score}`}</div>
          <div style={{ display: 'flex', backgroundColor: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: '999px', padding: '10px 24px', fontSize: '20px', fontWeight: 700, color: '#3B82F6' }}>Verified on ENS</div>
        </div>
        <div style={{ display: 'flex', fontSize: '22px', fontWeight: 800, color: 'rgba(255,255,255,0.25)', letterSpacing: '8px' }}>MAIAT PASSPORT</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
