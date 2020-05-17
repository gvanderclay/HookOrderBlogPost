import * as React from "react";
import gql from "graphql-tag";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

const GET_ALL_POKEMON_NAMES = gql`
  {
    pokemons(first: 151) {
      name
    }
  }
`;

const GET_POKEMON_ATTACKS = gql`
  query Attacks($name: String!) {
    pokemon(name: $name) {
      attacks {
        special {
          name
          type
          damage
        }
        fast {
          name
          type
          damage
        }
      }
    }
  }
`;

type Pokemon = {
  name: string;
};

type PokemonAttack = {
  name: string;
  type: string;
  damage: number;
};

type PokemonAttacks = {
  fast: PokemonAttack[];
  special: PokemonAttack[];
};

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

const PokemonNameSelector = (props: {
  pokemons: Pokemon[];
  selectedPokemon: Pokemon | null;
  onSelect: (pokemon: Pokemon) => void;
}) => {
  return (
    <>
      <select
        onChange={(event) => {
          const pokemon = props.pokemons.find(
            (x) => x.name === event.target.value
          );
          if (pokemon) {
            props.onSelect(pokemon);
          }
        }}
        value={props.selectedPokemon?.name}
      >
        {props.pokemons.map((pokemon) => (
          <option key={pokemon.name} value={pokemon.name}>
            {pokemon.name}
          </option>
        ))}
      </select>
    </>
  );
};

const PokemonAttackSelector = (props: {
  attacks: PokemonAttacks;
  selectedAttack: PokemonAttack | null;
  onAttackSelected: (attack: PokemonAttack) => void;
}) => {
  const attacks = [...props.attacks.fast, ...props.attacks.special];
  return (
    <>
      <select
        onChange={(event) => {
          const selectedAttack = attacks.find(
            (attack) => attack.name === event.target.value
          );
          if (selectedAttack) {
            props.onAttackSelected(selectedAttack);
          }
        }}
        value={props.selectedAttack?.name}
      >
        {attacks.map((attack) => (
          <option key={attack.name} value={attack.name}>
            {attack.name}
          </option>
        ))}
      </select>
      {props.selectedAttack && (
        <div>
          <p>{props.selectedAttack.name}</p>
          <p>{props.selectedAttack.type}</p>
          <p>{props.selectedAttack.damage}</p>
        </div>
      )}
    </>
  );
};
