import React, { useState } from "react";
import {
    Modal,
    Button,
    Form,
    Input
} from "antd";
import { EyeIcon } from "../svg/customSvg";
import { EyeTwoTone } from '@ant-design/icons';

const CategoryModal = (props) => {
    const { title, visiable, setData } = props;
    const [isShow, setState] = useState(false);
    // setState(visiable)
    const handleOk = () => {

    }
    const handleCancel = () => {
        setData(false)
    }
    return (
        <Modal
            title={title}
            handleOk={handleOk}
            visible={isShow}
            handleCancel={handleCancel}
        >
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
        </Modal>
    )
}


export default { CategoryModal }