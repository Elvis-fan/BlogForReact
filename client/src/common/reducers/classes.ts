import { CLASSES_TYPE, POST_CLASSES_TYPE, DEL_CLASS_TYPE } from 'src/action-types'
import { Classes as ClassesModel } from 'src/models'
interface Action {
    type: string,
    payload: ClassesModel[] & any,
    more: boolean,
}
interface State {
    classes: ClassesModel[]
}
const State: State = {
    classes: Array.prototype,
}
export const Classes = (state: State = State, action: Action) => {
    let classes
    let classe: any
    switch (action.type) {
        case CLASSES_TYPE.FETCH_SUCCESS:
            return Object.assign({}, state, { classes: action.payload })
        case POST_CLASSES_TYPE.FETCH_SUCCESS:
            classes = [...state.classes]
            classe = action.payload.classe
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
        case DEL_CLASS_TYPE.FETCH_SUCCESS:
            classes = [...state.classes]
            classe = action.payload.classe
            for (let i = 0; i < classes.length; i++) {
                if (classes[i].id === classe.id) {
                    classes.splice(i, 1)
                }
                if (classes[i].id === classe.pid) {
                    const childs = classes[i].children
                    for (let j = 0; j < childs.length; j++) {
                        if (classes[i].children[j].id === classe.id) {
                            childs.splice(j, 1)
                            break
                        }
                    }
                }
            }
            return Object.assign({}, state, { classes })
        default:
            return state
    }
}
