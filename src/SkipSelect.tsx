import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_POKEMON_NAMES, GET_POKEMON_ATTACKS } from "./queries";
import { Pokemon, PokemonAttacks, PokemonAttack } from "./types";
import { PokemonNameSelector } from "./PokemonNameSelector";
import { PokemonAttackSelector } from "./PokemonAttackSelector";

export const SkipSelect = () => {
  const [selectedPokemon, selectPokemon] = React.useState<Pokemon | null>(null);
  const [selectedAttack, selectAttack] = React.useState<PokemonAttack | null>(
    null
  );
  const pokemonNameQuery = useQuery<{ pokemons: Pokemon[] }>(
    GET_ALL_POKEMON_NAMES
  );
  const pokemonAttackQuery = useQuery<{
    pokemon: {
      attacks: PokemonAttacks;
    };
  }>(GET_POKEMON_ATTACKS, {
    variables: {
      name: selectedPokemon?.name || "",
    },
    skip: selectedPokemon === null,
  });
  if (pokemonNameQuery.data === undefined) {
    return <p>Loading</p>;
  }
  if (!selectedPokemon) {
    return (
      <PokemonNameSelector
        pokemons={pokemonNameQuery.data.pokemons}
        selectedPokemon={selectedPokemon}
        onSelect={selectPokemon}
      />
    );
  }
  return (
    <>
      <PokemonNameSelector
        pokemons={pokemonNameQuery.data.pokemons}
        selectedPokemon={selectedPokemon}
        onSelect={selectPokemon}
      />
      <PokemonAttackSelector
        attacks={
          pokemonAttackQuery.data?.pokemon.attacks || { fast: [], special: [] }
        }
        onAttackSelected={selectAttack}
        selectedAttack={selectedAttack}
      />
    </>
  );
};
