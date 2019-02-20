import { SIGN_IN_TYPE } from 'src/action-types'
import { User as UserModel } from 'src/models'
interface Action {
  type: string,
  payload: UserModel,
}
interface State {
  user: UserModel
}
const State: State = {
  user: {
    name: void 0 as any,
    password: void 0 as any,
    status: void 0 as any,
    token: void 0 as any,
  },
}
export const Sign = (state: State = State, action: Action) => {
  switch (action.type) {
    case SIGN_IN_TYPE.FETCH_SUCCESS:
      return Object.assign({}, state, { user: action.payload })
    default:
      return state
  }
}
