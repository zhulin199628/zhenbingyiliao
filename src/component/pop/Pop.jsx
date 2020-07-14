import React from "react";
import {
    Breadcrumb,
    Card,
    Button,
    Form,
    Select,
    Input,
} from 'antd';
import {
    PlusOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import PopTable from "./PopTable"
const { Option } = Select;
class Pop extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>通知管理</Breadcrumb.Item>
                    <Breadcrumb.Item>弹窗消息</Breadcrumb.Item>
                </Breadcrumb>
                <Card className="prolist-card">
                    <div className="table-header">
                        <div className="operat-container">
                            <Button type="primary" icon={<PlusOutlined />}>
                                <Link to="/zhenbing/after-sale/add-scale-detaile" style = {{color: "#fff"}}>新建消息</Link>
                            </Button>
                        </div>
                        <div className="filter-container">
                            <Form name="product-list-form" className="product-list-form" layout="inline">
                                <Form.Item className="productlist-formitem1">
                                    <Select defaultValue="全部" style={{ width: 120 }}>
                                        <Option value="all">全部</Option>
                                        <Option value="pending">发布中</Option>
                                        <Option value="processed">未发布</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item className="productlist-formitem2">
                                    <Input placeholder="请输入关键词" prefix={<SearchOutlined />} maxLength={300} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>

                    <PopTable />
                </Card>
            </div>
        )
    }
}

export default withRouter(Pop) 