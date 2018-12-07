import { http } from 'src/common/utils'
import { Classes as ClassesModel, Article as ArticleModel } from 'src/models'
const fetchArticlesURL = '/article/articles'
const articleURL = '/article/article'
const articleStatusURL = '/article/article/status'
const fetchTopArticleURL = '/article/topArticles'

export const fetchArticle = (id: string | number) => http.get(`${articleURL}/${id}`)
export const postArticle = (article: ArticleModel) => http.post(`${articleURL}`, article)
export const postArticleStatus = (article: ArticleModel) => http.post(`${articleStatusURL}`, article)
export const fetchArticles = ({ type, page, size }: any) => http.get(`${fetchArticlesURL}/${type}/${page}/${size}`)
export const fetchTopArticles = (type: string) => http.get(`${fetchTopArticleURL}/${type}`)
