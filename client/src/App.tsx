import * as React from 'react'

import { Provider as ReduxProvider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { enquireScreen } from 'enquire-js'
import { NavBar, Curtain } from './components/global'
import { routes, privateRoutes } from 'src/routes'
import { history, stores } from 'src/common/stores'
import {isMobileAction} from './actions'
import { getSignIn } from 'src/common/utils'
import './App.less'


class App extends React.Component<any, any> {


  componentDidMount() {
    enquireScreen((b: boolean) => {
      stores.dispatch(isMobileAction(!!b))
    })
  }

  public render() {
    return (
      <ReduxProvider store={stores}>
        <ConnectedRouter history={history}>
          <div className='blog'>
            <NavBar />
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
            <Curtain />
          </div>
        </ConnectedRouter>
      </ReduxProvider>
    )
  }
}

export default App
