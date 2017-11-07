import * as React from 'react';

import { Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import Cookies from 'universal-cookie';

import { getSignIn } from './util/storage';

import stores from './reducers.js';
import Head from './head/head.jsx';
import Home from './home/home.jsx';

import Error from './error/error.jsx';

import './index.less';
import './theme.less';
import './career/career.less';

// bundle模型用来异步加载组件
import Bundle from './bundle.js';

// 异步引入
import ManagerContainer from 'bundle-loader?lazy&name=app-[name]!./manager/manager.jsx';
import AboutContainer from 'bundle-loader?lazy&name=app-[name]!./about/about.jsx';
import CareerContainer from 'bundle-loader?lazy&name=app-[name]!./career/career.jsx';
import DetailsContainer from 'bundle-loader?lazy&name=app-[name]!./details/details.jsx';
import SignContainer from 'bundle-loader?lazy&name=app-[name]!./sign/sign.jsx';
const Career = () => (
    <Bundle load={CareerContainer}>
        {(Career) => <Career />}
    </Bundle>
);
const Details = () => (
    <Bundle load={DetailsContainer}>
        {(Details) => <Details />}
    </Bundle>
);
const Manager = () => (
    <Bundle load={ManagerContainer}>
        {(Manager) => <Manager />}
    </Bundle>
);
const About = () => (
    <Bundle load={AboutContainer}>
        {(About) => <About />}
    </Bundle>
);
const Sign = () => (
    <Bundle load={SignContainer}>
        {(Sign) => <Sign />}
    </Bundle>
);
const history = createHistory();
const cookies = new Cookies();

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
        component: <Home/>
    },
    {
        path: '/about',
        exact: true,
        navigation: () => <Head selected= "1"/>,
        component: <About/>
    },
    {
        path: '/manager',
        exact: false,
        navigation: () => <div/>,
        component: <Manager />
    },
    {
        path: '/career',
        exact: true,
        navigation: () => <Head selected= "2"/>,
        component: <Career/>
    },
    {
        path: '/career/details/:id',
        exact: true,
        navigation: () => <Head selected= "2"/>,
        component: <Details/>
    },
    {
        path: '/signIn',
        exact: true,
        navigation: () => <div/>,
        component: <Sign/>
    }
];

// async function main() {
//     // 解构赋值用法示例
//     const { default: Component } = await import('./components/editor.jsx');
//     // 行内用法示例
//     // render((await import('./components/editor.jsx')).default);
// }
// {
//     path: '/editor',
//         exact: true,
//     navigation: () => <Head selected= "2"/>,
//     main: <Editor/>
//     //     (nextState,callback)=>{
//     //     require.ensure([],(require)=>{
//     //         callback(null,require("./components/editor.jsx").default)
//     //     },"editor")
//     // }
// }
class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        {
                            routes.map((route, index) => (
                                <Route exact={route.exact} path={route.path} component={route.navigation} key={index}/>
                            ))
                        }

                        <Switch>
                            {
                                routes.map((route, index) => (
                                    <Route exact={route.exact} path={route.path} render={(history) => {
                                        // console.log(history);
                                        if(history.location.pathname.indexOf('manager')!==-1){
                                            const sign_in = getSignIn();
                                            if(sign_in==='0'||sign_in===0)
                                                history.history.push(`/signIn?redirectURL=${history.location.pathname}`);
                                        }
                                        return route.component;
                                    }} key={index} />
                                ))
                            }

                            <Route component={Error} />
            </Switch>
            </div>
            </ConnectedRouter>
            </Provider>
        )
    }
}

//导出组件
export default App;
