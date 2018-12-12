
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Career from 'src/layouts/career'


export default ({ match }: any) => {
  console.log(match)
  return <Switch>
    <Route exact={true} component={Career} path='/career' />
  </Switch>
}