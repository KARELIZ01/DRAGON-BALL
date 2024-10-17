const API_URL = 'https://dragonball-api.com/api/characters';
const charactersContainer = document.getElementById('characters-container');

async function fetchAllCharacters() {
    let allCharacters = [];
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
        try {
            const response = await fetch(`${API_URL}?page=${page}&limit=20`);
            const data = await response.json();
            allCharacters = allCharacters.concat(data.items);
            hasMorePages = data.meta.totalPages > page;
            page++;
        } catch (error) {
            console.error('Error fetching characters:', error);
            hasMorePages = false;
        }
    }

    return allCharacters;
}

function displayCharacters(characters) {
    charactersContainer.innerHTML = characters.map(character => `
        <div class="character-card">
            <div class="image-container">
                <img src="${character.image}" alt="${character.name}">
            </div>
            <div class="character-info">
                <h2>${character.name}</h2>
                <p><strong>Raza:</strong> ${character.race}</p>
                <p><strong>Ki:</strong> ${character.ki}</p>
                <p><strong>Género:</strong> ${character.gender}</p>
            </div>
        </div>
    `).join('');
}


async function init() {
    try {
        const characters = await fetchAllCharacters();
        if (characters && characters.length > 0) {
            displayCharacters(characters);
        } else {
            charactersContainer.innerHTML = '<p>No se encontraron personajes.</p>';
        }
    } catch (error) {
        console.error('Error initializing:', error);
        charactersContainer.innerHTML = '<p>Error al cargar los personajes.</p>';
    }
}

init();