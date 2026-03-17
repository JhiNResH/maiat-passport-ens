import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const LOGO = 'data:image/jpeg;base64,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';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const name = searchParams.get('name') || 'agent';
  const logo = searchParams.get('logo') || '';
  const shape = searchParams.get('shape') || 'og';

  const isSquare = shape === 'square';
  const width = isSquare ? 500 : 1200;
  const height = isSquare ? 500 : 630;

  const logoSrc = logo || LOGO;

  if (isSquare) {
    // ─── Square (500×500) — Logo top-left, ENS name bottom-left ───
    return new ImageResponse(
      (
        <div style={{
          width: '500px', height: '500px',
          display: 'flex', position: 'relative', overflow: 'hidden',
          background: '#F8F8F6',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}>
          {/* Subtle atmosphere */}
          <div style={{
            position: 'absolute', top: '-120px', right: '-60px',
            width: '360px', height: '360px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)',
            display: 'flex',
          }} />

          {/* Glass card */}
          <div style={{
            position: 'absolute',
            top: '28px', left: '28px', right: '28px', bottom: '28px',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: '32px',
            background: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02)',
            padding: '32px',
          }}>
            {/* Logo top-left */}
            <div style={{ display: 'flex' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '56px', height: '56px', borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              }}>
                <img src={logoSrc} width={56} height={56} style={{ objectFit: 'cover' }} />
              </div>
            </div>

            {/* ENS Name bottom-left */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontSize: '28px', fontWeight: 900,
                color: '#000000',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}>
                {`${name}.maiat.eth`}
              </span>
            </div>
          </div>

          {/* Bottom watermark */}
          <div style={{
            position: 'absolute', bottom: '10px', left: '0', right: '0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontSize: '7px', fontWeight: 700,
              color: 'rgba(0,0,0,0.08)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase' as const,
            }}>
              Maiat Passport
            </span>
          </div>
        </div>
      ),
      { width, height },
    );
  }

  // ─── OG Rectangle (1200×630) — Logo top-left, ENS name bottom-left ───
  return new ImageResponse(
    (
      <div style={{
        width: '1200px', height: '630px',
        display: 'flex', position: 'relative', overflow: 'hidden',
        background: '#F8F8F6',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}>
        {/* Subtle atmosphere */}
        <div style={{
          position: 'absolute', top: '-100px', right: '100px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Glass card */}
        <div style={{
          position: 'absolute',
          top: '36px', left: '36px', right: '36px', bottom: '36px',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: '40px',
          background: 'rgba(255,255,255,0.85)',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02)',
          padding: '48px 64px',
        }}>
          {/* Logo top-left */}
          <div style={{ display: 'flex' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '72px', height: '72px', borderRadius: '18px',
              overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
            }}>
              <img src={logoSrc} width={72} height={72} style={{ objectFit: 'cover' }} />
            </div>
          </div>

          {/* ENS Name bottom-left */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontSize: '48px', fontWeight: 900,
              color: '#000000',
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
            }}>
              {`${name}.maiat.eth`}
            </span>
          </div>
        </div>

        {/* Bottom watermark */}
        <div style={{
          position: 'absolute', bottom: '14px', left: '0', right: '0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontSize: '9px', fontWeight: 700,
            color: 'rgba(0,0,0,0.08)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase' as const,
          }}>
            Maiat Passport
          </span>
        </div>
      </div>
    ),
    { width, height },
  );
}
