import React from "react";
import { Breadcrumb } from 'antd'
class AfterList extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>售后管理</Breadcrumb.Item>
                    <Breadcrumb.Item>售后列表</Breadcrumb.Item>
                </Breadcrumb>
                <span>catogry</span>
            </div>
        )
    }
}

export default AfterList