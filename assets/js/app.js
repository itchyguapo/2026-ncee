const STORAGE_KEY = 'nceeRegistrationForm';

document.addEventListener('DOMContentLoaded', () => {
    loadFormData();
    setupAutoSave();
});

function loadFormData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const data = JSON.parse(saved);
            Object.keys(data).forEach(key => {
                const field = document.getElementById(key) || document.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'radio') {
                        document.querySelector(`input[name="${key}"][value="${data[key]}"]`)?.checked = true;
                    } else {
                        field.value = data[key];
                    }
                }
            });
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }
}

function setupAutoSave() {
    const form = document.getElementById('registrationForm');
    form?.addEventListener('change', saveFormData);
}

function saveFormData() {
    const form = document.getElementById('registrationForm');
    if (!form) return;
    
    const data = {};
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        if (input.type === 'radio') {
            if (input.checked) {
                data[input.name] = input.value;
            }
        } else if (input.name) {
            data[input.id || input.name] = input.value;
        }
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function validateForm() {
    const form = document.getElementById('registrationForm');
    if (!form) return true;
    
    const requiredFields = ['surname', 'firstName', 'dateOfBirth', 'nin', 'stateOfOrigin', 'lgaOfOrigin', 'stateOfResidence', 'lgaOfResidence', 'parentsName', 'phoneNumber', 'email'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId) || document.querySelector(`[name="${fieldId}"]`);
        if (field && !field.value?.trim()) {
            isValid = false;
        }
    });
    
    const genderSelected = document.querySelector('input[name="gender"]:checked');
    if (!genderSelected) isValid = false;
    
    const email = document.getElementById('email');
    if (email?.value && !isValidEmail(email.value)) {
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearForm() {
    if (confirm('Clear the form?')) {
        document.getElementById('registrationForm')?.reset();
        localStorage.removeItem(STORAGE_KEY);
    }
}

document.getElementById('registrationForm')?.addEventListener('submit', function(e) {
    if (!validateForm()) {
        e.preventDefault();
        alert('Please fill all required fields correctly.');
        return;
    }
    
    localStorage.removeItem(STORAGE_KEY);
});