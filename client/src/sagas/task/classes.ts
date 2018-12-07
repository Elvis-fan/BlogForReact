import { put, call } from 'redux-saga/effects'
import { CLASSES_TYPE, POST_CLASSES_TYPE } from 'src/action-types'
import {
    fetchClasses as fetchClassesApi,
    postClasses as postClassesApi
} from 'src/api'
export const fetchClasses = function* (action: any) {
    try {
        yield put({ type: CLASSES_TYPE.FETCH_REQUEST, payload: {} })
        const response = yield call(fetchClassesApi, { ...action.payload })
        yield put({ type: CLASSES_TYPE.FETCH_SUCCESS, payload: response })
    } catch (e) {
        yield put({ type: CLASSES_TYPE.FETCH_FAILURE, payload: {} })
    }
}
export const postClasses = function* (action: any) {
    try {
        yield put({ type: POST_CLASSES_TYPE.FETCH_REQUEST, payload: {} })
        const response = yield call(postClassesApi, { ...action.payload })
        yield put({ type: POST_CLASSES_TYPE.FETCH_SUCCESS, payload: response })
    } catch (e) {
        yield put({ type: POST_CLASSES_TYPE.FETCH_FAILURE, payload: {} })
    }
}