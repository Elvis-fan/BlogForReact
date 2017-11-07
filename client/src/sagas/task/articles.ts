import { put, call } from 'redux-saga/effects'
import { ARTICLES_TYPE, TOP_ARTICLES_TYPE } from 'src/action-types'
import {
    fetchArticles as fetchArticlesApi,
    fetchTopArticles as fetchTopArticlesApi
} from 'src/api'
export const fetchArticles = function* (action: any) {
    try {
        yield put({ type: ARTICLES_TYPE.FETCH_REQUEST, payload: 123 })
        const response = yield call(fetchArticlesApi, action.payload)
        yield put({ type: ARTICLES_TYPE.FETCH_SUCCESS, payload: response })
    } catch (e) {
        yield put({ type: ARTICLES_TYPE.FETCH_FAILURE, payload: '123' })
    }
}
export const fetchTopArticles = function* (action: any) {
    try {
        yield put({ type: TOP_ARTICLES_TYPE.FETCH_REQUEST, payload: 123 })
        const response = yield call(fetchTopArticlesApi, action.payload)
        yield put({ type: TOP_ARTICLES_TYPE.FETCH_SUCCESS, payload: response })
    } catch (e) {
        yield put({ type: TOP_ARTICLES_TYPE.FETCH_FAILURE, payload: '123' })
    }
}