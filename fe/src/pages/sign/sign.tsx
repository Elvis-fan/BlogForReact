import * as React from "react";

import { Form, Icon, Input, Button, Alert } from "antd";
import gql from "graphql-tag";
import { FormComponentProps } from "antd/lib/form";
import { setSignIn, setToken } from "../../tools";
import { RouteComponentProps } from "react-router-dom";

import {  Mutation, MutationFn } from "react-apollo";

import { User as UserModel } from "../../models/user";

import "./sign.less";
const FormItem = Form.Item;
const formCreate: any = Form.create;
const AButton: any = Button;

interface Props extends RouteComponentProps, FormComponentProps {
  user: UserModel;
  fetchSignIn(user: UserModel): void;
}
const SIGN_IN = gql`
  mutation signIn($signIn: String!, $password: String!) {
    signIn(signIn: $signIn, password: $password) {
      token
    }
  }
`;
@formCreate()
class SignInForm extends React.Component<any, any> {
  submit = (e: any, mutationFn: MutationFn) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, user: any) => {
      if (!err) {
        mutationFn({
          variables: { ...user }
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Mutation mutation={SIGN_IN}>
        {(mutationFn: MutationFn, { loading, error, data }: any) => {
          if (data) {
            const { token } = data.signIn;
            setToken(token);
            setSignIn(1);
          }
          return (
            <Form
              onSubmit={e => this.submit(e, mutationFn)}
              className="login-form"
            >
              {error &&
                error.graphQLErrors &&
                error.graphQLErrors.map((err: any, index: number) => (
                  <Alert
                    key={index}
                    style={{ marginBottom: 24 }}
                    message={err.message}
                    type="error"
                    showIcon
                  />
                ))}
              <FormItem>
                {getFieldDecorator("signIn", {
                  rules: [{ required: true, message: "请输入用户名!" }]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                    placeholder="用户名"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "请输入密码!" }]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                    type="password"
                    placeholder="密码"
                  />
                )}
              </FormItem>
              <FormItem>
                <AButton
                  type="primary"
                  htmlType="submit"
                  className="sign-submit"
                  loading={loading}
                >
                  Sign in
                </AButton>
              </FormItem>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default class Sign extends React.Component<Props, any> {
  form: any;

  render() {
    return (
      <div className="sign-container">
        <div className="sign-content">
          <div className="sign-header">
            <span className="sign-title font-1">Master</span>
          </div>
          <div className="sign-body text-left">
            <SignInForm />
          </div>
        </div>
      </div>
    );
  }
}
