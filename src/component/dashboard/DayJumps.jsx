import React from "react";
import ReactEcharts from "echarts-for-react";
import {
    Card
} from 'antd';
import API from "../../api/index";
import moment from "moment";

const _API = new API();
export default class DayJumps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jumpNumber: [],
            loading: false
        }
    }

    array2obj = (array, key) => {
        var resObj = {}
        for (var i = 0; i < array.length; i++) {
            resObj[array[i][key]] = array[i]
        }
        return resObj
    }

    componentDidMount() {
        const today = moment().format("YYYY-MM-DD");
        //日天猫跳转数
        let tm = _API.getDeviceTSAggregateSumByDay(today, today, "TMRecorder");
        //  日京东跳转次数
        let jd = _API.getDeviceTSAggregateSumByDay(today, today, "JDRecorder");
        this.setState({ loading: true });
        let jumpsArray = [];
        let tmObj = {};
        let jdObj = {};
        Promise.all([tm, jd]).then(allData => {
            let tmData = allData[0];
            let jdData = allData[1];
            tmObj.id = "天猫";
            tmObj.count = 0;
            tmData.forEach(value => {
                tmObj.count += parseInt(value.sum)
            });
            jdObj.id = "京东";
            jdObj.count = 0;
            jdData.forEach(value => {
                jdObj.count += parseInt(value.sum)
            });
            jumpsArray.push(tmObj, jdObj);
            this.setState({
                jumpNumber: jumpsArray,
                loading: false
            })
        })
    }

    getOptions = () => {
        const { jumpNumber } = this.state;
        let objData = this.array2obj(this.state.jumpNumber, 'id');
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                top: 10,
                icon: "circle",
                data: [{
                    name: "京东"
                }, {
                    name: "天猫"
                }],
                textStyle: {
                    color: "#6C6C6C",
                    fontWeight: 600,
                },

                formatter: function (name) {
                    return `{title|${name}}{value|${objData[name].count}}`
                },
                textStyle: {
                    rich: {
                        value: {
                            padding: [0, 20, 0, 20],
                            fontWeight: 600
                        },
                    },
                    fontWeight: 600,
                    color: "#6C6C6C"
                }
            },
            color: ["rgb(0,150,250)", "rgb(134,195,87)"],
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                width: "100px",
                height: "100px",
                containLabel: true
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    center: ["80%", "30%"],
                    top: 10,
                    right: "10%",
                    left: "50%",
                    avoidLabelOverlap: false,
                    // 取消鼠标移入图表中的放大效果
                    hoverAnimation: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '12',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data:
                        jumpNumber.length > 0 ?
                            [
                                { value: this.state.jumpNumber[0].count, name: '天猫' },
                                { value: this.state.jumpNumber[1].count, name: '京东' }
                            ]
                            :
                            ""
                }
            ]
        };
        return option
    }

    render() {
        return (
            <Card
                title={
                    <span className="custom-font">日跳转数</span>
                }
                loading={this.state.loading}
            >
                <ReactEcharts
                    option={this.getOptions()}
                    style={{ height: '85px', width: '100%' }}
                />
            </Card>
        )
    }
}