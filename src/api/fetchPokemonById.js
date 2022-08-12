export const fetchPokemonById = async (id) => {
  const getPokemons = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );
  const pokemonData = await getPokemons.json();

  return pokemonData;
};