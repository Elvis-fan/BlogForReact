import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Anchor, Row, Col } from 'antd';
const { Link } = Anchor;

// import { URL } from './../components/config';

class Details extends React.Component<any, any> {
    render() {
        return (
            <div>
                <section className="main-post-wrap">
                    <div className="career-content">
                        <Row>
                            <Col xs={{span: 24}} sm={{span: 14}} md={{span: 16}}>
                                <article className="main-post">
                                    <div className="main-post__img">
                                        <img src={`http://106.14.150.87/static/image/1.jpg`} alt=""/>
                                    </div>
                                    <div className="main-post__title-wrap">
                                        <div>
                                            <h2><a href={'/career/details/'}>A HARD LESSON IN VULNERABILITY MANAGEMENT FOR EQUIFAX</a></h2>
                                        </div>
                                        <div>
                                            <span>MR-Liu   |  09.11.2017</span>
                                        </div>
                                    </div>
                                    <div className="main-post__cont">
                                        <h2 id="test1">test1</h2>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and likely made matters worse, with their questionable efforts to “protect” consumers in the future.
                                        </p>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>
                                        <h2 id="test2">test2</h2>
                                        <p className="font-7">
                                            News of yet another data breach, this time at credit bureau Equifax, was announced yesterday afternoon and sadly, it isn’t all that surprising. Time and again we experience ‘massive breaches’ where the hackers get away with troves of personal information. From retail to healthcare, government agencies to financial services, no industry is immune. An estimated 143 million Americans and a smaller number of Canadians...
                                        </p>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>     <p className="font-7">
                                        Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                    </p>     <p className="font-7">
                                        Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                    </p>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>


                                        <h2 id="test3">test3</h2>
                                        <p className="font-7">
                                            Shortly after IoT became a mainstream topic, the idea of device access-control falling into the wrong hands also grabbed headlines. Was it possible? What would happen? These are particularly concerning questions for healthcare organizations who deal in life-saving devices. But the notion of hacked medical devices such as defibrillators, pacemakers and insulin machines seemed more science fiction than real risk – a few years...
                                        </p>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>
                                        <h2 id="test4">test4</h2>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>
                                        <p className="font-7">
                                            Since announcing its breach on Thursday, Equifax has taken a formidable beating in the media, and I suspect at virtually every office water cooler in the U.S. Waiting six weeks before telling consumers about the breach of their sensitive, personal information to first ‘get their story straight’ has many up in arms – and rightfully so. The company’s response has been no better, and...
                                        </p>
                                        <h2 id="test5">test5</h2>
                                        <p className="font-7">
                                            Connect / Express中间件在请求/响应生命周期期间为MySQL连接提供一致的API。它支持管理数据库连接的三种不同策略：single在应用程序实例级别上进行单一连接，pool基于连接，每个连接新连接request。它也能自动关闭/如果配置要么释放连接pool或request。它使用node-mysql作为MySQL驱动。
                                        </p>
                                        <p className="font-7">
                                            Connect / Express中间件在请求/响应生命周期期间为MySQL连接提供一致的API。它支持管理数据库连接的三种不同策略：single在应用程序实例级别上进行单一连接，pool基于连接，每个连接新连接request。它也能自动关闭/如果配置要么释放连接pool或request。它使用node-mysql作为MySQL驱动。
                                        </p>
                                        <p className="font-7">
                                            Connect / Express中间件在请求/响应生命周期期间为MySQL连接提供一致的API。它支持管理数据库连接的三种不同策略：single在应用程序实例级别上进行单一连接，pool基于连接，每个连接新连接request。它也能自动关闭/如果配置要么释放连接pool或request。它使用node-mysql作为MySQL驱动。
                                        </p>

                                    </div>
                                </article>
                            </Col>
                            <Col xs={{span: 24}} sm={{span: 8, offset: 2}} md={{span: 6, offset: 2}}>
                                <aside>
                                    <Anchor className="aside font-2">
                                        <Link href="#test1" title="test1" />
                                        <Link href="#test2" title="test2" />
                                        <Link href="#test3" title="test3">
                                            <Link href="#test4" title="test4" />
                                            <Link href="#test5" title="test5" />
                                        </Link>
                                    </Anchor>
                                </aside>
                            </Col>
                        </Row>
                    </div>
                </section>

            </div>
        );
    }
}

const mapDispatchToProps: any = (dispatch: any) => {

    return {
        actions: bindActionCreators(actions.SignAction, dispatch),
    };
};
export default connect(
    undefined,
    mapDispatchToProps
)(Details);