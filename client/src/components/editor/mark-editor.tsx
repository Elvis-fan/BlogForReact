import React from 'react'
import { Row, Col } from 'antd'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import './mark-editor.less'

const renderer = new marked.Renderer()
renderer.heading =  (text, level)=> {
        let escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
        return `<h${level}><a name="${escapedText}" class="anchor" href="#${escapedText}"><span class="header-link"></span></a>${text}</h${level}>`
    }
    renderer.code=(code: string, language: string, isEscaped: boolean)=>`<pre class="hljs"><code class="${language}">${hljs.highlightAuto(code).value}</code></pre>`
marked.setOptions({
    renderer
  })

export class MarkEditor extends React.Component<any,any> {
    state={
        text:''
    }
    currentTabIndex:number
    scale:number
    componentWillReceiveProps({ content }:any) {
        if (!(content === this.state.text)) {
          this.setState({ text: content })
        }
      }
    setCurrentIndex(num:number){
        console.log(num)
        this.currentTabIndex = num
    }
    change=({target}:any)=>{
        this.setState({text:target.innerText})
        // !this.hasContentChanged && (this.hasContentChanged = true)
    }
  
      hasContentChanged=()=>{
        // this.scale = (this.previewWrap.offsetHeight - this.previewContainer.offsetHeight) / (this.editWrap.offsetHeight - this.editContainer.offsetHeight)
      }
      onScroll=(e:any)=>{
        console.log(e)
      }
      save=(event:any)=>{
        if (event.ctrlKey === true && event.keyCode === 83) {// Ctrl+S
            event.preventDefault()
            event.returnvalue = false
            const { submit } = this.props
            console.log(this.state.text)
    submit && submit(this.state.text)
          }
      }
  render() {
      const {change,state,onScroll,save}=this
      const {text}=state
      console.log(text)
    return (
      <div className='font-4'>
        <Row>
          <Col  xs={{ span: 12 }} className='mark-editor' onScroll={onScroll}>
            <div
            defaultValue={text}
onMouseOver={this.setCurrentIndex.bind(this, 0)}
              contentEditable={'plaintext-only' as any}
              onInput={change}
              onKeyDown={save}
            />
          </Col>
          <Col xs={{ span: 12 }} className='mark-view'>
          <div onMouseOver={this.setCurrentIndex.bind(this, 1)} dangerouslySetInnerHTML={{__html: marked(text,{breaks: true})}}/>
          </Col>
        </Row>
      </div>
    )
  }
}
