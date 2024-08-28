const baseUrl = "https://pokeapi.co/api/v2";
let newPokemonId = null;

async function fetchPokemon(id = null) {
    const searchValue = id || document.getElementById("searchBar").value.trim().toLowerCase();
    const pokemonContainer = document.getElementById("pokemonContainer");
    
    try {
        const response = await fetch(`${baseUrl}/pokemon/${searchValue}`);
        if (!response.ok) {
            throw new Error("Pokémon not found");
        }

        const pokemon = await response.json();
        newPokemonId = pokemon.id;

        const defaultImg = document.getElementById('defaultImg');
        if (defaultImg) {
            defaultImg.remove();
        }

        document.getElementById('img').innerHTML = `<img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">`; 
        document.getElementById('nom').innerHTML = `<strong>Nom:</strong> ${pokemon.name}`;
        document.getElementById('type').innerHTML = `<strong>Type:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}`;
        document.getElementById('taille').innerHTML = `<strong>Taille:</strong> ${pokemon.height / 10} m`;
        document.getElementById('poids').innerHTML = `<strong>Poids:</strong> ${pokemon.weight / 10} kg`;
        document.getElementById('capacite').innerHTML = `<strong>Capacité:</strong> ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}`;
        document.getElementById('numero').innerHTML = `<strong>Poké-ID:</strong> ${pokemon.id}`;
     
        updateNavigationButtons();
    } catch (error) {
        pokemonContainer.innerHTML = `<p class="text-danger">${error.message}</p>`;
    }
}

function updateNavigationButtons() {
    document.getElementById("prevBtn").disabled = newPokemonId <= 1;
    document.getElementById("nextBtn").disabled = newPokemonId >= 1010;
}

function prevPokemon() {
    if (newPokemonId > 1) {
        fetchPokemon(newPokemonId - 1);
    }
}

function nextPokemon() {
    if (newPokemonId < 1010) {
        fetchPokemon(newPokemonId + 1);
    }
}
