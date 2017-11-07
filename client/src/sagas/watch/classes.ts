import { put, takeEvery, all, call } from 'redux-saga/effects'
import { CLASSES_TYPE } from 'src/action-types'
import { fetchClasses } from './../task'

export const watchfetchClasses = function* () {
    yield takeEvery(CLASSES_TYPE.FETCH, fetchClasses)
}
