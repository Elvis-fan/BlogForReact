import { all, takeEvery } from 'redux-saga/effects'
import { watchFetchArticles, watchfetchClasses, watchFetchTopArticles, watchFetchArticle, watchPostArticle } from './watch'
import { watchClass } from 'src/layouts/administrator/editor/saga'
import { watchfetchSignIn } from './watch'

export default function* rootSaga() {
    yield all([
        watchFetchArticles(), watchfetchClasses(), watchFetchTopArticles(), watchFetchArticle(), watchClass(), watchPostArticle(),
        watchfetchSignIn()
    ])
}