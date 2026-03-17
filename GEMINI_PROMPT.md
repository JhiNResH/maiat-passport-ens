# Maiat Passport — Gemini Veo 影片生成 Prompt

---

## 主宣傳片（30 秒）

```
A 30-second cinematic product reveal for a premium Web3 identity platform.
The visual style is ultra-clean, warm minimalism — like an Apple product launch,
NOT dark or cyberpunk.

CRITICAL DESIGN LANGUAGE:
- Background: warm creamy off-white (#F8F8F6), like premium unbleached paper
- Cards: near-white frosted glass (rgba 255,255,255,0.85) with barely-visible
  borders (rgba 0,0,0,0.06) and extremely subtle drop shadows
- All corners are super-rounded (32-40px radius), pill-shaped buttons
- Typography: Inter font, extremely bold (weight 900), tight letter-spacing
- Text color: near-black (#141414) on cream background
- Accent colors: soft blue (#3B82F6), emerald green (#34D399)
- Atmospheric light: very soft pastel blue and peach gradient orbs
  floating in the background, heavily blurred, barely visible
- The ONLY dark element is a code terminal block (#0D0E12) with
  macOS-style red/orange/green traffic light dots in the top-left corner
- Overall feeling: quiet luxury, immense whitespace, premium calm

SCENE 1 (0-8s): OPENING
Warm cream background. Soft pastel blue light orb drifts in the top-left,
a faint peach orb in the bottom-right, both heavily blurred.
The word "maiat.eth" fades in — MASSIVE bold black text with a subtle
gradient from pure black to dark gray, dominating the center of frame.
A tiny black pill badge labeled "BETA" rotates 12 degrees in the top-right
corner of the text. Below: "The verifiable identity layer for autonomous agents"
in medium-weight gray text fades in gently.

SCENE 2 (8-16s): SEARCH & REGISTER
A large rounded search bar (white background, super-rounded 40px corners,
hair-thin border) appears centered. Someone types "alice" — the text appears
in bold black. A ".maiat.eth" suffix badge sits on the right side of the bar
in a light gray pill.
Below the bar, a white glass card slides up with spring animation:
a green shield icon, bold text "alice.maiat.eth", and a small green uppercase
label "Available for registration". A black pill button says "Register →".
Below in tiny gray text: "Free · No gas · 10 🪲 bonus"

SCENE 3 (16-22s): BENTO GRID
A bento-style asymmetric grid layout appears:
- LEFT (large card): Big animated counter "5.0K+" in ultra-bold black text,
  with subtitle "Agents Scored & Verified" in gray uppercase tracking-wide text.
  Card is white glass on cream background.
- RIGHT TOP: A dark code terminal block (#0D0E12) — the ONLY dark element
  in the video. Three small dots (red, orange, green) in top-left corner.
  Shows "POST /v1/passport/register" in green monospace text, with a JSON body
  in dim gray. This card creates dramatic contrast against the warm white.
- RIGHT BOTTOM-LEFT: A circular SVG trust ring with blue stroke, showing
  score "67" and verdict "Proceed" in blue text.
- RIGHT BOTTOM-RIGHT: An analytics card with a blue icon and arrow "→".

SCENE 4 (22-26s): THREE STEPS
Three white frosted glass cards appear side-by-side with hover-shimmer effect:
Card 1: "1" in a rounded square, "Connect Wallet"
Card 2: "2", "Pick Your Name" — shows "yourname.maiat.eth" in bold
Card 3: Green checkmark "✓", "You're Verified" — with three feature lines:
  globe icon + "On-chain ENS identity"
  shield icon + "Trust score from day 1"
  lightning icon + "10 🪲 bonus credits"
All cards are white glass, super-rounded (40px), subtle shadows on cream.

SCENE 5 (26-30s): CTA
"passport.maiat.io" appears in bold black on cream background.
Below: "Powered by NameStone · CCIP-Read · Zero Gas" in small gray.
Footer links: Docs · GitHub · Twitter.
The Maiat circular logo (a small round JPG image) sits in the top-left
of a frosted white glass navbar with blur effect.

STYLE NOTES:
- NO dark/black backgrounds — everything is warm cream/off-white
- NO neon, NO glow effects, NO heavy gradients
- Think: Stripe, Linear, Vercel, Apple — quiet, confident, premium
- All motion is smooth with spring physics, gentle and unhurried
- Lots of whitespace, nothing feels crowded
- The warm cream (#F8F8F6) background gives everything a soft, human feel
  that contrasts with the typical cold crypto aesthetic
```

