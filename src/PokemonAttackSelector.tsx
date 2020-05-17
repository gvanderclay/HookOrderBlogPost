import * as React from "react";
import { PokemonAttack, PokemonAttacks } from "./types";
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
