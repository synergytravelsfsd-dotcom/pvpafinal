# Google Forms + Sheets + QR Codes (Apps Script Guide)

This guide lets you: 
1) Collect Expo registrations in Google Sheets via your Google Form.  
2) Generate a unique ticket ID per submission.  
3) Create a QR code for each registrant and store it in the Sheet and email it to them.

## Prerequisites
- Your Google Form is already created and linked to a Response Sheet (Form responses 1).  
- The Sheet has columns for Timestamp, Name, Email, etc. (whatever your form collects).  

## Add Apps Script
1. In the response Sheet, go to Extensions → Apps Script.
2. Replace Code.gs with the following code and save.
3. Set up a trigger: Triggers (clock icon) → Add Trigger → `onFormSubmit` → Event type: On form submit.

```javascript
// CONFIG
const QR_BASE = 'https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=';
const TICKET_PREFIX = 'IVP-2026-';
const EMAIL_SUBJECT = 'Your IVP 2026 Registration QR';
const EMAIL_BODY = name => `Dear ${name},

Thank you for registering for IVP 2026. Your QR ticket is attached.
Please present it at the entrance.

Regards,
PVPA`;

function onFormSubmit(e) {
  const sheet = e.range.getSheet();
  const row = e.range.getRow();
  const values = e.values; // array of submitted answers

  // Adjust indexes as per your sheet columns
  const timestamp = values[0];
  const name = values[1] || '';
  const email = values[2] || '';

  // Generate unique ticket ID
  const ticketId = TICKET_PREFIX + Utilities.getUuid().slice(0, 8).toUpperCase();

  // Build QR pointing to a simple ticket payload (you can host verify page later)
  const payload = encodeURIComponent(JSON.stringify({ ticketId, name, email, ts: timestamp }));
  const qrUrl = QR_BASE + payload;

  // Fetch QR image and insert into sheet
  const blob = UrlFetchApp.fetch(qrUrl).getBlob().setName(ticketId + '.png');
  const qrColumn = getOrCreateColumn(sheet, 'QR Image'); // creates header if missing
  sheet.insertImage(blob, qrColumn, row);

  // Write ticketId to a column
  const idColumn = getOrCreateColumn(sheet, 'Ticket ID');
  sheet.getRange(row, idColumn).setValue(ticketId);

  // Email the registrant (if email exists)
  if (email) {
    MailApp.sendEmail({
      to: email,
      subject: EMAIL_SUBJECT,
      body: EMAIL_BODY(name || 'Participant'),
      attachments: [blob],
    });
  }
}

function getOrCreateColumn(sheet, header) {
  const range = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  const headers = range.getValues()[0];
  let col = headers.indexOf(header) + 1;
  if (col === 0) {
    // Add a new column at the end
    col = sheet.getLastColumn() + 1;
    sheet.getRange(1, col).setValue(header);
  }
  return col;
}
```

## How it works
- Every time someone submits the form, the script:
  - Creates a unique Ticket ID.
  - Creates a QR image (PNG) with basic ticket payload.
  - Inserts the QR into the response row and emails it to the registrant.

## Notes
- The QR service used is public (qrserver.com). You can replace with another service or host your own.
- If the Form requires sign-in, the user must be logged in with Google to submit.
- To build a verification flow later, create a simple web app or spreadsheet-bound check that validates `ticketId` at entry.

