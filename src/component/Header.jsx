import React from "react"
import { Layout, Popover, Divider } from "antd"
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import { withRouter } from "react-router-dom"
const { Header } = Layout;

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
    }


    logout = () => {
        console.log("-----getIntologout")
        this.props.history.push("/login")
    }

    myInfo = () => {

    }

    editPassword = () => {

    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
        this.props.toggle(!this.state.collapsed)
    }

    content = () => {
        return (
            <div>
                <p>
                    <a onClick={() => { this.editPassword() }}>修改密码</a>
                </p>
                <p>
                    <a onClick={() => { this.myInfo() }}>我的信息</a>
                </p>
                <p>
                    <a onClick={() => { this.logout() }}>退出登录</a>
                </p>
            </div>
        )
    }

    render() {
        return (
            <Header className="zb-layout-background" style={{ padding: 0, boxShadow: "0 1px 4px rgba(0,21,41,.08)" }}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                })}
                <a className="logo">
                    <img src={require("../style/imgs/logo.jpg")} alt="振秉科技" height="50px" />
                    <Divider type="vertical" />
                    <h1>振秉科技</h1>
                </a>
                <div className="header-container">
                    <Popover content={this.content} title="">
                        <img src={require("../style/imgs/user-logo.png")} style={{ paddingRight: 10 }} />
                        <span className="user-info">{window.localStorage.name}</span>
                    </Popover>
                </div>
            </Header>
        )
    }
}

export default withRouter(HeaderComponent)