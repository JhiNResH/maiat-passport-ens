# Maiat Passport × Remotion AI Skills：宣傳影片生成 & 流量增長策略

## 一、為什麼選 Remotion？

Maiat Passport 本身就是 Next.js + React + TypeScript 技術棧，而 Remotion 正好是「用 React 寫影片」的框架。這意味著：

- 你現有的 Framer Motion 動畫邏輯、Tailwind 設計語言、甚至元件本身都能直接複用到影片裡
- 團隊不需要學 After Effects 或 Premiere，用同一套程式碼就能產出影片
- AI Agent Skills 讓你用自然語言描述場景，Claude Code 自動生成 Remotion 程式碼
- 可以批量生成數千支個人化影片（每個 Passport 持有者一支專屬影片）

---

## 二、Remotion 環境搭建（5 分鐘）

### Step 1：建立 Remotion 專案

```bash
# 在 maiat-passport-ens 旁邊建一個影片專案
npx create-video@latest maiat-passport-video
# 選 Blank template
# 選 Yes 使用 TailwindCSS
# 選 Yes 安裝 Skills
```

### Step 2：安裝 Agent Skills

```bash
cd maiat-passport-video
npx skills add remotion-dev/skills
```

這會在專案中安裝 37+ 個 AI 技能規則，涵蓋：動畫、3D、字幕、音訊、圖表、轉場、文字特效等。

### Step 3：用 Claude Code 生成影片

```bash
claude
# 進入 Claude Code 後直接下 prompt：
> 建立一支 30 秒的 Maiat Passport 宣傳影片，1920x1080，30fps...
```

Remotion Studio 會在 `localhost:3000` 即時預覽，調整滿意後：

```bash
npx remotion render src/index.ts MainVideo out/maiat-promo.mp4
```

---

## 三、宣傳影片腳本設計（建議 30-60 秒）

### 場景 1：問題陳述（0-8 秒）

**視覺：** 暗色背景，散落的錢包地址（`0x7a3B...`）快速閃過，混亂感
**文字動畫：** 逐字打出 "In a world of anonymous wallets..."
**音效：** 低沉的科技音效

```
Remotion Prompt 範例：
"Create a dark background scene with random hex wallet addresses
floating and fading across screen. Use monospace font, dim gray
color. Add a typing animation for the text 'In a world of anonymous
wallets, who do you trust?' centered in white, 48px Inter font."
```

### 場景 2：Maiat Passport 登場（8-18 秒）

**視覺：**
- 黑暗中一道光線射入
- Maiat logo 以 glassmorphism 風格浮現（復用你網站的設計語言）
- 一張動態 Passport 卡片從中央放大展開
- 卡片上顯示：ENS 名稱 `vitalik.maiat.eth`、Trust Score 環形動畫、Verdict badge

**文字：** "Your on-chain identity. Verified by the community."

```
Remotion Prompt 範例：
"Transition from dark to a subtle blue gradient. Animate a glass-
morphism card sliding up from bottom with spring physics. The card
shows 'vitalik.maiat.eth' in bold 36px, a circular trust score
ring animating from 0 to 92, and a green 'Trusted' badge. Use
colors: background #0A0A0A, card border rgba(255,255,255,0.08),
accent blue #3B82F6, green #34D399."
```

### 場景 3：核心功能展示（18-40 秒）

用 Bento Grid 風格快速切換展示三大功能：

**3a - Gasless ENS Registration（4 秒）**
- 動畫：搜尋欄打字 "alice" → 顯示 "alice.maiat.eth ✓ Available" → 一鍵 Register
- 強調：Zero Gas, Powered by NameStone + CCIP-Read

**3b - KYA Endorsement（4 秒）**
- 動畫：兩張 Passport 卡片互相連線，endorsement 計數器 +1
- Trust Score 環形圖上升動畫
- 強調：Tweet-to-Endorse, Social Proof

**3c - Scarab Rewards（4 秒）**
- 動畫：🪲 Scarab 代幣從天空灑落
- 計數器從 0 跳到 +5, +10
- 強調：Earn rewards for building trust

```
Remotion Prompt 範例：
"Create a 3-panel bento grid animation. Each panel slides in
sequentially with a 4-second display time:
Panel 1: Search bar typing 'alice' with autocomplete showing
'alice.maiat.eth' and a green checkmark, then a Register button
appearing.
Panel 2: Two passport cards connected by an animated line, with
a counter incrementing and a circular progress ring filling up.
Panel 3: Golden beetle tokens raining down with a bouncing counter
showing +5, +10 rewards.
Use glassmorphism cards on dark background."
```

### 場景 4：生態願景（40-50 秒）

**視覺：**
- 網狀圖：展示 Passport 之間的 trust 連線，形成一個不斷擴張的信任網路
- 節點脈動動畫，新節點持續加入
- 底部 stats：Passports issued、Trust queries、Active agents（用 CountUp 動畫）

**文字：** "Trust infrastructure for agentic commerce"

### 場景 5：CTA 收尾（50-60 秒）

**視覺：**
- 大字 "Claim Your Passport" + 搜尋欄動畫
- URL: passport.maiat.io
- Social icons: Twitter, GitHub, Docs
- "Powered by Base" badge

---

## 四、進階玩法：個人化影片生成

這是 Remotion 最強大的地方——批量生成個人化內容：

### 4a - 每位 Passport 持有者的專屬分享影片

```typescript
// 用 Remotion 的 data props 動態注入每位用戶資料
const PassportVideo: React.FC<{
  ensName: string;
  trustScore: number;
  verdict: string;
  endorsements: number;
  scarabBalance: number;
}> = (props) => {
  return (
    <Composition
      id="PersonalPassport"
      component={PassportScene}
      durationInFrames={150} // 5秒 @30fps
      fps={30}
      width={1080}
      height={1080} // 正方形，適合 Twitter/IG
      defaultProps={props}
    />
  );
};
```

