import * as React from "react";
import "./App.css";
import { BadSelect } from "./Select";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "https://graphql-pokemon.now.sh",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BadSelect />
    </ApolloProvider>
  );
}

export default App;
