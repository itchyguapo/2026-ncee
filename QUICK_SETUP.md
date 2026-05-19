# Quick Start - Google Apps Script Deployment

## 🎯 In 5 Minutes: Get Your Web App URL

### Step 1: Create the Script (1 min)

1. Go to **[script.google.com](https://script.google.com)**
2. Click **New project**
3. Name it: `NCEE Registration 2023`

### Step 2: Add Your IDs (2 mins)

Before copying the code, you need TWO IDs:

#### Get Folder ID:
1. Open [Google Drive](https://drive.google.com)
2. Create a folder: `NCEE Registrations 2023`
3. Open it
4. Copy from URL bar - this part:
   ```
   https://drive.google.com/drive/folders/[COPY_THIS]/
   ```

#### Get Sheet ID:
1. Open [Google Sheets](https://sheets.google.com)
2. Create sheet: `NCEE Registration Submissions 2023`
3. Copy from URL bar - this part:
   ```
   https://docs.google.com/spreadsheets/d/[COPY_THIS]/edit
   ```

### Step 3: Paste Code & Update IDs (1 min)

1. In Apps Script editor, delete default code
2. Copy all code from `GoogleAppsScript.gs`
3. Paste into editor
4. Find these lines (around line 15-20):
   ```javascript
   const FOLDER_ID = 'YOUR_FOLDER_ID_HERE';
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
   ```
5. Replace with your actual IDs:
   ```javascript
   const FOLDER_ID = 'abc123xyz456abc123';
   const SPREADSHEET_ID = 'def456uvw789def456';
   ```
6. **Ctrl+S / Cmd+S** to save

### Step 4: Deploy (1 min)

1. Click **Deploy** button (top right)
2. Click **New deployment**
3. Click ⚙️ icon → **Web app**
4. Set:
   - Execute as: YOUR_EMAIL
   - Who has access: **Anyone**
5. Click **Deploy**
6. **Copy the URL** that appears (looks like):
   ```
   https://script.googleapis.com/macros/s/AKfy...WV4w/usercontent
   ```

### Step 5: Update Frontend (30 secs)

1. Open `app.js`
2. Line 3:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace with your URL:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.googleapis.com/macros/s/AKfy...WV4w/usercontent';
   ```
4. Save

---

## ✅ Done!

Your form is ready to use. Users can now:
1. Fill out the form
2. Click "Review & Confirm"
3. Click "Submit"
4. Get a reference number + PDF automatically saved to Google Drive

---

## 🧪 Quick Test

To verify everything works:

1. Open `index.html` in a browser
2. Fill in a test registration
3. Click "Review & Confirm"
4. Click "Submit"
5. You should see a success screen with a reference number
6. Check Google Drive - new PDF should be there!

---

## ⚠️ Important Notes

- **Authorization:** First time you run, Google will ask for permissions - click **Allow**
- **PDF Naming:** Files save as `Surname_FirstName_NCEE-2023-XXXXXX.pdf`
- **Sheet Logging:** Each submission creates a row in your Google Sheet
- **Reference Numbers:** Auto-generated in format `NCEE-2023-XXXXXX`

---

## 🆘 Common Issues

| Problem | Solution |
|---------|----------|
| "URL not configured" | Check you updated `GOOGLE_APPS_SCRIPT_URL` in app.js |
| PDF not created | Verify FOLDER_ID is correct in GoogleAppsScript.gs |
| Folder not found error | Double-check the Folder ID (copy carefully from URL) |
| Sheet not updating | Verify SPREADSHEET_ID is correct |
| "Permission denied" | Authorize the script when Google prompts you |

---

**You're all set! 🚀**
