import { put, takeEvery, all, call, take } from 'redux-saga/effects'
import { ARTICLES_TYPE, TOP_ARTICLES_TYPE, ARTICLE_TYPE, CLASSES_TYPE } from 'src/action-types'
import { editorClass } from './task'

export const watchClass = function* () {
  // yield takeEvery('@@router/LOCATION_CHANGE', function* (action: any) {
  //   yield takeEvery(ARTICLES_TYPE.FETCH_SUCCESS, editorClass)
  // })
  yield
}