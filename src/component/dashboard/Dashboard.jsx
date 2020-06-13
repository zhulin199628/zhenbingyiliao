import React from "react";
import { Card, Col, Row, Breadcrumb } from 'antd';
import DayJumps from "./DayJumps";
import Sexratio from "./Sexratio";
import InterviewTime from "./InterviewTime";
import Sales from "./Sales";
import UserTotal from "./UserTotal";
import DeviceTotal from "./DeviceTotal";
import UserAreaDistributed from "./UserAreaDistributed";
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="site-card-wrapper">
                <Breadcrumb>
                    <Breadcrumb.Item>概览</Breadcrumb.Item>
                    <Breadcrumb.Item>看板</Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="header-card-container">
                    <Col span={6}>
                        <UserTotal />
                    </Col>
                    <Col span={6}>
                        <DeviceTotal />
                    </Col>
                    <Col span={6}>
                        <DayJumps />
                    </Col>
                    <Col span={6}>
                        <Sexratio />
                    </Col>
                </Row>
                <div>
                    <Sales />
                </div>
                <div>
                    <UserAreaDistributed />
                </div>
                <div>
                    <InterviewTime />
                </div>
            </div>
        )
    }
}

export default Dashboard