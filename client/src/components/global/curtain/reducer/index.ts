
import { ON_CURTAIN, OFF_CURTAIN } from './../action-types'
const curtain = (state: {} = {}, action: { type: string, action: string } = { type: OFF_CURTAIN, action: '' }) => {
    switch (action.type) {
        case ON_CURTAIN:
            return Object.assign({}, state, { ...action })
        case OFF_CURTAIN:
            return Object.assign({}, state, { ...action })
        default:
            return state
    }
}
export { curtain }