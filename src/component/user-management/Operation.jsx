import React from "react";
import { Breadcrumb } from 'antd'
class Operation extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>运营管理</Breadcrumb.Item>
                </Breadcrumb>
                <span>运营管理</span>
            </div>
        )
    }
}

export default Operation