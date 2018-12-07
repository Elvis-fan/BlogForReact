import { put, call } from 'redux-saga/effects'
import { ARTICLES_TYPE, TOP_ARTICLES_TYPE, ARTICLE_TYPE, POST_ARTICLES_TYPE, POST_ARTICLES_STATUS_TYPE } from 'src/action-types'
import {
    fetchArticles as fetchArticlesApi,
    fetchTopArticles as fetchTopArticlesApi,
    fetchArticle as fetchArticleApi,
    postArticle as postArticleApi,
    postArticleStatus as postArticleStatusApi,
} from 'src/api'
export const fetchArticle = function* (action: any) {
    try {
        yield put({ type: ARTICLE_TYPE.FETCH_REQUEST, payload: 123 })
        const response = yield call(fetchArticleApi, action.payload)
        yield put({ type: ARTICLE_TYPE.FETCH_SUCCESS, payload: response })
    } catch (e) {
        yield put({ type: ARTICLE_TYPE.FETCH_FAILURE, payload: '123' })
    }
}
export const fetchArticles = function* (action: any) {
    try {
        yield put({ type: ARTICLES_TYPE.FETCH_REQUEST, payload: 123 })
        const response = yield call(fetchArticlesApi, action.payload)
        yield put({ type: ARTICLES_TYPE.FETCH_SUCCESS, payload: response, more: action.payload.more || false })
    } catch (e) {
        yield put({ type: ARTICLES_TYPE.FETCH_FAILURE, payload: '123' })
    }
}
export const postArticle = function* (action: any) {
    try {
        yield put({ type: POST_ARTICLES_TYPE.FETCH_REQUEST, payload: 123 })
        const response = yield call(postArticleApi, action.payload)
        yield put({ type: POST_ARTICLES_TYPE.FETCH_SUCCESS, payload: response })
    } catch (e) {
        yield put({ type: POST_ARTICLES_TYPE.FETCH_FAILURE, payload: '123' })
    }
}
export const postArticleStatus = function* (action: any) {
    try {
        yield put({ type: POST_ARTICLES_STATUS_TYPE.FETCH_REQUEST, payload: 123 })
        const response = yield call(postArticleStatusApi, action.payload)
        yield put({ type: POST_ARTICLES_STATUS_TYPE.FETCH_SUCCESS, payload: response })
    } catch (e) {
        yield put({ type: POST_ARTICLES_STATUS_TYPE.FETCH_FAILURE, payload: '123' })
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