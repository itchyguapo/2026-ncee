/**
 * GOOGLE APPS SCRIPT FOR NCEE REGISTRATION 2023
 * 
 * This script handles form submissions, generates PDFs, and saves them to Google Drive
 * 
 * Setup Instructions:
 * 1. Create a new Google Apps Script at script.google.com
 * 2. Copy this entire code into the editor
 * 3. Update FOLDER_ID and SPREADSHEET_ID (see instructions below)
 * 4. Save the project
 * 5. Deploy as Web App (follow deployment instructions at the end)
 */

// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================

// Get the Folder ID where PDFs will be saved:
// 1. Go to Google Drive
// 2. Create a folder named "NCEE Registrations 2023"
// 3. Open the folder
// 4. Copy the folder ID from the URL (the long string after /folders/)
// Example: https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i/ → ID is 1a2b3c4d5e6f7g8h9i
const FOLDER_ID = '1R5pUpMwe1-h_A1lGFYh5dqX93sjU954q'; // Replace with your Google Drive folder ID

// Get the Spreadsheet ID for tracking:
// 1. Create a new Google Sheet
// 2. Copy the spreadsheet ID from the URL
// Example: https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i/edit → ID is 1a2b3c4d5e6f7g8h9i
const SPREADSHEET_ID = '18E_uIM4ADKCtYt6HkJIr_3LDvaQnRTk2IuE7hyIbyi0'; // Replace with your Google Sheet ID

// ============================================
// MAIN HANDLER FUNCTION
// ============================================

