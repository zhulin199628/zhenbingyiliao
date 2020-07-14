import React from "react";
import {
    Form,
    Input,
    Button,
    Breadcrumb,
    Card
} from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;
const AddScale = () => {

    const [form] = Form.useForm();

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

    const submit = () => {
        form.validateFields()

    }

    const deleteScaleDetaile = () => {

    }


    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>售后管理</Breadcrumb.Item>
                <Breadcrumb.Item>售后列表</Breadcrumb.Item>
                <Breadcrumb.Item>售后列表</Breadcrumb.Item>
            </Breadcrumb>
            <Card>
                <Form
                    {...formItemLayout}
                    name="release"
                    form={form}
                >
                    <FormItem
                        name="username"
                        label="用户名"
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 5, offset: 1 } }}
                        rules={
                            [
                                {
                                    required: true,
                                    message: "请输入用户名"
                                }
                            ]
                        }
                    >
                        <Input placeholder="请输入用户名" />
                    </FormItem>
                    <FormItem
                        name="contactway"
                        label="手机号/邮箱"
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 5, offset: 1 } }}
                        rules={
                            [
                                {
                                    required: true,
                                    message: "请输入用户联系方式"
                                },
                            ]
                        }
                    >
                        <Input placeholder="请输入用户联系方式" />
                    </FormItem>
                    <FormItem
                        name="detaile"
                        label="问题详情"
                        rules={
                            [
                                {
                                    required: true,
                                    message: "请输入内容"
                                },
                            ]
                        }
                    >
                        <TextArea placeholder="请输入内容" rows={8} />
                    </FormItem>
                    <FormItem
                        className="button-group"
                        wrapperCol={{ offset: 4, span: 16 }}
                    >
                        <Button type="primary" onClick={() => submit()}>提交</Button>
                        <Button danger onClick={() => deleteScaleDetaile()}>删除</Button>
                    </FormItem>
                </Form>
            </Card>
        </>
    )
}

export default AddScale