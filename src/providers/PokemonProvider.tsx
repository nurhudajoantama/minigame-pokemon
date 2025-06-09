import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PokemonContext = React.createContext<any>({});

// eslint-disable-next-line react-refresh/only-export-components
export const usePokemon = () => {
  const context = React.useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
};

export default function PokemonProvider({ children }: { children: React.ReactNode }) {
  const [pokemonTertangkap, setPokemonTertangkap] = useLocalStorage<Record<string, string>>("pokemon_tertangkap", {});

  const tangkapPokemon = (name: string): boolean => {
    if (pokemonTertangkap[name]) {
      throw new Error("Pokemon already caught");
    }

    const chance = Math.random();
    const success = chance < 0.3;

    if (success) {
      setPokemonTertangkap((prev) => ({
        ...prev,
        [name]: name,
      }));
    }

    return success;
  };

  const renamePokemon = (pokemonName: string, newName: string): void => {
    if (!pokemonTertangkap[pokemonName]) {
      throw new Error("Pokemon not found");
    }

    setPokemonTertangkap((prev) => {
      return {
        ...prev,
        [pokemonName]: newName,
      };
    });
  };

  const releasePokemon = (pokemonName: string): void => {
    if (!pokemonTertangkap[pokemonName]) {
      throw new Error("Pokemon not found");
    }

    setPokemonTertangkap((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [pokemonName]: _, ...rest } = prev;
      return rest;
    });
  };

  const value = {
    tangkapPokemon,
    renamePokemon,
    releasePokemon,
    pokemonTertangkap,
  };

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
}
