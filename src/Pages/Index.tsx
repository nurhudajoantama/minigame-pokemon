import { useState } from "react";
import { getPokemonDetail, useGetAllPokemons } from "../api/pokemon.api";
import { usePokemon } from "../providers/PokemonProvider";

function Index() {
  const [modalDetail, setModalDetail] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pokemonDetail, setPokemonDetail] = useState<any>(null);

  const [modalTangkap, setModalTangkap] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pokemonTangkap, setPokemonTangkap] = useState<any>({
    success: false,
    dataPokemon: null,
  });

  const { data: pokemons, isLoading } = useGetAllPokemons();

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
        dataPokemon: null,
        errorMessage: (error as Error).message,
      });
      setModalTangkap(true);
    }
  };

  return (
    <>
      <div>
        {isLoading ? (
          <div>Memuat data...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pokemons.map((pokemon: { name: string; url: string }, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{pokemon.name}</td>
                  <td>
                    <button onClick={() => handleDetailClick(pokemon.name)}>Detail</button>
                    <button onClick={() => handleTangkapClick(pokemon.name)}>Tangkap</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL DETAIL */}
      <div id="modal-detail" style={{ display: modalDetail ? "block" : "none" }}>
        <h2>Detail Pokemon</h2>
        <p>Informasi detail akan muncul di sini.</p>

        {pokemonDetail && (
          <div>
            <h3>{pokemonDetail.name}</h3>
            <p>Height: {pokemonDetail.height}</p>
            <p>Weight: {pokemonDetail.weight}</p>
            <img src={pokemonDetail.sprites.front_default} alt={pokemonDetail.name} />
          </div>
        )}

        <button onClick={() => setModalDetail(false)}>Tutup</button>
      </div>

      {/* MODAL TANGKAP */}
      <div id="modal-tangkap" style={{ display: modalTangkap ? "block" : "none" }}>
        <h2>{pokemonTangkap.success ? "Berhasil Menangkap!" : "Gagal Menangkap"}</h2>
        {pokemonTangkap.dataPokemon && (
          <div>
            <h3>{pokemonTangkap.dataPokemon.name}</h3>
            <p>Height: {pokemonTangkap.dataPokemon.height}</p>
            <p>Weight: {pokemonTangkap.dataPokemon.weight}</p>
            <img src={pokemonTangkap.dataPokemon.sprites.front_default} alt={pokemonTangkap.dataPokemon.name} />
          </div>
        )}
        {pokemonTangkap.errorMessage && <p>{pokemonTangkap.errorMessage}</p>}
        <button onClick={() => setModalTangkap(false)}>Tutup</button>
      </div>
    </>
  );
}

export default Index;
