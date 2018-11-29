import { combineReducers } from 'redux'
import { routerReducer } from './route'
import { Classes } from './classes'
import { curtain } from 'src/components/global/curtain/reducer'
import { navBar } from 'src/components/global/nav-bar/reducer'
import { Career } from 'src/layouts/career/reducer'

const stores = combineReducers({
    curtain, navBar, routerReducer, Career, Classes
})
export default stores