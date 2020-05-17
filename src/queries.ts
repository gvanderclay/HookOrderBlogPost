import gql from "graphql-tag";

export const GET_ALL_POKEMON_NAMES = gql`
  {
    pokemons(first: 151) {
      name
    }
  }
`;

export const GET_POKEMON_ATTACKS = gql`
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
