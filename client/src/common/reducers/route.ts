export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
const initialState = {}
export const routerReducer = (state = initialState, { type, payload }: any = {}) => {
  if (type === LOCATION_CHANGE) {
    return { ...state, payload }
  }
  return state
}
