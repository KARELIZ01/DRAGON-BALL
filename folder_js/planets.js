const API_URL = 'https://dragonball-api.com/api/planets';
const planetsContainer = document.getElementById('planets-container');

async function fetchAllPlanets() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching planets:', error);
        return [];
    }
}

function displayPlanets(planets) {
    if (planets.length === 0) {
    planetsContainer.innerHTML = '<p>No se encontraron planetas.</p>';
    return;
    }
    planetsContainer.innerHTML = planets.map(planet =>`
        <div class="planet-card">
        <img src="${planet.image}" alt="${planet.name}"
        class="planet-image">
        <div class="planet-info">
                    <h2>${planet.name}</h2>
                    <p>${planet.description.split('.')[0]}</p>
                </div>
            </div>
     `).join('');
}

async function init() {
    try {
        const planets = await fetchAllPlanets();
        if (planets && planets.length > 0) {
            displayPlanets(planets);
        } else {
            planetsContainer.innerHTML = '<p>No se encontraron planetas.</p>';
        }
    } catch (error) {
        console.error('Error initializing:', error);
        planetsContainer.innerHTML = '<p>Error al cargar los planetas.</p>';
    }
}

init();
