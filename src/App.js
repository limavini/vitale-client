import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { About } from "./pages/About";
import { SignIn } from "./pages/SignIn";
import { PatientDetails } from "./pages/PatientDetails";
import { PatientList } from "./pages/PatientList";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomepageRoute } from "./components/HomepageRoute";
import UserContextProvider from "./UserContext";
import { Header } from "./components/Header";
import { Switch, Route } from "react-router-dom";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  uri: "https://vitale-server.herokuapp.com/graphql",
  defaultOptions: defaultOptions,
});

function App() {
  return (
    <UserContextProvider>
      <ApolloProvider client={client}>
        <div id="main">
        <link rel="preload" href="./assets/food.jpg" as="image /" />
          <Header />
          <Switch>
            <HomepageRoute path="/" exact />
            <Route path="/register" exact component={SignIn} />
            <ProtectedRoute path="/about" component={About} />
            <ProtectedRoute path="/patients/:id" component={PatientDetails} />
            <ProtectedRoute exact path="/patients" component={PatientList} />
          </Switch>
        </div>
      </ApolloProvider>
    </UserContextProvider>
  );
}

export default App;
