# LexiClear Launch Checklist

## Demo For LinkedIn

1. Deploy the web app to a public URL.
2. Open `/demo`.
3. Record a 30-60 second walkthrough:
   - Show the sample contract text.
   - Click "Analyze in Plain English".
   - Show risk flags, gotchas, and jargon.
   - Scroll to the company embed snippet.
4. Post with this short description:

```text
I built LexiClear: an AI legal-text explainer that turns dense contracts into plain-English summaries, risk flags, gotchas, and jargon definitions.

It works as both a standalone app and an embeddable widget companies can add to websites or app flows.

Demo: [your deployed /demo URL]

Educational summaries only, not legal advice.
```

## Web Production Setup

Required environment variables:

```text
DATABASE_URL=
AUTH_SECRET=
AUTH_URL=
NEXT_PUBLIC_CREATE_APP_URL=
EXPO_PUBLIC_WEB_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

Vercel settings:

```text
Root Directory: apps/web
Install Command: npm install
Build Command: npm run build
Framework Preset: React Router
```

Database:

1. Create a Neon/Postgres database.
2. Run `apps/web/database/schema.sql`.
3. Confirm these tables exist:
   - `documents`
   - `clauses`
   - `embed_keys`
   - `auth_users` from the auth provider/scaffold

Auth:

1. Confirm credentials signup/signin works.
2. Confirm API routes receive `session.user.id`.
3. Confirm users can only see their own documents and embed keys.

Stripe:

1. Create products/prices or keep dynamic checkout pricing for MVP.
2. Add webhook endpoint `/api/webhooks/stripe`.
3. Subscribe to:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `customer.subscription.trial_will_end`
   - `invoice.payment_failed`

## Embed Product

1. Sign in as a company/admin user.
2. Open `/embed-manager`.
3. Create an embed key.
4. Add `allowed_origin` for the customer's domain.
5. Copy the iframe snippet.
6. Test `/embed?key=...` on the allowed origin.

## Mobile App Store Path

1. Set `EXPO_PUBLIC_WEB_URL` to the deployed LexiClear web URL.
2. Add real app icons and splash assets.
3. Configure EAS project details in `apps/mobile/eas.json`.
4. Add privacy policy and terms URLs.
5. Build with Expo/EAS.
6. Submit to Apple App Store Connect and Google Play Console.

## GitHub Sync

After Codex edits files, push the next commit from Git Bash:

```bash
git add .
git commit -m "Prepare LexiClear deployment"
git push
```
