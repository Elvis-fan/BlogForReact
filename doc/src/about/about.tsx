import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import * as actions from '../actions';

import './about.css';

let aboutbg = require('./../static/img/about_0.png');
let aboutWake = require('./../static/img/about_wake.jpg');
let aboutMy = require('./../static/img/about_my.png');
// 关于
class About extends React.Component<any, any> {

    constructor ( props: any ) {
        super(props);
        // this.setState({       visible: false });
    }
    scrollToAnchor = (anchorName: string) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) { anchorElement.scrollIntoView(); }
        }
    }

    render() {
        return (
            <div className="about">
                <div className="about-page" >
                    <div className="color-1 about-title text-left vertical">
                        <img src={aboutbg} alt=""/>
                        <div className="font-2">极客的极限在哪里？</div>
                        <div className="font-2">边缘在哪里？</div>
                        <div className="font-2">无人知晓</div>
                        <div className="font-2">我们必将永远追寻极限</div>
                        <div className="font-2">到达那个边缘</div>
                        <div className="font-2">///</div>
                    </div>
                    <a onClick={() => this.scrollToAnchor('content')} className="about-down">
                        <Icon type="down" />
                    </a>
                </div>
                <div id="content" className="about-page content-wrapper">
                    <div className="in-block text-wrapper font-2 right">
                        <div className="font-5">刘军辉</div>
                        <div>九五后，河南人</div>
                        <div>web工程师</div>
                        <div>二零一六年开始职业生涯</div>
                        <div> 一个从小不爱学习的不良青年</div>
                        <div>高中玩手机被老师没收N个手机</div>
                        <div>大学泡网吧期末挂N个学科</div>
                    </div>
                    <div className="about-my left in-block">
                        {/*<a href="https://www.pixiv.net/member.php?id=2787621" target="_bank">*/}
                        <img src={aboutMy} alt="氷一"/>
                        {/*</a>*/}
                    </div>
                </div>
                <div className="about-page content-wrapper">
                    <div className="in-block text-wrapper font-2 left">
                        <div className="font-5">觉醒</div>
                        <div>毕业听人一席话</div>
                        <div>奋身而入码农坑</div>
                        <div>励志用代码来帮助他人</div>
                    </div>
                    <div className="about-wake right in-block">
                        {/*<a href="https://www.pixiv.net/member.php?id=2787621" target="_bank">*/}
                            <img src={aboutWake} alt="氷一"/>
                        {/*</a>*/}
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps: any = (dispatch: any) => {

    return {
        actions: bindActionCreators(actions.SignAction, dispatch),
    };
}
export default connect(
    undefined,
    mapDispatchToProps
)(About);