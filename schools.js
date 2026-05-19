// School data organized by geo-political zones
const schoolsData = {
    NORTH_EAST: [
        "Federal Government College, Buni-Yadi",
        "Federal Government Girls College, Potiskum",
        "Federal Government College, Ganye",
        "Federal Government Girls College, Bauchi",
        "Federal Government College, Wukari",
        "Federal Science and Technical College, Lassa",
        "Federal Science and Technical College, Jalingo",
        "Federal Government Girls College, Jalingo",
        "Federal Science and Technical College, Michika",
        "Federal Government College, Azare",
        "Federal Government College, Maiduguri",
        "Federal Government Girls College, Monguno",
        "Federal Government College, Billiri",
        "Federal Government College, Bajoga",
        "Federal Government Girls College, Yola"
    ],
    NORTH_CENTRAL: [
        "Federal Government College, Jos",
        "Federal Government College, Keffi",
        "Federal Government Girls College, Rubochi",
        "Federal Government Girls College, Garki",
        "Federal Government College, Vandeikya",
        "Federal Government College, Ugwolawo",
        "Federal Government College, Minna",
        "Federal Government College, Suleja",
        "Federal Government Girls College, Bwari",
        "Federal Government Girls College, Kabba",
        "Federal Government Girls College, Omu Aran",
        "Federal Government College, Ilorin",
        "Federal Government Girls College, Bida",
        "Federal Government Girls College, Langtang",
        "Federal Government Girls College, Abaji",
        "Federal Government Girls College, Gboko",
        "Federal Science and Technical College, Orozo",
        "Federal Science and Technical College Kuta, Shiroro",
        "Federal Science and Technical College, Otobi",
        "Federal Government Girls College, New Bussa",
        "Federal Science and Technical College, Otukpo",
        "Federal Government College, Kwali",
        "Federal Government Girls College, Keana",
        "Federal Science and Technical College, Doma"
    ],
    NORTH_WEST: [
        "Federal Government College Sokoto",
        "Federal Science College, Sokoto",
        "Federal Government Girls College, Tambuwal",
        "Federal Government College, Kano",
        "Federal Government College, Daura",
        "Federal Government College, Birnin Yauri",
        "Federal Government College, Kiyawa",
        "Federal Government Girls College, Kazaure",
        "Federal Government Girls College, Minjibir",
        "Federal Government Girls College, Bakori",
        "Federal Government Girls College, Gwandu",
        "Federal Government Girls College, Gusau",
        "Federal Government College, Anka",
        "Federal Science and Technical College, Zuru",
        "Federal Government College, Kaduna",
        "Federal Government Girls College, Zaria",
        "Federal Science and Technical College, Kafanchan",
        "Federal Science and Technical College, Dayi"
    ],
    SOUTH_EAST: [
        "Federal Government College, Ohafia",
        "Federal Government College, Okposi",
        "Federal Government Girls College, Onitsha",
        "Federal Government College, Nise",
        "Federal Government College, Okigwe",
        "Federal Government Girls College, Umuahia",
        "Federal Government College, Enugu",
        "Federal Government Girls College, Lejja",
        "Federal Government Girls College, Owerri",
        "Federal Government Girls College, Ezzamgbo",
        "Federal Science and Technical College, Awka",
        "Federal Government College, Ohanso"
    ],
    SOUTH_WEST: [
        "Federal Government College, Odogbolu",
        "Federal Government College, Ogbomoso",
        "Federal Government College, Ikirun",
        "Kings College, Lagos",
        "Queens College, Lagos",
        "Federal Government College, Ijanikin",
        "Federal Government Girls College, Akure",
        "Federal Government College, Idoani",
        "Federal Government Girls College, Ipetumodu",
        "Federal Government Girls College, Oyo",
        "Federal Government Girls College, Efon Alaye",
        "Federal Science and Technical College, Yaba",
        "Federal Science and Technical College, Ilesha",
        "Federal Government College, Ikole",
        "Federal Science and Technical College, Usi Ekiti",
        "Federal Science and Technical College, Ikare Akoko",
        "Federal Government Girls College, Sagamu"
    ],
    SOUTH_SOUTH: [
        "Federal Science and Technical College, Uromi",
        "Federal Government College Ikom",
        "Federal Science College, Ogoja",
        "Federal Government Girls College, Calabar",
        "Federal Government Girls College, Ibusa",
        "Federal Government Girls College, Benin",
        "Federal Government College, Ibillo",
        "Federal Government Girls College, Imiringi",
        "Federal Science and Technical College, Tungbo",
        "Federal Science and Technical College, Uyo",
        "Federal Science and Technical College, Ahoada",
        "Federal Government Girls College, Ikot Obio-Itong",
        "Federal Government College, Ikot Ekpene",
        "Federal Government Girls College, Abuloma",
        "Federal Government College, Warri",
        "Federal Government College, Odi",
        "Federal Government College, PortHarcourt"
    ]
};

// List of Nigerian states for dropdowns
const nigerianStates = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", 
    "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", 
    "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", 
    "Kogi", "Kwara", "Lagos", "Lafia", "Nasarawa", "Niger", "Ogun", 
    "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", 
    "Yobe", "Zamfara", "FCT"
];

// Function to populate select dropdowns with schools
function populateSchoolDropdowns() {
    const selects = {
        'northEast': schoolsData.NORTH_EAST,
        'northCentral': schoolsData.NORTH_CENTRAL,
        'northWest': schoolsData.NORTH_WEST,
        'southEast': schoolsData.SOUTH_EAST,
        'southWest': schoolsData.SOUTH_WEST,
        'southSouth': schoolsData.SOUTH_SOUTH
    };

    for (const [selectId, schools] of Object.entries(selects)) {
        const select = document.getElementById(selectId);
        schools.forEach(school => {
            const option = document.createElement('option');
            option.value = school;
            option.textContent = school;
            select.appendChild(option);
        });
    }
}

function populateStateDropdowns() {
    const select = document.getElementById('stateOfOrigin');
    if (select) {
        nigerianStates.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            select.appendChild(option);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateSchoolDropdowns();
    populateStateDropdowns();
});
