# Maiat Passport — Gemini Veo Prompt v2（針對 v1 問題優化）

## v1 問題清單

| 問題 | 原因 | v2 修正 |
|------|------|--------|
| 出現一隻手在觸控 | Veo 預設把 UI 動畫理解成有人在操作 | 明確禁止人體、手指、裝置 |
| 文字全部拼錯 | Veo 無法精準渲染文字 | 減少文字依賴，改用動態圖形語言 |
| 3D 透視傾斜 | Veo 把它當成實體裝置在拍 | 強調正面平視、screen recording 風格 |
| BETA badge 位置錯 | prompt 描述不夠精確 | 減少小元素，聚焦大視覺 |
| 只有 8 秒 | prompt 太長 Veo 只取前段 | 拆成多段分別生成 |
| 缺少 Bento / Code block | prompt 塞太多場景 | 每段 prompt 只描述一個場景 |

---

## 核心策略：拆段生成 + 避開 Veo 弱點

Veo 的文字渲染很差，所以策略是：
1. **用 Veo 生成無文字的動態視覺素材**
2. **文字後期用 CapCut / Canva / Remotion 疊加**
3. **每段 prompt 只描述一個 5-8 秒場景**
4. **最後在剪輯軟體裡拼接**

---

## Prompt 1：開場氛圍（5 秒）

```
A smooth cinematic animation of an abstract digital identity concept.
Warm cream-white background color like unbleached luxury paper.

Soft blurred pastel light orbs drift slowly — a pale blue sphere
in the top-left corner and a faint peach sphere in the bottom-right,
both extremely blurred and barely visible, creating a warm atmospheric glow.

A large frosted white glass rectangle with super-rounded corners (pill shape)
fades in at the center of frame. The card has a barely-visible thin border
and an extremely subtle shadow. Inside is empty — just the clean glass card
floating on the warm cream background.

Camera is perfectly flat, front-facing, no perspective, no tilt, no 3D angle.
Like a flat screen recording, not a physical device.

NO people, NO hands, NO fingers, NO devices, NO screens, NO phones, NO tablets.
NO text, NO letters, NO words. Pure abstract shapes and light.

Style: Apple product launch aesthetic, ultra-minimal, warm, quiet luxury.
Smooth slow motion. 24fps cinematic.
```

> 後期疊加文字：「maiat.eth」+ BETA badge + tagline

---

## Prompt 2：搜尋動態（5 秒）

```
A smooth animation on warm cream-white background (#F8F8F6).

A white frosted glass pill-shaped bar (very rounded corners, 40px radius)
sits centered in frame. It has a barely-visible border and soft shadow.

Inside the bar, a blinking cursor appears on the left side. Then abstract
dark shapes (representing typed characters) materialize one by one from
left to right, like someone is typing. The shapes are bold and black.

After the typing completes, a soft green checkmark icon smoothly appears
to the right of the shapes with a gentle spring bounce animation.

Below the bar, a smaller white glass card slides up with spring physics —
it contains a green accent line on its left edge.

Then a black pill-shaped button fades in below everything.

Camera: perfectly flat, front-facing, NO angle, NO tilt, NO perspective.
NO people, NO hands, NO fingers, NO touch gestures.
NO readable text — use abstract dark shapes to represent text.

Style: flat UI animation, like a motion design prototype.
Warm, clean, minimal. Smooth spring animations.
```

> 後期疊加文字：搜尋欄「alice」、「alice.maiat.eth ✓ Available」、按鈕「Register →」

---

## Prompt 3：Bento Grid 數據展示（5 秒）

```
A smooth animation on warm cream-white background.

An asymmetric grid layout appears — a large white glass card on the left
(taking 60% width) and two smaller cards stacked on the right.

The large left card contains a very large bold counter number that
animates upward from zero, displayed in near-black color.

The top-right card is the ONLY dark element — a near-black rectangle
(#0D0E12 color) with rounded corners. In its top-left corner are three
tiny colored circles in a row: red, orange, and green (like macOS window
controls). This dark card creates dramatic contrast against the warm
white background.

The bottom-right has a small white card with a blue circular ring
(like a progress indicator) that fills clockwise.

All cards have super-rounded corners (32-40px), barely-visible borders,
and extremely subtle shadows. They appear with staggered spring animations
— left first, then right top, then right bottom.

Camera: flat, front-facing, no perspective.
NO people, NO hands, NO devices.
Minimal abstract shapes, no readable text.

Style: bento grid layout animation, Apple keynote aesthetic.
```

