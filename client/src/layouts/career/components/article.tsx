import * as React from 'react'
import { Button } from 'antd'
import { Article as ArticleModel } from '@/models'
import './article.less'
export const Article = ({ item }: { item: ArticleModel }) => {
  return (
    <article className='article' style={{ background: `url(${item.cover})` }}>
      <div className='article-title'>
        <div>
          <h2>
            <a href={'/career/article/' + item.id}>{item.title}</a>
          </h2>
        </div>
        <div>
          <span className='font-7'>MR-Liu | {item.date}</span>
        </div>
      </div>
      <div className='article-bri'>
        <p className='font-7'>{item.briefing}</p>
        <Button type='primary' ghost={true}>
          <a href={`/career/article/${item.id}`}>阅读全文</a>
        </Button>
      </div>
    </article>
  )
}
export const articleSkeleton = () => {
  return <article className='article skeleton'>
    <div className='article-title'>
      <div>
        <h2 className='loading'>
          <a href='javascript:void(0);' >&nbsp;</a>
        </h2>
      </div>
      <div className='author loading'>
        <span>&nbsp;</span>
      </div>
    </div>
    <div className='article-bri'>
      <p className='font-7 loading' >&nbsp;<br /></p>
      <p className='font-7 loading' >&nbsp;<br /></p>
    </div>
  </article>
}