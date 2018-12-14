import React, { LegacyRef } from 'react'
import * as ReactDOM from 'react-dom'
import { Row, Col, Button } from 'antd'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import './mark-editor.less'

const renderer = new marked.Renderer()
renderer.heading = (text, level) => {
  let escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
  return `<h${level}><a name="${escapedText}" class="anchor" href="#${escapedText}"><span class="header-link"></span></a>${text}</h${level}>`
}
renderer.code = (code: string, language: string, isEscaped: boolean) =>
  `<pre class="hljs"><code class="${language}">${
    hljs.highlightAuto(code).value
  }</code></pre>`
marked.setOptions({ renderer })

export class MarkEditor extends React.Component<any, any> {
  state = {
    text: ''
  }
  currentTabIndex: number
  editorRef: any
  viewRef: any
  scale: number
  constructor(props: any) {
    super(props)
  }
  componentWillReceiveProps({ content }: any) {
    if (!(content === this.state.text)) {
      this.setState({ text: content })
    }
  }
  setCurrentIndex(num: number) {
    this.currentTabIndex = num
  }
  change = ({ target }: any) => {
    this.setState({ text: target.innerText })
    // !this.hasContentChanged && (this.hasContentChanged = true)
  }

  onScroll = (e: any) => {
    const { editorRef, viewRef, currentTabIndex } = this
    const [editor, view]: HTMLElement[] = [
      ReactDOM.findDOMNode(editorRef),
      ReactDOM.findDOMNode(viewRef)
    ] as any
    // 滚动条长度计算
    // const editorScroll=editor.clientHeight/editor.scrollHeight*editor.clientHeight
    // const viewScroll=view.clientHeight/view.scrollHeight*view.clientHeight
    if (currentTabIndex) {
      editor.scrollTo(
        0,
        ((editor.scrollHeight - editor.clientHeight) /
          (view.scrollHeight - view.clientHeight)) *
          view.scrollTop
      )
    } else {
      view.scrollTo(
        0,
        ((view.scrollHeight - view.clientHeight) /
          (editor.scrollHeight - editor.clientHeight)) *
          editor.scrollTop
      )
    }
  }
  save = (event: any) => {
    if (event.ctrlKey === true && event.keyCode === 83) {
      // Ctrl+S
      event.preventDefault()
      event.returnvalue = false
      const { submit } = this.props
      submit && submit(this.state.text)
    }
  }
  test = () => {
   
    const { editorRef, viewRef, currentTabIndex } = this
    const editor: HTMLElement = ReactDOM.findDOMNode(editorRef) as any
    (window as any).editor=editor.children[0]
    
    const node:any = editor.children[0].childNodes[0]
    // range.selectNode(test)
    // range.setStart(test,0)
    // range.setEnd(test,0)
    // const range=window.getSelection().getRangeAt(0)
    // range.setStart(range.startContainer,2)
    // test.focus()
    window.getSelection().removeAllRanges()
    const range = document.createRange()
    range.setStart(node,3);
    (window as any).q=range.extractContents()
    console.log(range.extractContents())
    range.insertNode( document.createTextNode('```typescript\n\n```') )

    window.getSelection().addRange(range)
    let text=''
    editor.children[0].childNodes.forEach((v:any)=>{
      console.log(v.data)
      text+=v.data
      range.selectNode(v)
      range.deleteContents()
    })
    console.log(text)
    range.insertNode( document.createTextNode(text) )

  
    // range.setStart(node,200)
    
    // window.getSelection().extend(test.childNodes[0],300)
  }
  render() {
    const { change, state, onScroll, save } = this
    const { text } = state
    return (
      <div className='font-4'>
        <Row>
          <Col>
            <Button onClick={this.test}>插入标题</Button>
          </Col>
        </Row>
        <Row>
          <Col
            xs={{ span: 12 }}
            className='mark-editor'
            ref={dom => {
              this.editorRef = dom
            }}
            onScroll={onScroll}
          >
            <div
              
              onMouseOver={this.setCurrentIndex.bind(this, 0)}
              contentEditable={'plaintext-only' as any}
              onInput={change}
              onKeyDown={save}
            >{this.props.content}</div>
          </Col>
          <Col
            xs={{ span: 12 }}
            className='mark-view'
            ref={dom => {
              this.viewRef = dom
            }}
            onScroll={onScroll}
          >
            <div
              onMouseOver={this.setCurrentIndex.bind(this, 1)}
              dangerouslySetInnerHTML={{
                __html: marked(text, { breaks: true })
              }}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
