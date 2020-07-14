import React, { useState } from "react"
import {
    Form,
    Card,
    Input,
    Button,
    Breadcrumb
} from "antd"

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
const ViewProduct = () => {
    const [form] = Form.useForm();
    const [state, setState] = useState(false);

    const edit = () => {
        setState(true)
    }
    return (
        <Card>
            <Breadcrumb>
                <Breadcrumb.Item>产品管理</Breadcrumb.Item>
                <Breadcrumb.Item>产品列表</Breadcrumb.Item>
                <Breadcrumb.Item>查看</Breadcrumb.Item>
            </Breadcrumb>
            {
                state ?
                    <Form
                        form={form}
                        {...formItemLayout}
                    >
                        <Form.Item
                            label="产品名称"
                            name="viewProname"
                        >
                            <Input placeholder="产品名称" />
                        </Form.Item>
                        <Form.Item
                            label="产品类别"
                            name="viewCategory"
                        >
                            <Input placeholder="产品名称" />
                        </Form.Item>
                        <Form.Item
                            label="产品卖点"
                            name="viewSelling"
                        >
                            <Input placeholder="产品卖点" />
                        </Form.Item>
                        <Form.Item
                            label="产品图片"
                        >

                        </Form.Item>
                        <Form.Item
                            label="主图视频"
                        >

                        </Form.Item>
                        <Form.Item
                            label="京东购买链接"
                        >
                            <Input placeholder="京东购买链接" />
                        </Form.Item>
                        <Form.Item
                            label="天猫购买链接"
                        >
                            <Input placeholder="天猫购买链接" />
                        </Form.Item>
                    </Form>
                    :
                    <Form
                        form={form}
                        {...formItemLayout}
                    >
                        <Form.Item
                            label="产品名称"
                        >
                            <span>这里是产品名称</span>
                        </Form.Item>
                        <Form.Item
                            label="产品类别"
                        >
                            <span>脉冲理疗</span>
                        </Form.Item>
                        <Form.Item
                            label="产品买点"
                        >
                            <span>产品卖点内容</span>
                        </Form.Item>
                        <Form.Item
                            label="产品图片"
                        >

                        </Form.Item>
                        <Form.Item
                            label="主图视频"
                        >

                        </Form.Item>
                        <Form.Item
                            label="京东购买链接"
                        >
                        </Form.Item>
                        <Form.Item
                            label="天猫购买链接"
                        >
                        </Form.Item>
                    </Form>
            }

            <Form {...formItemLayout} wrapperCol={{ offset: 4, span: 16 }}>
                <Form.Item className="button-group">
                    <Button type="primary" onClick={edit}>编辑</Button>
                    <Button>上架</Button>
                    <Button danger>删除</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default ViewProduct