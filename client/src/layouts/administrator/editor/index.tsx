
import * as React from 'react'
import { asyncComponent } from 'react-async-component'
import { Loading } from 'src/components/global'

// class Administrator extends React.Component<any, any>{
//     render() {
//         return <Route key={route.url} exact={route.exact} component={route.component} path={route.url} />
//     }
// }
export default {
    component: asyncComponent({
        resolve: () => import('./editor'),
        name: 'Editor',
        LoadingComponent: () => <Loading />,
    }),
    URL: '/administrator/editor',
}
