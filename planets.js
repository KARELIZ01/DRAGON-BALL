const fetchPlanets = async () => {
    try {
        const response = await fetch('https://dragonball-api.com/api/planets?limit=20');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const planets = data.items || [];
        
        if (planets.length === 0) {
            throw new Error('No se encontraron planetas');
        }
        
        const planetsRow = document.getElementById('planets-row');
        planetsRow.innerHTML = '';
        
        planets.forEach(planet => {
            const card = document.createElement('div');
            card.className = 'col-md-3'; // Cambiado a 4 tarjetas por fila
            
            card.innerHTML = `
                <div class="card">
                    <img src="${planet.image}" class="card-img-top" alt="${planet.name}">
                    <div class="card-body">
                        <h5 class="card-title">${planet.name}</h5>
                        <p class="card-text">${planet.description}</p>
                    </div>
                </div>
            `;
            
            planetsRow.appendChild(card);
        });
    } catch (error) {
        console.error('Error al obtener los planetas:', error);
        const planetsRow = document.getElementById('planets-row');
        planetsRow.innerHTML = `<p class="text-center">Error al cargar los planetas: ${error.message}</p>`;
    }
};

document.addEventListener('DOMContentLoaded', fetchPlanets);
