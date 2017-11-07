import * as React from 'react'

import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import { NavBar, Curtain } from './components/global'
import routes from 'src/common/route'
import { history, stores } from 'src/common/stores'

class App extends React.Component {
  public render() {
    return (
      <Provider store={stores}>
        <ConnectedRouter history={history}>
          <div className='App'>
            <NavBar />
            <Curtain />
            <Switch>
              {
                routes.map(route => <Route key={route.url} exact={route.exact} component={route.component} path={route.url} />)
              }
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
