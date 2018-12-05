import React from 'react'
import BEditor from './editor.config'

interface Props {
  content: string
  change?(editorState: any): void
  submit(editorState: any): void
}
export default class BlogEditor extends React.Component<Props, any>{
  state = {
    editorState: BEditor.createEditorState(null)
  }
  componentWillReceiveProps(nextProps: Props) {
    this.setState({ editorState: BEditor.createEditorState(nextProps.content) })
  }
  lChange = (editorState: any) => {
    this.setState(editorState)
    const { change } = this.props
    change && change(editorState)
  }
  render() {
    const { editorState } = this.state
    const { change, submit } = this.props
    return <BEditor
      value={editorState}
      onChange={change}
      onSave={submit}
    />
  }
}