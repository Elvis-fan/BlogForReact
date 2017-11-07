import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions';
import { Row, Col, Button, Menu, Pagination, Icon } from 'antd';
import './career.less';
import { URL } from './../components/config';

// import get from './../components/ajax';

// 生涯
class Career extends React.Component {
    state = {
        sel: 0,
        type: [],
        classes: {},
        topArticles: [],
        articles: []
    };
    constructor(props) {
        super(props);

        this.getClasses(2, (data) => {
            let classes = { 2: data };
            this.setState({ classes: classes });
        });

        this.getArticle(2, 0, 6, (data) => {
            this.setState({ topArticles: data });
        });

        this.getArticle(2, 0, 5, (data) => {
            this.setState({ articles: data });
        });

    }

    static defaultProps = {
        getArticleURL: 'article/getArticles/',
        getClassesURL: 'classes/getClasses/'
    }
    getArticle = (type, page, size, callback) => {
        fetch(`${URL}test/test`).then(response => response.json()).then(data => console.log(data))
        return fetch(URL + this.props.getArticleURL + `${type}/${page}/${size}`).then(response => response.json())
            .then(data => callback(data))
            .catch(e => console.log('Oops, error', e));
    }
    getClasses = (classes, callback) => {
        return fetch(URL + this.props.getClassesURL + classes).then(response => response.json())
            .then(data => callback(data))
            .catch(e => console.log('Oops, error', e));
    }

    pagination = (current, size) => {
        this.getArticle(this.state.sel, current, size, (data) => {
            this.setState({ articles: data });
        });
    }

    menuAction = (type) => {
        if (this.state.sel === type) {
            return;
        }
        this.setState({ sel: type });
        this.getArticle(type, 0, 5, (data) => {
            this.setState({ articles: data });
        });
    }

    // openClass = (e) => {
    //     let type = e.key;
    //     this.menuAction(type);
    //     if (this.state.classes[type]) return;
    //     this.getClasses(type, (data) => {
    //         this.state.classes[type] = data;
    //         this.setState({classes: this.state.classes});
    //     });
    // }

    menuClick = (type) => {
        this.setState({ sel: type });
        this.menuAction(type);
    }

    render() {
        // const SubMenu = Menu.SubMenu;
        const classes = (type) => {
            if (this.state.classes[type] === undefined) {
                return [];
            }
            let tem = [];
            for (let d of this.state.classes[type]) {
                tem.push(<li key={d.id}><a onClick={this.menuClick.bind(this, d.id)} className={this.state.sel === d.id ? 'active' : ''}>{d.name}</a></li>);
                // if (d.has_child === 0) {
                //     tem.push(<Menu.Item key={d.id}>{d.name}</Menu.Item>);
                // }else {
                //     tem.push(<SubMenu key={d.id} title={d.name} disabled={false} onTitleClick={this.openClass}>
                //             {classes(d.id)}
                //         </SubMenu>);
                // }
            }
            return tem;
        };
        return (
            <div className="career">
                <section className="top-post-wrap">
                    <div className="career-content">
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} className="career-first">
                                {
                                    this.state.topArticles.map(
                                        (i, index) => {
                                            if (index === 0) {
                                                return <article key={index}>
                                                    <div>
                                                        <h1><a href={`/career/details/${i.id}`}>{i.title}</a></h1>
                                                    </div>
                                                    <div className="font-6">
                                                        <span>MR-Liu   |  {i.date}</span>
                                                    </div>
                                                    <div className="font-7">
                                                        {i.briefing}
                                                    </div>
                                                    <Button type="primary" size={'large'} className="left" ghost={true}><a href={`/career/details/${i.id}`}>阅读全文</a></Button>
                                                </article>;
                                            }
                                            return;
                                        }
                                    )
                                }
                            </Col>
                            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 10, offset: 2 }} md={{ span: 10, offset: 2 }} lg={{ span: 10, offset: 2 }} className="career-top">
                                {
                                    this.state.topArticles.map(
                                        (i, index) => {
                                            if (index !== 0) {
                                                return <article key={index}>
                                                    <div>
                                                        <h1><a href={`/career/details/${i.id}`}>{i.title}</a></h1>
                                                    </div>
                                                    <div className="font-6">
                                                        <span>MR-Liu   |  {i.date}</span>
                                                    </div>
                                                </article>;
                                            }

                                            return;
                                        }
                                    )
                                }
                            </Col>
                        </Row>
                    </div>
                </section>

                <section className="main-post-wrap">
                    <div className="career-content">
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 14 }} md={{ span: 16 }}>
                                {
                                    this.state.articles.map(
                                        (i, index) =>
                                            <article className="main-post" key={index}>
                                                <div className="main-post__img">
                                                    <img src={`http://106.14.150.87/static/image/${i.id}.jpg`} alt="" />
                                                </div>
                                                <div className="main-post__title-wrap">
                                                    <div>
                                                        <h2><a href={'/career/details/' + i.id}>{i.title}</a></h2>
                                                    </div>
                                                    <div>
                                                        <span>MR-Liu   |  {i.date}</span>
                                                    </div>
                                                </div>
                                                <div className="main-post__cont">
                                                    <p className="font-7">
                                                        {i.briefing}
                                                    </p>
                                                    <Button type="primary" size={'large'} ghost={true}><a href={`/career/details/${i.id}`}>阅读全文</a></Button>
                                                </div>
                                            </article>
                                    )
                                }
                                <Pagination className="text-center" defaultCurrent={1} total={50} pageSize={5} onChange={this.pagination} />
                            </Col>

                            <Col xs={{ span: 24 }} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 2 }}>
                                <aside className="aside font-7">
                                    {/*<Menu*/}
                                    {/*onClick={this.menuClick}*/}
                                    {/*className="sel-left"*/}
                                    {/*defaultSelectedKeys={['java']}*/}
                                    {/*defaultOpenKeys={['sub4']}*/}
                                    {/*mode="inline"*/}
                                    {/*>*/}

                                    {/*<SubMenu key="sub4" title={<span><Icon type="setting" /><span>分类</span></span>}>*/}
                                    {/*{classes(2)}*/}
                                    {/*</SubMenu>*/}
                                    {/*</Menu>*/}

                                    <ul className="sidebar-menu">
                                        <li className="menu-item-object-category">
                                            <a className="sidebar-menu__title-link">分类</a>
                                            <ul className="sidebar-submenu">
                                                {classes(2)}
                                            </ul>
                                        </li>
                                        {/*<li className="menu-item-object-category">*/}
                                        {/*<a className="sidebar-menu__title-link">JavaScript</a>*/}

                                        {/*</li>*/}
                                        {/*<li className="menu-item-object-category">*/}
                                        {/*<a className="sidebar-menu__title-link">SQL</a>*/}

                                        {/*</li>*/}
                                        {/*<li className="menu-item-object-category">*/}
                                        {/*<a className="sidebar-menu__title-link">Linux</a>*/}

                                        {/*</li>*/}
                                    </ul>
                                </aside>
                            </Col>
                        </Row>
                    </div>
                </section>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators(actions.SignAction, dispatch),
    };
};
export default connect(
    undefined,
    mapDispatchToProps
)(Career);