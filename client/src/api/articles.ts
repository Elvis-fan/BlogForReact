import { http } from 'src/common/utils'
const fetchArticlesURL = '/article/articles'
const articleURL = '/article/article'
const fetchTopArticleURL = '/article/topArticles'
export const fetchArticle = (id: string | number) => http.get(`${articleURL}/${id}`)
export const postArticle = (article: any) => http.post(`${articleURL}`, article)
export const fetchArticles = ({ type, page, size }: any) => http.get(`${fetchArticlesURL}/${type}/${page}/${size}`)
export const fetchTopArticles = (type: string) => http.get(`${fetchTopArticleURL}/${type}`)