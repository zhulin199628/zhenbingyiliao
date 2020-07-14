import React from "react";
import {
    Breadcrumb,
    Card,
    Form,
    Input,
    Button
} from 'antd';
import {
    PlusOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom"
import OperationTable from "./OperationTable";
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
                <Card className="prolist-card">
                    <div className="table-header">
                        <div className="operat-container">
                            <Button type = "primary" icon={<PlusOutlined />}>
                                <Link style = {{color: "#fff"}} to="/zhenbing/user-management/create-operation">新建</Link>
                            </Button>
                        </div>
                        <div className="filter-container">
                            <Form name="product-list-form" className="product-list-form" layout="inline">
                                <Form.Item className="form-item-width">
                                    <Input placeholder="请输入关键词" prefix={<SearchOutlined />} maxLength={300} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <OperationTable />
                </Card>
            </div>
        )
    }
}

export default Operation