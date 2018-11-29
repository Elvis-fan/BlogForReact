import { CLASSES_TYPE } from 'src/action-types'
import { Classes as ClassesModel } from 'src/models'
interface Action {
    type: string,
    payload: ClassesModel[],
    more: boolean,
}
interface State {
    classes: ClassesModel[]
}
const State: State = {
    classes: Array.prototype
}
export const Classes = (state: State = State, action: Action) => {
    switch (action.type) {
        case CLASSES_TYPE.FETCH_SUCCESS:
            return Object.assign({}, state, { classes: action.payload })
        default:
            return state
    }
}