### 4b - 自動化流程

```
用戶 Claim Passport
  → 後端觸發 Remotion Lambda
  → 生成 5 秒個人化影片（展示 ENS 名、Trust Score、徽章）
  → 自動附在 Tweet-to-Endorse 的分享連結裡
```

這樣每次有人在 Twitter 分享 endorsement，附帶的影片都是獨一無二的，大幅提升病毒傳播效果。

---

## 五、流量增長 & 生態策略

### 策略 1：Agent Onboarding 影片漏斗

```
問題：AI Agent 開發者不知道 Maiat Passport 是什麼
解法：用 Remotion 生成一系列「How to」短影片

影片 A (15s)：「3 Steps to Give Your Agent an Identity」
  → 展示 fetch skill.md → auto register → get trust score

影片 B (30s)：「Why Your Agent Needs a Passport」
  → 場景化演示：沒有 Passport 的 Agent 被拒絕交易 vs 有 Passport 的順暢互動

影片 C (60s)：完整 Demo Walk-through
```

**分發管道：** Twitter/X、YouTube Shorts、開發者 Discord、Farcaster

### 策略 2：Endorsement Viral Loop 強化

目前的 Tweet-to-Endorse 流程已經有病毒基因，加上個人化影片可以指數放大：

```
Alice claims passport
  → Alice 的個人影片自動生成
  → Alice 分享到 Twitter（帶影片）
  → Bob 看到影片，點進 passport.maiat.io
  → Bob claims passport，endorses Alice（+5 Scarab 給雙方）
  → Bob 的個人影片生成
  → Bob 分享到 Twitter...
  → 🔄 飛輪效應
```

**關鍵指標優化：**
- 影片讓 Twitter 分享的 engagement rate 提升 3-5x（影片 vs 純文字/圖片）
- 每支影片結尾都有 CTA + referral link
- Scarab 獎勵提供經濟誘因

### 策略 3：Agent 生態整合影片

為每個接入 Maiat Protocol 的 Agent 自動生成「介紹影片」：

```
Agent 註冊 Passport
  → 自動生成 Agent Profile 影片
  → 展示：Agent 名稱、功能描述、Trust Score、Endorsement 數
  → Agent 可嵌入自己的網站/文件
  → 形成 Agent 版的「LinkedIn Profile Video」
```

### 策略 4：開發者內容行銷

用 Remotion 批量生成技術教學影片：

- ERC-8004 Identity Registry 視覺化解說
- KYA (Know Your Agent) 流程動畫圖解
- Trust Score 計算邏輯的動態圖表
- API 整合教學（程式碼打字動畫 + 結果展示）

### 策略 5：Weekly Trust Network Recap

每週自動生成一支「生態報告影片」：

```
每週一凌晨自動跑 cron job：
  1. 從 API 拉取過去 7 天 stats
  2. Remotion 生成 15 秒 recap 影片：
     - 新增 Passport 數量（CountUp 動畫）
     - 本週 Top Endorser
     - Trust Network 成長視覺化
  3. 自動發布到 Twitter
```

---

## 六、技術架構建議

```
maiat-passport-ens/          ← 現有前端
maiat-passport-video/        ← 新建 Remotion 專案
  ├── src/
  │   ├── compositions/
  │   │   ├── PromoVideo.tsx       ← 主宣傳片
  │   │   ├── PersonalPassport.tsx ← 個人化影片模板
  │   │   ├── AgentProfile.tsx     ← Agent 介紹影片
  │   │   └── WeeklyRecap.tsx      ← 週報影片
  │   ├── components/
  │   │   ├── PassportCard.tsx     ← 復用網站設計語言
  │   │   ├── TrustRing.tsx        ← 信任環形圖
  │   │   ├── BentoGrid.tsx        ← Bento 展示區
  │   │   └── GlassCard.tsx        ← Glassmorphism 卡片
  │   └── Root.tsx
  ├── public/
  │   └── maiat-logo.jpg          ← 從主專案複製
  └── remotion.config.ts
```

### 部署方案

| 方案 | 適用場景 | 成本 |
|------|----------|------|
| 本地渲染 | 主宣傳片、一次性影片 | 免費 |
| Remotion Lambda | 個人化影片即時生成 | ~$0.01/影片 |
| GitHub Actions | 週報影片自動化 | 免費（公開 repo） |

---

## 七、第一步行動清單

1. **今天**：`npx create-video@latest` 建立 Remotion 專案，安裝 Skills
2. **Day 1-2**：用 Claude Code 生成 30 秒主宣傳片，迭代 3-5 次
3. **Day 3**：建立 PersonalPassport 影片模板，接入 API 動態資料
4. **Day 4-5**：整合到 Tweet-to-Endorse 流程，每次分享自帶影片
5. **Week 2**：設置 Remotion Lambda，實現即時個人化影片生成
6. **Week 3**：啟動 Weekly Recap 自動化 + Agent Profile 影片功能

---

## 八、預期效果

| 指標 | 目前 | 加入影片後（預估） |
|------|------|-------------------|
| Twitter 分享點擊率 | 2-3% | 8-12%（影片 CTR 顯著高於圖片） |
| Passport Claim 轉換率 | — | 提升 2-3x（影片展示降低認知門檻） |
| Endorsement 完成率 | — | 提升 50%+（個人化影片增加動機） |
| 每週新增 Passport | — | 飛輪啟動後指數增長 |

核心邏輯：**影片降低理解成本 → 更多人 claim → 更多 endorsement → 更多影片分享 → 更多人看到 → 飛輪轉動**
