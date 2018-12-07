import { CLASSES_TYPE, POST_CLASSES_TYPE } from 'src/action-types'
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
        case POST_CLASSES_TYPE.FETCH_SUCCESS:
            const classes = [...state.classes]
            const { classe }: any = action.payload
            classes.forEach(parent => {
                if (parent.id === classe.pid) {
                    const arr = parent.children.filter(cla => cla.id === classe.id)
                    if (arr.length > 0) {
                        Object.assign(arr[0], classe)
                    } else {
                        parent.children.push(classe)
                    }
                    return
                }
            })
            return Object.assign({}, state, { classes })
        default:
            return state
    }
}