const FETCH_ENTITIES_REQUEST = 'FETCH_ENTITIES_REQUEST'
const FETCH_ENTITIES_SUCCESS = 'FETCH_ENTITIES_SUCCESS'
const FETCH_ENTITIES_FAILURE = 'FETCH_ENTITIES_FAILURE'
import { http } from 'src/common/utils'
export const test = () => {
  return (dispatch: any) => {
    dispatch({
      type: FETCH_ENTITIES_REQUEST,
      mate: {
        test: 'FETCH_ENTITIES_REQUEST'
      }
    })
    return http.get('/api/test/test').then(
      (response: any) => {
        dispatch({
          type: FETCH_ENTITIES_SUCCESS,
          mate: {
            test: 'FETCH_ENTITIES_SUCCESS',

          },
          data: response
        })
        return Promise.resolve(response)
      }).catch(() => {
        dispatch({
          type: FETCH_ENTITIES_FAILURE,
          mate: {
            test: 'FETCH_ENTITIES_FAILURE'
          }
        })
      })
  }
}