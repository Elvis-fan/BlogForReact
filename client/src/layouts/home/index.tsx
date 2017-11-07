import * as React from 'react'
import { asyncComponent } from 'react-async-component'
import { Loading } from 'src/components/global'

export default asyncComponent({
    resolve: () => import('./home'),
    name: 'Home',
    LoadingComponent: () => <Loading />,
})