> 後期疊加文字：「5.0K+」計數器、code block 內容、Trust Score「67」

---

## Prompt 4：三步驟卡片（5 秒）

```
Smooth animation on warm cream-white background.

Three identical white frosted glass cards appear side by side with equal
spacing. Each card has super-rounded corners (40px radius), a barely-visible
border, and extremely soft shadow.

They appear one by one from left to right with staggered spring bounce
animations — first card, then second (0.2s delay), then third (0.4s delay).

Each card has a small rounded square icon area at the top — the first two
are light gray, the third one has a soft green tint.

When each card appears, a subtle glass shimmer effect sweeps diagonally
across its surface, like light reflecting off frosted glass.

The cards gently hover with a slow floating motion after appearing.

Camera: flat, front-facing, perfectly centered.
NO people, NO hands, NO devices, NO text.

Style: clean UI card animation, premium SaaS landing page feel.
Warm cream background, white glass cards, spring physics motion.
```

> 後期疊加文字：步驟 1/2/3 標題、描述、icon

---

## Prompt 5：CTA 收尾（5 秒）

```
Smooth cinematic animation on warm cream-white background (#F8F8F6).

From the center of frame, a large abstract shape made of bold black
strokes fades in with a smooth scale animation (from 0.8 to 1.0 scale).
This represents a large headline.

Below it, a white frosted glass pill button appears with a spring bounce.
The button has a dark fill on its right portion (like a CTA action area).
The button gently pulses with a slow breathing animation (scale 1.0 to 1.02
and back, repeating).

Soft atmospheric light orbs drift in the background — pale blue top-left,
faint peach bottom-right, both heavily blurred.

Small abstract pill-shaped badges (3 of them) fade in below the button
in a horizontal row, each with light gray backgrounds.

At the very bottom, a thin line of tiny abstract shapes represents
footer text.

Camera: flat, front-facing, no tilt.
NO people, NO hands, NO text.

Style: hero section animation, premium product landing page.
Apple-level polish, warm, confident, quiet.
```

> 後期疊加文字：「Claim Your Passport」、「passport.maiat.io」、badges、footer

---

## 後期拼接順序

```
Prompt 1 (5s) → Prompt 2 (5s) → Prompt 3 (5s) → Prompt 4 (5s) → Prompt 5 (5s)
= 25 秒主片

加上：
- 片頭 logo 動畫 (2s)
- 片尾 URL + social (3s)
= 30 秒完整宣傳片
```

**後期工具建議：** CapCut（免費）或 Canva Video

在每段 Veo 素材上疊加：
1. 精確的文字（Inter font, weight 900）
2. 小 icon（搜尋、盾牌、閃電）
3. 轉場（simple cross-dissolve）
4. 背景音樂（推薦 Artlist 的 minimal tech 類）

---

## 如果想要一段跑完（不拆段）

```
A 10-second smooth product animation on warm cream-white background,
like unbleached luxury paper. No text, no words, no letters anywhere.

A large white frosted glass card with super-rounded corners (pill shape)
fades into the center. Barely-visible border, extremely soft shadow.
Soft blurred pastel blue and peach light orbs float in background.

A white pill-shaped search bar appears below the card with a spring
animation. A blinking cursor animates inside it. Abstract dark shapes
materialize representing typed text. A green checkmark pops in.

A black pill button slides up below with spring physics.

Camera is perfectly flat and front-facing like a screen recording.
Absolutely NO people, NO hands, NO fingers, NO devices, NO screens.

Style: Apple product launch, ultra-minimal, warm quiet luxury.
Smooth spring physics animations. Premium SaaS landing page aesthetic.
```

> 這個版本適合 Veo 的 8-10 秒限制，一次跑完再後期加字

---

## 關鍵禁忌（每段都要加）

```
MUST INCLUDE IN EVERY PROMPT:
- "NO people, NO hands, NO fingers, NO touch gestures"
- "NO devices, NO screens, NO phones, NO tablets"
- "NO readable text, NO letters, NO words"
- "Camera: flat, front-facing, no perspective, no tilt, no 3D angle"
- "Like a flat screen recording, not a physical device being filmed"
```
