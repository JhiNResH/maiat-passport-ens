import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";

// ── Design Tokens (from MaiatApp.tsx) ────────────────────────────────────────
const COLORS = {
  bg: "#0A0A0A",
  card: "rgba(255,255,255,0.05)",
  cardBorder: "rgba(255,255,255,0.08)",
  text: "#FFFFFF",
  textMuted: "#9CA3AF",
  blue: "#3B82F6",
  green: "#34D399",
  orange: "#FBBF24",
  red: "#EF4444",
  codeBlock: "#0D0E12",
  gradientFrom: "rgba(59,130,246,0.2)",  // blue-900/20
  gradientTo: "rgba(88,28,135,0.1)",     // purple-900/10
};

const FONT = `"Inter", -apple-system, BlinkMacSystemFont, sans-serif`;

// ── Utility Components ───────────────────────────────────────────────────────

const GlassCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  borderRadius?: number;
}> = ({ children, style, borderRadius = 40 }) => (
  <div
    style={{
      background: COLORS.card,
      border: `1px solid ${COLORS.cardBorder}`,
      borderRadius,
      backdropFilter: "blur(60px) saturate(180%)",
      padding: 48,
      ...style,
    }}
  >
    {children}
  </div>
);

const TrustRing: React.FC<{
  score: number;
  size: number;
  color: string;
}> = ({ score, size, color }) => {
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (score / 100) * circumference;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
      <circle
        cx="50" cy="50" r="42"
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
};

// ── Scene 1: Problem Statement ───────────────────────────────────────────────

