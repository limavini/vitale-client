import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Homepage } from "./pages/Homepage";
import { About } from "./pages/About";
import UserContextProvider from "./UserContext";
// import { Header } from "./components/Header";
import { Switch, Route } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <UserContextProvider>
      <ApolloProvider client={client}>
        <div id="main">
          {/* <Header /> */}
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </ApolloProvider>
    </UserContextProvider>
  );
}

export default App;
