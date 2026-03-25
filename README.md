# DoudouFinds 💜

**DoudouFinds** is a deal-aggregation platform curating the best discounts across three categories:

| Category | Description |
|----------|-------------|
| 💄 Beauty | Skincare, makeup, haircare & more |
| 👗 Fashion | Clothes, shoes, bags & accessories |
| 🏠 Home | Décor, kitchen, bedding & appliances |

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: TypeScript

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── components/
│   ├── Navbar.tsx          # Responsive navigation bar
│   ├── DealCard.tsx        # Individual deal card
│   └── CategorySection.tsx # Deal section per category
├── data/
│   └── deals.ts            # Deal data and helpers
├── beauty/
│   └── page.tsx            # Beauty deals page
├── fashion/
│   └── page.tsx            # Fashion deals page
├── home-decor/
│   └── page.tsx            # Home deals page
├── layout.tsx              # Root layout
└── page.tsx                # Homepage
```

## Features

- 🎀 Feminine, modern design with pink/purple accents
- 🔥 "HOT" badge for trending deals
- 💰 Savings displayed with % off and dollar amount
- 📱 Fully responsive (mobile-first)
- 🧭 Category navigation (Beauty / Fashion / Home)
- ⬆️ Deal votes to surface the best deals
