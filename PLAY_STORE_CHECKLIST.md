# LexiClear Google Play Checklist

## Current App Status

- Android package: `com.lexiclear.app`
- App name: `LexiClear`
- Build format: Android App Bundle (`.aab`) through EAS
- Public web demo: `https://lexiclear-two.vercel.app/demo`
- Privacy policy URL: `https://lexiclear-two.vercel.app/privacy`
- Terms URL: `https://lexiclear-two.vercel.app/terms`

## Before Building

1. Confirm the final production web URL.
2. Set this environment variable for the mobile build:

```text
EXPO_PUBLIC_WEB_URL=https://lexiclear-two.vercel.app
```

3. Confirm the app icon and adaptive icon are final:
   - `apps/mobile/assets/images/icon.png`
   - `apps/mobile/assets/images/adaptive-icon.png`
   - `apps/mobile/assets/images/splash-icon.png`

## Build Commands

From `apps/mobile`:

```bash
npm install
npx eas login
npx eas build:configure
npx eas build --platform android --profile production
```

The production profile is already configured to produce an Android App Bundle.

## Play Console Requirements

Google Play requires app content declarations before review. Complete these in
Play Console under App content:

- Privacy policy: use `https://lexiclear-two.vercel.app/privacy`
- App access: if reviewers need login credentials, provide test credentials
- Ads: answer No unless ads are added later
- Target audience: adults / general audience, not children
- Content rating questionnaire
- Data safety form
- Government apps declaration: No
- Financial features declaration: No, unless payment features change
- Health apps declaration: No

## Data Safety Draft

Use this as a starting point, then verify against the final app behavior:

- Personal info: email address may be collected for account access
- User content: legal text submitted by users may be collected for analysis
- App activity: app interactions may be collected for reliability and product improvement
- Financial info: payment status may be processed by payment providers for subscriptions
- Data is transmitted over secure connections
- Users can request account/data deletion by contacting the developer

## Store Listing Draft

Short description:

```text
Understand contracts with AI-powered plain-English summaries and risk flags.
```

Full description:

```text
LexiClear helps you understand dense legal text before you sign. Paste or review legal language and see plain-English explanations, red/yellow/green risk flags, gotcha warnings, and simple definitions for legal jargon.

LexiClear is built for education and document understanding. It is not a law firm, does not provide legal advice, and does not replace a qualified attorney.
```

## Screenshots Needed

Prepare at least phone screenshots showing:

- LexiClear mobile home screen
- Demo analyzer screen
- Risk flag examples
- Privacy/educational disclaimer
- Web embed concept, if included

## Submission

If using EAS Submit, create a Google Play service account and place the JSON key at:

```text
apps/mobile/google-service-account.json
```

Then run:

```bash
npx eas submit --platform android --profile production
```

The current submit profile sends the release to the internal testing track as a draft.
