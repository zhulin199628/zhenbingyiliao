import React from "react";
import {Card} from 'antd';
import { CaretUpOutlined,CaretDownOutlined,} from '@ant-design/icons';
import API from "../../api/index";
import times from "../../utils/time.js";
const { lastweek_firstday, lastweek_lastday, thisweek_firstday, thisweek_lastday, today, yesterday } = times;
const _API = new API();
class UserTotal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allUser: null,
            loading: false,
            dayDevices: null,
            deviceYoY: "",
            deviceMoM: "",
        }
    }

    componentDidMount() {
        /**
         *   日环比  =  本次数据 - 上次数据 /  上次数据 * 100%
         *  周同比 = 本期数据 - 上期数据 / 上期数据 * 100%
         */
        this.setState({ loading: true })
        //  用户周同比
        let lastweek_data = _API.getActiveUserStatsByDay(lastweek_firstday, lastweek_lastday);
        let thisweek_data = _API.getActiveUserStatsByDay(thisweek_firstday, thisweek_lastday);
        //  用户日环比
        let yesterday_data = _API.getActiveUserStatsByDay(yesterday, yesterday);
        let today_data = _API.getActiveUserStatsByDay(today, today);
        let allUser = _API.getUserCountStatsByApp();

        Promise.all([lastweek_data, thisweek_data, yesterday_data, today_data, allUser]).then(allData => {
            let lastData = allData[0];
            let thisData = allData[1];
            let lastTotal = 0;
            let thisTotal = 0;
            for (let i = 0; i < lastData.length; i++) {
                lastTotal += parseInt(lastData[i].number)
            }
            for (let i = 0; i < thisData.length; i++) {
                thisTotal += parseInt(thisData[i].number)
            }
            let yesData = allData[2];
            let todayData = allData[3];
            let yesTotal = 0;
            let todayTotal = 0;
            if (todayData.length > 0) {
                //  日活跃用户数
                this.setState({ dayUsers: todayData[0].number })
                todayTotal = todayData[0].number
            } else {
                this.setState({ dayUsers: 0 })
            }
            if (yesData.length > 0) {
                yesTotal = yesData[0].number
            }

            if (parseInt(yesTotal) > 0) {
                let MoM = (parseInt(todayTotal) - parseInt(yesTotal)) / parseInt(yesTotal) * 0.01;
                this.setState({
                    userMoM: Math.abs(MoM.toFixed(2)) === 0 ? Math.abs(MoM.toFixed(2)) : MoM.toFixed(2)
                })
            } else {
                this.setState({
                    userMoM: "——"
                })
            }
            let uYOY =  ((thisTotal - lastTotal) / 0.01 * 0.01).toFixed(2);
            this.setState({
                allUser: allData[4].count,
                loading: false,
                userYoY: Math.abs(uYOY) === 0 ? Math.abs(uYOY) : uYOY
            })
        })
    }

    allUsers = () => {
        return (
            <div>
                <div className = "custom-font">
                    总注册用户数
                </div>
                <div className="number">{this.state.allUser}</div>
            </div>
        )
    }

    render() {
        return (
            <Card
                title={this.allUsers()}
                loading={this.state.loading}
                extra={
                        <span className="cardTitleicon">
                            <img src={require("../../style/imgs/cartUser.png")} alt="" />
                        </span>
                }
                headStyle={{ border: "none", position: "relative" }}
                bodyStyle={{ paddingTop: 0 }}
                className="custom-card-container"
            >
                <div className="scale-container">
                    <div className="scale">
                        <span className = "custom-font-content">
                            周同比
                                        <span className="scale-icon">
                                {

                                    this.state.userYoY >= 0 ?
                                        <CaretUpOutlined style={{ color: "#4F81F7" }} />
                                        :
                                        <CaretDownOutlined style={{ color: "#ED8076" }} />
                                }
                            </span>
                        </span>
                        <span className="scale-number"
                            style={this.state.userYoY >= 0 ? { color: "#4F81F7" } : { color: "#ED8076" }}>
                            {`${this.state.userYoY}%`}
                        </span>
                    </div>
                    <div className="scale">
                        <span className = "custom-font-content">
                            日环比
                                        <span className="scale-icon">
                                {
                                    !isNaN(this.state.userMoM) ?
                                        this.state.userMoM >= 0 ?
                                            <CaretUpOutlined style={{ color: "#4F81F7" }} />
                                            :
                                            <CaretDownOutlined style={{ color: "#ED8076" }} />
                                        :
                                        ""
                                }
                            </span>
                        </span>
                        <span className="scale-number"
                            style={this.state.userMoM >= 0 ? { color: "#4F81F7" } : { color: "#ED8076" }}
                        >
                            {
                                !isNaN(this.state.userMoM) ?
                                    `${this.state.userMoM} %`
                                    :
                                    <span>——</span>
                            }
                        </span>
                    </div>
                </div>
                <div className="bottom-info">
                    <span>日活用户数</span>
                    <span className="bottom-number">{this.state.dayUsers}</span>
                </div>
            </Card>
        )
    }
}
export default UserTotal