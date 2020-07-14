import React from "react";
import { Layout, Menu } from "antd";
import menus from "../routers/config";
import { Link, withRouter } from 'react-router-dom';
import { GlIIcon, ProIcon, ScaleIcon, UserIcon, TzIcon, SysIcon } from '../svg/customSvg';
const { Sider } = Layout;
const { SubMenu } = Menu;
const MenuItem = Menu.Item;
const arr = [
    <GlIIcon />, <ProIcon />, <ScaleIcon />, <UserIcon />, <TzIcon />, <SysIcon />
]

class SiderMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            collapsed: nextProps.collapsed
        })
    }

    renderMenu = (item) => {
        return (
            <MenuItem key={item.key}>
                <Link to={item.key}>
                    <span className="title-icon">{item.title}</span>
                </Link>
            </MenuItem>
        )
    }

    renderSubMenu = (item, index) => {
        return (
            <SubMenu
                key={item.key}
                title={
                    <span className="submenu-title">
                        {
                            arr[index]
                        }
                        <span className="title-icon" style={{ verticalAlign: "middle" }}>{item.title}</span>
                    </span>
                }
            >
                {
                    item.childs.map((item, index) => (
                        item.childs ? this.renderSubMenu(item, index) : this.renderMenu(item)
                    ))
                }

            </SubMenu>
        )
    }

    render() {

        return (
            <Sider
                className="site-layout-background"
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
            >
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                >
                    {
                        menus.map((item, index) => {
                            if (item.childs.length > 0) {
                                return this.renderSubMenu(item, index)
                            } else {
                                return this.renderMenu(item)
                            }
                        })
                    }
                </Menu>
            </Sider>
        )
    }
}
export default withRouter(SiderMenu)