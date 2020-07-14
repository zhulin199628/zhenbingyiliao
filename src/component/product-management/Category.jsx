import React, { useState, useEffect } from "react";
import {
    Breadcrumb,
    Card,
    Button,
    Form,
    Input,
    Modal
} from 'antd'
import CategoryTable from "./categoryTable"
import {
    PlusOutlined,
} from '@ant-design/icons'

const ModalForm = (props) => {
    return (
        <Form
            form={props.form}
        >
            <Form.Item
                label="类别"
                name="addCategory"
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


const Category = (props) => {
    const [visiable, showModal] = useState(false);
    const [form] = Form.useForm();
    const handlleConfirm = () => {
        const { addCategory } = form.getFieldsValue();
        // console.log(form.getFieldsValue());
        showModal(false)
    }

    const handleCancel = () => {
        showModal(false)
    }

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>产品管理</Breadcrumb.Item>
                <Breadcrumb.Item>产品类别</Breadcrumb.Item>
            </Breadcrumb>
            <Card className="prolist-card">
                <div className="table-header">
                    <div className="operat-container">
                        <Button icon={<PlusOutlined />} type="primary" onClick={() => showModal(true)}>增加</Button>
                    </div>
                </div>
                <CategoryTable />
            </Card>

            <Modal
                title="增加"
                visible={visiable}
                onOk={() => handlleConfirm()}
                onCancel={() => handleCancel()}
            >
                <ModalForm form={form} />
            </Modal>
        </div>
    )
}

export default Category