import { combineReducers } from 'redux'
import { routerReducer } from './route'
import { curtain } from 'src/components/global/curtain/reducer'
import { navBar } from 'src/components/global/nav-bar/reducer'
import { Career } from 'src/layouts/career/reducer'
const FETCH_ENTITIES_REQUEST = 'FETCH_ENTITIES_REQUEST'
const FETCH_ENTITIES_SUCCESS = 'FETCH_ENTITIES_SUCCESS'
const FETCH_ENTITIES_FAILURE = 'FETCH_ENTITIES_FAILURE'
const test = (state: any = {}, action: any) => {
    switch (action.type) {
        case FETCH_ENTITIES_REQUEST:
            return state
        case FETCH_ENTITIES_SUCCESS:
            return state
        case FETCH_ENTITIES_FAILURE:
            return state
        default:
            return state
    }
}

const stores = combineReducers({
    curtain, test, navBar, routerReducer, Career
})
export default stores