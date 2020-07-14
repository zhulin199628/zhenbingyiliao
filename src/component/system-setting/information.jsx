import React from "react";
import { Breadcrumb, Card } from 'antd'
import MyInformation from "../forms/MyInfomation"
class Information extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <MyInformation />
            </div>
        )
    }
}

export default Information