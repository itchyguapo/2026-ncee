const LGA_API_URL = 'https://gist.githubusercontent.com/devhammed/0bb9eeac9ff22c895100d072f489dc98/raw';

let lgaData = [];

async function fetchLgaData() {
    try {
        const response = await fetch(LGA_API_URL);
        lgaData = await response.json();
        populateStateDropdowns();
    } catch (error) {
        console.error('Failed to fetch LGA data:', error);
    }
}

function populateStateDropdowns() {
    const selects = ['stateOfOrigin', 'stateOfResidence'];
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) return;
        lgaData.forEach(item => {
            const option = document.createElement('option');
            option.value = item.state;
            option.textContent = item.state;
            select.appendChild(option);
        });
    });
}

function populateLgas(stateName, lgaSelectId) {
    const lgaSelect = document.getElementById(lgaSelectId);
    if (!lgaSelect) return;
    lgaSelect.innerHTML = '<option value="">LGA of Origin *</option>';
    const stateData = lgaData.find(item => item.state === stateName);
    if (stateData && stateData.lgas) {
        stateData.lgas.forEach(lga => {
            const option = document.createElement('option');
            option.value = lga;
            option.textContent = lga;
            lgaSelect.appendChild(option);
        });
    }
}

function populateSchoolsByZone(zone, selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;
    select.innerHTML = '<option value="">Select School *</option>';
    if (SCHOOL_DATA[zone]) {
        SCHOOL_DATA[zone].forEach(school => {
            const option = document.createElement('option');
            option.value = school;
            option.textContent = school;
            select.appendChild(option);
        });
    }
}

function getZoneFromState(stateName) {
    return STATE_TO_ZONE[stateName] || null;
}

function populateAllSchoolDropdowns() {
    const schoolSelects = ['northEast', 'northCentral', 'northWest', 'southEast', 'southSouth', 'southWest'];
    schoolSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            select.innerHTML = '<option value="">Select School *</option>';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchLgaData();
    populateAllSchoolDropdowns();
    
    document.getElementById('stateOfOrigin')?.addEventListener('change', function() {
        populateLgas(this.value, 'lgaOfOrigin');
    });
    
    document.getElementById('stateOfResidence')?.addEventListener('change', function() {
        populateLgas(this.value, 'lgaOfResidence');
    });
});