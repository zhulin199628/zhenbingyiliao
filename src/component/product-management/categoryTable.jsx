import React, { useState } from "react";
import {
    Table,
    Form,
    Input,
    Popconfirm,
    InputNumber,
    Button
} from 'antd';
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

const CategoryTable = () => {
    const dataSource = [{
        key: "1",
        category: "脉冲理疗",
        number: 12,
        time: "2020-04-25 08:08:11",
    }]
    const [form] = Form.useForm();
    const [data, setData] = useState(dataSource);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = record => record.key === editingKey;

    //  修改
    const edit = record => {
        form.setFieldsValue({
            category: '',
            number: '',
            time: '',
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

    const removeAll = (key) => {
        const newData = [...data];
        setData(newData.filter(item => item.key !== key));
    }

    const columns = [
        {
            title: '类别',
            dataIndex: 'category',
            width: '25%',
            editable: true,
        },
        {
            title: '商品数量',
            dataIndex: 'number',
            width: '15%',
            editable: true,
        },
        {
            title: '创建时间',
            dataIndex: 'time',
            width: '40%',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button type = "link"
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            保存
                        </Button>
                        <Popconfirm title="确认取消吗" onConfirm={cancel}>
                            <Button type = "link">取消</Button>
                        </Popconfirm>
                    </span>
                ) : (
                        <div>
                            <Button type = "link" disabled={editingKey !== ''} onClick={() => edit(record)}>
                                编辑
                            </Button>
                            <Popconfirm title="确认全部下架吗?" className="table-a" onConfirm={() =>removeAll(record.key)}>
                                <Button type = "link">全部下架</Button>
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
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
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
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                className="product-data"
                pagination = {false}
            />
        </Form>
    )
}

export default CategoryTable