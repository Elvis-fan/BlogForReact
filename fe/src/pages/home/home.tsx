import React from "react";
import { Layout, message } from "antd";

const { Content } = Layout;
export default class Home extends React.Component<any, any> {
  render() {
    const { children } = this.props;
    return (
      <div>home</div>
    );
  }
}
