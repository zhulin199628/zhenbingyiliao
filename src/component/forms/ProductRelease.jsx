import React, { useState, useEffect } from "react";
import {
    Form,
    Input,
    Select,
    InputNumber,
    Radio,
    DatePicker,
    Button,
    Breadcrumb,
    Card
} from 'antd';
import UploadImg from '../product-management/UploadImg';
import { useLocation } from "react-router-dom";
import API from "../../api/index";
const _API = new API();
const FormItem = Form.Item;
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

const ProducRelease = (props) => {

    const location = useLocation();
    const [form] = Form.useForm();
    const [state, setState] = useState({
        proImages: [],
    });
    const [data, setData] = useState("")

    useEffect(() => {
        if (location.query) {
            console.log("--1");
            
            window.sessionStorage.setItem('proediturl', JSON.stringify(location.query.data))
            setData(location.query.data)
        } else {
            console.log(window.sessionStorage.proediturl,"--2");
            setData(JSON.parse(window.sessionStorage.proediturl))
        }

        console.log(data);
        
        form.setFieldsValue({
            name: data.name
        })
        // if (location.pathname === "/zhenbing/product/eidt") {
        //     form.setFieldsValue({
        //         name: props.data != undefined ? props.data.name : ""
        //     })
        // }
    }, [])



    const selectBefore = (
        <Select defaultValue="http://" className="select-before">
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    );

    const validateForm = () => {

    }


    const priority = () => {

    }

    const putOnShelves = () => {

    }

    const changeTime = () => {

    }

    const submit = () => {
        let { category, detPicture, jdUrl, name, priority, putOnTime, sellpint, tmUrl } = form.getFieldsValue();

        const formData = new FormData();
        state.proImages.forEach(file => {
            formData.append('image', file);
        });
        let uploadPicture = _API.uploadProductImage(formData);
        let uploadData = _API.add()

        // _API.uploadProductImage(formData).then(res => {
        //     console.log(res, "-----res");
        // })

        // form.validateFields(["category", "jdUrl", "name", "picture", "priority", "sellpint", "tmUrl"]);
        // let { category, detPicture, jdUrl, name, picture, priority, putOnTime, sellpint, tmUrl } = form.getFieldsValue();
        // console.log({ category, detPicture, jdUrl, name, picture, priority, putOnTime, sellpint, tmUrl })

    }

    const save = () => {



    }

    const preview = () => {

    }

    const deleteProduct = () => {

    }

    const getProImgData = (value) => {
        setState({
            proImages: value
        })
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>产品管理</Breadcrumb.Item>
                <Breadcrumb.Item>产品列表</Breadcrumb.Item>
                <Breadcrumb.Item>发布产品</Breadcrumb.Item>
            </Breadcrumb>
            <Card>
                <Form
                    {...formItemLayout}
                    name="release"
                    form={form}
                >
                    <FormItem
                        name="name"
                        label="产品名称"
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 5, offset: 1 } }}
                        rules={[
                            {
                                required: true,
                                message: '请输入产品名称',
                            },
                            {
                                max: 64,
                                message: "最大长度为64"
                            },
                            {
                                pattern: /^[\u4e00-\u9fa5]+$/,
                                message: "请输入中文字符"
                            }
                        ]}
                    >
                        <Input placeholder="最多支持64中文字符" />
                    </FormItem>

                    <FormItem
                        name="category"
                        label="产品类别"
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 5, offset: 1 } }}
                        rules={[
                            {
                                required: true,
                                message: '请选择产品类别',
                            },
                        ]}
                    >
                        <Select placeholder="请选择产品类别">
                            <Option value="mc">脉冲理疗</Option>
                            <Option value="ym">医美理疗</Option>
                            <Option value="ym">手持检测</Option>
                            <Option value="ym">高阶检测</Option>
                        </Select>
                    </FormItem>

                    <FormItem
                        name="sellpint"
                        label="产品卖点"
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 15, offset: 1 } }}
                        rules={[
                            {
                                required: true,
                                message: '请输入产品卖点',
                            },
                        ]}
                    >
                        <Input placeholder="在产品详情页标题下面展示产品简介或卖点信息，建议36个字以内" />
                    </FormItem>
                    <FormItem
                        name="picture"
                        label="产品图片"
                    >
                        <UploadImg proLable="proImg" getProImgData={getProImgData} />
                    </FormItem>
                    <FormItem
                        name="detPicture"
                        label="产品详情图"
                    >
                        <UploadImg proLable="proDeImg" />
                    </FormItem>
                    <FormItem
                        name="priority"
                        label="优先级"
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 5, offset: 1 } }}
                        rules={[
                            {
                                type: 'number',
                                message: "请输入数字"
                            },
                        ]}
                    >
                        <InputNumber className="priority-inpnumber" placeholder="数字越大优先级越低" />
                    </FormItem>

                    <FormItem
                        name="jdUrl"
                        label="京东购买链接"
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 15, offset: 1 } }}
                    >
                        <Input addonBefore={selectBefore} addonAfter=".com" placeholder="请输入" />
                    </FormItem>

                    <FormItem
                        name="tmUrl"
                        label="天猫购买链接"
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 15, offset: 1 } }}
                    >
                        <Input addonBefore={selectBefore} addonAfter=".com" placeholder="请输入" />
                    </FormItem>

                    <FormItem
                        name="putOnTime"
                        label="上架时间"
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                        ]}
                    >
                        <Radio.Group defaultValue="no" onChange={putOnShelves}>
                            <Radio value="now">立即上架</Radio>
                            <Radio value="custom" className="custom-time-lable">自定义上架时间</Radio>
                            <DatePicker onChange={changeTime} suffixIcon={<span></span>} className="custom-time" />
                            <Radio value="no">暂不上架</Radio>
                        </Radio.Group>
                    </FormItem>
                    <FormItem
                        className="button-group"
                        wrapperCol={{ offset: 4, span: 16 }}
                    >
                        <Button type="primary" onClick={() => submit()}>提交</Button>
                        <Button onClick={() => save()}>保存</Button>
                        <Button onClick={() => preview()}>预览</Button>
                        <Button danger onClick={() => deleteProduct()}>删除</Button>
                    </FormItem>
                </Form>
            </Card>
        </>

    )
}


export default ProducRelease