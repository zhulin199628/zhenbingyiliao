import React, { useState } from "react";
import {
    Table,
    Form,
    Input,
    Popconfirm,
    InputNumber,
    Alert,
    Row,
    Col,
    Pagination,
    Modal
} from 'antd';
import {EyeIcon} from "../../svg/customSvg"
import {EyeTwoTone } from '@ant-design/icons';

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


const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                    children
                )}
        </td>
    );
};

const CustomerTable = () => {
    const dataSource = [{
        key: "0",
        useTime: 3923,
        number: 11111111111,
        apptime: 3,
        wx: 1313123214,
        sex: "男",
        age: 45,
        address: "新疆乌鲁木齐",
        deviceNumber: 22222,
        loginTime: "2020-04-25 08:08:11"
    },
    {
        key: "1",
        useTime: 3923,
        number: 11111111111,
        apptime: 3,
        wx: 1313123214,
        sex: "男",
        age: 45,
        address: "新疆乌鲁木齐",
        deviceNumber: 22222,
        loginTime: "2020-04-25 08:08:11"
    }]
    const [form] = Form.useForm();
    const [data, setData] = useState({
        dataSource: dataSource,
        visiable: false
    });
    const [editingKey, setEditingKey] = useState('');

    const isEditing = record => record.key === editingKey;

    //  修改
    const edit = record => {
        form.setFieldsValue({
            number: '',
            time: '',
            wx: '',
            sex: '',
            age: '',
            deviceNumber: '',
            useTime: '',
            loginTime: '',
            ...record,
        });
        setEditingKey(record.key);
    };



    const cancel = () => {
        setEditingKey('');
    };

    //  保存修改
    const save = async key => {
        try {
            const row = await form.validateFields();
            const newData = [...data.dataSource];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };


    const remove = (key) => {
        const newData = [...data];
        setData(newData.filter(item => item.key !== key));
    }
    const editPassword = () =>{
        setData({visiable: true, dataSource: dataSource})
    }
    const columns = [
        {
            title: '手机号/邮箱',
            dataIndex: 'number',
            width: 100,
            editable: true,
        },
        {
            title: '微信号',
            dataIndex: 'wx',
            width: 100,
            editable: true,
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: 50,
            editable: true,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: '年龄',
            dataIndex: 'age',
            width: 50,
            editable: true,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: '地区',
            dataIndex: 'address',
            width: 100,
            editable: true,
            defaultSortOrder: 'descend',
        },
        {
            title: '设备数量',
            dataIndex: 'deviceNumber',
            width: 100,
            editable: true,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'APP在线时长',
            dataIndex: 'apptime',
            width: 100,
            editable: true,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: '设备使用时长(分钟)',
            dataIndex: 'useTime',
            width: 120,
            editable: true,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: '上次登录时间',
            dataIndex: 'loginTime',
            width: 100,
            editable: true,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: '操作',
            width: 150,
            dataIndex: 'operation',
            fixed: 'right',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            href="javascript:;"
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            保存
                        </a>
                        <Popconfirm title="确认取消吗" onConfirm={cancel}>
                            <a>取消</a>
                        </Popconfirm>
                    </span>
                ) : (
                        <div>
                            <a onClick =  {editPassword}>
                                修改密码
                            </a>
                            <a disabled={editingKey !== ''} className="table-a" onClick={() => edit(record)}>
                                编辑
                            </a>
                            <Popconfirm title="确定删除?" className="table-a" onConfirm={() => remove(record.key)}>
                                <a>删除</a>
                            </Popconfirm>
                        </div>
                    );
            },
        },
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: record => ({
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    //  Alert 信息
    const alertInfo = () => (
        <div>
            <span className="alert-text">今日新增：<a>4</a>人</span>
            <span className="alert-text">今日总使用时长：232323分钟</span>
            <span className="alert-text">活跃用户：<a>909090</a>人</span>
            <span className="alert-text">长时间未登录<a>2</a>人</span>
        </div>
    )

    const TableFooter = () => (
        <Row>
            <Col span={6}>
                <span className="table-bar">共400条记录<span>第1/80页</span></span>
            </Col>
            <Col span={14} offset={4}>
                <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} className="operat-pagination" />
            </Col>
        </Row>
    )

    const onChange = () => {

    }

    const handlleConfirm = () => {
        setData({ visiable: false, dataSource: dataSource });
    }

    const handleCancel = () => {
        setData({ visiable: false, dataSource: dataSource });
    }


    return (
        <>
            <Form form={form} component={false}>
                <Alert message={alertInfo()} type="info" className="product-data" showIcon />
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered={false}
                    dataSource={data.dataSource}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                    className="product-data"
                    pagination={false}
                    footer={() => TableFooter()}
                    scroll={{ x: 1300 }}
                />
            </Form>
            <Modal
                title="增加"
                visible={data.visiable}
                onOk={() => handlleConfirm()}
                onCancel={() => handleCancel()}
            >
                <ModalForm form={form} />
            </Modal>
        </>
    )
}

export default CustomerTable