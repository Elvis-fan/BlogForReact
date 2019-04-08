import React, { Component } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { connectRouter } from "connected-react-router";
import { ApolloProvider } from "react-apollo";
import configureStore, { history } from "./stores";
import { routes } from "./routers";
import logo from "./logo.svg";
import "./App.css";
import { client } from "./apollo";
import { BrowserRouter } from "react-router-dom";
function Home() {
  return <h2>Home</h2>;
}

const store = configureStore();
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ReduxProvider store={store}>
          <ConnectedRouter history={history}>
            <Switch>
              {routes.map(route => (
                  <Route
                    key={route.url}
                    exact={route.exact}
                    component={route.component}
                    path={route.url}
                  />
                ))}
            </Switch>
          </ConnectedRouter>
        </ReduxProvider>
      </ApolloProvider>
    );
  }
}

export default App;
