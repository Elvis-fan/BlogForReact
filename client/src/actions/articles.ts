import { createAction } from 'redux-actions'
import { Article as ArticleModel } from 'src/models'
import { ARTICLES_TYPE, TOP_ARTICLES_TYPE, POST_ARTICLES_TYPE, ARTICLE_TYPE, POST_ARTICLES_STATUS_TYPE } from 'src/action-types'
export const articleAction = createAction(ARTICLE_TYPE.FETCH, (id: string | number) => id)
export const articlesAction = createAction(ARTICLES_TYPE.FETCH, ({ type, page, size, more }: any) => ({ type, page, size, more }))
export const topArticlesAction = createAction(TOP_ARTICLES_TYPE.FETCH, ((id: string) => id))
export const postArticleAction = createAction(POST_ARTICLES_TYPE.FETCH, ((article: ArticleModel) => article))
export const postArticleStatusAction = createAction(POST_ARTICLES_STATUS_TYPE.FETCH, ((article: ArticleModel) => article))