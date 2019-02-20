import React from 'react'
import * as ReactDOM from 'react-dom'
import { Row, Col, Button, Input } from 'antd'
import { MarkView } from '@/components/mark-view'
import './mark-editor.less'
import { Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap } from 'draft-js'
import { stateFromMarkdown } from 'draft-js-import-markdown'
import { stateToMarkdown } from 'draft-js-export-markdown'
import { Icon } from '@/components/icon'
import { Map } from 'immutable'
import 'draft-js/dist/Draft.css'
const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
]
const Test = (props: any) => {
  console.log(props)
  const get = () => {

  }
  return <ul className='mark-checks'>{props.children.map((v: any) => <li key={v.key}><input type='checkbox' name={v.key} />{v}</li>)}</ul>
}
const blockRenderMap: any = Map({
  'check-list': {
    element: 'span',
    wrapper: <Test />,
  },
})
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap)
class Editors extends React.Component<any, any> {
  state = {
    text: '',
    editorState: EditorState.createEmpty(),
  }
  onChange = (editorState: any) => this.setState({ editorState })
  handleKeyCommand = (command: any, editorState: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    console.log(command)
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  blockToggle = (blockType: string) => {
    console.log(blockType)
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType,
      ),
    )
  }
  test = () => {
    console.log(stateToMarkdown(this.state.editorState.getCurrentContent()))
  }
  render() {
    const q = this
    const IN_TYPES = [
      { icon: 'bold', type: 'BOLD' },
      { icon: 'italic', type: 'ITALIC' },
      { icon: 'underline', type: 'UNDERLINE' },
      { icon: 'blog-icon-code', type: 'CODE' },
    ]
    const BLOCK_TYPES = [
      { icon: 'ordered-list', type: 'ordered-list-item' },
      { icon: 'bars', type: 'unordered-list-item' },
      { icon: 'blog-icon-yinyong', type: 'blockquote' },
      { icon: 'blog-icon-check-list', type: 'check-list' },
      { icon: 'code', type: 'code-block' },
    ]
    return <div className='font-1'>
      <div className='editor-nav'>
        {
          BLOCK_TYPES.map(v => <Button key={v.type} onClick={() => this.blockToggle(v.type)}><Icon type={v.icon} /></Button>)}
        <Button onClick={this.test}>test</Button>
        {/* <Icon type='undo' />
      <Icon type='redo' />
      <Icon type='font-size' />
      <Icon type='bold' />
      <Icon type='italic' />
      <Icon type='underline' />
      <Icon type='bars' />
      <Icon type='ordered-list' />
      <Icon type='blog-icon-check-list' />
      <Icon type='blog-icon-yinyong' />
      <Icon type='code' />
      <Icon type='table' />
      <Icon type='link' />
      <Icon type='picture' /> */}
      </div>

      <Editor
        blockRenderMap={extendedBlockRenderMap}
        editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand}
        onChange={this.onChange}
        spellCheck={true} />
    </div>

  }
}

export class MarkEditor extends React.Component<any, any> {
  state = {
    text: '',
    editorState: EditorState.createEmpty(),
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
      ReactDOM.findDOMNode(viewRef),
    ] as any
    // 滚动条长度计算
    // const editorScroll=editor.clientHeight/editor.scrollHeight*editor.clientHeight
    // const viewScroll=view.clientHeight/view.scrollHeight*view.clientHeight

    if (currentTabIndex) {
      editor.scrollTo(
        0,
        ((editor.scrollHeight - editor.clientHeight) /
          (view.scrollHeight - view.clientHeight)) *
        view.scrollTop,
      )
    } else {
      view.scrollTo(
        0,
        ((view.scrollHeight - view.clientHeight) /
          (editor.scrollHeight - editor.clientHeight)) *
        editor.scrollTop,
      )
    }
  }
  save = (event: any) => {
    if (event.ctrlKey === true) {
      event.preventDefault()
      event.returnvalue = false
      if (event.keyCode === 83) {
        // Ctrl+S

        const { submit } = this.props
        submit && submit(this.state.text)
      } else if (event.keyCode === 13) {

      }
    }
  }
  test = () => {

    const { editorRef, viewRef, currentTabIndex } = this
    const editor: HTMLElement = ReactDOM.findDOMNode(editorRef) as any
    const select = window.getSelection();
    (window as any).editor = editor.children[0]

    const text: any = editor.children[0].childNodes[0]
    const oldNode = text
    let range
    if (select.rangeCount > 0) {
      range = select.getRangeAt(0)

    } else {
      range = document.createRange()
      range.selectNode(text)
    }
    console.log(range.cloneContents().childNodes)
    let ts = ''
    range.cloneContents().childNodes.forEach((item: any) => {
      ts += item.textContent
    })
    const before = ts.substring(range.startOffset)
    const after = before.substring(range.endOffset)
    console.log(range.startOffset, range.endOffset)
    console.log(before, after)
    range.deleteContents()

    select.addRange(range)
    // range.setStart(node,3)
    // range.cloneContents()
    // console.log(range.extractContents())
    // range.insertNode( document.createTextNode('```typescript\n\n```') )

    // window.getSelection().addRange(range)
    // let text=''
    // editor.children[0].childNodes.forEach((v:any)=>{
    //   console.log(v.data)
    //   text+=v.data
    //   range.selectNode(v)
    //   range.deleteContents()
    // })
    // console.log(text)
    // const node1 = document.createTextNode(text)
    // range.insertNode( node1 )
    // range.setStart(node1,1)
    // range.setEnd(node1,1)

  }
  render() {
    const { change, state, onScroll, save } = this
    const { text } = state
    return (
      <div className='font-6'>
        <Row>
          <Col>
            {/* <Button onClick={this.test}>插入标题</Button> */}
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
            {/* <Editors text={text}/> */}
          </Col>
          <Col
            xs={{ span: 12 }}
            className='mark-view'
            ref={dom => {
              this.viewRef = dom
            }}
            onScroll={onScroll}
          >
            <MarkView text={text} onMouseOver={this.setCurrentIndex.bind(this, 1)} />
          </Col>
        </Row>
      </div>
    )
  }
}
