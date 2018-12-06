import { ARTICLES_TYPE, TOP_ARTICLES_TYPE, ARTICLE_TYPE, POST_ARTICLES_TYPE } from 'src/action-types'
import { Article as ArticlesModel } from 'src/models'
interface Action {
  type: string,
  payload: any[],
  more: boolean
}
interface State {
  article: ArticlesModel
  mainArticles: ArticlesModel[]
  topArticles: any[]
  loadingArticles: boolean
  postingArticle: boolean
  postArticle: any
}
const defaultState: State = {
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
  loadingArticles: false,
  postingArticle: false,
  postArticle: {
    status: 0
  }
}
export const Articles = (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case ARTICLES_TYPE.FETCH_SUCCESS:
      if (action.more) {
        action.payload = [...state.mainArticles, ...action.payload]
      }
      return Object.assign({}, state, { loadingArticles: false, mainArticles: [...action.payload], postArticle: { status: 0 } })
    case POST_ARTICLES_TYPE.FETCH:
      return Object.assign({}, state, { postingArticle: true, postArticle: { status: 0 } })
    case POST_ARTICLES_TYPE.FETCH_SUCCESS || POST_ARTICLES_TYPE.FETCH_FAILURE:
      const { mainArticles } = state
      const { article }: any = action.payload
      mainArticles.forEach(artice => {
        if (artice.id === article.id) {
          Object.assign(artice, article)
        }
      })
      return Object.assign({}, state, { postingArticle: false, mainArticles: [...mainArticles], postArticle: { ...action.payload } })
    case ARTICLE_TYPE.FETCH_SUCCESS:
      return Object.assign({}, state, { article: action.payload, postArticle: { status: 0 } })
    case TOP_ARTICLES_TYPE.FETCH_SUCCESS:
      return Object.assign({}, state, { topArticles: [...action.payload], postArticle: { status: 0 } })
    case ARTICLES_TYPE.FETCH_REQUEST:
      return Object.assign({}, state, { loadingArticles: true, postArticle: { status: 0 } })
    default:
      return state
  }
}