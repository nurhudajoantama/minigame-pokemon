import { useQuery } from "@tanstack/react-query";
import { usePokemon } from "../providers/PokemonProvider";
import type { AllPokemonItem, PokemonDetail } from "../types/pokemon";

export const getPokemonDetail = async (name: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return (await response.json()) as PokemonDetail;
};

export const getAllPokemons = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return (await response.json()).results as AllPokemonItem[];
};

export const useGetAllPokemons = () => {
  const { pokemonTertangkap } = usePokemon();
  return useQuery({
    queryKey: ["all-pokemons"],
    queryFn: async () => {
      const pokemons = await getAllPokemons();
      const promises = pokemons.map(async (pokemon) => {
        const detail = await getPokemonDetail(pokemon.name);
        return { ...pokemon, detail, userName: pokemonTertangkap[pokemon.name] };
      });
      return Promise.all(promises);
    },
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
