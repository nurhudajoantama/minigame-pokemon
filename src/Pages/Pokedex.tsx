import { useState } from "react";
import { useGetDetailPokemonTertangkap } from "../api/pokemon.api";
import { usePokemon } from "../providers/PokemonProvider";

export default function Pokedex() {
  const { pokemonTertangkap, renamePokemon, releasePokemon } = usePokemon();
  const { data: pokemons } = useGetDetailPokemonTertangkap(pokemonTertangkap);

  const [renameInput, setRenameInput] = useState("");
  const [modalRename, setModalRename] = useState({
    isOpen: false,
    pokemonName: "",
  });

  const [modalRelease, setModalRelease] = useState({
    isOpen: false,
    pokemonName: "",
  });

  function handleModalRelease(pokemonName: string) {
    setModalRelease({
      isOpen: true,
      pokemonName: pokemonName,
    });
  }

  function handleRelease(pokemonName: string) {
    releasePokemon(pokemonName);
    setModalRelease({
      isOpen: false,
      pokemonName: "",
    });
  }

  function handleModalRename(pokemonName: string) {
    setRenameInput(pokemonTertangkap[pokemonName] || "");
    setModalRename({
      isOpen: true,
      pokemonName: pokemonName,
    });
  }

  function handleRename() {
    if (!modalRename.pokemonName || !renameInput) {
      alert("Nama baru tidak boleh kosong");
      return;
    }
    renamePokemon(modalRename.pokemonName, renameInput);
    setModalRename({
      isOpen: false,
      pokemonName: "",
    });
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {pokemons && pokemons.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pokemons.map((pokemon) => (
              <div key={pokemon.detail.name} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:scale-105 transform transition">
                <p className="text-lg font-semibold capitalize mb-1">{pokemon.detail.name}</p>
                <p className="text-sm text-gray-500 mb-2">{pokemon.userName}</p>
                <img className="w-24 h-24 object-contain mb-4" src={pokemon.detail.sprites.front_default} alt={pokemon.detail.name} />
                <p className="text-sm text-gray-600">Height: {pokemon.detail.height}</p>
                <p className="text-sm text-gray-600 mb-4">Weight: {pokemon.detail.weight}</p>
                <div className="flex space-x-2 w-full">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded" onClick={() => handleModalRename(pokemon.detail.name)}>
                    Rename
                  </button>
                  <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded" onClick={() => handleModalRelease(pokemon.detail.name)}>
                    Release
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-4">Belum ada Pokemon yang tertangkap.</p>
        )}
      </div>

      {/* MODAL RENAME */}
      <div
        id="modal-rename"
        className={`fixed inset-0 bg-black/[0.3] bg-opacity-30 flex items-center justify-center ${modalRename.isOpen ? "block" : "hidden"}`}
        onClick={() => setModalRename({ isOpen: false, pokemonName: "" })}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-2xl font-bold mb-4">Rename Pokemon</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <input className="w-full border border-gray-300 rounded px-3 py-2 mb-4" type="text" placeholder="Nama Baru" value={renameInput} onChange={(e) => setRenameInput(e.target.value)} />
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded" type="button" onClick={() => handleRename()}>
              Ganti Nama
            </button>
          </form>
          <button className="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setModalRename({ isOpen: false, pokemonName: "" })}>
            Tutup
          </button>
        </div>
      </div>

      {/* MODAL RELEASE */}
      <div id="modal-release" className={`fixed inset-0 bg-black/[0.3] flex items-center justify-center ${modalRelease.isOpen ? "block" : "hidden"}`} onClick={() => {}}>
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-2xl font-bold mb-4">Release Pokemon</h2>
          <p className="text-gray-600">Apakah Anda yakin ingin melepaskan Pokemon ini?</p>
          <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full" onClick={() => handleRelease(modalRelease.pokemonName)}>
            Lepaskan
          </button>
          <button className="mt-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full" onClick={() => setModalRelease({ isOpen: false, pokemonName: "" })}>
            Batal
          </button>
        </div>
      </div>
    </>
  );
}
