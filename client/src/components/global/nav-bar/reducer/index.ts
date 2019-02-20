import { CLOSE_NAV_BAR, OPEN_NAV_BAR } from './../action-types'
const navBar = (state: {} = { state: false }, action: { type: string, action: string } = { type: '', action: '' }) => {
    switch (action.type) {
        case OPEN_NAV_BAR:
            return Object.assign({}, state, { state: true, ...action })
        case CLOSE_NAV_BAR:
            return Object.assign({}, state, { state: false, ...action })
        default:
            return state
    }
}
export { navBar }
