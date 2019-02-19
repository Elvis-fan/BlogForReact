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
  status: number// 0:草稿，1自动草稿，2待审核，3未来，4私密，5删除，6继承
}
