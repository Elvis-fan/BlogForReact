import React from "react";

import Header from "./header";
import Footer from "./footer";

export default class BasicLayout extends React.Component<any, any> {
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <section>
          <Header />
          <main>{children}</main>
          <Footer />
        </section>
      </React.Fragment>
    );
  }
}
