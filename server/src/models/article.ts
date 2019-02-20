import {ArticleStatus} from '@/enum/article-status'
export interface Article {
  id: string
  class: string
  title: string
  author: string
  cover: string
  images: string[]
  date: Date | string
  briefing: string
  content: string
  status: ArticleStatus
}
