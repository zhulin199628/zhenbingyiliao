import React , {useState}from "react";
import {
    Breadcrumb,
    Card,
    Button,
    Form,
    Input,
} from 'antd'
import {
    PlusOutlined,
    SearchOutlined
} from '@ant-design/icons';
import CustomerTable from "./CustomerTable"



const Customer = () => {

    const add = () => {

    }
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                <Breadcrumb.Item>客户管理</Breadcrumb.Item>
            </Breadcrumb>
            <Card className="prolist-card">
                <div className="table-header">
                    <div className="operat-container">
                        <Button type="primary" icon={<PlusOutlined />} onClick={add}>新建</Button>
                        <Button type="" className="operat-btn" onClick={(event) => { this.batchOperat(event) }}>批量操作</Button>
                    </div>
                    <div className="filter-container">
                        <Form name="product-list-form" className="product-list-form" layout="inline">
                            <Form.Item className="form-item-width">
                                <Input placeholder="请输入关键词" prefix={<SearchOutlined />} maxLength={300} />
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <CustomerTable />
            </Card>
        </div>
    )
}


export default Customer