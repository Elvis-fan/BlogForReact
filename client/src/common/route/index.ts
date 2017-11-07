import { Home, About, Career } from 'src/layouts'
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
    }
]
export default routes