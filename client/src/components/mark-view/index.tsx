import React from 'react'
import marked from 'marked'
import { Anchor } from 'antd'

import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
const { Link } = Anchor
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

export const MarkView=(props:any)=>{
    const {text}=props
    const html = marked(text, { breaks: true })
    if(){
      
    }
    return <div>
      <div 
    {...props}
    dangerouslySetInnerHTML={{
      __html: html
    }}
  />
  <Anchor>
  <Link href='#Link-Props' title='Link Props' />
  </Anchor>
    </div>
}