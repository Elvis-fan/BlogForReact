import { all, takeEvery } from 'redux-saga/effects'
import { watchFetchArticles, watchfetchClasses, watchFetchTopArticles } from './watch'

export default function* rootSaga() {
    yield all([
        watchFetchArticles(), watchfetchClasses(), watchFetchTopArticles()
    ])
}