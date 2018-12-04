import React from 'react'
import { Button } from 'antd'
import BEditor from 'braft-editor'
import { postArticleAction } from 'src/actions'
import { Article as ArticleModel } from 'src/models'
import { connect } from 'react-redux'
import 'braft-editor/dist/index.css'
import './editor.less'
const BraftEditor: any = BEditor

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
  state = {
    editorState: BraftEditor.createEditorState(null)
  }
  handleEditorChange = (editorState: any) => {
    this.setState({ editorState })
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ editorState: BraftEditor.createEditorState(nextProps.article.content) })
  }
  submitContent = () => {
    const { postArticle, article } = this.props

    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const content = this.state.editorState.toHTML()
    postArticle({ ...article, content })
    // const result = await saveEditorContent(htmlContent)
  }
  render() {
    const { editorState } = this.state
    const { article } = this.props
    const { handleEditorChange, submitContent } = this
    return <div>
      <div className='title'>
        <input className='font-1' placeholder='请输入标题' value={article.title} />
        <Button>发布</Button>
        <Button type='primary' className='save'>保存</Button>
      </div>
      <BraftEditor
        value={editorState}
        onChange={handleEditorChange}
        onSave={submitContent}
      />
    </div >
  }
}
