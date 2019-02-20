import { createAction } from 'redux-actions'
import { MOBILE_CHANGE } from 'src/common/reducers/mobile'
export const isMobileAction = createAction(MOBILE_CHANGE, (isMobile: boolean) => isMobile)
