import React from "react";
import { Breadcrumb } from 'antd'
class Category extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>产品管理</Breadcrumb.Item>
                    <Breadcrumb.Item>产品类别</Breadcrumb.Item>
                </Breadcrumb>
                <span>catogry</span>
            </div>
        )
    }
}

export default Category