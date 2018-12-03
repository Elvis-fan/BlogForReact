import { ARTICLES_TYPE, TOP_ARTICLES_TYPE, ARTICLE_TYPE } from 'src/action-types'
import { Article as ArticlesModel } from 'src/models'
interface Action {
  type: string,
  payload: any[],
  more: boolean
}
interface State {
  article: ArticlesModel
  mainArticles: any[]
  topArticles: any[]
  loadingArticles: boolean
}
const careerState: State = {
  article: {
    id: '',
    title: '',
    author: '',
    cover: '',
    images: [],
    date: '',
    briefing: '',
    content: '',
  },
  mainArticles: Array.prototype,
  topArticles: Array.prototype,
  loadingArticles: false

}
export const Articles = (state: State = careerState, action: Action) => {
  switch (action.type) {
    case ARTICLES_TYPE.FETCH_SUCCESS:
      if (action.more) {
        action.payload = [...state.mainArticles, ...action.payload]
      }
      return Object.assign({}, state, { loadingArticles: false, mainArticles: [...action.payload] })
    case ARTICLE_TYPE.FETCH_SUCCESS:
      return Object.assign({}, state, { article: action.payload })
    case TOP_ARTICLES_TYPE.FETCH_SUCCESS:
      return Object.assign({}, state, { topArticles: [...action.payload] })
    case ARTICLES_TYPE.FETCH_REQUEST:
      return Object.assign({}, state, { loadingArticles: true })
    default:
      return state
  }
}