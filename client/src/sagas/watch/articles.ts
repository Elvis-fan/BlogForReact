import { put, takeEvery, all, call } from 'redux-saga/effects'
import { ARTICLES_TYPE, TOP_ARTICLES_TYPE, ARTICLE_TYPE, POST_ARTICLES_TYPE, POST_ARTICLES_STATUS_TYPE } from 'src/action-types'
import { fetchArticles, fetchTopArticles, fetchArticle, postArticle, postArticleStatus } from './../task'

export const watchFetchArticle = function* () {
    yield takeEvery(ARTICLE_TYPE.FETCH, fetchArticle)
}
export const watchPostArticle = function* () {
    yield takeEvery(POST_ARTICLES_TYPE.FETCH, postArticle)
}
export const watchPostArticleStatus = function* () {
    yield takeEvery(POST_ARTICLES_STATUS_TYPE.FETCH, postArticleStatus)
}
export const watchFetchArticles = function* () {
    yield takeEvery(ARTICLES_TYPE.FETCH, fetchArticles)
}

export const watchFetchTopArticles = function* () {
    yield takeEvery(TOP_ARTICLES_TYPE.FETCH, fetchTopArticles)
}
