import * as React from 'react'

import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import { NavBar, Curtain } from './components/global'
import { routes, privateRoutes } from 'src/routes'
import { history, stores } from 'src/common/stores'
import { getSignIn } from 'src/common/utils'
import './App.less'
class App extends React.Component {
  public render() {
    return (
      <Provider store={stores}>
        <ConnectedRouter history={history}>
          <div className='blog'>
            <NavBar />
            <Curtain />
            <Switch>
              {routes.map(route => <Route key={route.url} exact={route.exact} component={route.component} path={route.url} />)}
              {
                privateRoutes.map(route => <Route render={(props: any) => {
                  const { history, location } = props
                  const signIn: any = getSignIn()
                  if (Number(signIn) !== 1) {
                    history.push(`/sign-in?to=${location.pathname}`)
                  }
                  return <route.component {...props} />
                }} key={route.url} exact={route.exact} path={route.url} />)
              }
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