function doGet() {
    return HtmlService.createHtmlFromFile('index')
        .setTitle('NCEE Registration 2023')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
    try {
        // Parse the request payload
        if (!e || !e.postData) {
            return ContentService.createTextOutput(JSON.stringify({
                status: 'error',
                message: 'Invalid request: no POST data received'
            })).setMimeType(ContentService.MimeType.JSON);
        }
        let payload;
        try {
            payload = JSON.parse(e.postData.contents);
        } catch (parseError) {
            return ContentService.createTextOutput(JSON.stringify({
                status: 'error',
                message: 'Invalid JSON payload: ' + parseError.toString()
            })).setMimeType(ContentService.MimeType.JSON);
        }
        
        // Generate reference number
        const referenceNumber = generateReferenceNumber();
        
        // Create PDF from form data
        const pdfUrl = createRegistrationPDF(payload, referenceNumber);
        
        // Log to spreadsheet
        logToSpreadsheet(payload, referenceNumber);
        
        // Send confirmation email with PDF
        sendConfirmationEmail(payload, referenceNumber, pdfUrl);
        
        // Return success response
        return ContentService.createTextOutput(JSON.stringify({
            status: 'success',
            referenceNumber: referenceNumber,
            pdfUrl: pdfUrl,
            message: 'Registration submitted successfully. Confirmation email sent.'
        })).setMimeType(ContentService.MimeType.JSON);
        
    } catch (error) {
        Logger.log('Error: ' + error.toString());
        return ContentService.createTextOutput(JSON.stringify({
            status: 'error',
            message: error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * Generate a unique reference number
 */
function generateReferenceNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.random().toString(36).substring(2, 10).toUpperCase();
    return 'NCEE-' + year + '-' + random;
}

/**
 * Create a professional PDF and save it to Google Drive
 */
function createRegistrationPDF(data, referenceNumber) {
    try {
        // Create a new Google Doc
        const doc = DocumentApp.create('NCEE_' + data.personalInfo.surname + '_' + referenceNumber);
        const docId = doc.getId();
        const body = doc.getBody();
        
        // Add content to document
        addHeaderToDocument(body);
        addPersonalInfoToDocument(body, data);
        addOriginInfoToDocument(body, data);
        addResidenceInfoToDocument(body, data);
        addContactInfoToDocument(body, data);
        addSchoolSelectionsToDocument(body, data);
        addFooterToDocument(body, data, referenceNumber);
        
        // Save the document
        doc.saveAndClose();
        
        // Convert to PDF
        const blob = DriveApp.getFileById(docId).getAs('application/pdf');
        const fileName = data.personalInfo.surname + '_' + data.personalInfo.firstName + '_' + referenceNumber + '.pdf';
        
        // Get the folder
        const folder = DriveApp.getFolderById(FOLDER_ID);
        
        // Save PDF to folder
        const pdfFile = folder.createFile(blob).setName(fileName);
        
        // Delete the original Google Doc
        DriveApp.getFileById(docId).setTrashed(true);
        
        // Return the PDF URL
        return pdfFile.getUrl();
        
    } catch (error) {
        Logger.log('PDF Creation Error: ' + error.toString());
        throw new Error('Failed to create PDF: ' + error.toString());
    }
}

/**
 * Add header section to document
 */
function addHeaderToDocument(body) {
    const header = body.appendParagraph();
    header.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    header.setSpacing(DocumentApp.SpacingAttribute.LINE_SPACING, 1.5);
    
    const headerText = header.editAsText();
    headerText.appendText('NCEE REGISTRATION 2023').setBold(true).setFontSize(24);
    
    body.appendParagraph('National Common Entrance Examination').setAlignment(DocumentApp.HorizontalAlignment.CENTER).setFontSize(12);
    body.appendParagraph('Powered by BIG MACHINE ENT.').setAlignment(DocumentApp.HorizontalAlignment.CENTER).setFontSize(10).setItalic(true);
    
    body.appendParagraph(''); // Spacing
}

/**
 * Add personal information section
 */
function addPersonalInfoToDocument(body, data) {
    const section = body.appendParagraph('PERSONAL INFORMATION');
    section.setHeading(DocumentApp.ParagraphHeading.HEADING2).setBold(true);
    
    addTableRow(body, 'Surname:', data.personalInfo.surname);
    addTableRow(body, 'First Name:', data.personalInfo.firstName);
    addTableRow(body, 'Middle Name:', data.personalInfo.middleName || '—');
    addTableRow(body, 'Date of Birth:', data.personalInfo.dateOfBirth);
    addTableRow(body, 'Gender:', data.personalInfo.gender);
    addTableRow(body, 'NIN:', data.personalInfo.nin);
    addTableRow(body, 'Disability:', data.personalInfo.disability);
    
    body.appendParagraph(''); // Spacing
}

/**
 * Add origin information section
 */
function addOriginInfoToDocument(body, data) {
    const section = body.appendParagraph('ORIGIN INFORMATION');
    section.setHeading(DocumentApp.ParagraphHeading.HEADING2).setBold(true);
    
    addTableRow(body, 'State of Origin:', data.originInfo.stateOfOrigin);
    addTableRow(body, 'LGA of Origin:', data.originInfo.lgaOfOrigin);
    
    body.appendParagraph(''); // Spacing
}

/**
 * Add residence information section
 */
function addResidenceInfoToDocument(body, data) {
    const section = body.appendParagraph('RESIDENCE INFORMATION');
    section.setHeading(DocumentApp.ParagraphHeading.HEADING2).setBold(true);
    
    addTableRow(body, 'State of Residence:', data.residenceInfo.stateOfResidence);
    addTableRow(body, 'LGA of Residence:', data.residenceInfo.lgaOfResidence);
    
    body.appendParagraph(''); // Spacing
}

/**
 * Add contact information section
 */
function addContactInfoToDocument(body, data) {
    const section = body.appendParagraph('CONTACT INFORMATION');
    section.setHeading(DocumentApp.ParagraphHeading.HEADING2).setBold(true);
    
    addTableRow(body, "Parent's Name:", data.contactInfo.parentsName);
    addTableRow(body, 'Phone Number:', data.contactInfo.phoneNumber);
    addTableRow(body, 'Email:', data.contactInfo.email);
    
    body.appendParagraph(''); // Spacing
}

/**
 * Add school selections section
 */
function addSchoolSelectionsToDocument(body, data) {
    const section = body.appendParagraph('SCHOOL SELECTIONS');
    section.setHeading(DocumentApp.ParagraphHeading.HEADING2).setBold(true);
    
    addTableRow(body, 'North East:', data.schoolSelections.NORTH_EAST);
    addTableRow(body, 'North Central:', data.schoolSelections.NORTH_CENTRAL);
    addTableRow(body, 'North West:', data.schoolSelections.NORTH_WEST);
    addTableRow(body, 'South East:', data.schoolSelections.SOUTH_EAST);
    addTableRow(body, 'South West:', data.schoolSelections.SOUTH_WEST);
    addTableRow(body, 'South South:', data.schoolSelections.SOUTH_SOUTH);
    
    body.appendParagraph(''); // Spacing
}

/**
 * Add footer section with reference number and timestamp
 */
function addFooterToDocument(body, data, referenceNumber) {
    body.appendParagraph('');
    
    const footer = body.appendParagraph();
    footer.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    
    const footerText = footer.editAsText();
    footerText.appendText('Reference Number: ' + referenceNumber).setBold(true).setFontSize(14);
    
    body.appendParagraph('');
    
    const timestamp = body.appendParagraph();
    timestamp.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    const timestampText = timestamp.editAsText();
    timestampText.appendText('Submitted: ' + new Date(data.submissionTimestamp).toLocaleString()).setFontSize(10).setItalic(true);
    
    body.appendParagraph('');
    const disclaimer = body.appendParagraph();
    disclaimer.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    const disclaimerText = disclaimer.editAsText();
    disclaimerText.appendText('This is an auto-generated document. Keep your reference number for records.').setFontSize(9).setItalic(true);
}

/**
 * Helper function to add key-value pairs to document
 */
function addTableRow(body, label, value) {
    const row = body.appendParagraph();
    row.setSpacing(DocumentApp.SpacingAttribute.LINE_SPACING, 1.2);
    
    const text = row.editAsText();
    text.appendText(label).setBold(true);
    text.appendText(' ' + value);
}

/**
 * Log submission to Google Sheet for tracking
 */
function logToSpreadsheet(data, referenceNumber) {
    try {
        const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
        
        // Add header row if empty
        if (sheet.getLastRow() === 0) {
            sheet.appendRow([
                'Timestamp',
                'Reference Number',
                'Surname',
                'First Name',
                'Email',
                'Phone',
                'Gender',
                'State of Origin',
                'State of Residence',
                'NE School',
                'NC School',
                'NW School',
                'SE School',
                'SW School',
                'SS School'
            ]);
        }
        
        // Append new row
        sheet.appendRow([
            new Date().toLocaleString(),
            referenceNumber,
            data.personalInfo.surname,
            data.personalInfo.firstName,
            data.contactInfo.email,
            data.contactInfo.phoneNumber,
            data.personalInfo.gender,
            data.originInfo.stateOfOrigin,
            data.residenceInfo.stateOfResidence,
            data.schoolSelections.NORTH_EAST,
            data.schoolSelections.NORTH_CENTRAL,
            data.schoolSelections.NORTH_WEST,
            data.schoolSelections.SOUTH_EAST,
            data.schoolSelections.SOUTH_WEST,
            data.schoolSelections.SOUTH_SOUTH
        ]);
        
    } catch (error) {
        Logger.log('Spreadsheet Error: ' + error.toString());
        // Don't throw - let the main submission succeed even if logging fails
    }
}

/**
 * Send confirmation email with PDF attachment
 */
function sendConfirmationEmail(data, referenceNumber, pdfUrl) {
    try {
        const studentEmail = data.contactInfo.email;
        const studentName = data.personalInfo.firstName + ' ' + data.personalInfo.surname;
        
        const subject = 'NCEE 2023 Registration Confirmation - Reference: ' + referenceNumber;
        
        const htmlBody = 
            '<html>' +
            '<body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">' +
            '<div style="max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px;">' +
            '<div style="background: linear-gradient(to right, #2563eb, #4f46e5); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">' +
            '<h1 style="margin: 0;">NCEE REGISTRATION 2023</h1>' +
            '<p style="margin: 10px 0 0 0;">Registration Confirmed</p>' +
            '</div>' +
            '<h2 style="color: #2563eb;">Hello ' + studentName + ',</h2>' +
            '<p>Your NCEE 2023 registration has been <strong>successfully submitted</strong>!</p>' +
            '<div style="background: white; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0; border-radius: 4px;">' +
            '<h3 style="margin-top: 0; color: #2563eb;">Your Reference Number:</h3>' +
            '<p style="font-size: 24px; font-weight: bold; color: #2563eb; margin: 10px 0; font-family: monospace;">' + referenceNumber + '</p>' +
            '<p style="color: #666; font-size: 12px; margin: 0;"><strong>Save this number for your records.</strong></p>' +
            '</div>' +
            '<div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 15px; margin: 20px 0; border-radius: 4px;">' +
            '<h3 style="margin-top: 0; color: #0284c7;">Your Submitted Information:</h3>' +
            '<p><strong>Name:</strong> ' + data.personalInfo.surname + ' ' + data.personalInfo.firstName + '</p>' +
            '<p><strong>Email:</strong> ' + data.contactInfo.email + '</p>' +
            '<p><strong>Phone:</strong> ' + data.contactInfo.phoneNumber + '</p>' +
            '<p><strong>Date of Birth:</strong> ' + data.personalInfo.dateOfBirth + '</p>' +
            '<p><strong>State of Origin:</strong> ' + data.originInfo.stateOfOrigin + '</p>' +
            '<p><strong>State of Residence:</strong> ' + data.residenceInfo.stateOfResidence + '</p>' +
            '</div>' +
            '<div style="background: white; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 4px;">' +
            '<h3 style="margin-top: 0; color: #10b981;">School Selections:</h3>' +
            '<ul style="margin: 10px 0; padding-left: 20px;">' +
            '<li><strong>North East:</strong> ' + data.schoolSelections.NORTH_EAST + '</li>' +
            '<li><strong>North Central:</strong> ' + data.schoolSelections.NORTH_CENTRAL + '</li>' +
            '<li><strong>North West:</strong> ' + data.schoolSelections.NORTH_WEST + '</li>' +
            '<li><strong>South East:</strong> ' + data.schoolSelections.SOUTH_EAST + '</li>' +
            '<li><strong>South West:</strong> ' + data.schoolSelections.SOUTH_WEST + '</li>' +
            '<li><strong>South South:</strong> ' + data.schoolSelections.SOUTH_SOUTH + '</li>' +
            '</ul>' +
            '</div>' +
            '<p style="margin-top: 30px; padding: 15px; background: #fff9e6; border-radius: 4px; font-size: 14px;">' +
            '<strong>⚠️ Important:</strong> Your registered PDF has been saved securely. A copy has been attached to this email. Keep your reference number safe—you\'ll need it for future reference or inquiries.' +
            '</p>' +
            '<hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">' +
            '<p style="text-align: center; color: #666; font-size: 12px;">' +
            'Powered by <strong>BIG MACHINE ENT.</strong>' +
            '</p>' +
            '<p style="text-align: center; color: #999; font-size: 11px;">' +
            'This is an automated email. Please do not reply to this email address.' +
            '</p>' +
            '</div>' +
            '</body>' +
            '</html>';
        
        // Get PDF file from Drive
        const files = DriveApp.getFolderById(FOLDER_ID).getFilesByName(data.personalInfo.surname + '_' + data.personalInfo.firstName + '_' + referenceNumber + '.pdf');
        let pdfFile = null;
        if (files.hasNext()) {
            pdfFile = files.next();
        }
        
        // Send email
        if (pdfFile) {
            GmailApp.sendEmail(studentEmail, subject, '', {
                htmlBody: htmlBody,
                attachments: [pdfFile.getAs(MimeType.PDF)],
                name: 'NCEE Registration 2023'
            });
        } else {
            // Send without attachment if PDF not found immediately
            GmailApp.sendEmail(studentEmail, subject, '', {
                htmlBody: htmlBody,
                name: 'NCEE Registration 2023'
            });
        }
        
        Logger.log('Confirmation email sent to: ' + studentEmail);
    } catch (error) {
        Logger.log('Email Error: ' + error.toString());
        // Don't throw - let submission succeed even if email fails
    }
}

/**
 * TEST FUNCTION - Run this to test your setup
 * Go to Run menu and select "testSubmission"
 */
function testSubmission() {
    const testData = {
        personalInfo: {
            surname: 'TEST',
            firstName: 'USER',
            middleName: 'SAMPLE',
            dateOfBirth: '01/01/2005',
            gender: 'MALE',
            disability: 'None',
            nin: '12345678901'
        },
        originInfo: {
            stateOfOrigin: 'Lagos',
            lgaOfOrigin: 'IKORODU'
        },
        residenceInfo: {
            stateOfResidence: 'Lagos',
            lgaOfResidence: 'IKORODU'
        },
        contactInfo: {
            parentsName: 'PARENT NAME',
            phoneNumber: '+234 801 234 5678',
            email: 'test@example.com'
        },
        schoolSelections: {
            NORTH_EAST: 'Federal Government College, Buni-Yadi',
            NORTH_CENTRAL: 'Federal Government College, Jos',
            NORTH_WEST: 'Federal Government College Sokoto',
            SOUTH_EAST: 'Federal Government College, Ohafia',
            SOUTH_WEST: 'Federal Government College, Odogbolu',
            SOUTH_SOUTH: 'Federal Science and Technical College, Uromi'
        },
        submissionTimestamp: new Date().toISOString()
    };
    
    const refNum = generateReferenceNumber();
    Logger.log('Testing with Reference Number: ' + refNum);
    
    try {
        const pdfUrl = createRegistrationPDF(testData, refNum);
        Logger.log('PDF created successfully: ' + pdfUrl);
        
        logToSpreadsheet(testData, refNum);
        Logger.log('Data logged to spreadsheet');
    } catch (error) {
        Logger.log('Error: ' + error.toString());
    }
}