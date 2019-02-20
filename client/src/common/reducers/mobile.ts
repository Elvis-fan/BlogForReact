export const MOBILE_CHANGE = '@@ismobile/MOBILE_CHANGE'
const initialState = {
  isMobile: false,
}
export const isMobile = (state = initialState, { type, payload }: any = {}) => {
  if (type === MOBILE_CHANGE) {
    return { ...state, isMobile: payload }
  }
  return state
}
