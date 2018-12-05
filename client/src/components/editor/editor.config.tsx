import BraftEditor from 'braft-editor'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import ColorPicker from 'braft-extensions/dist/color-picker'
// 首先需要从prismjs中引入需要扩展的语言库
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-haml'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'
import './editor.less'

// 通过opitons.
const options = {
  // includeEditors: ['editor-with-code-highlighter'],
  syntaxs: [
    {
      name: 'JavaScript',
      syntax: 'javascript'
    }, {
      name: 'HTML',
      syntax: 'html'
    }, {
      name: 'CSS',
      syntax: 'css'
    }, {
      name: 'Java',
      syntax: 'java',
    }, {
      name: 'TypeScript',
      syntax: 'typescript'
    }, {
      name: 'Markdown',
      syntax: 'markdown'
    }, {
      name: 'jsx',
      syntax: 'jsx'
    }, {
      name: 'tsx',
      syntax: 'tsx'
    }
  ]
}
const BEditor: any = BraftEditor
BEditor.use(CodeHighlighter(options))
BEditor.use(ColorPicker({
  theme: 'light' // 支持dark和light两种主题，默认为dark
}))
export default BEditor