---

## 短版 15 秒（Twitter / Shorts）

```
15-second premium product animation on warm cream off-white background (#F8F8F6).

A massive bold black text "maiat.eth" with a tiny "BETA" pill badge fades in
at center. Below it, a subtitle in gray: "The verifiable identity layer for
autonomous agents."

A rounded white search bar (40px corners, hair-thin border) appears. Someone
types "alice" in bold black. A white glass card slides up below with spring
animation showing "alice.maiat.eth ✓ Available" in emerald green.

A black pill button "Register →" appears. Below in tiny text: "Free · No gas"

Soft pastel blue and peach blurred light orbs drift gently in the background.
Very subtle, barely visible.

Style: Apple product launch aesthetic. Warm, clean, minimal. Inter bold font.
Immense whitespace. NO dark backgrounds, NO neon, NO glow.
Think Stripe or Linear landing page, animated.

Aspect ratio: 1:1 square for social media.
```

---

## 個人化 Passport 影片（5 秒循環）

```
5-second seamless loop on warm cream background (#F8F8F6).

A white frosted glass card (background rgba 255,255,255,0.85, border-radius 40px,
barely-visible border rgba 0,0,0,0.06, extremely soft shadow) floats at center
with gentle hovering motion.

On the card:
- Top-left: a small round logo image (56px, border-radius 14px)
- Bottom-left: bold black text "[NAME].maiat.eth" (weight 900, letter-spacing tight)

Below the card, a barely-visible watermark reads "Maiat Passport" in tiny
uppercase gray text (rgba 0,0,0,0.08).

A very faint green radial gradient (rgba 16,185,129,0.04) drifts in the
top-right as atmosphere.

Style: OG image card brought to life. Premium, quiet, warm. Like a physical
card floating on cream paper.

Aspect ratio: 1:1 square (500x500 logical).
```

---

## Prompt 修正指南

如果 Gemini 生成的結果不夠準確，用以下修正語句：

| 問題 | 修正 Prompt |
|------|------------|
| 背景太暗 | "Make the background warmer, like unbleached paper (#F8F8F6), NOT white or gray" |
| 太多特效 | "Remove all glow effects and gradients. Keep it flat and minimal like Apple's design" |
| 字體不對 | "Use Inter or similar geometric sans-serif, weight 900, very tight letter-spacing" |
| 圓角不夠 | "All card corners should be 40px radius, pill-shaped buttons" |
| 陰影太重 | "Shadows should be almost invisible — opacity 0.04 maximum" |
| 氛圍光太明顯 | "The atmospheric light orbs should be barely perceptible, heavily blurred at 120px" |
| 整體太 crypto/cyberpunk | "This is NOT a crypto aesthetic. Think Stripe, Linear, Apple. Warm, confident, quiet luxury" |
| Code block 太亮 | "The terminal card should be near-black (#0D0E12) with dim text — it's the ONLY dark element" |

---

## 設計 Token 速查

| 元素 | 值 |
|------|---|
| 背景色 | `#F8F8F6` / `#FDFDFB` / `#F9F9F7` |
| 文字色 | `#141414` (近黑) / `#000000` (標題) |
| 灰色文字 | `#9CA3AF` |
| 卡片底色 | `rgba(255,255,255,0.85)` |
| 卡片邊框 | `rgba(0,0,0,0.06)` |
| 卡片陰影 | `0 20px 60px rgba(0,0,0,0.04)` |
| 卡片圓角 | `32px` - `40px` |
| Code block | `#0D0E12` |
| 藍色 accent | `#3B82F6` |
| 綠色 trusted | `#34D399` |
| 橙色 caution | `#FBBF24` |
| 紅色 avoid | `#EF4444` |
| 大氣光（藍） | `blue-100` opacity 30% blur 120px |
| 大氣光（桃） | `orange-50` opacity 40% blur 150px |
| 字型 | Inter, weight 900, tracking -0.04em to -0.06em |
| Navbar blur | `blur(60px) saturate(180%)` |
| macOS dots | 紅 `#EF4444` / 橙 `#F97316` / 綠 `#34D399` |
