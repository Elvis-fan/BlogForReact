import { put, takeEvery, all, call } from 'redux-saga/effects'
import { SIGN_IN_TYPE } from 'src/action-types'
import { fetchSignIn } from './../task'

export const watchfetchSignIn = function*() {
  yield takeEvery(SIGN_IN_TYPE.FETCH, fetchSignIn)
}
