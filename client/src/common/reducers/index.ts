import { combineReducers } from 'redux'
import { routerReducer } from './route'
import { isMobile } from './mobile'
import { Classes } from './classes'
import { curtain } from 'src/components/global/curtain/reducer'
import { navBar } from 'src/components/global/nav-bar/reducer'
import { Career } from 'src/layouts/career/reducer'
import { Articles } from './articles'
import { MobileAnchor } from '@/layouts/article/components/mobile-anchor/reducer'

import { Sign } from './sign'
const stores = combineReducers({
  curtain, navBar, routerReducer, Career, Classes, Articles, Sign, MobileAnchor, isMobile,
})
export default stores
