import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'


import 'src/common/style/less/common.less'
import './index.less'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <App />,
  document.querySelector('body') as HTMLElement
)
registerServiceWorker()