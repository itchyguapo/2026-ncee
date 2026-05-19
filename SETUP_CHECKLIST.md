# Setup Checklist & Configuration Reference

## Your Configuration Details

**Save this information somewhere safe. You'll need it for updates and troubleshooting.**

### Google Drive Setup
- [ ] Created folder: "NCEE Registrations 2023"
- **Folder ID:** ___________________________________
- Folder URL: https://drive.google.com/drive/folders/[FOLDER_ID]/

### Google Sheet Setup
- [ ] Created sheet: "NCEE Registration Submissions 2023"
- **Sheet ID:** ___________________________________
- Sheet URL: https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit

### Google Apps Script Setup
- [ ] Project name: "NCEE Registration 2023"
- [ ] Code pasted into script editor
- [ ] FOLDER_ID updated in GoogleAppsScript.gs
- [ ] SPREADSHEET_ID updated in GoogleAppsScript.gs
- [ ] Script saved (Ctrl+S / Cmd+S)
- [ ] Test function ran successfully
- [ ] Deployed as Web App

### Web App Deployment
- [ ] Deploy created
- [ ] Type: Web app
- [ ] Execute as: YOUR EMAIL
- [ ] Who has access: Anyone
- **Web App URL:** ___________________________________
- Web App URL: https://script.googleapis.com/macros/s/[DEPLOYMENT_ID]/usercontent

### Frontend Setup
- [ ] Web App URL pasted into app.js (line 3)
- [ ] GOOGLE_APPS_SCRIPT_URL updated
- [ ] app.js saved
- [ ] All three files uploaded to web server or running locally

---

## Pre-Launch Checklist

### Backend (Google)
- [ ] Folder is accessible in Google Drive
- [ ] Sheet is accessible in Google Sheets
- [ ] Apps Script project exists
- [ ] Script code is complete and saved
- [ ] FOLDER_ID is correct (no typos)
- [ ] SPREADSHEET_ID is correct (no typos)
- [ ] Web App is deployed
- [ ] Deployment executed as your Google account
- [ ] Deployment set to "Anyone" access

### Frontend (Website)
- [ ] index.html is valid HTML5
- [ ] app.js has correct GOOGLE_APPS_SCRIPT_URL
- [ ] schools.js loads without errors
- [ ] All files are in the same directory
- [ ] Website is accessible (locally or on server)
- [ ] Form displays correctly on desktop
- [ ] Form displays correctly on mobile
- [ ] Tailwind CSS is loaded (classes applied)

### Testing
- [ ] Opened form in browser
- [ ] Can fill all fields
- [ ] Can select schools for all 6 zones
- [ ] "Review & Confirm" button works
- [ ] Modal opens with data
- [ ] Can edit from modal
- [ ] "Submit" button works
- [ ] Loading spinner appears
- [ ] Success modal shows reference number
- [ ] PDF appears in Google Drive folder
- [ ] PDF has correct filename (Surname_FirstName_RefNum.pdf)
- [ ] Row appears in Google Sheet
- [ ] Reference number has correct format (NCEE-2023-XXXXXX)

---

## File Locations

```
YOUR_FOLDER/
├── index.html              ← Main form page
├── app.js                  ← Client-side logic (UPDATE THIS)
├── schools.js              ← School data
├── README.md               ← Full documentation
├── QUICK_SETUP.md          ← Quick reference
├── SETUP_CHECKLIST.md      ← This file
└── GoogleAppsScript.gs     ← Copy to Apps Script (UPDATE FOLDER & SHEET IDS)
```

---

## User Access

Once deployed, users need only:
1. The URL to your form (e.g., `https://yoursite.com/ncee-form/`)
2. No Google account needed
3. No installation needed
4. Works on any device with a browser

---

## Troubleshooting Matrix

### Symptom → Likely Cause → Fix

| What Happens | Why | How to Fix |
|--------------|-----|-----------|
| Page loads but form is blank | Tailwind CSS not loading | Check internet connection, CSS CDN |
| Form shows but can't select schools | schools.js not loading | Check file is in same directory |
| Can't submit form | GOOGLE_APPS_SCRIPT_URL not set | Check app.js line 3 |
| Error: "Folder not found" | FOLDER_ID is wrong | Copy again from Google Drive URL |
| Error: "Sheet not found" | SPREADSHEET_ID is wrong | Copy again from Google Sheets URL |
| PDF not created | Apps Script hasn't authorized | Run test function to authorize |
| No data in Sheet | Script authorization issue | Re-deploy Web App |
| Form fields cleared on refresh | Expected behavior | localStorage only for session |

---

## Files to Update (in order)

### 1. GoogleAppsScript.gs
```javascript
Line 15: const FOLDER_ID = 'YOUR_FOLDER_ID_HERE';
Line 18: const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
```

### 2. app.js
```javascript
Line 3: const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```

### 3. index.html (Optional - branding)
```html
Line 30: <h1>NCEE REGISTRATION 2023</h1>  ← Change title if needed
Line 32: Powered by BIG MACHINE ENT.       ← Change branding if needed
```

---

## Deployment Options

### Option A: Free Hosting
- GitHub Pages (static files)
- Netlify (drag & drop)
- Vercel (git integration)
- Firebase Hosting

### Option B: Paid Hosting
- Any web hosting service
- Just upload 3 files: index.html, app.js, schools.js

### Option C: Local/Intranet
- Run with: `python3 -m http.server 8000`
- Access: http://localhost:8000

---

## Support Contacts

### Setup Help
- Google Apps Script docs: https://developers.google.com/apps-script
- Google Drive API: https://developers.google.com/drive
- Google Sheets API: https://developers.google.com/sheets

### Technical Issues
- Check browser console (F12) for error messages
- Check Google Apps Script logs
- Verify all IDs are correct (no spaces, no typos)

---

## Version Control

Keep track of changes:

| Date | Version | Changes | Status |
|------|---------|---------|--------|
| | 1.0 | Initial release | ✅ Live |
| | | | |
| | | | |

---

## Maintenance

### Regular Tasks
- [ ] Check Google Drive folder monthly (clean up if needed)
- [ ] Review Google Sheet for patterns/issues
- [ ] Update school lists if NCEE releases new info
- [ ] Monitor form errors in browser console

### Annual Tasks
- [ ] Update school lists for new academic year
- [ ] Test full flow end-to-end
- [ ] Update branding if needed
- [ ] Verify all permissions still valid

---

## Notes & Customization

Use this space to record any custom changes you make:

```
Date: ___________________
Change: ________________________________________________________________
Where: __________________________________________________________________
Reason: _________________________________________________________________

Date: ___________________
Change: ________________________________________________________________
Where: __________________________________________________________________
Reason: _________________________________________________________________
```

---

**Last Updated:** _________________
**By:** _________________
**Status:** ✅ READY / ❌ IN PROGRESS / ⚠️ NEEDS TESTING

---

Good luck! 🎓
