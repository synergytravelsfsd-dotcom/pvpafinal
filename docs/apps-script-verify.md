# Apps Script: Ticket Verification API

Publish a simple web API that validates `ticketId` against your Google Sheet.

## Steps
1. Open the Form responses Sheet → Extensions → Apps Script.
2. Add a new file `Verify.gs` with the code below.
3. Deploy: Deploy → New deployment → Type: Web app → Execute as: Me → Who has access: Anyone → Deploy.
4. Copy the Web app URL and set it in the site at `src/pages/Verify.tsx` as `VERIFY_API_URL`.

```javascript
// Adjust sheet name if different
const SHEET_NAME = 'Form responses 1';
const TICKET_COLUMN_HEADER = 'Ticket ID'; // Must match Apps Script generator column

function doGet(e) {
  const out = ContentService.createTextOutput();
  out.setMimeType(ContentService.MimeType.JSON);
  try {
    const ticketId = (e.parameter.ticketId || '').trim();
    if (!ticketId) {
      out.setContent(JSON.stringify({ valid: false, message: 'ticketId required' }));
      return out;
    }
    const ss = SpreadsheetApp.getActive();
    const sheet = ss.getSheetByName(SHEET_NAME);
    const values = sheet.getDataRange().getValues(); // [ [headers], [row1], ... ]
    const headers = values[0];
    const ticketCol = headers.indexOf(TICKET_COLUMN_HEADER);
    const emailCol = headers.indexOf('Email');
    const nameCol = headers.indexOf('Name');
    const tsCol = headers.indexOf('Timestamp');

    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      if (row[ticketCol] === ticketId) {
        const res = {
          valid: true,
          ticketId,
          name: nameCol >= 0 ? row[nameCol] : undefined,
          email: emailCol >= 0 ? row[emailCol] : undefined,
          ts: tsCol >= 0 ? row[tsCol] : undefined,
          row: i + 1,
        };
        out.setContent(JSON.stringify(res));
        return out;
      }
    }
    out.setContent(JSON.stringify({ valid: false, ticketId, message: 'Not found' }));
    return out;
  } catch (err) {
    out.setContent(JSON.stringify({ valid: false, message: String(err) }));
    return out;
  }
}
```

## Security
- Share the web app with “Anyone” only if you’re comfortable exposing validity checks publicly.  
- For stronger security, add a simple API key check via query param and match on server side.

