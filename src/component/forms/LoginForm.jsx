import React from "react"
import { warning } from "../Alert"
import {
    withRouter
} from "react-router-dom"
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
    Form,
    Button,
    Input,
} from "antd"
import API from "../../api/index";

let Interface = new API();

const FormItem = Form.Item

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    onFinish = (value) => {
        this.setState({ loading: true })
        let { username, password } = value;
        Interface.Login(username, password).then(res => {
            this.setState({
                loading: false
            })
            this.props.history.push({
                pathname: "/zhenbing"
            })
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    }

    onFinishFailed = (errorInfo) => {
        const { username, password } = errorInfo.values;
        if (username.length == 0) {
            warning("请输入用户名")
        }
        if (password.length == 0) {
            warning("请输入密码")
        }
    }

    render() {
        const { loading } = this.state;
        return (
            <Form
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                className="login-form"
            >
                <FormItem
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!', whitespace: true }]}
                >
                    <Input
                        size="large"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        style={{ color: "rgb(24, 144, 255)" }}
                        placeholder="用户名" />
                </FormItem>
                <FormItem
                    name="password"
                    rules={[{ required: true, message: '请输入密码!', whitespace: true }]}
                >
                    <Input
                        size="large"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        style={{ color: "rgb(24, 144, 255)" }}
                        type="password"
                        placeholder="密码"
                    />
                </FormItem>
                <FormItem>
                    <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={loading}
                    >
                        登录
                    </Button>
                </FormItem>
                <FormItem>
                    <div className="version">版本号： 0.0.1</div>
                </FormItem>
            </Form>
        )
    }
}

export default withRouter(LoginForm)


