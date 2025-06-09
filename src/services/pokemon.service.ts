export const tankapPokemon = (name: string, dataPokemon: Record<string, string>): boolean => {
  if (dataPokemon[name]) {
    throw new Error("Pokemon already caught");
  }

  const chance = Math.random();
  return chance < 0.3; // 30% chance to catch
};
