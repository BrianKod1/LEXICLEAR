# LexiClear

LexiClear is an AI contract explainer built as a standalone web product with an embeddable company widget. Users paste legal text and receive plain-English clause summaries, red/yellow/green risk labels, gotcha warnings, and jargon definitions.

## Product Surfaces

- Web SaaS dashboard: document history, new analysis, saved clause reviews.
- Company embed: iframe widget at `/embed?key=...` with domain-restricted embed keys.
- Public demo: `/demo`, designed for sharing in a LinkedIn post or short product walkthrough.
- Mobile app shell: Expo app ready to connect to the same product experience.

## Local Setup

```bash
cd apps/web
npm install
npm run dev
```

## Production Build

```bash
cd apps/web
npm install
npm run build
npm run start
```

## Vercel Deployment

The web app is a React Router app configured with the Vercel preset.

Recommended Vercel settings:

```text
Root Directory: apps/web
Install Command: npm install
Build Command: npm run build
Framework Preset: React Router
```

After deployment, share:

```text
https://your-vercel-domain.com/demo
```

Required production environment variables:

```text
DATABASE_URL=
AUTH_SECRET=
AUTH_URL=
NEXT_PUBLIC_CREATE_APP_URL=
EXPO_PUBLIC_WEB_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

Create the database tables with `apps/web/database/schema.sql`.

## Demo

Open `/demo` to show the product without requiring auth, Stripe, a database, or AI provider access. Use this for LinkedIn while the production environment is being connected.

## Important Disclaimer

LexiClear provides educational AI-generated summaries and is not a replacement for professional legal advice.
