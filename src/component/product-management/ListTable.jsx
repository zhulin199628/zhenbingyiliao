import React, { useState, useEffect, useContext } from "react";
import {
    Table,
    Form,
    Input,
    Popconfirm,
    InputNumber,
    Button,
    Avatar,
    Tooltip
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
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


const TableElement = (props) => {
    let history = useHistory();
    let { data, setData } = useContext(props.MyContext);
    const [selectionType] = useState('checkbox');
    const [form] = Form.useForm();

    const deleteRow = (key) => {
        const newData = [...data.data];
        setData(newData.filter(item => item.key !== key));
    }

    const columns = [
        {
            title: '产品名称',
            dataIndex: 'name',
            editable: true,
            width: 150,
            ellipsis: true,
            render: (_, record) => (
                <Tooltip title={record.description}>
                    <div className="product-table-name">
                        <div><Avatar shape="square" size={64} src={record.picture[0]} /></div>
                        <div className="product-table-content">
                            <h3>{record.name}</h3>
                            <p className="ellipsis">{record.description}</p>
                        </div>
                    </div>
                </Tooltip>
            )
        },
        {
            title: '产品类别',
            dataIndex: 'category',
            width: 100
        },
        {
            title: '访问量',
            dataIndex: 'views',
            width: 100
        },
        {
            title: '创建人',
            dataIndex: 'people',
            width: 100
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            width: 100
        },
        {
            title: '创建时间',
            dataIndex: 'time',
            width: 150
        },
        {
            title: '操作',
            dataIndex: 'operate',
            width: 140,
            fixed: "right",
            render: (_, record) =>
                (
                    <span>
                        <Button type = "link" onClick={() => history.push({ pathname: "/zhenbing/product/eidt", query: { data: record } })}>
                            编辑
                            </Button>
                        <Link className="table-a" to="/zhenbing/product/view">
                            查看
                            </Link>
                        <Button type="link" style={{ color: "#B2FF77" }} className="table-a">
                            上架
                            </Button>
                        <Popconfirm title="确定删除吗?" onConfirm={() => deleteRow(record.key)}>
                            <Button type="link" className="table-a">删除</Button>
                        </Popconfirm>
                    </span>

                )
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            props.checkBoxData({ selectedRows });
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: record => ({
                record,
                inputType: col.dataIndex === 'views' ? 'number' : 'text',
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
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={mergedColumns}
                className="product-data"
                dataSource={data.data}
                scroll={{ x: 1500 }}
            >
            </Table>
        </Form>
    )
}

export default TableElement