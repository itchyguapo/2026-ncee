const LGA_API_URL = 'https://gist.githubusercontent.com/devhammed/0bb9eeac9ff22c895100d072f489dc98/raw';

let lgaData = [];
let stateToZoneMap = {};

const STATE_ZONE_MAP = {
    "Adamawa": "northEast",
    "Akwa Ibom": "southSouth",
    "Anambra": "southEast",
    "Bauchi": "northEast",
    "Bayelsa": "southSouth",
    "Benue": "northCentral",
    "Borno": "northEast",
    "Cross River": "southSouth",
    "Delta": "southSouth",
    "Ebonyi": "southEast",
    "Edo": "southSouth",
    "Ekiti": "southWest",
    "Enugu": "southEast",
    "Federal Capital Territory": "northCentral",
    "Gombe": "northEast",
    "Imo": "southEast",
    "Jigawa": "northWest",
    "Kaduna": "northWest",
    "Kano": "northWest",
    "Katsina": "northWest",
    "Kebbi": "northWest",
    "Kogi": "northCentral",
    "Kwara": "northCentral",
    "Lagos": "southWest",
    "Nasarawa": "northCentral",
    "Niger": "northCentral",
    "Ogun": "southWest",
    "Ondo": "southWest",
    "Osun": "southWest",
    "Oyo": "southWest",
    "Plateau": "northCentral",
    "Rivers": "southSouth",
    "Sokoto": "northWest",
    "Taraba": "northEast",
    "Yobe": "northEast",
    "Zamfara": "northWest"
};

async function fetchLgaData() {
    try {
        const response = await fetch(LGA_API_URL);
        lgaData = await response.json();
        populateStateDropdowns();
        buildStateToZoneMap();
    } catch (error) {
        console.error('Failed to fetch LGA data:', error);
    }
}

function buildStateToZoneMap() {
    stateToZoneMap = {};
    lgaData.forEach(item => {
        stateToZoneMap[item.state] = STATE_ZONE_MAP[item.state] || null;
    });
}

function getStateZone(stateName) {
    return stateToZoneMap[stateName] || STATE_TO_ZONE[stateName] || null;
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
    const zoneSelects = {
        northEast: 'northEast',
        northCentral: 'northCentral',
        northWest: 'northWest',
        southEast: 'southEast',
        southSouth: 'southSouth',
        southWest: 'southWest'
    };
    
    Object.keys(zoneSelects).forEach(zone => {
        const selectId = zoneSelects[zone];
        const select = document.getElementById(selectId);
        if (select) {
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
    });
}

function handleStateChange(stateName, zoneFieldId) {
    const zone = getZoneFromState(stateName);
    if (zone && zoneFieldId) {
        populateSchoolsByZone(zone, zoneFieldId);
    }
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