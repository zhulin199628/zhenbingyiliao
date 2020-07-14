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
import AfterTable from "./AfterTable";
const { Option } = Select;
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
                <Card className="prolist-card">
                    <div className="table-header">
                        <div className="operat-container">
                            <Button type="primary" icon={<PlusOutlined />}>
                                <Link  style = {{color: "#fff"}} to="/zhenbing/after-sale/add-scale-detaile">新增</Link>
                            </Button>
                        </div>
                        <div className="filter-container">
                            <Form name="product-list-form" className="product-list-form" layout="inline">
                                <Form.Item className="productlist-formitem1">
                                    <Select defaultValue="全部" style={{ width: 120 }}>
                                        <Option value="all">全部</Option>
                                        <Option value="pending">待处理</Option>
                                        <Option value="processed">已处理</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item className="productlist-formitem2">
                                    <Input placeholder="商品名称/编号/交期/创建时间" prefix={<SearchOutlined />} maxLength={300} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <AfterTable />
                </Card>
            </div>
        )
    }
}

export default withRouter(AfterList) 