const Scene1_Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Random hex addresses floating
  const addresses = [
    "0x7a3B...f2E4", "0x1c9D...a8B3", "0xfE45...71D6",
    "0x92Ab...c5F1", "0x3d7E...9A02", "0xb8C1...4e7F",
    "0x5F6a...d3B8", "0xe4D2...8c1A", "0x6b9F...0E5d",
    "0xa1C3...7f4B", "0x8E2d...b6A9", "0x4f7B...e2C8",
  ];

  // Typing animation for the question text
  const fullText = "In a world of anonymous wallets...";
  const typingProgress = interpolate(frame, [30, 120], [0, fullText.length], {
    extrapolateRight: "clamp",
  });
  const displayedText = fullText.slice(0, Math.floor(typingProgress));

  const questionText = "who do you trust?";
  const q2Start = 140;
  const q2Progress = interpolate(frame, [q2Start, q2Start + 60], [0, questionText.length], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const displayedQ2 = questionText.slice(0, Math.floor(q2Progress));

  return (
    <AbsoluteFill style={{ background: COLORS.bg, fontFamily: FONT }}>
      {/* Floating addresses */}
      {addresses.map((addr, i) => {
        const yStart = 100 + (i % 4) * 220;
        const xStart = -200 + (i * 180) % 1920;
        const speed = 0.3 + (i % 3) * 0.15;
        const opacity = interpolate(
          frame,
          [0, 30, 180, 240],
          [0, 0.15 + (i % 3) * 0.08, 0.15 + (i % 3) * 0.08, 0],
          { extrapolateRight: "clamp" }
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: xStart + frame * speed * (i % 2 === 0 ? 1 : -1),
              top: yStart + Math.sin(frame * 0.02 + i) * 30,
              fontFamily: "monospace",
              fontSize: 18,
              color: COLORS.textMuted,
              opacity,
              letterSpacing: 2,
            }}
          >
            {addr}
          </div>
        );
      })}

      {/* Center text */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}>
        <div style={{
          fontSize: 52,
          fontWeight: 700,
          color: COLORS.text,
          letterSpacing: -1,
          lineHeight: 1.3,
        }}>
          {displayedText}
          <span style={{
            opacity: frame % 30 < 15 ? 1 : 0,
            color: COLORS.blue,
          }}>|</span>
        </div>
        <div style={{
          fontSize: 64,
          fontWeight: 900,
          color: COLORS.blue,
          marginTop: 20,
          letterSpacing: -2,
        }}>
          {displayedQ2}
          {frame >= q2Start && frame < q2Start + 80 && (
            <span style={{ opacity: frame % 30 < 15 ? 1 : 0 }}>|</span>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 2: Maiat Passport Reveal ───────────────────────────────────────────

const Scene2_Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Light beam entrance
  const beamOpacity = interpolate(frame, [0, 20], [0, 0.3], { extrapolateRight: "clamp" });

  // Card spring animation
  const cardScale = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 100, mass: 0.8 } });
  const cardY = interpolate(cardScale, [0, 1], [200, 0]);
  const cardOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });

  // Trust score animation
  const trustScore = Math.min(92, Math.round(interpolate(frame, [40, 120], [0, 92], { extrapolateRight: "clamp" })));

  // Tagline fade in
  const taglineOpacity = interpolate(frame, [80, 110], [0, 1], { extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [80, 110], [20, 0], { extrapolateRight: "clamp" });

  // Badge appearance
  const badgeScale = spring({ frame: frame - 100, fps, config: { damping: 10, stiffness: 200 } });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, fontFamily: FONT }}>
      {/* Atmospheric blurs */}
      <div style={{
        position: "absolute",
        top: "-10%", left: "-10%",
        width: "40%", height: "40%",
        borderRadius: "50%",
        background: "rgba(59,130,246,0.15)",
        filter: "blur(120px)",
        transform: `scale(${1 + Math.sin(frame * 0.01) * 0.1})`,
      }} />
      <div style={{
        position: "absolute",
        bottom: "-10%", right: "-10%",
        width: "50%", height: "50%",
        borderRadius: "50%",
        background: "rgba(88,28,135,0.08)",
        filter: "blur(150px)",
        transform: `scale(${1 + Math.cos(frame * 0.01) * 0.1})`,
      }} />

      {/* Light beam */}
      <div style={{
        position: "absolute",
        top: 0, left: "50%",
        width: 4,
        height: "100%",
        background: `linear-gradient(to bottom, transparent, ${COLORS.blue}, transparent)`,
        opacity: beamOpacity,
        transform: "translateX(-50%)",
        filter: "blur(20px)",
      }} />

      {/* Passport Card */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: `translate(-50%, -50%) translateY(${cardY}px) scale(${cardScale})`,
        opacity: cardOpacity,
        width: 600,
      }}>
        <GlassCard style={{ padding: 56 }}>
          {/* Logo + Name */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
            <div style={{
              width: 64, height: 64,
              borderRadius: 20,
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 900,
              color: "white",
            }}>M</div>
            <div>
              <div style={{ fontSize: 36, fontWeight: 900, color: COLORS.text, letterSpacing: -1 }}>
                vitalik.maiat.eth
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textMuted, letterSpacing: 3, textTransform: "uppercase" }}>
                Verified Human
              </div>
            </div>
          </div>

          {/* Trust Score + Ring */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.textMuted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
                Trust Score
              </div>
              <div style={{ fontSize: 72, fontWeight: 900, color: COLORS.green, letterSpacing: -3 }}>
                {trustScore}
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <TrustRing score={trustScore} size={140} color={COLORS.green} />
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%) rotate(0deg)",
                fontSize: 14,
                fontWeight: 900,
                color: COLORS.green,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}>
                {trustScore}/100
              </div>
            </div>
          </div>

          {/* Verdict Badge */}
          <div style={{
            marginTop: 24,
            display: "flex",
            gap: 12,
            alignItems: "center",
            transform: `scale(${badgeScale})`,
          }}>
            <div style={{
              padding: "8px 20px",
              borderRadius: 20,
              background: `${COLORS.green}20`,
              color: COLORS.green,
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}>
              Trusted
            </div>
            <div style={{
              padding: "8px 20px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.05)",
              color: COLORS.textMuted,
              fontSize: 12,
              fontWeight: 700,
            }}>
              🪲 250
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Tagline */}
      <div style={{
        position: "absolute",
        bottom: 120,
        left: "50%",
        transform: `translate(-50%, ${taglineY}px)`,
        opacity: taglineOpacity,
        textAlign: "center",
      }}>
        <div style={{
          fontSize: 28,
          fontWeight: 600,
          color: COLORS.textMuted,
          letterSpacing: -0.5,
        }}>
          Your on-chain identity. <span style={{ color: COLORS.text, fontWeight: 800 }}>Verified by the community.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 3: Feature Showcase (Bento Grid) ───────────────────────────────────

