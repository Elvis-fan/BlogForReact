import { CLASSES_TYPE, ARTICLES_TYPE, TOP_ARTICLES_TYPE } from 'src/action-types'
interface Action {
    type: string,
    payload: any[]
}
interface CareerState {
    classes: any[],
    mainArticles: any[],
    topArticles: any[],
    loadingArticles: boolean
}
const careerState: CareerState = {
    classes: Array.prototype,
    mainArticles: Array.prototype,
    topArticles: Array.prototype,
    loadingArticles: false

}
export const Career = (state: CareerState = careerState, action: Action) => {
    switch (action.type) {
        case CLASSES_TYPE.FETCH_SUCCESS:
            return Object.assign({}, state, { classes: action.payload })
        case ARTICLES_TYPE.FETCH_SUCCESS:
            return Object.assign({}, state, { loadingArticles: false, mainArticles: [...state.mainArticles, ...action.payload] })
        case TOP_ARTICLES_TYPE.FETCH_SUCCESS:
            return Object.assign({}, state, { topArticles: [...state.topArticles, ...action.payload] })
        case ARTICLES_TYPE.FETCH_REQUEST:
            return Object.assign({}, state, { loadingArticles: true })
        default:
            return state
    }
}
