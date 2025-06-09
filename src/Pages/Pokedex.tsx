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

  function handleModalRename(pokemonName: string) {
    setRenameInput(pokemonTertangkap[pokemonName] || "");
    setModalRename({
      isOpen: true,
      pokemonName: pokemonName,
    });
  }
  //   console.log(pokemons);

  return (
    <>
      <div>
        {pokemons?.map((pokemon) => (
          <div key={pokemon.detail.name}>
            <h3>{pokemon.detail.name}</h3>
            <h4>{pokemon.userName}</h4>
            <img src={pokemon.detail.sprites.front_default} alt={pokemon.detail.name} />
            <p>Height: {pokemon.detail.height}</p>
            <p>Weight: {pokemon.detail.weight}</p>

            <button onClick={() => handleModalRename(pokemon.detail.name)}>Rename</button>
            <button onClick={() => releasePokemon(pokemon.detail.name)}>Release</button>
          </div>
        ))}
        <div>{(!pokemons || pokemons?.length === 0) && <p>Belum ada Pokemon yang tertangkap.</p>}</div>
      </div>

      {/* MODAL RENAME */}
      <div id="modal-rename" style={{ display: modalRename.isOpen ? "block" : "none" }}>
        <h2>Rename Pokemon</h2>
        <p>Form untuk mengganti nama Pokemon akan muncul di sini.</p>
        {/* Form untuk mengganti nama Pokemon */}
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Nama Baru" value={renameInput} onChange={(e) => setRenameInput(e.target.value)} />
          <button type="button" onClick={() => renamePokemon(modalRename.pokemonName, renameInput)}>
            Ganti Nama
          </button>
        </form>
        <button onClick={() => setModalRename({ isOpen: false, pokemonName: "" })}>Tutup</button>
      </div>
    </>
  );
}
