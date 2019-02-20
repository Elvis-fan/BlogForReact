import { put, call } from 'redux-saga/effects'
import { SIGN_IN_TYPE } from 'src/action-types'
import {
  fetchSignIn as fetchSignInApi,
} from 'src/api'
export const fetchSignIn = function*(action: any) {
  try {
    yield put({ type: SIGN_IN_TYPE.FETCH_REQUEST, payload: {} })
    const response = yield call(fetchSignInApi, { ...action.payload })
    yield put({ type: SIGN_IN_TYPE.FETCH_SUCCESS, payload: { ...action.payload, ...response } })
  } catch (e) {
    yield put({ type: SIGN_IN_TYPE.FETCH_FAILURE, payload: {} })
  }
}
