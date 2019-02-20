import { put, takeEvery, all, call } from 'redux-saga/effects'
import { CLASSES_TYPE, POST_CLASSES_TYPE, DEL_CLASS_TYPE } from 'src/action-types'
import { fetchClasses, postClasses, delClass } from './../task'

export const watchfetchClasses = function*() {
    yield takeEvery(CLASSES_TYPE.FETCH, fetchClasses)
}
export const watchpostClasses = function*() {
    yield takeEvery(POST_CLASSES_TYPE.FETCH, postClasses)
}
export const watchdelClass = function*() {
    yield takeEvery(DEL_CLASS_TYPE.FETCH, delClass)
}
