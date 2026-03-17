# Maiat Passport 宣傳影片 — Remotion Claude Code Prompt

> 這個 prompt 是根據 `MaiatApp.tsx` 原始碼的設計風格精確提取而成。
> 直接複製到 Claude Code 中使用即可。

---

## 使用方式

```bash
# 1. 建立 Remotion 專案
npx create-video@latest maiat-passport-video --template blank

# 2. 進入專案，啟動 Claude Code
cd maiat-passport-video
claude

# 3. 貼上下方 prompt
```

---

## Prompt（直接複製使用）

```
Create a 30-second promotional video for "Maiat Passport" — an on-chain identity
layer for autonomous agents. The video should be 1920x1080 at 30fps (900 frames total).

## DESIGN SYSTEM (extracted from production code — follow exactly)

### Colors (Dark Mode Only)
- Background: #0A0A0A
- Card background: rgba(255,255,255,0.05)
- Card border: rgba(255,255,255,0.08)
- Text primary: #FFFFFF
- Text muted: #9CA3AF
- Blue accent: #3B82F6 (primary actions, "proceed" verdict)
- Green: #34D399 ("trusted" verdict, success states)
- Orange: #FBBF24 ("caution" verdict, scarab rewards)
- Red: #EF4444 ("avoid" verdict)
- Code block bg: #0D0E12

### Typography
- Font: Inter (Google Fonts), fallback: -apple-system, sans-serif
- Hero title: font-weight 900, letter-spacing -0.06em
- Section titles: font-weight 900, letter-spacing -0.04em
- Labels: font-weight 800-900, letter-spacing 0.15-0.3em, uppercase, 10-12px
- Body: font-weight 500-700

### Glassmorphism Cards
- Background: rgba(255,255,255,0.05)
- Border: 1px solid rgba(255,255,255,0.08)
- Border-radius: 2.5rem (40px) for cards, 2rem (32px) for smaller elements
- Backdrop-filter: blur(60px) saturate(180%)
- Hover state: bg rgba(255,255,255,0.08), border rgba(255,255,255,0.2)
- Shadow: inset 0 0 30px rgba(255,255,255,0.02), 0 30px 100px rgba(0,0,0,0.3)

### Atmospheric Background
- Top-left: blue-900/20 (#1e3a5f33) blur(120px) sphere, slow pulsing scale
- Bottom-right: purple-900/10 (#581c871a) blur(150px) sphere, slow pulsing

### Animations (use Remotion spring() to replicate)
- Entrance: spring with damping:12, stiffness:100-200
- Ease curve: [0.16, 1, 0.3, 1] (cubic-bezier)
- Card hover: y:-10, rotateX:2, rotateY:-2
- Text reveal: opacity 0→1, y 20→0

## SCENE BREAKDOWN

### Scene 1: Problem Statement (frames 0-240, 8 seconds)
- Dark #0A0A0A background
- 12 random wallet addresses (format: "0x7a3B...f2E4") floating across screen
  - Monospace font, dim gray (#9CA3AF), opacity 0.15-0.3
  - Slow horizontal drift at different speeds, gentle sine-wave vertical float
  - Fade in over 30 frames, fade out near end
- Center: typing animation for "In a world of anonymous wallets..."
  - White, 52px, font-weight 700
  - Blinking blue cursor
- Second line types in after: "who do you trust?"
  - Blue #3B82F6, 64px, font-weight 900

### Scene 2: Maiat Passport Reveal (frames 240-540, 10 seconds)
- Same atmospheric background blurs as the website
- Vertical blue light beam fades in (blur 20px, opacity 0.3)
- GlassMorphism Passport Card springs up from bottom:
  - spring() with damping:12
  - Contains:
    - Logo "M" in gradient (blue→purple) rounded square (64x64, borderRadius 20)
    - "vitalik.maiat.eth" in white, 36px, font-weight 900
    - "Verified Human" label in muted gray, uppercase, 14px, letter-spacing 3px
    - Trust Score: large "92" in green (#34D399), 72px, font-weight 900
    - Circular Trust Ring SVG animating from 0 to 92/100
    - "Trusted" badge: green bg/text with pill shape (borderRadius 20)
    - "🪲 250" Scarab balance badge
- Tagline fades in at bottom: "Your on-chain identity. Verified by the community."

### Scene 3: Feature Showcase (frames 540-810, 9 seconds)
Three panels in a row, each 540px wide, 90 frames each:
- Top: section label "CORE FEATURES" in blue, 16px, tracking 4px
- Title: "Everything your identity needs" white, 48px, weight 900

**Panel 1 — ENS Registration (active frames 540-630)**
- Search bar with typing animation: "alice" → "alice.maiat.eth"
- ".maiat.eth" suffix badge
- Green available indicator: "✓ Available for registration"

**Panel 2 — KYA Endorsement (active frames 630-720)**
- Endorsement counter animating 0→12
- Trust Boost counter "+15" in green
- Progress bar filling with blue→green gradient

**Panel 3 — Scarab Rewards (active frames 720-810)**
- Large 🪲 emoji center
- Counter animating 0→50 in orange (#FBBF24)
- "Scarab earned" label

Active panel has brighter border (rgba(255,255,255,0.2)) and slight scale(1.02).

### Scene 4: Trust Network (frames 660-810, 5 seconds)
- 20 nodes growing on screen in circular pattern
- Connection lines between close nodes (distance < 350px), low opacity
- Node colors: rotating blue, green, orange, white
- Central glass card with:
  - "Trust infrastructure" white 48px
  - "for agentic commerce" blue 36px
- Bottom stats bar:
  - "1,247" Passports Issued
  - "89.0K" Trust Queries
  - "342" Active Agents
  - Each with uppercase tracking-wide label

### Scene 5: CTA (frames 750-900, 5 seconds)
- Large text with gradient (white→gray): "Claim Your Passport"
  - 80px, font-weight 900, spring entrance
- Subtitle: "One name. Trust score. On-chain reputation."
- Glass pill button pulsing gently:
  - "passport.maiat.io" + "Register →" black on white button
- Feature badges: "Free Registration" · "Zero Gas" · "10 🪲 Bonus"
- Footer: "Powered by NameStone · CCIP-Read · Base"

## TECHNICAL NOTES
- Use Remotion's spring() for all entrance animations
- Use interpolate() for typing, counter, and progress animations
- Use <Sequence> for scene timing
- Scenes 3↔4 and 4↔5 should overlap slightly for smooth transitions
- No external images needed — everything is CSS/SVG
- Export as 1920x1080 MP4
```

---

## 生成後調整

影片生成後，你可以用自然語言繼續迭代：

```
# 修改顏色
"把背景改成深藍色 #0D1117，accent 改成紫色 #8B5CF6"

# 加入音訊
"加入一段低沉的科技感背景音樂，從 public/bgm.mp3 載入"

# 改變節奏
"Scene 2 太長了，縮短到 6 秒，把多的時間給 Scene 3"

# 新增場景
"在 Scene 3 後加一個 Agent registration 的 demo 場景，展示 curl POST 指令"

# 調整動畫
"所有 spring 動畫的 damping 改成 8，讓它更有彈性"
```

---

## 個人化影片模板 Prompt

```
Create a 5-second personalized Passport video template (1080x1080, 30fps,
150 frames) that accepts these props via defaultProps:

- ensName: string (e.g. "alice")
- trustScore: number (0-100)
- verdict: "trusted" | "proceed" | "caution" | "avoid"
- scarabBalance: number
- type: "human" | "agent"

The video shows:
1. Glassmorphism card with the passport info (same design tokens as above)
2. Trust Ring animating from 0 to trustScore
3. Verdict badge in the appropriate color
4. "passport.maiat.io" watermark at bottom

This will be used for social media sharing — optimize for Twitter/Instagram square format.
```
