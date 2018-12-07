import { CLASSES_TYPE, POST_CLASSES_TYPE } from 'src/action-types'
import { createAction } from 'redux-actions'
import { Classes as ClassesModel } from 'src/models'
export const classesAction = createAction(CLASSES_TYPE.FETCH, (({ id, child = 0 }: { id: string, child?: number }) => ({ id, child })))
export const postClassesAction = createAction(POST_CLASSES_TYPE.FETCH, ((classes: ClassesModel) => classes))