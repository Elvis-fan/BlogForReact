import * as React from "react"
import { Layout, message } from 'antd'
import './header.less'
export default class HeaderView extends React.Component<any, any>{
  render(){
    return <header className="header">
      <div className="container font-7">
        <span className="logo font-6 header-down-item-1">EICK</span>
        <span className="menu">
          <span className="header-down-item-2">About</span>
          <span className="header-down-item-3">Blog</span>
        </span>
        <span className="contact-us header-down-item-4">CONTACT US</span>
      </div>
    </header>
  }
}