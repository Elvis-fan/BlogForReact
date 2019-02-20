import { put, call } from 'redux-saga/effects'
import { ARTICLES_TYPE, TOP_ARTICLES_TYPE, ARTICLE_TYPE } from 'src/action-types'
import {
  fetchArticle as fetchArticleApi,
} from 'src/api'
export const editorClass = function*(action: any) {
  try {
    if (action.payload.length > 0) {
      const article = action.payload[0]
      yield put({ type: ARTICLES_TYPE.FETCH_REQUEST, payload: 123 })
      const response = yield call(fetchArticleApi, article.id)
      yield put({ type: ARTICLE_TYPE.FETCH_SUCCESS, payload: response })
    }

  } catch (e) {
    yield put({ type: ARTICLE_TYPE.FETCH_FAILURE, payload: '123' })
  }
}
