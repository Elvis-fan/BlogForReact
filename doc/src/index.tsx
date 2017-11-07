import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import './index.css';
import './theme.css';
import stores from './reducers';
import Head from './head/head';
import Home from './home/home';
import About from './about/about';
import Career from './career/career';
import Error from './error/error';
import Details from './details/details';


const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);
export const store = createStore(
    stores,
    applyMiddleware(middleware)
);

const routes = [
    {
        path: '/',
        exact: true,
        navigation: () => <Head selected="0"/>,
        main: () => <Home/>
    },
    {
        path: '/about',
        exact: true,
        navigation: () => <Head selected= "1"/>,
        main: () => <About/>
    },
    {
        path: '/career',
        exact: true,
        navigation: () => <Head selected= "2"/>,
        main: () => <Career/>
    },
    {
        path: '/career/details/:id',
        exact: true,
        navigation: () => <Head selected= "2"/>,
        main: () => <Details/>
    }
];

ReactDOM.render(

    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                {
                    routes.map((route, index) => (
                        <Route exact={route.exact} path={route.path} component={route.navigation} />
                    ))
                }

                <Switch>
                    {/*render={() => {URLChange(0); return <Home/>; }}*/}
                    {
                        routes.map((route, index) => (
                            <Route exact={route.exact} path={route.path} component={route.main} />
                        ))
                    }

                    <Route component={Error} />
                </Switch>
            </div>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root')
);