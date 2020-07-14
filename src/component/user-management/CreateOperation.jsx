import React, { useState } from "react"
import {
    Form,
    Card,
    Button,
    Select,
    Input,
    Breadcrumb
} from "antd"
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },

    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20, offset: 1 },
    },
};
const FormItem = Form.Item;
const CreateOperation = () => {
    const [form] = Form.useForm();
    const save = () => {

    }

    const cancel = () => { }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                <Breadcrumb.Item>运营管理</Breadcrumb.Item>
                <Breadcrumb.Item>新建</Breadcrumb.Item>
            </Breadcrumb>
            <Card>
                <Form {...formItemLayout}>
                    <FormItem
                        name="username"
                        label="用户名"
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 5, offset: 1 } }}
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                        ]}
                    >
                        <Input placeholder="请输入用户名" />
                    </FormItem>
                    <FormItem
                        name="name"
                        label="姓名"
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 5, offset: 1 } }}
                        rules={[
                            {
                                required: true,
                                message: '请输入姓名',
                            },
                        ]}
                    >
                        <Input placeholder="请输入姓名" />
                    </FormItem>
                    <FormItem
                        name="phone"
                        label="手机号"
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 5, offset: 1 } }}
                    >
                        <Input placeholder="请输入手机号" />
                    </FormItem>
                    <FormItem
                        name="email"
                        label="邮箱"
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 5, offset: 1 } }}
                    >
                        <Input placeholder="请输入邮箱" />
                    </FormItem>
                    <FormItem
                        name="company"
                        label="归属公司"
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 5, offset: 1 } }}
                    >
                        <Input placeholder="请输入归属公司" />
                    </FormItem>
                    <FormItem
                        name="role"
                        label="角色"
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 5, offset: 1 } }}
                    >
                        <Select defaultValue="admin" style={{ width: 120 }}>
                            <Option value="admin">管理员</Option>
                            <Option value="superadmin">超级管理员</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        className="button-group"
                        wrapperCol={{ offset: 4, span: 16 }}
                    >
                        <Button type="primary" onClick={() => save()}>保存</Button>
                        <Button onClick={() => cancel()}>取消</Button>
                    </FormItem>
                </Form>
            </Card>
        </>
    )

}

export default CreateOperation