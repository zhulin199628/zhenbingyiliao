import React, {useState} from "react";
import {
    Form,
    Input,
    Button,
    Breadcrumb,
    Card,
    Select,
    Modal,
} from 'antd';
import {EyeIcon} from "../../svg/customSvg"
import {EyeTwoTone } from '@ant-design/icons';
const FormItem = Form.Item;
const { Option } = Select;

const ModalForm = (props) => {
    return (
        <Form
            form={props.form}
        >
            <Form.Item
                label="原密码"
                name="oldPwd"
                required={
                    [
                        {
                            required: true,
                            message: "请输入原密码"
                        }
                    ]
                }
            >
                <Input placeholder="原密码" />
            </Form.Item>
            <Form.Item
                label="新密码"
                name="newPwd"
                required={
                    [
                        {
                            required: true,
                            message: "请输入新密码"
                        }
                    ]
                }
            >
                <Input.Password
                    placeholder="新密码"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeIcon />)}
                />
            </Form.Item>
        </Form>
    )
}


const MyInfomation = () => {

    const [state, setState] = useState({visiable: false});

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


    const editPassword = () =>{
        setState({ visiable: true});
    }

    const handlleConfirm = () => {
        setState({ visiable: false});
    }

    const handleCancel = () => {
        setState({ visiable: false});
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                <Breadcrumb.Item>我的信息</Breadcrumb.Item>
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
                        name="name"
                        label="姓名"
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 5, offset: 1 } }}
                        rules={
                            [
                                {
                                    required: true,
                                    message: "请输入姓名"
                                },
                                {
                                    max: 5,
                                    message: "最大长度为64"
                                },
                                {
                                    pattern: /^[\u4e00-\u9fa5]+$/,
                                    message: "请输入中文字符"
                                }
                            ]
                        }
                    >
                        <Input placeholder="请输入姓名" />
                    </FormItem>
                    <FormItem
                        name="phone"
                        label="手机号"
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 5, offset: 1 } }}
                        rules={
                            [
                                {
                                    required: true,
                                    message: "请输入手机号"
                                },
                            ]
                        }
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
                        name="editpwd"
                        label="修改密码"
                    >
                        <a onClick = {editPassword}>修改密码</a>
                    </FormItem>
                    <FormItem
                        name="authority"
                        label="角色权限"
                        rules={
                            [
                                {
                                    required: true,
                                    message: "请选择角色权限"
                                },
                            ]
                        }
                    >
                        <Select defaultValue="admin" style={{ width: 120 }} disabled>
                            <Option value="admin">管理员</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        className="button-group"
                        wrapperCol={{ offset: 4, span: 16 }}
                    >
                        <Button type="primary" onClick={() => submit()}>提交</Button>
                    </FormItem>
                </Form>
            </Card>

            <Modal
                title="增加"
                visible={state.visiable}
                onOk={() => handlleConfirm()}
                onCancel={() => handleCancel()}
            >
                <ModalForm form={form} />
            </Modal>
        </>
    )
}

export default MyInfomation