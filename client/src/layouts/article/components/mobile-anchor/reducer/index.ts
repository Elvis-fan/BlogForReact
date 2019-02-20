import {CLOSE_MOBILE_ANCHOR, OPEN_MOBILE_ANCHOR, OPENING_MOBILE_ANCHOR} from './../action-types'
const MobileAnchor = (state: {} = { state: 0 }, action: { type: string, action: string } = { type: '', action: '' }) => {
  
    switch (action.type) {
        case OPEN_MOBILE_ANCHOR:
            return Object.assign({}, state, { state: 2, ...action })
            case OPENING_MOBILE_ANCHOR:
            console.log(action)
            return Object.assign({}, state, { state: 1, ...action })
        case CLOSE_MOBILE_ANCHOR:
            return Object.assign({}, state, { state: 0, ...action })
        default:
            return state
    }
}
export { MobileAnchor }
