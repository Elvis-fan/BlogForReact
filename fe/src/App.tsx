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
import BasicLayout from '@/layouts/basicLayout'
import Home from '@/pages/home'
import Blog from '@/pages/blog'

const store = configureStore();
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ReduxProvider store={store}>
          <ConnectedRouter history={history}>
            <Switch>
            <Route component={()=>{
              return <BasicLayout>
                <Switch>
                <Route exact component={Home} path={'/'}/>
                <Route exact component={Blog} path={'/blog'}/>
                </Switch>
              </BasicLayout>
            }} path={'/'}/>
            </Switch>
          </ConnectedRouter>
        </ReduxProvider>
      </ApolloProvider>
    );
  }
}

export default App;
