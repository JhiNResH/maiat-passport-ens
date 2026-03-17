import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const name = searchParams.get('name') || 'agent';
  const score = searchParams.get('score') || '—';
  const type = searchParams.get('type') || 'human';
  const shape = searchParams.get('shape') || 'og'; // og | square

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
    // ─── Square Card (500×500) ── Dark, atmospheric ──
    return new ImageResponse(
      (
        <div style={{
          width: '500px', height: '500px',
          display: 'flex', position: 'relative', overflow: 'hidden',
          background: '#0A0A0A',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}>
          {/* Atmosphere — top-right emerald glow */}
          <div style={{
            position: 'absolute', top: '-100px', right: '-60px',
            width: '380px', height: '380px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(52,211,153,0.14) 0%, rgba(52,211,153,0.03) 50%, transparent 70%)',
            display: 'flex',
          }} />
          {/* Atmosphere — bottom-left blue glow */}
          <div style={{
            position: 'absolute', bottom: '-120px', left: '-80px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, rgba(59,130,246,0.02) 50%, transparent 70%)',
            display: 'flex',
          }} />

          {/* Main content */}
          <div style={{
            position: 'absolute', inset: '0',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '48px',
          }}>
            {/* Icon box */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '56px', height: '56px', borderRadius: '16px',
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.10)',
              marginBottom: '28px',
            }}>
              <span style={{
                fontSize: '24px', fontWeight: 900,
                color: scoreColor,
              }}>
                {type === 'agent' ? 'A' : 'M'}
              </span>
            </div>

            {/* ENS Name — hero text */}
            <div style={{
              display: 'flex',
              fontSize: '40px', fontWeight: 900,
              color: 'white', letterSpacing: '-2px',
              marginBottom: '24px', lineHeight: 1,
            }}>
              {`${name}.maiat.eth`}
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
              {hasScore && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  backgroundColor: `${scoreColor}18`,
                  border: `1px solid ${scoreColor}35`,
                  borderRadius: '999px', padding: '7px 16px',
                }}>
                  <div style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: scoreColor, display: 'flex',
                    boxShadow: `0 0 8px ${scoreColor}`,
                  }} />
                  <span style={{
                    fontSize: '13px', fontWeight: 700, color: scoreColor,
                  }}>
                    {`${score} · ${verdict}`}
                  </span>
                </div>
              )}
              <div style={{
                display: 'flex', alignItems: 'center',
                backgroundColor: 'rgba(59,130,246,0.10)',
                border: '1px solid rgba(59,130,246,0.20)',
                borderRadius: '999px', padding: '7px 16px',
              }}>
                <span style={{
                  fontSize: '13px', fontWeight: 700, color: '#60A5FA',
                }}>
                  ENS Verified
                </span>
              </div>
            </div>
          </div>

          {/* Bottom watermark */}
          <div style={{
            position: 'absolute', bottom: '20px', left: '0', right: '0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontSize: '11px', fontWeight: 800,
              color: 'rgba(255,255,255,0.12)',
              letterSpacing: '6px',
              textTransform: 'uppercase' as const,
            }}>
              MAIAT PASSPORT
            </span>
          </div>
        </div>
      ),
      { width, height },
    );
  }

  // ─── OG Rectangle (1200×630) ── Same dark style, wider ──
  return new ImageResponse(
    (
      <div style={{
        width: '1200px', height: '630px',
        display: 'flex', position: 'relative', overflow: 'hidden',
        background: '#0A0A0A',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}>
        {/* Atmosphere glows */}
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
          {/* Icon */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '72px', height: '72px', borderRadius: '20px',
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            marginBottom: '28px',
          }}>
            <span style={{
              fontSize: '32px', fontWeight: 900, color: scoreColor,
            }}>
              {type === 'agent' ? 'A' : 'M'}
            </span>
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
                <span style={{
                  fontSize: '20px', fontWeight: 700, color: scoreColor,
                }}>
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
              <span style={{
                fontSize: '20px', fontWeight: 700, color: '#60A5FA',
              }}>
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
              textTransform: 'uppercase' as const,
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
