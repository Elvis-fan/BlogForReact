import React from 'react'
import marked from 'marked'
import { Anchor } from 'antd'
import './mark-view.less'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
const { Link } = Anchor
const renderer = new marked.Renderer()
// renderer.heading = (text, level) => {
//   let escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
//   return `<h${level}><a name="${escapedText}" class="anchor" href="#${escapedText}"><span class="header-link">${text}</span></a></h${level}>`
// }
renderer.code = (code: string, language: string, isEscaped: boolean) =>
  `<pre class="hljs"><code class="${language}">${
    hljs.highlightAuto(code).value
  }</code></pre>`
marked.setOptions({ renderer })
interface Props {
  text: string;
  anchorable?: boolean;
}

export class MarkView extends React.Component< Props & any,any>{
  static Anchor :any=({onClick}:any)=><div/>
  htmlh:string=''
  constructor(props: Props & any){
    super(props)
    MarkView.Anchor=({onClick}:any) => {
      let list = this.html.match(/<h[1-6]{1}\sid=[^>]*>([^<]*)/gi) || []
      let arr = []
      for (let li of list) {
        let indentation = li.slice(li.indexOf('id="') + 4, li.indexOf('" '))
        let title = li.split(/\sid=[^>]*>/gi)[1]
        arr.push([indentation, title])
      }
      return (
        <Anchor className='mark-anchor' onClick={onClick}>
          {arr.map((n, i) => (
            <Link key={n[0]} href={`#${n[0]}`} title={n[1]} />
          ))}
        </Anchor>
      )
    }
  }
  set html(text:string){
    if(!text){
      return
    }
    const {anchorable}=this.props
    let html = marked(text, { breaks: true })
    if (anchorable) {
      for (let i = 1; i < 7; i++) {
        let tex = html.split(new RegExp(`<h${i}`, 'ig'))
        html = tex[0]
        for (let j = 1; j < tex.length; j++) {
          html += `<h${i} id="h${i}-${j}" ${tex[j]}`
        }
      }
    }
    this.htmlh = html
  }
  get html(){
    return this.htmlh
  }
  
  render(){
    const {props}=this
    const {text,...newProps}=props
    this.html = text
   
    const {html}=this
    return (
          <div className='markdown-view'
            {...newProps}
            dangerouslySetInnerHTML={{
              __html: html
            }}
          />
    )
  }
}
