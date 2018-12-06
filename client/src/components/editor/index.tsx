import React from 'react'
import { Button, Spin, message } from 'antd'
import { postArticleAction } from 'src/actions'
import { Article as ArticleModel } from 'src/models'
import { connect } from 'react-redux'
import BEditor from './editor'
const mapStateToProps = (state: any, ownProps: any) => {
  const { article, postingArticle, postArticle } = state.Articles
  return {
    article,
    postArticleR: postArticle,
    postingArticle
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  postArticle: (article: ArticleModel) => dispatch(postArticleAction(article)),
})
interface Props {
  article: ArticleModel
  postingArticle: boolean
  postArticleR: any
  postArticle(article: ArticleModel): void
}
@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class BlogEditor extends React.Component<Props & any, any>{

  submitContent = (editorState: any) => {
    const { postArticle, article } = this.props
    const content = editorState.toHTML()
    postArticle(Object.assign(article, { content }))
  }
  titleChange = (title: string) => {
    const { article } = this.props
    Object.assign(article, { title })
  }
  titleSave = (title: string) => {
    const { postArticle, article } = this.props
    postArticle(Object.assign(article, { title }))
  }
  changeContent = (editorState: any) => {
    const { article } = this.props
    const content = editorState.toHTML()
    Object.assign(article, { content })
  }

  render() {

    const { article, postingArticle, postArticleR } = this.props
    const { submitContent, changeContent, titleChange } = this
    return <div>
      {
        postArticleR.status === 1 ? message.success('保存成功') : ''
      }
      <Spin spinning={postingArticle} delay={500}>
        <div className='title'>
          <Title value={article.title} change={titleChange} save={this.titleSave} />
          <Button>发布</Button>
          <Button type='primary' className='save'>保存</Button>
        </div>
        <BEditor content={article.content} change={changeContent} submit={submitContent} />
      </Spin>

    </div >
  }
}
class Title extends React.Component<any, any>{
  state = {
    value: this.props.value
  }
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }
  iChange = (event: any) => {
    const { value } = event.target
    this.setState({ value })
    this.props.change && this.props.change(value)
  }
  iSave = (event: any) => {
    if (event.ctrlKey === true && event.keyCode === 83) {// Ctrl+S
      event.preventDefault()
      event.returnvalue = false
      this.props.save && this.props.save(this.state.value)
    }
  }
  render() {
    return <input className='font-1' placeholder='请输入标题' onKeyDown={this.iSave} value={this.state.value} onChange={this.iChange} />
  }
}