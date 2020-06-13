import React from "react";
import { Breadcrumb } from 'antd'
class Information extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                    <Breadcrumb.Item>我的信息</Breadcrumb.Item>
                </Breadcrumb>
                <span>我的信息</span>
            </div>
        )
    }
}

export default Information