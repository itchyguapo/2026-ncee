# NCEE REGISTRATION 2023 - Complete Setup Guide

## Overview

This is a complete web-based registration form solution for NCEE 2023 with:
- ✅ Beautiful, responsive HTML form with Tailwind CSS
- ✅ Client-side validation and localStorage auto-save
- ✅ Review & confirm modal before submission
- ✅ Google Drive PDF generation and storage
- ✅ Google Sheets tracking/logging
- ✅ Professional PDF formatting
- ✅ Mobile-friendly design
- ✅ BIG MACHINE ENT. branding

## Files Included

```
/
├── index.html           # Main form page
├── app.js              # Client-side JavaScript
├── schools.js          # School data (6 zones with all schools)
├── GoogleAppsScript.gs # Google Apps Script backend
└── README.md           # This file
```

---

## Setup Instructions

### Part 1: Prepare Google Drive & Sheet (Backend Setup)

#### Step 1: Create Google Drive Folder

1. Open [Google Drive](https://drive.google.com)
2. Click **New** → **Folder**
3. Name it: `NCEE Registrations 2023`
4. Double-click to open the folder
5. Look at the URL bar. It will look like:
   ```
   https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i/
   ```
6. **Copy the folder ID** (the long string after `/folders/`) → Save it somewhere
   - Example ID: `1a2b3c4d5e6f7g8h9i`

#### Step 2: Create Google Sheet for Tracking

1. Open [Google Sheets](https://sheets.google.com)
2. Click **Create new spreadsheet**
3. Name it: `NCEE Registration Submissions 2023`
4. Look at the URL bar:
   ```
   https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i/edit
   ```
5. **Copy the spreadsheet ID** (the long string after `/d/` and before `/edit`) → Save it
   - Example ID: `1a2b3c4d5e6f7g8h9i`

---

### Part 2: Create & Deploy Google Apps Script

#### Step 1: Create a New Script Project

1. Go to [Google Apps Script](https://script.google.com)
2. Click **New project**
3. Give it a name: `NCEE Registration 2023`

#### Step 2: Add the Script Code

1. Delete any default code in the editor
2. Copy the entire content from `GoogleAppsScript.gs`
3. Paste it into the Apps Script editor
4. **Save** (Ctrl+S / Cmd+S)

#### Step 3: Update Configuration Values

1. Find these lines in the script (around line 15-20):
   ```javascript
   const FOLDER_ID = 'YOUR_FOLDER_ID_HERE';
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
   ```

2. Replace with your actual IDs:
   ```javascript
   const FOLDER_ID = '1a2b3c4d5e6f7g8h9i';  // From Step 1
   const SPREADSHEET_ID = '1a2b3c4d5e6f7g8h9i'; // From Step 2
   ```

3. **Save** again

#### Step 4: Test the Script (Optional but Recommended)

1. Select the function **`testSubmission`** from the dropdown (currently shows "Select function")
2. Click the **Run** button (▶)
3. When prompted, authorize the script:
   - Click **Authorize**
   - Select your Google account
   - Grant permissions (it needs to create files in Drive and edit Sheets)
4. Check the **Execution log** at the bottom - you should see:
   - `Testing with Reference Number: NCEE-2023-XXXXXX`
   - `PDF created successfully: [URL]`
   - `Data logged to spreadsheet`

#### Step 5: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the **gear icon** next to "Select type"
3. Choose **Web app**
4. Fill in:
   - **Execute as:** Your Google account email
   - **Who has access:** Anyone
5. Click **Deploy**
6. Google will show you a **Deployment ID** and **URL**
7. **Copy the URL** - it looks like:
   ```
   https://script.googleapis.com/macros/s/AKfy...../usercontent
   ```

**Save this URL!**

---

### Part 3: Connect Frontend to Backend

1. Open `app.js` in your code editor
2. Find line 3:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace with your actual Web App URL:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.googleapis.com/macros/s/AKfy...../usercontent';
   ```
4. **Save**

---

### Part 4: Upload to Web Server (or Run Locally)

#### Option A: Host on a Web Server

1. Upload these three files to your web hosting:
   - `index.html`
   - `app.js`
   - `schools.js`

2. Visit the URL to access the form

#### Option B: Run Locally (for testing)

1. Use Python's built-in server:
   ```bash
   cd "/Users/frankitchy/Dropbox/BIG MACHINE ENTERPRISES/NCEE APPLICATION FORM"
   python3 -m http.server 8000
   ```

2. Open in your browser:
   ```
   http://localhost:8000
   ```

3. Or use Node.js (if you have it):
   ```bash
   npx http-server
   ```

---

## How It Works

### User Flow

1. **User fills form** → Form auto-saves to browser's localStorage
2. **Clicks "Review & Confirm"** → Opens modal with all data
3. **Reviews information** → Can edit or proceed
4. **Clicks "Submit Registration"** → Loading spinner appears
5. **Data sent to Google Apps Script** → PDF generated automatically
6. **PDF saved to Google Drive** → Automatically named with surname + reference number
7. **Data logged to Google Sheet** → For admin tracking
8. **Success screen shown** → Displays unique reference number
9. **User can print confirmation** → Or start new registration

### Data Flow

```
User Form (Client)
    ↓
localStorage (auto-save)
    ↓
Review Modal
    ↓
Google Apps Script Web App
    ↓
├─ Generate PDF
├─ Save to Google Drive folder
└─ Log to Google Sheet
    ↓
Return success + Reference Number
```

---

## Features

### ✅ Form Features
- All fields from NCEE PDF included
- **Required fields** marked with red asterisk (*)
- **Date picker** for DOB (converts to DD/MM/YYYY format)
- **School selection** dropdowns for 6 zones
- **All 110+ schools** included from official PDF
- **Nigerian states** dropdown (37 states)

### ✅ Validation
- All required fields checked
- Email format validation
- Nigerian phone number format validation
- Error messages displayed inline
- Fields must be filled before review

### ✅ User Experience
- **Responsive design** works on mobile, tablet, desktop
- **Auto-save to localStorage** - data persists on page refresh
- **Clear error messages** with red highlights
- **Loading spinner** during submission
- **Success screen** with reference number to save
- **Print confirmation** option

### ✅ Professional Features
- **Unique Reference Numbers** in format: `NCEE-2023-XXXXXX`
- **Professional PDFs** with all information formatted nicely
- **Google Drive storage** with organized file naming
- **Google Sheet tracking** for administrative review
- **Automatic timestamps** on all submissions
- **BIG MACHINE ENT.** branding throughout

---

## Updating School Lists

If school lists change in the future:

1. Open `schools.js`
2. Find the `schoolsData` object (around line 2)
3. Update schools under the appropriate zone (e.g., `SOUTH_EAST`, `NORTH_WEST`)
4. Keep the format: just update the school names in the arrays
5. Save the file

---

## Updating Nigerian States

To add/update states:

1. Open `schools.js`
2. Find the `nigerianStates` array (around line 100)
3. Add or edit state names (sorted alphabetically)
4. Save

---

## Troubleshooting

### "Google Apps Script URL not configured"
- **Solution:** Check that you updated the `GOOGLE_APPS_SCRIPT_URL` in `app.js` with your actual Web App URL

### PDF not creating
- **Solution:** Make sure FOLDER_ID and SPREADSHEET_ID are correct in Google Apps Script
- **Solution:** Check that you authorized the script with the correct Google account

### Data not appearing in spreadsheet
- **Solution:** Verify SPREADSHEET_ID is correct
- **Solution:** Make sure the sheet has write permissions

### Form data not saving after refresh
- **Solution:** This is expected if you cleared browser cache/localStorage
- **Solution:** Form data only auto-saves while form is open (first time users must start over)
- **Solution:** To change this, increase localStorage TTL in app.js

### Mobile form looks broken
- **Solution:** This shouldn't happen - Tailwind CSS is responsive
- **Solution:** Check browser zoom is at 100%
- **Solution:** Try a different mobile browser

---

## Customization

### Change Colors

In `index.html`, modify Tailwind classes:
- Blue theme: Change `bg-blue-600`, `text-blue-600` to other colors
- Example for green: `bg-green-600 hover:bg-green-700`

### Change Form Fields

1. Add new field to `index.html`
2. Add validation in `app.js` (if needed)
3. Add to PDF generation in `GoogleAppsScript.gs`

### Add Email Notifications

In `GoogleAppsScript.gs`, add after logging to sheet:
```javascript
GmailApp.sendEmail(data.contactInfo.email, 'NCEE Registration Confirmed', 
    'Your reference number: ' + referenceNumber);
```

---

## File Size & Performance

- **HTML:** ~25 KB
- **JavaScript:** ~20 KB
- **Schools data:** ~8 KB
- **Total download:** ~53 KB (very fast)
- **Tailwind CSS:** Loaded from CDN (cached by browser)

---

## Security Notes

⚠️ **Important:**
- This form does NOT store sensitive data on your server
- All data is submitted directly to Google Drive
- Google handles security and encryption
- No database is exposed or vulnerable
- PDFs are stored securely in Google Drive
- Sheet access can be restricted to specific people

---

## Deployment Checklist

Before going live:

- [ ] FOLDER_ID is set in GoogleAppsScript.gs
- [ ] SPREADSHEET_ID is set in GoogleAppsScript.gs
- [ ] GOOGLE_APPS_SCRIPT_URL is set in app.js
- [ ] Google Apps Script is deployed as Web App
- [ ] Test function runs successfully
- [ ] PDF appears in Google Drive folder
- [ ] Entry appears in Google Sheet
- [ ] Reference number displays on success
- [ ] Form is mobile responsive
- [ ] All schools are correct in schools.js
- [ ] Form validation works (try submitting empty)

---

## Support

If you need to make changes:

1. **Update school lists:** Edit `schools.js`
2. **Change form fields:** Edit `index.html` and update backend
3. **Modify validation:** Edit `app.js` (validateForm function)
4. **Change PDF layout:** Edit GoogleAppsScript.gs (addXXXToDocument functions)
5. **Update branding:** Edit text and colors in `index.html`

---

## Powered By

**BIG MACHINE ENTERPRISES**

This form was created with:
- HTML5
- Tailwind CSS
- Vanilla JavaScript
- Google Apps Script
- Google Drive API
- Google Sheets API

---

## Version

- **Version:** 1.0
- **Created:** 2024
- **Last Updated:** 2024
- **Status:** Production Ready

---

## Next Steps

1. ✅ Create Google Drive folder
2. ✅ Create Google Sheet
3. ✅ Create Google Apps Script
4. ✅ Deploy as Web App
5. ✅ Update app.js with Web App URL
6. ✅ Upload files to web server (or use locally)
7. ✅ Test the form end-to-end
8. ✅ Share link with users!

---

**Ready to go live! Good luck with NCEE 2023 registrations! 🎓**
