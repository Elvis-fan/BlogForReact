import { ARTICLES_TYPE, TOP_ARTICLES_TYPE, ARTICLE_TYPE, POST_ARTICLES_TYPE } from 'src/action-types'
import { Article as ArticlesModel } from 'src/models'
import { ArticleStatus } from 'src/common/enum/article-status'
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
    class: '',
    status: undefined as any,
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
    status: 0,
  },
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
      const mainArticles = [...state.mainArticles]
      const { article }: any = action.payload
      let flag = true
      for (let i = 0; i < mainArticles.length; i++) {
        const artlc = mainArticles[i]
        if (artlc.id === article.id && (artlc.class !== article.class || article.status === ArticleStatus.REMOVE)) {
          flag = false
          mainArticles.splice(i, 1)
          break
        }
        if (artlc.id === article.id) {
          flag = false
          Object.assign(mainArticles[i], article)
        }

      }
      if (flag) {
        mainArticles.unshift(article)
      }
      return Object.assign({}, state, { postingArticle: false, mainArticles, postArticle: { ...action.payload } })
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
