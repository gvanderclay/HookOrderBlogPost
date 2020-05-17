import * as React from "react";
import { Pokemon } from "./types";

export const PokemonNameSelector = (props: {
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
