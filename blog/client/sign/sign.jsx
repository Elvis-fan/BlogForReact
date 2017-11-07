import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../actions';
import { Form, Icon, Input, Button } from 'antd';
import PropTypes  from 'prop-types';
import {withRouter} from "react-router-dom";
import {setSignIn, setToken} from './../util/storage';

import MD5 from 'md5';
import {URL} from './../components/config';
import { getURLQueryString } from './../util/util';
import './sign.less';
import logo from './../static/img/logo.png';
const FormItem = Form.Item;


class SignForm extends React.Component {

    constructor(prors){
        super(prors);
    }

    handleSubmit = (e) => {

        e.preventDefault();

        this.props.form.validateFields((err, values) => {

            if (!err) {
                values.password = MD5(values.password);
                fetch(`${URL}sign/in`,{
                    method: "POST",
                    body: JSON.stringify(values)
                }).then(response=>response.json()).then((data)=> {

                    if(data[0].signIn){
                        setToken(data.token);
                        setSignIn(1);
                        let redirectURL = getURLQueryString('redirectURL');
                        if(!redirectURL){
                            redirectURL = '/manager';
                        }

                        this.props.history.push(redirectURL);
                    }else{
                        this.props.form.setFields({
                            userName: {
                                value: values.userName,
                                errors: [new Error('账号或密码错误！')],
                            },
                        })
                    }
                });
            }
        });
    };
    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <div className="sign-container">
                <div className="vertical">
                    <div className="sign-content">
                        <div className="sign-header">
                            <img className="sign-logo" src={logo} alt="logo"/>
                            <span className="sign-title">Master</span>
                        </div>
                        <div className="sign-body text-left">
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem>
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入用户名!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入密码!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                                    )}
                                </FormItem>
                                <FormItem>
                                <Button type="primary" htmlType="submit" className="sign-submit">
                                    Sign in
                                </Button>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const Sign = Form.create()(SignForm);

const mapStateToProps = ( state) => {
    console.log(state);
    return {sign: state.signCtrl};
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions.SignAction, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Sign));