import React, { useState } from "react";
import ReactEcharts from "echarts-for-react";
import {
    Card,
    Form,
    Select,
    DatePicker,
} from "antd";
import moment from "moment";
import API from "../../api/index";
import times from "../../utils/time.js";
const _API = new API();
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const dateFormat = "YYYY-MM-DD";
const { today, recentThree, startYear, endYear } = times;

export default class InterviewTime extends React.Component {

    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            startTime: today,
            endTime: today,
            legendData: [],
            category: "mobile",
            series: [],
            loading: false,
            changeDevMobile: ""
        }
    }

    todayData = (opt, data) => {
        this.setState({
            legendData: [],
            series: []
        });
        const { category } = this.state;
        let legendArray = [];
        let totalNumberArray = [];
        let sum = 0;
        if (opt === "today") {  //  当日，  显示时刻
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].childs.length; j++) {
                    let hour = parseInt(data[i].childs[j].hour);
                    hour = hour >= 10 ? `${hour}:00` : `0${hour}:00`;
                    legendArray.push(hour);
                    totalNumberArray.push(data[i].childs[j].totalNumber);
                }
            }
        }
        else {  //  多天，显示日期
            for (let i = 0; i < data.length; i++) {
                legendArray.push(data[i].date);
                for (let j = 0; j < data[i].childs.length; j++) {
                    sum += parseInt(data[i].childs[j].totalNumber);
                }
                totalNumberArray.push(sum);
                sum = 0;
            }
        }
        let _series = [];
        _series.push({
            name: category === "mobile" ? "用户访问时间分布" : "脉冲理疗",
            type: 'line',
            stack: '总量',
            data: totalNumberArray,
            symbolSize: 15,
            symbol: `image://${require("../../style/imgs/lenged.png")}`,
        })
        this.setState({
            legendData: legendArray,
            series: _series,
            loading: false
        })
    }

    componentDidMount() {
        let { startTime } = this.state;
        this.setState({ loading: true });
        _API.getUserActiveTimeStatsByDay(startTime, startTime).then(data => {
            this.todayData("today", data);
        })
    }

    getOptions = () => {
        const { category } = this.state;
        let option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                bottom: 0,
                data:
                    category === "mobile" ?
                        [{
                            name: "用户访问时间分布",

                        }]
                        :
                        [{
                            name: '脉冲理疗',
                        }],
            },
            color: ["rgb(16,141,244)", "rgb(152,216,125)", "rgb(0,255,255)", "rgb(99,0,191)"],
            grid: {
                left: '3%',
                right: '4%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: this.state.legendData,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(102,102,102,.1)', //纵向网格线颜色
                        width: 1,
                        type: 'solid'
                    }
                },
                axisTick: {
                    show: false
                },
            },

            yAxis: {
                type: 'value',
                name: '时/次',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(102,102,102,.1)', //横向网格线颜色
                        width: 1,
                        type: 'dashed'
                    }
                },
                axisTick: {
                    show: false
                },
            },
            series: this.state.series
        };
        return option

    }

    changeDevice = (value) => {
        const { startTime, endTime, changeDevMobile } = this.state;
        this.setState({ loading: true });
        if (value === "mobile") {
            if (startTime === endTime) {
                _API.getUserActiveTimeStatsByDay(startTime, startTime).then(data => {
                    this.todayData("today", data);
                })
            } else {
                _API.getUserActiveTimeStatsByDay(startTime, endTime).then(data => {
                    if (changeDevMobile === "all") {
                        this.todayData("most", [data[0], data[data.length - 1]]);
                    } else {
                        this.todayData("most", data);
                    }
                })
            }
        } else {
            if (startTime === endTime) {
                _API.getDeviceActiveTimeStatsByDay(startTime, startTime).then(data => {
                    this.todayData("today", data);
                })
            } else {
                _API.getDeviceActiveTimeStatsByDay(startTime, endTime).then(data => {
                    if (changeDevMobile === "all") {
                        this.todayData("most", [data[0], data[data.length - 1]]);
                    } else {
                        this.todayData("most", data);
                    }
                })
            }
        }
        this.setState({
            category: value
        })
    }

    changeTime = (value) => {
        let resetStime = "",
            resetETime = "";
        const { category } = this.state;
        this.setState({ loading: true, changeDevMobile: value });
        if (category === "mobile") {
            if (value === "today") {
                resetStime = today;
                resetETime = today;
                _API.getUserActiveTimeStatsByDay(today, today).then(data => {
                    this.todayData("today", data);
                });
                this.setState({
                    startTime: resetStime,
                    endTime: resetETime
                });
                //  下拉选择日期范围，日期选择联动
                this.formRef.current.setFieldsValue({
                    rangepicker: [moment(resetStime, dateFormat), moment(resetETime, dateFormat)]
                })
            }
            if (value === "thirtydays") {
                resetStime = recentThree[0];
                resetETime = recentThree[1];
                _API.getUserActiveTimeStatsByDay(recentThree[0], recentThree[1]).then(data => {
                    this.todayData("most", data);
                });
                this.setState({
                    startTime: resetStime,
                    endTime: resetETime
                });

                //  下拉选择日期范围，日期选择联动
                this.formRef.current.setFieldsValue({
                    rangepicker: [moment(resetStime, dateFormat), moment(resetETime, dateFormat)]
                })
            }
            if (value === "all") {
                _API.getUserActiveTimeStatsByDay(startYear, endYear).then(data => {
                    this.setState({
                        startTime: data[0].date,
                        endTime: data[data.length - 1].date
                    });
                    this.formRef.current.setFieldsValue({
                        rangepicker: [moment(data[0].date, dateFormat), moment(data[data.length - 1].date, dateFormat)]
                    });
                    this.todayData("most", [data[0], data[data.length - 1]]);
                })
            }
        } else {
            if (value === "today") {
                resetStime = today;
                resetETime = today;
                _API.getDeviceActiveTimeStatsByDay(today, today).then(data => {
                    this.todayData("today", data);
                })
                this.setState({
                    startTime: resetStime,
                    endTime: resetETime
                })

                //  下拉选择日期范围，日期选择联动
                this.formRef.current.setFieldsValue({
                    rangepicker: [moment(resetStime, dateFormat), moment(resetETime, dateFormat)]
                })
            }
            if (value === "thirtydays") {
                resetStime = recentThree[0];
                resetETime = recentThree[1];
                _API.getDeviceActiveTimeStatsByDay(recentThree[0], recentThree[1]).then(data => {
                    this.todayData("most", data);
                })
                this.setState({
                    startTime: resetStime,
                    endTime: resetETime
                })

                //  下拉选择日期范围，日期选择联动
                this.formRef.current.setFieldsValue({
                    rangepicker: [moment(resetStime, dateFormat), moment(resetETime, dateFormat)]
                })
            }
            if (value === "all") {
                _API.getDeviceActiveTimeStatsByDay(startYear, endYear).then(data => {
                    this.setState({
                        startTime: data[0].date,
                        endTime: data[data.length - 1].date
                    });
                    this.formRef.current.setFieldsValue({
                        rangepicker: [moment(data[0].date, dateFormat), moment(data[data.length - 1].date, dateFormat)]
                    });
                    this.todayData("most", [data[0], data[data.length - 1]]);
                })
            }
        }

    }

    changeDate = (dates) => {
        let startTime = dates[0].format(dateFormat);
        let endTime = dates[1].format(dateFormat);
        const { category } = this.state;
        this.setState({ loading: true });
        if (category === "mobile") {
            if (startTime === endTime) {
                _API.getUserActiveTimeStatsByDay(startTime, endTime).then(data => {
                    this.todayData("today", data);
                })
            } else {
                _API.getUserActiveTimeStatsByDay(startTime, endTime).then(data => {
                    this.todayData("most", data);
                })
            }

        } else {
            if (startTime === endTime) {
                _API.getDeviceActiveTimeStatsByDay(startTime, endTime).then(data => {
                    this.todayData("today", data);
                })
            } else {
                _API.getDeviceActiveTimeStatsByDay(startTime, endTime).then(data => {
                    this.todayData("most", data);
                })
            }
        }

        this.setState({
            startTime,
            endTime
        })
    }


    filter = () => {
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };

        const { startTime } = this.state;
        return (
            <Form
                layout="inline" ref={this.formRef}
                initialValues={{
                    rangepicker: [moment(startTime, dateFormat), moment(startTime, dateFormat)]
                }}
            >
                <FormItem>
                    <Select
                        onChange={this.changeDevice}
                        defaultValue="mobile"
                        style={{ width: 120 }}
                    >
                        <Option value="device">设备</Option>
                        <Option value="mobile">移动端</Option>
                    </Select>
                </FormItem>
                <FormItem name="selecttime">
                    <Select
                        onChange={this.changeTime}
                        defaultValue="today"
                        style={{ width: 120 }}
                    >
                        <Option value="today">今日</Option>
                        <Option value="thirtydays">近三十天</Option>
                        <Option value="all">全部</Option>
                    </Select>
                </FormItem>
                <FormItem name="rangepicker" label="" {...rangeConfig}>
                    <RangePicker
                        format={dateFormat}
                        onChange={this.changeDate}
                    />
                </FormItem>
            </Form>
        )
    }

    render() {
        return (
            <Card
                title="访问时间分布"
                className="card-modal"
                extra={this.filter()}
                loading={this.state.loading}
            >
                <div className="card-body-content">
                    <ReactEcharts
                        option={this.getOptions()}
                    />
                </div>
            </Card>
        )
    }

}
