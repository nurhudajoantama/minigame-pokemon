import { useState } from "react";
import { getPokemonDetail, useGetAllPokemons } from "../api/pokemon.api";
import { usePokemon } from "../providers/PokemonProvider";
import { Link } from "react-router-dom";
import type { PokemonDetail } from "../types/pokemon";

type PokemonTangkapModalType = {
  success: boolean;
  dataPokemon?: PokemonDetail;
  errorMessage?: string;
};

function Index() {
  const [modalDetail, setModalDetail] = useState(false);
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail>();

  const [modalTangkap, setModalTangkap] = useState(false);
  const [pokemonTangkap, setPokemonTangkap] = useState<PokemonTangkapModalType>({
    success: false,
  });

  const { data: pokemons, isLoading, refetch } = useGetAllPokemons();

  const handleDetailClick = async (name: string) => {
    const detail = await getPokemonDetail(name);
    setPokemonDetail(detail);
    setModalDetail(true);
  };

  const { tangkapPokemon } = usePokemon();

  const handleTangkapClick = async (name: string) => {
    try {
      const success = tangkapPokemon(name);

      const detail = await getPokemonDetail(name);

      if (success) {
        refetch()
        setPokemonTangkap({
          success: true,
          dataPokemon: detail,
        });
      } else {
        setPokemonTangkap({
          success: false,
          dataPokemon: detail,
        });
      }

      setModalTangkap(true);
    } catch (error) {
      setPokemonTangkap({
        success: false,
        errorMessage: (error as Error).message,
      });
      setModalTangkap(true);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center text-gray-600">Memuat data...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pokemons?.map((pokemon, index: number) => (
              <div key={index} className={`${pokemon.userName ? "bg-green-300" : "bg-white"} shadow-lg rounded-lg p-4 flex flex-col items-center hover:scale-105 transform transition`}>
                <p className="text-lg font-semibold capitalize">{pokemon.name}</p>
                {pokemon.userName && <p className="text-sm text-gray-500">{pokemon.userName}</p>}
                <img className="w-24 h-24 object-contain my-4" src={pokemon.detail.sprites?.front_default} alt={pokemon.detail.name} />

                <div className="flex space-x-2 w-full">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded" onClick={() => handleDetailClick(pokemon.name)}>
                    Detail
                  </button>
                  {!pokemon.userName && (
                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded" onClick={() => handleTangkapClick(pokemon.name)}>
                      Tangkap
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL DETAIL */}
      <div id="modal-detail" className={`fixed inset-0 bg-black/[0.3] flex items-center justify-center ${modalDetail ? "block" : "hidden"}`} onClick={() => setModalDetail(false)}>
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-2xl font-bold mb-4">Detail Pokemon</h2>

          {pokemonDetail && (
            <div className="text-center">
              <h3 className="text-xl font-semibold capitalize mb-2">{pokemonDetail.name}</h3>
              <p className="text-sm text-gray-600">Height: {pokemonDetail.height}</p>
              <p className="text-sm text-gray-600">Weight: {pokemonDetail.weight}</p>
              <img className="mx-auto my-4" src={pokemonDetail.sprites.front_default} alt={pokemonDetail.name} />
              <div className="mb-4 text-left">
                <h4 className="text-lg font-semibold mb-1">Abilities:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {pokemonDetail.abilities.map((ab) => (
                    <li key={ab.slot} className="capitalize">
                      {ab.ability.name}
                      {ab.is_hidden ? " (Hidden)" : ""}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <button className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full" onClick={() => setModalDetail(false)}>
            Tutup
          </button>
        </div>
      </div>

      {/* MODAL TANGKAP */}
      <div id="modal-tangkap" className={`fixed inset-0 bg-black/[0.3] flex items-center justify-center ${modalTangkap ? "block" : "hidden"}`} onClick={() => setModalTangkap(false)}>
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-2xl font-bold mb-4">{pokemonTangkap.success ? "Berhasil Menangkap!" : "Gagal Menangkap"}</h2>
          {pokemonTangkap.dataPokemon && (
            <div className="text-center">
              <h3 className="text-xl font-semibold capitalize mb-2">{pokemonTangkap.dataPokemon.name}</h3>
              <p className="text-sm text-gray-600">Height: {pokemonTangkap.dataPokemon.height}</p>
              <p className="text-sm text-gray-600">Weight: {pokemonTangkap.dataPokemon.weight}</p>
              <img className="mx-auto my-4" src={pokemonTangkap.dataPokemon.sprites.front_default} alt={pokemonTangkap.dataPokemon.name} />
              <div className="mb-4 text-left">
                <h4 className="text-lg font-semibold mb-1">Abilities:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {pokemonTangkap.dataPokemon.abilities.map((ab) => (
                    <li key={ab.slot} className="capitalize">
                      {ab.ability.name}
                      {ab.is_hidden ? " (Hidden)" : ""}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {pokemonTangkap.errorMessage && <p className="text-red-500 text-center mb-2">{pokemonTangkap.errorMessage}</p>}
          {pokemonTangkap.success && (
            <>
              <p className="text-green-500 text-center mb-2">Selamat! Kamu berhasil menangkap {pokemonTangkap?.dataPokemon?.name}!</p>
              <Link to={`/pokedex`} className="block text-center bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded">
                Lihat di Pokedex
              </Link>
            </>
          )}
          <button className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full" onClick={() => setModalTangkap(false)}>
            Tutup
          </button>
        </div>
      </div>
    </>
  );
}

export default Index;
