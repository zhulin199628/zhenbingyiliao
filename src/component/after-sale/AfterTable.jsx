import React, { useState } from "react";
import {
    Table,
    Form,
    Input,
    Popconfirm,
    InputNumber,
    Badge
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

const AfterTable = () => {
    const dataSource = [{
        dataIndex: "0",
        name: "李明",
        contactway: "12345678900",
        problem: "这里是问题记录详情",
        statu: true,
        time: "2020--01-02 08:00:00",
    },
    {
        dataIndex: "0",
        name: "李明",
        contactway: "12345678900",
        problem: "这里是问题记录详情",
        statu: false,
        time: "2020--01-02 08:00:00",
    }]
    const [form] = Form.useForm();
    const [data, setData] = useState(dataSource);

    const close = (key) => {
        const newData = [...data];
        setData(newData.filter(item => item.key !== key));
    }

    const view = () => {

    }

    const columns = [
        {
            title: '用户名',
            dataIndex: 'name',
            width: '11%',
        },
        {
            title: '手机号/邮箱',
            dataIndex: 'contactway',
            width: '16%',
        },
        {
            title: '问题详情',
            dataIndex: 'problem',
            width: '25%',
        },
        {
            title: '状态',
            dataIndex: 'statu',
            width: '15%',
            render: (_, record) =>
                (record.statu === true ? <Badge color="green" text="已处理" /> : <Badge color="red" text="待处理" />)
        },
        {
            title: '创建时间',
            dataIndex: 'time',
            width: '18%',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '15%',
            render: (_, record) =>
                (
                    <div>
                        <Link to="/zhenbing/after-sale/view-scale-detaile">
                            查看
                            </Link>
                        <Popconfirm title="确认关闭吗?" className="table-a" onConfirm={() => close(record.key)}>
                            <a>关闭</a>
                        </Popconfirm>
                    </div>
                )
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
                contactWay: col.contactway,
                problem: col.problem,
                statu: col.statu,
                time: col.time,
                dataIndex: col.dataIndex,
                title: col.title,
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
            />
        </Form>
    )
}

export default AfterTable