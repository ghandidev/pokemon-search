const validList = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
const dataPokemon =
  'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/{name-or-id}';

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const pokemonForm = document.getElementById('pokemon-form');

const screen = document.getElementById('screen');
const statsContainer = document.getElementById('stats-container');

const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const pokemonSprite = document.querySelector('.sprite-container');
const pokemonTypes = document.getElementById('types');
const pokemonHp = document.getElementById('hp');
const pokemonAttack = document.getElementById('attack');
const pokemonDefense = document.getElementById('defense');
const pokemonSpAttack = document.getElementById('special-attack');
const pokemonSpDefense = document.getElementById('special-defense');
const pokemonSpeed = document.getElementById('speed');

let pokemon = [];
const showPokemon = () => {
  let input = searchInput.value
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
  let dataPokemonUrl = dataPokemon.replace('{name-or-id}', input);

  const fetchPokemon = async () => {
    try {
      const res = await fetch(dataPokemonUrl);
      const pokemon = await res.json();
      const name = pokemon.name;
      const id = pokemon.id;
      const weight = pokemon.weight;
      const height = pokemon.height;
      const sprites = pokemon.sprites;
      const front_default = sprites.front_default;
      const type = pokemon.types;

      const hp = pokemon.stats[0].base_stat;
      const attack = pokemon.stats[1].base_stat;
      const defense = pokemon.stats[2].base_stat;
      const spAttack = pokemon.stats[3].base_stat;
      const spDefense = pokemon.stats[4].base_stat;
      const speed = pokemon.stats[5].base_stat;

      pokemonName.innerText = `${name}`;
      pokemonId.innerText = `#${id}`;
      pokemonWeight.innerText = `Weight: ${weight}`;
      pokemonHeight.innerText = `Height: ${height}`;
      pokemonSprite.innerHTML = `
      <img id="sprite" src="${front_default}" alt="${name} Sprite">`;
      if (type.length > 1) {
        pokemonTypes.innerHTML = `
      ${type
        .map(
          (type) =>
            `<div id="type" class="types ${type.type.name}">${type.type.name}</div>`
        )
        .join('')}
      `;
      } else {
        pokemonTypes.innerHTML = `
        ${type.map(
          (type) =>
            `<div id="type" class="types ${type.type.name}">${type.type.name}</div>`
        )}
        `;
      }
      pokemonHp.innerText = `${hp}`;
      pokemonAttack.innerText = `${attack}`;
      pokemonDefense.innerText = `${defense}`;
      pokemonSpAttack.innerText = `${spAttack}`;
      pokemonSpDefense.innerText = `${spDefense}`;
      pokemonSpeed.innerText = `${speed}`;
    } catch (err) {
      err = alert('Pokémon not found');
    }
  };
  fetchPokemon();
};

pokemonForm.addEventListener('submit', (e) => {
  e.preventDefault();
  showPokemon;
});
searchBtn.addEventListener('click', showPokemon);

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    showPokemon;
  }
});
