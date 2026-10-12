/**
 * TATTVA Cleaning Services - "Register Now" receiver
 *
 * Saves every registration from the website as a new row in this Google Sheet
 * and sends an email alert to the owner.
 *
 * Paste this whole file into:  Extensions > Apps Script  (replace everything there)
 * then:  Deploy > New deployment > Web app
 *        Execute as: Me      Who has access: Anyone
 */

const OWNER_EMAIL = "hsshwetha13@gmail.com";   // where the alert emails go
const SHEET_NAME  = "Registrations";            // the tab that stores the leads

const HEADERS = ["Received", "Name", "Phone", "Service", "Area", "Preferred date", "Message", "Language", "Status"];


/* The website sends each registration here */
function doPost(e) {
  try {
    const p = (e && e.parameter) || {};

    /* hidden "website" box: real visitors never fill it, spam bots do */
    if (p.website) {
      return reply_({ ok: true });
    }

    const name     = clean_(p.name, 80);
    const phone    = String(p.phone || "").trim().slice(0, 20);
    const service  = clean_(p.service, 80);
    const area     = clean_(p.area, 120);
    const date     = clean_(p.date, 20);
    const message  = clean_(p.message, 600);
    const language = clean_(p.language, 20);

    const phoneOk = /^(\+?91 ?)?[6-9][0-9]{9}$/.test(phone);

    if (!name || !phoneOk || !service || !area) {
      return reply_({ ok: false, error: "invalid" });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(15000);

    try {
      const sheet = getSheet_();
      const row = sheet.getLastRow() + 1;

      sheet.getRange(row, 3).setNumberFormat("@");           /* keep the phone number as text */
      sheet.getRange(row, 1, 1, HEADERS.length).setValues([[
        new Date(), name, phone, service, area, date, message, language || "English", "New"
      ]]);
    } finally {
      lock.releaseLock();
    }

    notifyOwner_(name, phone, service, area, date, message, language);

    return reply_({ ok: true });

  } catch (err) {
    return reply_({ ok: false, error: String(err) });
  }
}


/* Open the web-app address in a browser to check it is running */
function doGet() {
  return ContentService.createTextOutput("TATTVA registration form is running.");
}


function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#e8f1f8");
    sheet.getRange("A:A").setNumberFormat("dd MMM yyyy, hh:mm AM/PM");
    sheet.setColumnWidths(1, HEADERS.length, 150);
    sheet.setColumnWidth(7, 320);
  }
  return sheet;
}


function notifyOwner_(name, phone, service, area, date, message, language) {
  const lines = [
    "A new customer has registered on your website.",
    "",
    "Name:     " + name,
    "Phone:    " + phone,
    "Service:  " + service,
    "Area:     " + area,
    "Date:     " + (date || "-"),
    "Message:  " + (message || "-"),
    "Language: " + (language || "English"),
    "",
    "Call or WhatsApp them soon: https://wa.me/91" + phone.replace(/\D/g, "").slice(-10),
    "All registrations: " + SpreadsheetApp.getActiveSpreadsheet().getUrl()
  ];

  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: "New registration: " + name + " - " + service,
    body: lines.join("\n")
  });
}


/* trims the text and stops spreadsheet formulas such as =SUM() being injected */
function clean_(value, max) {
  let s = String(value || "").replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) {
    s = "'" + s;
  }
  return s;
}


function reply_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}