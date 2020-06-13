import React from "react";
import {Card,Tooltip} from 'antd';
import {
    InfoCircleOutlined,
    CaretUpOutlined,
    CaretDownOutlined,
} from '@ant-design/icons';
import API from "../../api/index";
import times from "../../utils/time.js";

const { lastweek_firstday, lastweek_lastday, thisweek_firstday, thisweek_lastday, today, yesterday } = times;
const _API = new API();
class DeviceTotal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allDevice: null,
            loading: false,
            dayDevices: null,
            deviceYoY: "",
            deviceMoM: "",
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        //  设备日环比
        let yesterday_device = _API.getDeviceIsonlineStatsByDay(yesterday, yesterday);
        let today_device = _API.getDeviceIsonlineStatsByDay(today, today);
        //  设备周同比
        let lastweek_device = _API.getDeviceIsonlineStatsByDay(lastweek_firstday, lastweek_lastday);
        let thisweek_device = _API.getDeviceIsonlineStatsByDay(thisweek_firstday, thisweek_lastday);
        //  设备总数
        let allDevice = _API.getDeviceCountStatsByApp();

        Promise.all([yesterday_device, today_device, lastweek_device, thisweek_device, allDevice]).then(allData => {
            let yesDevice = allData[0];
            let todayDevice = allData[1];
            let yesTotal = 0;
            let todayTotal = 0;
            if (todayDevice.length > 0) {
                this.setState({ dayDevices: todayDevice[0].online })
                todayTotal = todayDevice[0].online;
            } else {
                this.setState({ dayDevices: 0 });
            }
            if (yesDevice.length > 0) {
                yesTotal = yesDevice[0].online
            }

            if (yesTotal > 0) {
                let MoM = (parseInt(todayTotal) - parseInt(yesTotal)) / parseInt(yesTotal) * 0.01;
                this.setState({
                    deviceMoM: Math.abs(MoM.toFixed(2)) === 0 ? Math.abs(MoM.toFixed(2)) : MoM.toFixed(2)
                })
            } else {
                this.setState({
                    deviceMoM: "——"
                })
            }

            let lastData = allData[2];
            let thisData = allData[3];
            let lastTotal = 0;
            let thisTotal = 0;
            for (let i = 0; i < lastData.length; i++) {
                lastTotal += parseInt(lastData[i].online)
            }
            for (let i = 0; i < thisData.length; i++) {
                thisTotal += parseInt(thisData[i].online)
            }
            let dYOY = ((thisTotal - lastTotal) / 0.01 * 0.01).toFixed(2);
            this.setState({
                deviceYoY:Math.abs(dYOY) === 0 ? Math.abs(dYOY) : dYOY
            })

            let dataCount = allData[4];
            this.setState({
                allDevice: dataCount.count,
                loading: false
            });
        })
    }

    allDevices = () => {
        return (
            <div>
                <div>
                    <span className = "custom-font">设备总数</span> 
                    <Tooltip title="只统计蓝牙设备ID数量" color = "#ffffff">
                        <InfoCircleOutlined style={{ paddingLeft: 10, color: "#8e8e8e" }}  />
                    </Tooltip>
                </div>
                <div className="number">{this.state.allDevice}</div>
            </div>
        )
    }

    render() {
        return (
            <Card
                title={this.allDevices()}
                loading={this.state.loading}
                headStyle={{ border: "none", position: "relative" }}
                bodyStyle={{ paddingTop: 0 }}
                extra={
                        <span className="cardTitleicon">
                            <img src={require("../../style/imgs/mesh.png")} alt="" />
                        </span>
                }
                className="custom-card-container"
            >

                <div className="scale-container">
                    <div className="scale">
                        <span className = "custom-font-content">
                            周同比
                                        <span className="scale-icon">
                                {
                                    this.state.deviceYoY >= 0 ?
                                        <CaretUpOutlined style={{ color: "#4F81F7" }} />
                                        :
                                        <CaretDownOutlined style={{ color: "#ED8076" }} />
                                }
                            </span>
                        </span>
                        <span className="scale-number"
                            style={this.state.deviceYoY >= 0 ? { color: "#4F81F7" } : { color: "#ED8076" }}
                        >
                            {`${this.state.deviceYoY}%`}
                        </span>
                    </div>
                    <div className="scale">
                        <span className = "custom-font-content">
                            日环比
                                        <span className="scale-icon">
                                {
                                    !isNaN(this.state.deviceMoM) ?
                                        this.state.deviceMoM >= 0 ?
                                            <CaretUpOutlined style={{ color: "#4F81F7" }} />
                                            :
                                            <CaretDownOutlined style={{ color: "#ED8076" }} />
                                        :
                                        ""
                                }
                            </span>
                        </span>
                        <span className="scale-number"
                            style={this.state.deviceMoM >= 0 ? { color: "#4F81F7" } : { color: "#ED8076" }}
                        >
                            {
                                !isNaN(this.state.deviceMoM) ?
                                    `${this.state.deviceMoM} %`
                                    :
                                    <span style = {{color:"#000000"}}>——</span>
                            }
                        </span>
                    </div>
                </div>
                <div className="bottom-info">
                    <span>日活跃设备总量</span>
                    <span className="bottom-number">{this.state.dayDevices}</span>
                </div>
            </Card>
        )
    }
}

export default DeviceTotal