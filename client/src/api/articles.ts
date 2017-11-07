import { http } from 'src/common/utils'
const fetchArticleURL = '/article/getArticles'
const fetchTopArticleURL = '/article/getTopArticles'
export const fetchArticles = ({ type, page, size }: any) => http.get(`${fetchArticleURL}/${type}/${page}/${size}`)
export const fetchTopArticles = (type: string) => http.get(`${fetchTopArticleURL}/${type}`)