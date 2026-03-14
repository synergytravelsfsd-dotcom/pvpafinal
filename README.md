# PVPA Website – Registration, QR, and Verification

This repo contains the PVPA site with:
- Google Form registration integration
- Scan-to-Register QR section
- Ticket verification page (/verify)
- Guides for Google Apps Script automation (QR generation + verification API)

## Public Google Form Settings
- Allow anyone to submit the form:
  - Settings → Responses → disable org-only restrictions
  - Keep “Collect email addresses” if you want emailed QR tickets
- Keep response visibility restricted to admins by sharing the Google Sheet only with PVPA admins (link sharing OFF)

## Per-Registrant QR via Apps Script
See detailed script and setup: docs/apps-script-qr.md
- Generates Ticket ID and QR PNG per submission
- Inserts QR into the response row and emails it to the registrant
- Trigger: “On form submit”

## Verification API (Apps Script)
See detailed API script and setup: docs/apps-script-verify.md
- Publishes a Web App that returns JSON { valid, ticketId, name, email, ts }
- After deploying, copy the Web App URL

## Configure the Site to Use the Verify API
- Option A (build-time): create .env with:
  - VITE_VERIFY_API_URL="https://script.google.com/macros/s/DEPLOY_ID/exec"
  - Rebuild: npm run build
- Option B (runtime): set a global variable in index.html:
  - Add a script before </head>:
    - window.__VERIFY_API_URL__ = "https://script.google.com/macros/s/DEPLOY_ID/exec";

The /verify page reads VERIFY_API_URL from either window.__VERIFY_API_URL__ or VITE_VERIFY_API_URL.

## Scan-to-Register QR for Print and Social
- A QR for the live Google Form is included on the Expo page
- To print a poster directly from the site, open the Expo page and use the “Download QR” button
- For a dedicated printable page, you can print the Expo “Scan to Register” section (A4 portrait recommended)

## Local Development
- npm install
- npm run dev

## Build
- npm run build
- Upload dist contents to your hosting or use the GitHub Pages workflow

## GitHub Pages
- Repo contains .github/workflows/pages.yml to build and deploy
- For a custom domain (pvpa.com.pk), CNAME is in public/CNAME
