import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Maiat logo 80x80 inline
const LOGO_BASE64 = 'data:image/jpeg;base64,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';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const name = searchParams.get('name') || 'agent';
  const score = searchParams.get('score') || '—';
  const type = searchParams.get('type') || 'human';
  const shape = searchParams.get('shape') || 'og';

  const isSquare = shape === 'square';
  const width = isSquare ? 500 : 1200;
  const height = isSquare ? 500 : 630;

  const numScore = parseInt(score, 10);
  const hasScore = !isNaN(numScore);
  const scoreColor = hasScore
    ? numScore >= 80 ? '#34D399' : numScore >= 50 ? '#3B82F6' : numScore >= 30 ? '#FBBF24' : '#EF4444'
    : '#3B82F6';
  const verdict = hasScore
    ? numScore >= 80 ? 'Trusted' : numScore >= 50 ? 'Proceed' : numScore >= 30 ? 'Caution' : 'Risky'
    : '';

  if (isSquare) {
    // ─── Square Card (500×500) ───
    return new ImageResponse(
      (
        <div style={{
          width: '500px', height: '500px',
          display: 'flex', position: 'relative', overflow: 'hidden',
          background: '#0A0A0A',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}>
          {/* Atmosphere — top-right emerald */}
          <div style={{
            position: 'absolute', top: '-100px', right: '-60px',
            width: '380px', height: '380px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(52,211,153,0.14) 0%, rgba(52,211,153,0.03) 50%, transparent 70%)',
            display: 'flex',
          }} />
          {/* Atmosphere — bottom-left blue */}
          <div style={{
            position: 'absolute', bottom: '-120px', left: '-80px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, rgba(59,130,246,0.02) 50%, transparent 70%)',
            display: 'flex',
          }} />

          {/* Content */}
          <div style={{
            position: 'absolute', inset: '0',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '48px',
          }}>
            {/* Logo */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '48px', height: '48px', borderRadius: '14px',
              overflow: 'hidden', marginBottom: '24px',
              border: '1px solid rgba(255,255,255,0.10)',
            }}>
              <img src={LOGO_BASE64} width={48} height={48} style={{ objectFit: 'cover' }} />
            </div>

            {/* ENS Name */}
            <div style={{
              display: 'flex',
              fontSize: '36px', fontWeight: 900,
              color: 'white', letterSpacing: '-2px',
              marginBottom: '20px', lineHeight: 1,
            }}>
              {`${name}.maiat.eth`}
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {hasScore && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  backgroundColor: `${scoreColor}18`,
                  border: `1px solid ${scoreColor}35`,
                  borderRadius: '999px', padding: '6px 14px',
                }}>
                  <div style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: scoreColor, display: 'flex',
                    boxShadow: `0 0 6px ${scoreColor}`,
                  }} />
                  <span style={{
                    fontSize: '12px', fontWeight: 700, color: scoreColor,
                  }}>
                    {`${score} · ${verdict}`}
                  </span>
                </div>
              )}
              <div style={{
                display: 'flex', alignItems: 'center',
                backgroundColor: 'rgba(59,130,246,0.10)',
                border: '1px solid rgba(59,130,246,0.20)',
                borderRadius: '999px', padding: '6px 14px',
              }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#60A5FA' }}>
                  ENS Verified
                </span>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div style={{
            position: 'absolute', bottom: '20px', left: '0', right: '0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontSize: '10px', fontWeight: 800,
              color: 'rgba(255,255,255,0.10)',
              letterSpacing: '6px',
            }}>
              MAIAT PASSPORT
            </span>
          </div>
        </div>
      ),
      { width, height },
    );
  }

  // ─── OG Rectangle (1200×630) ───
  return new ImageResponse(
    (
      <div style={{
        width: '1200px', height: '630px',
        display: 'flex', position: 'relative', overflow: 'hidden',
        background: '#0A0A0A',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}>
        {/* Atmosphere */}
        <div style={{
          position: 'absolute', top: '-150px', right: '50px',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 65%)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: '-200px', left: '100px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 60%)',
          display: 'flex',
        }} />

        {/* Content */}
        <div style={{
          position: 'absolute', inset: '0',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '64px', height: '64px', borderRadius: '18px',
            overflow: 'hidden', marginBottom: '28px',
            border: '1px solid rgba(255,255,255,0.10)',
          }}>
            <img src={LOGO_BASE64} width={64} height={64} style={{ objectFit: 'cover' }} />
          </div>

          {/* Name */}
          <div style={{
            display: 'flex',
            fontSize: '60px', fontWeight: 900,
            color: 'white', letterSpacing: '-2px',
            marginBottom: '28px',
          }}>
            {`${name}.maiat.eth`}
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', gap: '14px', marginBottom: '44px' }}>
            {hasScore && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                backgroundColor: `${scoreColor}18`,
                border: `1px solid ${scoreColor}35`,
                borderRadius: '999px', padding: '10px 24px',
              }}>
                <div style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: scoreColor, display: 'flex',
                  boxShadow: `0 0 10px ${scoreColor}`,
                }} />
                <span style={{ fontSize: '20px', fontWeight: 700, color: scoreColor }}>
                  {`Trust Score: ${score}`}
                </span>
              </div>
            )}
            <div style={{
              display: 'flex', alignItems: 'center',
              backgroundColor: 'rgba(59,130,246,0.12)',
              border: '1px solid rgba(59,130,246,0.25)',
              borderRadius: '999px', padding: '10px 24px',
            }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#60A5FA' }}>
                ENS Verified
              </span>
            </div>
          </div>

          {/* Watermark */}
          <div style={{ display: 'flex' }}>
            <span style={{
              fontSize: '22px', fontWeight: 800,
              color: 'rgba(255,255,255,0.15)',
              letterSpacing: '8px',
            }}>
              MAIAT PASSPORT
            </span>
          </div>
        </div>
      </div>
    ),
    { width, height },
  );
}
