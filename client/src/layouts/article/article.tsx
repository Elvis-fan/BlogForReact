import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
interface Props extends RouteComponentProps {
  title:string
}
export default class Article extends React.Component<Props, any> {
  render() {
    return <div>Article</div>
  }
}
