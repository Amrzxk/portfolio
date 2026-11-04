/**
 * Portfolio contact form → Gmail (+ Google Sheet log)
 * ─────────────────────────────────────────────────────
 * Deploy this as a Web App from a Google Sheet (Extensions → Apps Script).
 * Full instructions: SETUP.md, step 5.
 *
 * Free quota: ~100 emails/day on a personal Google account.
 */

const CONFIG = {
  // Leave empty to send to the Google account that owns this script.
  RECIPIENT: '',
  SUBJECT_PREFIX: '[Portfolio]',
  SHEET_NAME: 'Messages',
  MIN_FILL_MS: 2500, // bots submit instantly; humans don't
  MAX_MESSAGE: 5000,
  RATE_LIMIT_SECONDS: 60, // one message per email address per minute
};

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Honeypot or impossibly fast submission → pretend success, do nothing.
    if (data.company || Number(data.elapsedMs || 0) < CONFIG.MIN_FILL_MS) {
      return json_({ ok: true });
    }

    const name = clean_(data.name, 100);
    const email = clean_(data.email, 200);
    const subject = clean_(data.subject, 150);
    const message = clean_(data.message, CONFIG.MAX_MESSAGE);
    const page = clean_(data.page, 300);

    if (!name) return json_({ ok: false, error: 'Name is required.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json_({ ok: false, error: 'A valid email is required.' });
    if (message.length < 10) return json_({ ok: false, error: 'Message is too short.' });

    const cache = CacheService.getScriptCache();
    const key = 'rl_' + Utilities.base64EncodeWebSafe(email.toLowerCase());
    if (cache.get(key)) return json_({ ok: false, error: 'Please wait a minute before sending another message.' });
    cache.put(key, '1', CONFIG.RATE_LIMIT_SECONDS);

    const to = CONFIG.RECIPIENT || Session.getEffectiveUser().getEmail();
    const mailSubject = `${CONFIG.SUBJECT_PREFIX} ${subject || 'New message'} — ${name}`;
    const plain = `From: ${name} <${email}>\nPage: ${page}\n\n${message}`;
    const html =
      `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#0f172a">` +
      `<p style="margin:0 0 4px"><b>From:</b> ${esc_(name)} &lt;${esc_(email)}&gt;</p>` +
      (subject ? `<p style="margin:0 0 4px"><b>Subject:</b> ${esc_(subject)}</p>` : '') +
      `<p style="margin:0 0 16px;color:#64748b"><b>Page:</b> ${esc_(page)}</p>` +
      `<div style="white-space:pre-wrap;padding:14px 16px;background:#f1f5f9;border-radius:8px">${esc_(message)}</div>` +
      `<p style="color:#64748b;font-size:13px">Hit “Reply” to answer ${esc_(name)} directly.</p></div>`;

    MailApp.sendEmail({ to: to, replyTo: email, name: 'Portfolio contact form', subject: mailSubject, body: plain, htmlBody: html });

    logRow_([new Date(), name, email, subject, message, page]);
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'Server error. Please try again later.' });
  }
}

/** Visiting the URL in a browser shows this — handy to check the deployment works. */
function doGet() {
  return json_({ ok: true, service: 'portfolio-contact', hint: 'POST JSON here from the site.' });
}

/** Run once from the editor to grant permissions and send yourself a test email. */
function testSetup() {
  const res = doPost({
    postData: {
      contents: JSON.stringify({
        name: 'Setup test',
        email: Session.getEffectiveUser().getEmail(),
        subject: 'It works!',
        message: 'If you are reading this in Gmail, the contact form is wired up correctly.',
        elapsedMs: 10000,
        page: 'testSetup()',
      }),
    },
  });
  console.log(res.getContent());
}

function logRow_(row) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) return; // script not bound to a sheet — email still sent
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    sheet.appendRow(['Received', 'Name', 'Email', 'Subject', 'Message', 'Page']);
    sheet.setFrozenRows(1);
  }
  // Prefix values that could be read as formulas (CSV/formula injection).
  sheet.appendRow(row.map((v) => (typeof v === 'string' && /^[=+\-@]/.test(v) ? "'" + v : v)));
}

function clean_(v, max) {
  return String(v == null ? '' : v).trim().slice(0, max);
}

function esc_(s) {
  return String(s)
    .split('&').join('&amp;')
    .split('<').join('&lt;')
    .split('>').join('&gt;')
    .split(String.fromCharCode(34)).join('&quot;') // double quote
    .split(String.fromCharCode(39)).join('&#39;'); // single quote
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
