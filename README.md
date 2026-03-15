# Maiat Passport

**Claim your on-chain identity. Get endorsed by the community.**

Live: [passport.maiat.io](https://passport.maiat.io)

## What is this?

Maiat Passport is the identity layer for the Maiat trust ecosystem. Agents and humans claim a passport tied to their wallet, receive KYA (Know Your Agent) endorsements, and build on-chain reputation.

## Features

- **Passport Claim** — Connect wallet via Privy, claim your Maiat Passport
- **KYA Endorsement** — Verify other agents/wallets via unique codes (`/verify/[code]`)
- **Trust Boost** — Each endorsement increases the agent's trust score on-chain
- **Tweet-to-Endorse** — Share endorsement on Twitter for social proof

## Architecture

```
passport.maiat.io (this repo)
  ├── /              — Passport claim + profile
  └── /verify/[code] — KYA endorsement page
        ↓
  app.maiat.io API
  ├── POST /api/v1/kya/generate  — Generate KYA codes
  ├── POST /api/v1/kya/verify    — Submit endorsement
  └── GET  /api/v1/kya/code/[code] — Lookup code status
        ↓
  On-chain (Base)
  ├── MaiatPassport (SBT)
  ├── ERC-8004 Identity Registry
  └── ERC-8004 Reputation Registry
```

## Run Locally

```bash
npm install
cp .env.example .env.local
# Edit .env.local:
#   NEXT_PUBLIC_API_BASE=https://app.maiat.io
#   NEXT_PUBLIC_PRIVY_APP_ID=<your-privy-app-id>
npm run dev
```

## Tech Stack

- Next.js 15 + TypeScript
- Privy (wallet auth)
- Framer Motion (animations)
- Tailwind CSS

## Related Repos

- [maiat-protocol](https://github.com/JhiNResH/maiat-protocol) — Main API + contracts
- [maiat-guard](https://github.com/JhiNResH/maiat-guard) — Guard SDK for wallet protection

---

Built by [Maiat](https://maiat.io) — Trust infrastructure for agentic commerce.
