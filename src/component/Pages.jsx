import React from "react"
import { Layout, Breadcrumb } from "antd"
import HeaderComponent from "./Header"
import SideMenu from "./SideMenu"
import Routes from "../routers/index"
import { withRouter } from 'react-router-dom';

const { Content } = Layout;
class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
    }

    toggle = (collapsed) => {
        this.setState({
            collapsed
        })
    }

    render() {
        return (
            <Layout style={{ minHeight: "100vh" }}>
                <HeaderComponent toggle={(collapsed) =>{this.toggle(collapsed)}} />
                <Layout>
                    <SideMenu collapsed = {this.state.collapsed}/>
                    <div style={{ padding: 24, minHeight: 360, width: "100%", overflow:"hidden" }}>
                        <Content>
                            <Routes />
                        </Content>
                    </div>
                </Layout>
            </Layout>
        )
    }

}

export default withRouter(Main)