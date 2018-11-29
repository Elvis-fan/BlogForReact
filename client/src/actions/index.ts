import { ARTICLES_TYPE, CLASSES_TYPE, TOP_ARTICLES_TYPE } from 'src/action-types'
import { createAction } from 'redux-actions'
export const articlesAction = createAction(ARTICLES_TYPE.FETCH, ({ type, page, size, more }: any) => ({ type, page, size, more }))
export const classesAction = createAction(CLASSES_TYPE.FETCH, (({ id, child }: { id: string, child: number }) => ({ id, child })))
export const topArticlesAction = createAction(TOP_ARTICLES_TYPE.FETCH, ((id: string) => id))