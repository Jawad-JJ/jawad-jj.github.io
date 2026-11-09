# Salami Khata

An offline notebook for wedding salami. Pakistani families use it to record the salami they receive at their own shaadi, walima or mehndi, and the salami they give at other people's events, so they always know who gave what.

**Live app:** this repository is served with GitHub Pages and published on Google Play as a Trusted Web Activity.

## Features

- **Sign in with Google or email** to save the khata online and use it on any phone, or **continue as a guest** (data stays on the phone); guests can sign in later and their entries move into the account
- Live sync between phones, with offline changes queued and uploaded when the internet returns
- In-app **account deletion** (Google Play requirement)
- Record salami received or given: name, relation, amount, cash / online (Raast) / gift item, event, date and note
- Events for each shaadi, walima or mehndi, with totals and a **fast entry** mode for the wedding desk
- **Reciprocity hint**: while you type a name, it shows what that person gave you before and what you gave them
- People view with totals per person
- Full **English and Urdu** interface with right-to-left layout
- Works **offline**; signed-in changes sync when back online
- Backup and restore (JSON file), spreadsheet export (CSV), and WhatsApp-ready event summaries
- Light and dark themes

## Tech

- Vanilla JavaScript single-page app, no framework and no build step
- Service worker (`sw.js`) caches the app shell, bundled fonts and the sign-in library for offline use
- Firebase Authentication (Google + email) and Cloud Firestore for accounts, with per-item sync, tombstones for deletes and last-write-wins merging; `firestore.rules` limits each user to their own data
- `localStorage` persistence with Web Share API / download for backups
- Tested with Playwright, including a simulated cloud backend for two-phone sync, offline and account-deletion flows
- Installable PWA (`manifest.json`) packaged for Android with PWABuilder (Trusted Web Activity)

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole app (markup, styles, script) |
| `sw.js` | Offline caching |
| `manifest.json` | App name, colours and icons for installing |
| `firebase-config.js` | Firebase project settings (null = guest-only) |
| `firestore.rules` | Database security rules: each person sees only their own khata |
| `privacy.html` | Privacy policy used on Google Play |
| `delete-account.html` | How to delete an account (Google Play requirement) |
| `fonts/` | Bundled fonts (Lora, Poppins: OFL; TeX Gyre Chorus: GUST Font License) |
| `icons/`, `screenshots/` | App icons and screenshots |
| `.well-known/assetlinks.json` | Links the Play Store app to this website (added after packaging) |

## Releasing an update

1. Edit `index.html`.
2. In `sw.js`, change `VERSION` (for example `v1.0.0` → `v1.0.1`) so phones download the new files.
3. Commit. Installed apps pick up the change the next time they open with internet.
