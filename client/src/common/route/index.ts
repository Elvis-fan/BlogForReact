import { Home, About, Career, Administrator, SignIn, Article } from 'src/layouts'
const routes = [
    {
        url: '/',
        exact: true,
        title: '杂项',
        component: Home
    }, {
        url: '/about',
        exact: true,
        title: '关于',
        component: About
    }, {
        url: '/career',
        exact: false,
        title: '博客',
        component: Career
    }, {
        url: '/article/:id',
        exact: true,
        title: '文章',
        component: Article
    }, {
        url: '/sign-in',
        exact: false,
        title: '登陆',
        component: SignIn
    }
]
const privateRoutes = [
    {
        url: '/administrator',
        exact: false,
        title: '管理',
        component: Administrator
    },
]
export { routes, privateRoutes }