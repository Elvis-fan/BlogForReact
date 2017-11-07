import * as React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Menu, Button, Dropdown, Icon } from 'antd';

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as actions from './../actions';
import SearchInput from '../components/searchInput';

import './head.css';

let logo = require('../static/img/logo.png');
let MediaQuery = require('react-responsive');
const menu = (
    <Menu className="popover-menu">
        <Menu.Item key="0">
            <Link to="/">杂项</Link>
        </Menu.Item>
        <Menu.Item key="1">
            <Link to="/about">关于</Link>
        </Menu.Item>
        <Menu.Item key="2">
            <Link to="/career">生涯</Link>
        </Menu.Item>
    </Menu>
);

interface HeadProps {
    selected: string;
}

class Head extends React.Component<HeadProps, any> {
    props = {
        selected: '0'
    }
    constructor ( props: any ) {
        super(props);
    }



    render() {
        console.log(this.props.selected)
        return (
            <header id="header">
                <Row>
                    <Col xs={{span: 24}} sm={{span: 24}} md={{span: 5}} lg={{span: 4}} >
                        <Link to="/" id="logo">
                            <img src={logo} alt="logo"/>
                        </Link>
                    </Col>
                    <Col xs={{span: 0}} sm={{span: 0}} md={{span: 19}} lg={{span: 20}} >
                        <div id="search-box">
                            <SearchInput placeholder="搜索你感兴趣的内容..." className="scroll" style={{ width: 200 }} />
                        </div>
                        <Button type="primary" size={'small'} className="right head-login" ghost={true}>EN</Button>
                        <Menu mode="horizontal" className="right header-menu" selectedKeys={[this.props.selected]}>
                            <Menu.Item key="0"><Link to="/">杂项</Link></Menu.Item>
                            <Menu.Item key="1"><Link to="/about">关于</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/career">生涯</Link></Menu.Item>
                            <Menu.Item key="3">随笔</Menu.Item>
                            <Menu.Item key="4">远行</Menu.Item>
                            <Menu.Item key="5">锦集</Menu.Item>
                        </Menu>
                    </Col>
                </Row>
                <MediaQuery query="(max-width: 992px)">
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="absolute head-menu font-2" href="#">
                            <Icon type="menu-fold" />
                        </a>
                    </Dropdown>
                </MediaQuery>
            </header>
        );
    }
}
// const mapStateToProps = ( state: any) => {
//
//     return {selected1: state.URLChange};
// }
// const mapDispatchToProps: any = (dispatch: any) => {
//     return {
//         actions: bindActionCreators(actions.SignAction, dispatch),
//     };
// }
export default Head;