import React from "react";
import {
    Button,
    Row,
    Col,
    Card,
    Breadcrumb
} from 'antd'

const ScaleDetaile = () => {

    const submit = () => {

    }

    const deleteProduct = () => {

    }
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>售后管理</Breadcrumb.Item>
                <Breadcrumb.Item>售后列表</Breadcrumb.Item>
                <Breadcrumb.Item>查看售后详情</Breadcrumb.Item>
            </Breadcrumb>
            <Card>
                <Row gutter={[10, 40]}>
                    <Col span={12}>用户名：<span>韩信</span></Col>
                    <Col span={12}>手机号：11111111111</Col>
                </Row>
                <Row gutter={[25, 40]}>
                    <Col span={12}>问题详情：</Col>
                </Row>
                <Row gutter={[25, 10]}>
                    <Col span={22} offset = {2}>
                        <Button type="primary" onClick={() => submit()}>提交</Button>
                        <Button className="operat-btn" danger onClick={() => deleteProduct()}>删除</Button>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default ScaleDetaile