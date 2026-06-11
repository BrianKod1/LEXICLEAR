# LexiClear TestFlight Checklist

Use this checklist to upload the first iOS beta of LexiClear to TestFlight through App Store Connect.

## Current App Details

- App name: LexiClear
- Bundle ID: `com.lexiclear.app`
- Version: `1.0.0`
- iOS build number: `1`
- Website: `https://lexiclear-two.vercel.app`
- Demo URL: `https://lexiclear-two.vercel.app/demo`
- Privacy Policy URL: `https://lexiclear-two.vercel.app/privacy`
- Terms URL: `https://lexiclear-two.vercel.app/terms`
- Recommended category: Productivity
- Secondary category: Business

## Apple Account Needed

You need an active Apple Developer Program membership for TestFlight distribution. Apple lists this as a paid annual membership and includes TestFlight beta build management as a membership benefit.

## App Store Connect Setup

1. Go to App Store Connect: https://appstoreconnect.apple.com
2. Choose **Apps**.
3. Create a new app.
4. Platform: iOS
5. Name: LexiClear
6. Primary language: English (U.S.)
7. Bundle ID: `com.lexiclear.app`
8. SKU: `lexiclear-ios-001`
9. User Access: Full Access

## TestFlight Beta Information

Beta app description:

```text
LexiClear helps people understand contracts and legal documents in plain English before they sign. This beta lets testers open the LexiClear demo, review example clause explanations, and confirm that the mobile experience is clear and easy to use.
```

What to test:

```text
Please test the home screen, demo link, privacy/terms links, readability on your device, and whether the plain-English contract explanation flow is easy to understand.
```

App Review notes:

```text
LexiClear is an educational contract-reading assistant. It is not a law firm and does not provide legal advice. No account is required to test the beta experience. Open the app and tap "Open Demo" to view the hosted demo flow.
```

Contact email:

```text
Use the Apple Developer account email until a dedicated support email is created.
```

## Privacy Answers Draft

Use these as the starting point for App Privacy in App Store Connect.

- Tracking: No, unless advertising or third-party tracking is added later.
- Data linked to the user: email/account details if sign-in is enabled, uploaded document text, payment/subscription status if subscriptions are enabled.
- Data not linked to the user: app diagnostics and basic usage analytics if enabled.
- Sensitive data: legal document content may be sensitive user-provided content.
- Ads: No.

## Build And Upload With EAS

Run these from Git Bash:

```bash
cd ~/Downloads/anything/anything/apps/mobile
npm install
npx --yes eas-cli login
EXPO_PUBLIC_WEB_URL=https://lexiclear-two.vercel.app npx --yes eas-cli build --platform ios --profile production
EXPO_PUBLIC_WEB_URL=https://lexiclear-two.vercel.app npx --yes eas-cli submit --platform ios --profile production
```

During the iOS build, EAS may ask permission to create or use Apple certificates and provisioning profiles. Say yes if the Apple Developer account is ready.

## TestFlight Release Steps

1. Wait for the build to finish processing in App Store Connect.
2. Open the LexiClear app in App Store Connect.
3. Go to the TestFlight tab.
4. Add internal testers first.
5. Install TestFlight on your iPhone.
6. Accept the invite and install LexiClear.
7. After internal testing works, create an external tester group.
8. Add the build to that group.
9. Submit the beta for Apple TestFlight review.
10. When approved, share the public TestFlight link on LinkedIn.

## LinkedIn TestFlight Post Draft

```text
I am opening up early TestFlight access for LexiClear.

LexiClear helps people understand contracts in plain English before they sign, with a focus on making legal language easier to review and discuss.

I am looking for early testers who can try the mobile beta and share feedback on clarity, trust, and usability.

TestFlight link: [paste link here]
Demo: https://lexiclear-two.vercel.app/demo
```
