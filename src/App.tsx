import * as React from "react";
import "./App.css";
import { BadSelect } from "./BadSelect";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { SkipSelect } from "./SkipSelect";
import { LazySelect } from "./LazySelect";

const client = new ApolloClient({
  uri: "https://graphql-pokemon.now.sh",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <SkipSelect />
      </div>
      <div>
        <LazySelect />
      </div>
    </ApolloProvider>
  );
}

export default App;
