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
    Pagination
} from 'antd';
import { Link } from 'react-router-dom';
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

const PopTable = () => {
    const dataSource = [{
        key: "0",
        dataIndex: "0",
        theme: "张三",
        appRange: "管理员",
        readUsers: "24",
        company: "公司名称",
        statu: true,
        time: "2020--01-02 08:00:00",
    },
    {
        key: "1",
        dataIndex: "0",
        theme: "李四",
        appRange: "客户管理员",
        readUsers: "245",
        company: "公司名称",
        statu: false,
        time: "2020--01-02 08:00:00",
    }]
    const [form] = Form.useForm();
    const [data, setData] = useState(dataSource);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = record => record.key === editingKey;
    //  修改
    const edit = record => {
        form.setFieldsValue({
            theme: '',
            appRange: '',
            readUsers: '',
            company: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };


    const remove = (key) => {
        const newData = [...data];
        setData(newData.filter(item => item.key !== key));
    }

    //  保存修改
    const save = async key => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
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

    const columns = [
        {
            title: '主题',
            dataIndex: 'theme',
            width: '10%',
            editable: true,
        },
        {
            title: '应用范围',
            dataIndex: 'appRange',
            width: '15%',
            editable: true,
        },
        {
            title: '已读用户',
            dataIndex: 'readUsers',
            width: '10%',
            editable: true,
        },
        {
            title: '归属公司',
            dataIndex: 'company',
            width: '20%',
            editable: true,
        },
        {
            title: '发布时间',
            dataIndex: 'time',
            width: '20%',
        },
        {
            title: '状态',
            dataIndex: 'statu',
            width: '10%',
            render: (_, record) =>
                (record.statu === true ?
                    <Switch checkedChildren="发布中" unCheckedChildren="未发布" defaultChecked={true} />
                    :
                    <Switch checkedChildren="发布中" unCheckedChildren="未发布" defaultChecked={false} />
                )
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '15%',
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
                            <a>
                                查看
                            </a>
                            {
                                record.statu === true ?
                                    <span></span>
                                    :
                                    <span>
                                        <a disabled={editingKey !== ''} className="table-a" onClick={() => edit(record)}>
                                            编辑
                                        </a>
                                        <Popconfirm title="确定删除?" className="table-a" onConfirm={() => remove(record.key)}>
                                            <a>删除</a>
                                        </Popconfirm>
                                    </span>
                            }
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
                theme: col.theme,
                appRange: col.appRange,
                readUsers: col.readUsers,
                company: col.company,
                time: col.time,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                className="product-data"
                pagination={false}
            />
        </Form>
    )
}

export default PopTable