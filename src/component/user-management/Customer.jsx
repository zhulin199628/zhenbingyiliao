import React from "react";
import { Breadcrumb } from 'antd'
class Customer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>客户管理</Breadcrumb.Item>
                </Breadcrumb>
                <span>客户管理</span>
            </div>
        )
    }
}

export default Customer