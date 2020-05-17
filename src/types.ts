export type Pokemon = {
  name: string;
};

export type PokemonAttack = {
  name: string;
  type: string;
  damage: number;
};

export type PokemonAttacks = {
  fast: PokemonAttack[];
  special: PokemonAttack[];
};
