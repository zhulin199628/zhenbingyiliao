import React from "react";
import { Breadcrumb } from 'antd'

class ProductList extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>产品管理</Breadcrumb.Item>
                    <Breadcrumb.Item>产品列表</Breadcrumb.Item>
                </Breadcrumb>
                <span>ProductList</span>
            </div>
        )
    }
}

export default ProductList