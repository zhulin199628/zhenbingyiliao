import React, { useState } from "react";
import {
    Table,
    Form,
    Input,
    Popconfirm,
    InputNumber,
    Switch,
    Row,
    Col,
    Pagination,
    Button,
    Modal,
} from 'antd';
import { EyeIcon } from "../../svg/customSvg";
import { EyeTwoTone } from '@ant-design/icons';
import ModalForm from "../Modal";


// const ModalForm = (props) => {
//     return (
//         <Form
//             form={props.form}
//         >
//             <Form.Item
//                 label="原密码"
//                 name="oldPwd"
//                 required={
//                     [
//                         {
//                             required: true,
//                             message: "请输入原密码"
//                         }
//                     ]
//                 }
//             >
//                 <Input placeholder="原密码" />
//             </Form.Item>
//             <Form.Item
//                 label="新密码"
//                 name="newPwd"
//                 required={
//                     [
//                         {
//                             required: true,
//                             message: "请输入新密码"
//                         }
//                     ]
//                 }
//             >
//                 <Input.Password
//                     placeholder="新密码"
//                     iconRender={visible => (visible ? <EyeTwoTone /> : <EyeIcon />)}
//                 />
//             </Form.Item>
//         </Form>
//     )
// }


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

const OperationTable = () => {
    const dataSource = [{
        key: "0",
        dataIndex: "0",
        name: "12345",
        username: "张三",
        phone: "12345678900",
        company: "公司名称",
        statu: true,
        role: "管理员",
        time: "2020--01-02 08:00:00",
    },
    {
        key: "1",
        dataIndex: "1",
        name: "12345",
        username: "李四",
        phone: "12345678900",
        company: "公司名称",
        statu: false,
        role: "超级管理员",
        time: "2020--01-02 08:00:00",
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
            name: '',
            username: '',
            phone: '',
            company: '',
            role: '',
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


    const editPassword = () => {
        setData({ visiable: true, dataSource: dataSource });
    }
    const columns = [
        {
            title: '用户名',
            dataIndex: 'name',
            width: '10%',
            editable: true,
        },
        {
            title: '姓名',
            dataIndex: 'username',
            width: '8%',
            editable: true,
        },
        {
            title: '手机号/邮箱',
            dataIndex: 'phone',
            width: '12%',
            editable: true,
        },
        {
            title: '归属公司',
            dataIndex: 'company',
            width: '20%',
            editable: true,
        },
        {
            title: '角色',
            dataIndex: 'role',
            width: '10%',
            editable: true,
        },
        {
            title: '状态',
            dataIndex: 'statu',
            width: '9%',
            render: (_, record) =>
                (record.statu === true ?
                    <Switch checkedChildren="启用中" unCheckedChildren="禁用中" defaultChecked={true} />
                    :
                    <Switch checkedChildren="启用中" unCheckedChildren="禁用中" defaultChecked={false} />
                )
        },
        {
            title: '创建时间',
            dataIndex: 'time',
            width: '16%',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '15%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button
                            type="link"
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            保存
                        </Button>
                        <Popconfirm title="确认取消吗" onConfirm={cancel}>
                            <Button type="link">取消</Button>
                        </Popconfirm>
                    </span>
                ) : (
                        <div>
                            <Button type="link" onClick={editPassword}>
                                修改密码
                            </Button>
                            <Button type="link" disabled={editingKey !== ''} className="table-a" onClick={() => edit(record)}>
                                编辑
                            </Button>·
                        </div>
                    );
            }
        },
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: record => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                name: col.name,
                username: col.username,
                phone: col.phone,
                statu: col.statu,
                time: col.time,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const onChange = () => {
    }

    const handlleConfirm = () => {
        setData({ visiable: false, dataSource: dataSource });
    }

    const handleCancel = () => {
        setData({ visiable: false, dataSource: dataSource });
    }


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

    return (
        <>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    dataSource={data.dataSource}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    className="product-data"
                    pagination={false}
                    footer={() => TableFooter()}
                />
            </Form>

            <ModalForm.CategoryModal setData = {setData} visiable = {data.visiable} title ="修改密码"/>

            {/* <Modal
                title="增加"
                visible={data.visiable}
                onOk={() => handlleConfirm()}
                onCancel={() => handleCancel()}
            >
                <ModalForm form={form} />
            </Modal> */}
        </>
    )
}

export default OperationTable