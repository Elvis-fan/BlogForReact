import React from 'react'
import { Button } from 'antd'
import { postArticleAction } from 'src/actions'
import { Article as ArticleModel } from 'src/models'
import { connect } from 'react-redux'
import BEditor from './editor'
const mapStateToProps = (state: any, ownProps: any) => {
  const { article } = state.Articles
  return {
    article
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  postArticle: (article: ArticleModel) => dispatch(postArticleAction(article)),
})
interface Props {
  article: ArticleModel
  postArticle(article: ArticleModel): void
}
@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class BlogEditor extends React.Component<Props & any, any>{

  submitContent = (editorState: any) => {
    const { postArticle, article } = this.props
    const content = editorState.toHTML()
    postArticle({ ...article, content })
  }
  render() {

    const { article } = this.props
    const { submitContent } = this
    return <div>
      <div className='title'>
        <input className='font-1' placeholder='请输入标题' value={article.title} />
        <Button>发布</Button>
        <Button type='primary' className='save'>保存</Button>
      </div>
      <BEditor content={article.content} submit={submitContent} />
    </div >
  }
}
