import React from "react"
import LoginForm from "../component/forms/LoginForm"
import { Layout } from "antd"
const { Content } = Layout;
class Login extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Layout className="custom-layout">
                <Content className="custom-login-content">
                    <div className="content_title">
                        <div>
                            大健康平台
                            {/* <img src={require("../assets/location.png")} alt="logo" className="logo-style" /> */}
                        </div>
                        <div className="content-title-text">
                        </div>
                    </div>
                    <div className="content-form">
                        <LoginForm />
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default Login