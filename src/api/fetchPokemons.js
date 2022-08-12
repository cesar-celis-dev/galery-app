export const fetchPokemons = async (
  offset = 0,
  limit = 5
) => {
  const getPokemons = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  const pokemonData = await getPokemons.json();

  return pokemonData;
};