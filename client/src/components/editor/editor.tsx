import React from 'react'
import BEditor from './editor.config'
// 定义rem基准值
const sizeBase = 96
// 定义输入转换函数
const unitImportFn = (unit: any, type: string, source: any) => {

  // type为单位类型，例如font-size等
  // source为输入来源，可能值为create或paste

  // 此函数的返回结果，需要过滤掉单位，只返回数值
  if (unit.indexOf('rem')) {
    return ((parseFloat as any)(unit, 10) * sizeBase).toFixed()
  } else {
    return (parseFloat as any)(unit, 10)
  }

}

// 定义输出转换函数
const unitExportFn = (unit: any, type: string, target: any) => {

  if (type === 'line-height') {
    // 输出行高时不添加单位
    return unit
  }

  // target的值可能是html或者editor，对应输出到html和在编辑器中显示这两个场景
  if (target === 'html') {
    // 只在将内容输出为html时才进行转换
    return unit / sizeBase + 'rem'
  } else {
    // 在编辑器中显示时，按px单位展示
    return unit + 'px'
  }

}

interface Props {
  content: string
  change?(editorState: any): void
  submit(editorState: any): void
}
export default class BlogEditor extends React.Component<Props, any> {
  state = {
    editorState: BEditor.createEditorState(null, { unitImportFn }),
  }
  componentWillReceiveProps({ content }: Props) {
    if (!(content === this.state.editorState.toHTML())) {
      this.setState({ editorState: BEditor.createEditorState(content, { unitImportFn }) })
    }
  }
  lChange = (editorState: any) => {
    this.setState({ editorState })
    const { change } = this.props
    change && change(editorState)
  }
  lSubmit = (editorState: any) => {
    const { submit } = this.props
    submit && submit(editorState)
  }
  render() {
    const { lChange, lSubmit } = this
    const { editorState } = this.state
    return <BEditor
      value={editorState}
      converts={{ unitImportFn, unitExportFn }}
      onChange={lChange}
      onSave={lSubmit}
    />
  }
}
