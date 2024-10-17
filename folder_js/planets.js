async function fetchPlanets() {
    try {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = 'https://web.dragonball-api.com/api/planets';
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching planets:', error);
        return [];
    }
}

function displayPlanets(planets) {
    const container = document.getElementById('planets-container');
    planets.forEach(planet => {
        const planetCard = document.createElement('div');
        planetCard.className = 'planet-card';
        planetCard.innerHTML = `
            <h2>${planet.name}</h2>
            <img src="${planet.image}" alt="${planet.name}">
            <p>${planet.description}</p>
        `;
        container.appendChild(planetCard);
    });
}

async function init() {
    const planets = await fetchPlanets();
    displayPlanets(planets);
}

init();



