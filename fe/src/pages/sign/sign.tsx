import * as React from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { setSignIn, setToken } from '../../tools'
import { RouteComponentProps } from 'react-router-dom'
// import { signInAction } from 'src/actions'
import { User as UserModel } from '../../models/user'
// import MD5 from 'md5'
import './sign.less'
const FormItem = Form.Item
const formCreate: any = Form.create

const mapStateToProps = (state: any) => {
    const { Sign } = state
    return { ...Sign }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        // fetchSignIn: (user: UserModel) => dispatch(signInAction(user)),
    }
}
interface Props extends RouteComponentProps, FormComponentProps {
    user: UserModel
    fetchSignIn(user: UserModel): void
}
@formCreate()
class SignInForm extends React.Component<any, any> {
    submit = (e: any) => {
        e.preventDefault()
        this.props.form.validateFields((err: any, user: UserModel) => {
            if (!err) {
                this.props.submit(this.props.form, user)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return <Form onSubmit={this.submit} className='login-form'>
            <FormItem>
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入用户名!' }],
                })(
                    <Input prefix={<Icon type='user' style={{ fontSize: 13 }} />} placeholder='用户名' />,
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码!' }],
                })(
                    <Input prefix={<Icon type='lock' style={{ fontSize: 13 }} />} type='password' placeholder='密码' />,
                )}
            </FormItem>
            <FormItem>
                {/* <Button type='primary' htmlType='submit' className='sign-submit'>
                    Sign in
            </Button> */}
            </FormItem>
        </Form>
    }
}

export default class Sign extends React.Component<Props, any> {
    form: any
    componentWillReceiveProps(nextProps: Props) {
        const { user, history } = nextProps
        if (user.status === 1) {
            let redirectURL = new URLSearchParams(location.search).get('to')
            setToken(user.token)
            setSignIn(1)
            if (!redirectURL) {
                redirectURL = '/administrator/editor'
            }
            history.push(redirectURL)
        } else if (user.status === 0) {
            this.form.setFields({
                name: {
                    value: user.name,
                    errors: [new Error('账号或密码错误！')],
                },
            })
        }
    }
    handleSubmit = (form: any, user: UserModel) => {
        // user.password = MD5(user.password)
        const { fetchSignIn } = this.props
        fetchSignIn(user)
        this.form = form
    }
    render() {
        return (
            <div className='sign-container'>
                <div className='sign-content'>
                    <div className='sign-header'>
                        <span className='sign-title font-1'>Master</span>
                    </div>
                    <div className='sign-body text-left'>
                        <SignInForm submit={this.handleSubmit} />
                    </div>
                </div>
            </div>
        )
    }
}
