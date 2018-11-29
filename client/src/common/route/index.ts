import { Home, About, Career, Administrator } from 'src/layouts'
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
        exact: true,
        title: '博客',
        component: Career
    }, {
        url: '/administrator',
        exact: false,
        title: '管理',
        component: Administrator
    }
]
export default routes