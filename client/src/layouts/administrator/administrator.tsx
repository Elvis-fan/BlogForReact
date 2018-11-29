import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Editor from './editor'
import { connect } from 'react-redux'

const routes = [
    {
        url: '/administrator/editor',
        exact: true,
        title: '杂项',
        component: Editor
    }
]

export default class Administrator extends React.Component<any, any>{
    render() {
        return <div>
            {
                routes.map(route => <Route key={route.url} exact={route.exact} component={route.component} path={route.url} />)
            }
        </div>
    }
}