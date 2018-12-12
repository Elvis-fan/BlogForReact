
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Career from 'src/layouts/career'
import Article from 'src/layouts/article'

export default ({ match }: any) => {
  console.log(match)
  return <Switch>
    <Route exact={true} component={Career} path={match.path} />
    <Route exact={true} component={Article} path={`${match.path}/article/:id`} />
  </Switch>
}