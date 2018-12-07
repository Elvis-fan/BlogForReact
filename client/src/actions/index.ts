import { SIGN_IN_TYPE } from 'src/action-types'
import { createAction } from 'redux-actions'
import { User as UserModel } from 'src/models'
export * from './articles'
export * from './classes'

export const signInAction = createAction(SIGN_IN_TYPE.FETCH, ((user: UserModel) => user))