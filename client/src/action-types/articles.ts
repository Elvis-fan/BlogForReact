import { getFetchActionTypes } from 'src/common/action-types'
export const ARTICLES_TYPE = getFetchActionTypes('articles')
export const ARTICLE_TYPE = getFetchActionTypes('article')
export const TOP_ARTICLES_TYPE = getFetchActionTypes('career/top/articles')
export const POST_ARTICLES_TYPE = getFetchActionTypes('career/post/article')
export const POST_ARTICLES_STATUS_TYPE = getFetchActionTypes('career/post/article/status')
