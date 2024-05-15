const validList = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
const dataPokemon =
  'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/{name-or-id}';

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');

const screen = document.getElementById('screen');
const statsContainer = document.getElementById('stats-container');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

let pokemon = [];
let pokemonTypes = [];

statsContainer.innerHTML += `
        <tr>
            <th>HP:</th>
            <th></th>
        </tr>
        <tr>
            <th>Attack:</th>
            <th></th>
        </tr>
        <tr>
            <th>Defense:</th>
            <th></th>
        </tr>
        <tr>
            <th>Sp. Attack:</th>
            <th></th>
        </tr>
        <tr>
            <th>Sp. Defense:</th>
            <th></th>
        </tr>
        <tr>
            <th>Speed:</th>
            <th></th>
        </tr>
    `;
const showPokemon = () => {
  screen.innerHTML = '';
  let input = searchInput.value
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
  let dataPokemonUrl = dataPokemon.replace('{name-or-id}', input);

  const fetchPokemon = async () => {
    try {
      const res = await fetch(dataPokemonUrl);
      const pokemon = await res.json();
      let name = pokemon.name;
      const id = pokemon.id;
      const weight = pokemon.weight;
      const height = pokemon.height;
      const sprites = pokemon.sprites;
      const front_default = sprites.front_default;
      const hp = pokemon.stats[0].base_stat;
      const attack = pokemon.stats[1].base_stat;
      const defense = pokemon.stats[2].base_stat;
      const spAttack = pokemon.stats[3].base_stat;
      const spDefense = pokemon.stats[4].base_stat;
      const speed = pokemon.stats[5].base_stat;
      const types = pokemon.types;

      screen.innerHTML += `
        <div class="pokemon">
            <p id="pokemon-name" class="pokemon-name">${name}</p>
            <p id="pokemon-id" class="pokemon-id">#${id}</p>
        </div>
        <div class="measures">
            <P id="weight">Weight: ${weight}</p>
            <P id="height">Height: ${height}</p>
        </div>
        <div class="sprite-container">
            <img id="sprite" src="${front_default}" alt="${name} Sprite">
        </div>
        <div class="types-container">
          ${types
            .map(
              (type) =>
                `<div id="types" class="types ${type.type.name}">${type.type.name}</div>`
            )
            .join('')}
        </div>
        `;
      statsContainer.innerHTML = `
        <tr>
            <th>HP:</th>
            <th id="hp">${hp}</th>
        </tr>
        <tr>
            <th>Attack:</th>
            <th id="attack">${attack}</th>
        </tr>
        <tr>
            <th>Defense:</th>
            <th id="defense">${defense}</th>
        </tr>
        <tr>
            <th>Sp. Attack:</th>
            <th id="special-attack">${spAttack}</th>
        </tr>
        <tr>
            <th>Sp. Defense:</th>
            <th id="special-defense">${spDefense}</th>
        </tr>
        <tr>
            <th>Speed:</th>
            <th id="speed">${speed}</th>
        </tr>
    `;
    } catch (err) {
      err = alert('Pokémon not found');
    }
  };
  fetchPokemon();
};
searchBtn.addEventListener('click', showPokemon);
