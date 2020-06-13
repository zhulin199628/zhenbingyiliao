import React from "react";
import { Breadcrumb } from 'antd'
class Pop extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>通知管理</Breadcrumb.Item>
                    <Breadcrumb.Item>运营管理</Breadcrumb.Item>
                </Breadcrumb>
                <span>通知管理</span>
            </div>
        )
    }
}

export default Pop