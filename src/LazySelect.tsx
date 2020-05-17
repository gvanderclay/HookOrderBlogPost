import * as React from "react";
import gql from "graphql-tag";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { Pokemon, PokemonAttack, PokemonAttacks } from "./types";
import { GET_ALL_POKEMON_NAMES, GET_POKEMON_ATTACKS } from "./queries";
import { PokemonNameSelector } from "./PokemonNameSelector";
import { PokemonAttackSelector } from "./PokemonAttackSelector";

export const LazySelect = () => {
  const [selectedPokemon, selectPokemon] = React.useState<Pokemon | null>(null);
  const [selectedAttack, selectAttack] = React.useState<PokemonAttack | null>(
    null
  );
  const pokemonNameQuery = useQuery<{ pokemons: Pokemon[] }>(
    GET_ALL_POKEMON_NAMES
  );
  const [
    getSelectedPokemonAttacks,
    { data: pokemonAttackQueryData },
  ] = useLazyQuery<{
    pokemon: {
      attacks: PokemonAttacks;
    };
  }>(GET_POKEMON_ATTACKS, {});
  React.useEffect(() => {
    if (selectedPokemon) {
      getSelectedPokemonAttacks({
        variables: {
          name: selectedPokemon.name,
        },
      });
    }
  }, [selectedPokemon]);
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
          pokemonAttackQueryData?.pokemon.attacks || { fast: [], special: [] }
        }
        onAttackSelected={selectAttack}
        selectedAttack={selectedAttack}
      />
    </>
  );
};
