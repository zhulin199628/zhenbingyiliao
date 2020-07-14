import React, { useState, useEffect, useContext } from "react";
import {
    Breadcrumb,
    Card,
    Button,
    Form,
    Select,
    Input,
    Modal
} from 'antd';
import ListTable from "./ListTable";
import { Link, withRouter } from 'react-router-dom';
import {
    SearchOutlined,
    PlusOutlined
} from '@ant-design/icons'
import API from "../../api/index";
const _API = new API();

const { Option } = Select;

const ModalForm = (props) => {
    return (
        <Form
            form={props.form}
        >
            <Form.Item
                label="类别"
                name="editCategory"
                rules={
                    [
                        {
                            required: true,
                            message: "请输入类别"
                        },
                        {
                            max: 64,
                            message: "最大长度为64"
                        },
                        {
                            pattern: /^[\u4e00-\u9fa5]+$/,
                            message: "请输入中文字符"
                        }
                    ]
                }
            >
                <Input placeholder="最多支持64中文字符" />
            </Form.Item>
        </Form>
    )
}

const ProductList = () => {
    const [data, setData] = useState([]);
    const [selectedRows, setCheck] = useState([]);
    let dataArray = [];   
    useEffect(() => {
        _API.getAll('1', '5', '0', '1').then(res => {
            res.data.data.products.forEach((item, index) => {
                dataArray.push({
                    key: index,
                    id:item.id,
                    name: item.name,
                    category: item.type,
                    views: item.views,
                    people: item.creator,
                    priority: item.priority,
                    time: item.gmtCreated,
                    picture: item.images,
                    description: item.description
                },
                )
            })
            setData({ data: dataArray })
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const [visiable, showModal] = useState(false);

    const [form] = Form.useForm();
    const editCategory = () => {
        showModal(true)
    }

    const offShelf = () => {

    }
    const deleteRow = () => {
        // let { datasorce, selectedRows } = tableData;
        // datasorce.forEach((datasorceValue, index_data, arr_data) => {
        //     selectedRows.forEach((selectedRowsValue) => {
        //         if (datasorceValue.index === selectedRowsValue.index) {
        //             arr_data.splice(index_data, 1)
        //         }
        //     })
        // })
        // console.log(datasorce);
        // setCheckData({ datasorce })
    }

    const handlleConfirm = () => {
        const { editCategory } = form.getFieldsValue();
        console.log(form.getFieldsValue());
        showModal(false)
    }

    const handleCancel = () => {
        showModal(false)
    }

    const getCheckBox = (data) => {
        setCheck({ selectedRows: data.selectedRows });
    }

    let MyContext = React.createContext()

    return (
        <MyContext.Provider value={{ data, setData }}>
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>产品管理</Breadcrumb.Item>
                    <Breadcrumb.Item>产品列表</Breadcrumb.Item>
                </Breadcrumb>
                <Card className="prolist-card">
                    <div className="table-header">
                        <div className="operat-container">
                            <Button type="" icon={<PlusOutlined />} type="primary" className="operat-btn">
                                <Link to="/zhenbing/product/release" style={{ color: "#fff" }}>发布产品</Link>
                            </Button>
                            <Button type="" className="operat-btn" onClick={() => { editCategory() }}>改类别</Button>
                            <Button type="" className="operat-btn" onClick={() => { offShelf() }}>下架</Button>
                            <Button type="" className="operat-btn" onClick={() => { deleteRow() }}>删除</Button>
                        </div>
                        <div className="filter-container">
                            <Form name="product-list-form" className="product-list-form" layout="inline">
                                <Form.Item className="productlist-formitem1">
                                    <Select defaultValue="全部" style={{ width: 120 }}>
                                        <Option value="all">全部</Option>
                                        <Option value="mc">脉冲理疗</Option>
                                        <Option value="ym">医美理疗</Option>
                                        <Option value="handheld">手持检测</Option>
                                        <Option value="high">高阶检测</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item className="productlist-formitem2">
                                    <Input placeholder="商品名称/编号/交期/创建时间" prefix={<SearchOutlined />} maxLength={300} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <ListTable checkBoxData={getCheckBox} MyContext={MyContext} />
                </Card>

                <Modal
                    title="修改"
                    visible={visiable}
                    onOk={() => handlleConfirm()}
                    onCancel={() => handleCancel()}
                >
                    <ModalForm form={form} />
                </Modal>
            </div>
        </MyContext.Provider>
    )
}


export default withRouter(ProductList)