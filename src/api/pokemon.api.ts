import { useQuery } from "@tanstack/react-query";

export const getPokemonDetail = async (name: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getAllPokemons = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return (await response.json()).results;
};

export const useGetAllPokemons = () => {
  return useQuery({
    queryKey: ["all-pokemons"],
    queryFn: getAllPokemons,
  });
};

export const useGetDetailPokemonTertangkap = (pokemons: Record<string, string>) => {
  return useQuery({
    queryKey: ["detail-pokemon-tertangkap", pokemons],
    queryFn: async () => {
      const promises = Object.keys(pokemons).map(async (name) => ({
        userName: pokemons[name],
        detail: await getPokemonDetail(name),
      }));
      return Promise.all(promises);
    },
    enabled: Object.keys(pokemons).length > 0,
  });
};
