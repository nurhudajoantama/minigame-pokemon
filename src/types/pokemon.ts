export type PokemonDetail = {
  name: string;
  weight: string;
  height: string;

  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];

  sprites: {
    front_default: string;
  };
};

export type AllPokemonItem = {
  name: string;
  url: string;
};

export type PokemonTertangkap = {
  [key: string]: string; // key is pokemon name, value is user-defined name
};

export type PokemonCaptured = {
  detail: PokemonDetail;
  userName: string;
};