const Scene3_Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Feature 1: ENS Registration (frames 0-90)
  const f1Scale = spring({ frame, fps, config: { damping: 12 } });
  const f1Opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Typing animation for search
  const searchText = "alice";
  const typingP = interpolate(frame, [15, 55], [0, searchText.length], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const typed = searchText.slice(0, Math.floor(typingP));

  // Available badge appears
  const availableOpacity = interpolate(frame, [60, 75], [0, 1], { extrapolateRight: "clamp" });

  // Feature 2: KYA Endorsement (frames 90-180)
  const f2Frame = frame - 90;
  const f2Scale = spring({ frame: f2Frame, fps, config: { damping: 12 } });
  const f2Opacity = interpolate(f2Frame, [0, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Endorsement counter
  const endorseCount = Math.min(12, Math.floor(interpolate(f2Frame, [30, 70], [0, 12], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  })));
  const trustBoost = Math.min(15, Math.floor(interpolate(f2Frame, [30, 70], [0, 15], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  })));

  // Feature 3: Scarab Rewards (frames 180-270)
  const f3Frame = frame - 180;
  const f3Scale = spring({ frame: f3Frame, fps, config: { damping: 12 } });
  const f3Opacity = interpolate(f3Frame, [0, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const scarabCount = Math.min(50, Math.floor(interpolate(f3Frame, [20, 60], [0, 50], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  })));

  // Active panel highlight
  const activePanel = frame < 90 ? 0 : frame < 180 ? 1 : 2;

  const panelData = [
    { icon: "🌐", title: "Gasless ENS Registration", subtitle: "Zero gas · Powered by NameStone + CCIP-Read" },
    { icon: "🛡️", title: "KYA Endorsement", subtitle: "Tweet-to-Endorse · Social proof on-chain" },
    { icon: "🪲", title: "Scarab Rewards", subtitle: "Earn rewards for building trust" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.bg, fontFamily: FONT }}>
      {/* Section title */}
      <div style={{
        position: "absolute",
        top: 60,
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
      }}>
        <div style={{
          fontSize: 16,
          fontWeight: 900,
          color: COLORS.blue,
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 12,
        }}>Core Features</div>
        <div style={{
          fontSize: 48,
          fontWeight: 900,
          color: COLORS.text,
          letterSpacing: -2,
        }}>
          Everything your identity needs
        </div>
      </div>

      {/* Three panels */}
      <div style={{
        position: "absolute",
        top: 220,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 24,
      }}>
        {panelData.map((panel, i) => {
          const isActive = activePanel === i;
          return (
            <div
              key={i}
              style={{
                width: 540,
                background: isActive ? "rgba(255,255,255,0.08)" : COLORS.card,
                border: `1px solid ${isActive ? "rgba(255,255,255,0.2)" : COLORS.cardBorder}`,
                borderRadius: 32,
                padding: 40,
                transition: "all 0.3s",
                transform: isActive ? "scale(1.02)" : "scale(1)",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 20 }}>{panel.icon}</div>
              <div style={{
                fontSize: 24,
                fontWeight: 900,
                color: COLORS.text,
                marginBottom: 8,
                letterSpacing: -0.5,
              }}>{panel.title}</div>
              <div style={{
                fontSize: 14,
                color: COLORS.textMuted,
                fontWeight: 600,
                marginBottom: 24,
              }}>{panel.subtitle}</div>

              {/* Panel-specific content */}
              {i === 0 && (
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 20,
                  padding: 20,
                  border: `1px solid ${COLORS.cardBorder}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ fontSize: 18, color: COLORS.textMuted }}>🔍</div>
                    <div style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: COLORS.text,
                      fontFamily: "monospace",
                    }}>
                      {typed}<span style={{ opacity: frame % 20 < 10 ? 1 : 0, color: COLORS.blue }}>|</span>
                    </div>
                    <div style={{
                      marginLeft: "auto",
                      padding: "6px 16px",
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.05)",
                      fontSize: 14,
                      fontWeight: 800,
                      color: COLORS.textMuted,
                    }}>.maiat.eth</div>
                  </div>
                  <div style={{ opacity: availableOpacity }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "12px 16px",
                      borderRadius: 14,
                      background: `${COLORS.green}10`,
                    }}>
                      <div style={{ color: COLORS.green, fontSize: 18 }}>✓</div>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.text }}>alice.maiat.eth</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.green, letterSpacing: 2, textTransform: "uppercase" }}>
                          Available for registration
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {i === 1 && (
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 20,
                  padding: 20,
                  border: `1px solid ${COLORS.cardBorder}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.textMuted, letterSpacing: 2, textTransform: "uppercase" }}>Endorsements</div>
                      <div style={{ fontSize: 40, fontWeight: 900, color: COLORS.blue }}>{endorseCount}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.textMuted, letterSpacing: 2, textTransform: "uppercase" }}>Trust Boost</div>
                      <div style={{ fontSize: 40, fontWeight: 900, color: COLORS.green }}>+{trustBoost}</div>
                    </div>
                  </div>
                  <div style={{
                    height: 6,
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.05)",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${(endorseCount / 12) * 100}%`,
                      background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.green})`,
                      borderRadius: 3,
                    }} />
                  </div>
                </div>
              )}

              {i === 2 && (
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 20,
                  padding: 20,
                  border: `1px solid ${COLORS.cardBorder}`,
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 56, marginBottom: 8 }}>🪲</div>
                  <div style={{ fontSize: 48, fontWeight: 900, color: COLORS.orange }}>{scarabCount}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, letterSpacing: 2, textTransform: "uppercase" }}>
                    Scarab earned
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 4: Trust Network Vision ────────────────────────────────────────────

const Scene4_Network: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Node positions (grows over time)
  const maxNodes = 20;
  const nodeCount = Math.min(maxNodes, Math.floor(interpolate(frame, [0, 120], [3, maxNodes], {
    extrapolateRight: "clamp",
  })));

  const nodes = Array.from({ length: maxNodes }, (_, i) => {
    const angle = (i / maxNodes) * Math.PI * 2 + i * 0.3;
    const radius = 200 + (i % 3) * 80;
    return {
      x: 960 + Math.cos(angle + frame * 0.003) * radius,
      y: 540 + Math.sin(angle + frame * 0.003) * radius,
      size: 12 + (i % 3) * 4,
      color: i % 4 === 0 ? COLORS.blue : i % 4 === 1 ? COLORS.green : i % 4 === 2 ? COLORS.orange : COLORS.text,
      visible: i < nodeCount,
    };
  });

  // Stats counters
  const passports = Math.min(1247, Math.floor(interpolate(frame, [30, 120], [0, 1247], { extrapolateRight: "clamp" })));
  const queries = Math.min(89000, Math.floor(interpolate(frame, [40, 130], [0, 89000], { extrapolateRight: "clamp" })));
  const agents = Math.min(342, Math.floor(interpolate(frame, [50, 140], [0, 342], { extrapolateRight: "clamp" })));

  const tagOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, fontFamily: FONT }}>
      {/* Connection lines */}
      <svg width="1920" height="1080" style={{ position: "absolute" }}>
        {nodes.map((node, i) =>
          nodes.slice(i + 1).map((other, j) => {
            if (!node.visible || !other.visible) return null;
            const dist = Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2);
            if (dist > 350) return null;
            return (
              <line
                key={`${i}-${j}`}
                x1={node.x} y1={node.y}
                x2={other.x} y2={other.y}
                stroke={COLORS.blue}
                strokeWidth={1}
                opacity={0.15 * (1 - dist / 350)}
              />
            );
          })
        )}
        {nodes.map((node, i) =>
          node.visible ? (
            <g key={i}>
              <circle
                cx={node.x} cy={node.y} r={node.size + 8}
                fill={node.color}
                opacity={0.1}
              />
              <circle
                cx={node.x} cy={node.y} r={node.size}
                fill={node.color}
                opacity={0.8}
              />
            </g>
          ) : null
        )}
      </svg>

      {/* Central tagline */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        zIndex: 10,
      }}>
        <div style={{
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(20px)",
          borderRadius: 32,
          padding: "40px 64px",
          border: `1px solid ${COLORS.cardBorder}`,
        }}>
          <div style={{
            fontSize: 48,
            fontWeight: 900,
            color: COLORS.text,
            letterSpacing: -2,
            marginBottom: 12,
          }}>
            Trust infrastructure
          </div>
          <div style={{
            fontSize: 36,
            fontWeight: 600,
            color: COLORS.blue,
            letterSpacing: -1,
          }}>
            for agentic commerce
          </div>
        </div>
      </div>

      {/* Stats bar at bottom */}
      <div style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 80,
        opacity: tagOpacity,
      }}>
        {[
          { label: "Passports Issued", value: passports.toLocaleString() },
          { label: "Trust Queries", value: queries >= 1000 ? `${(queries / 1000).toFixed(1)}K` : queries.toString() },
          { label: "Active Agents", value: agents.toLocaleString() },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, fontWeight: 900, color: COLORS.text }}>{stat.value}</div>
            <div style={{
              fontSize: 11,
              fontWeight: 800,
              color: COLORS.textMuted,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 5: CTA ─────────────────────────────────────────────────────────────

const Scene5_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const subtitleOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: "clamp" });
  const urlOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateRight: "clamp" });
  const badgesOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // Pulse animation for CTA
  const pulse = Math.sin(frame * 0.05) * 0.03 + 1;

  return (
    <AbsoluteFill style={{ background: COLORS.bg, fontFamily: FONT }}>
      {/* Atmospheric blurs */}
      <div style={{
        position: "absolute",
        top: "20%", left: "30%",
        width: "40%", height: "40%",
        borderRadius: "50%",
        background: "rgba(59,130,246,0.12)",
        filter: "blur(120px)",
      }} />
      <div style={{
        position: "absolute",
        bottom: "20%", right: "20%",
        width: "30%", height: "30%",
        borderRadius: "50%",
        background: "rgba(52,211,153,0.08)",
        filter: "blur(100px)",
      }} />

      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: `translate(-50%, -50%) scale(${titleScale})`,
        textAlign: "center",
      }}>
        <div style={{
          fontSize: 80,
          fontWeight: 900,
          letterSpacing: -4,
          lineHeight: 1.1,
          marginBottom: 24,
          background: "linear-gradient(to bottom, #FFFFFF, #9CA3AF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Claim Your<br />Passport
        </div>

        <div style={{
          opacity: subtitleOpacity,
          fontSize: 24,
          fontWeight: 500,
          color: COLORS.textMuted,
          marginBottom: 48,
        }}>
          One name. Trust score. On-chain reputation.
        </div>

        {/* URL card */}
        <div style={{
          opacity: urlOpacity,
          transform: `scale(${pulse})`,
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            padding: "20px 48px",
            borderRadius: 40,
            background: "rgba(255,255,255,0.1)",
            border: `1px solid rgba(255,255,255,0.15)`,
            backdropFilter: "blur(40px)",
          }}>
            <div style={{
              fontSize: 28,
              fontWeight: 900,
              color: COLORS.text,
              letterSpacing: -0.5,
            }}>
              passport.maiat.io
            </div>
            <div style={{
              padding: "10px 24px",
              borderRadius: 20,
              background: COLORS.text,
              color: COLORS.bg,
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}>
              Register →
            </div>
          </div>
        </div>

        {/* Feature badges */}
        <div style={{
          display: "flex",
          gap: 24,
          justifyContent: "center",
          marginTop: 40,
          opacity: badgesOpacity,
        }}>
          {["Free Registration", "Zero Gas", "10 🪲 Bonus"].map((text) => (
            <div key={text} style={{
              padding: "8px 20px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${COLORS.cardBorder}`,
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.textMuted,
              letterSpacing: 1,
            }}>
              {text}
            </div>
          ))}
        </div>

        {/* Powered by */}
        <div style={{
          marginTop: 48,
          fontSize: 13,
          fontWeight: 600,
          color: "rgba(255,255,255,0.3)",
          letterSpacing: 2,
          opacity: badgesOpacity,
        }}>
          Powered by <span style={{ color: COLORS.text, fontWeight: 800 }}>NameStone</span> · CCIP-Read · Base
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Main Composition ─────────────────────────────────────────────────────────

export const MaiatPromoVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Scene 1: Problem (0-8s = 0-240 frames) */}
      <Sequence from={0} durationInFrames={240}>
        <Scene1_Problem />
      </Sequence>

      {/* Scene 2: Reveal (8-18s = 240-540 frames) */}
      <Sequence from={240} durationInFrames={300}>
        <Scene2_Reveal />
      </Sequence>

      {/* Scene 3: Features (18-27s = 540-810 frames) */}
      <Sequence from={540} durationInFrames={270}>
        <Scene3_Features />
      </Sequence>

      {/* Scene 4: Network (22-27s = 660-810 frames, overlaps with features) */}
      <Sequence from={660} durationInFrames={150}>
        <Scene4_Network />
      </Sequence>

      {/* Scene 5: CTA (27-30s = 810-900 frames) */}
      <Sequence from={750} durationInFrames={150}>
        <Scene5_CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
