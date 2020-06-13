import React from "react";
import ReactEcharts from "echarts-for-react";
import {
    Card
} from 'antd';
import API from "../../api/index";
const _API = new API();
export default class Sexratio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            man: null,
            woman: null,
            unfilled: null,
            loading: false,
            allData: []
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        let gender = _API.getUserValueAggregateCount('gender');
        gender.then(allData => {
            let total = 0;
            let w = "";
            let m = "";
            let unfilled = "";
            for (let i = 0; i < allData.length; i++) {
                if (allData[i].id === "女") {
                    w = parseInt(allData[i].count);
                }else if (allData[i].id === "男") {
                    m = parseInt(allData[i].count);
                }else{
                    unfilled = parseInt(allData[i].count);
                    allData[i].id = "未填写"
                }
            }
            this.setState({
                man: m,
                woman: w,
                unfilled: unfilled,
                loading: false,
                allData: allData
            })
        })
    }

    array2obj = (array, key) => {
        var resObj = {}
        for (var i = 0; i < array.length; i++) {
            resObj[array[i][key]] = array[i]
        }
        return resObj
    }

    getOptions = () => {

        let legendData = [];
        let { allData } = this.state;
        for (var j = 0; j < allData.length; j++) {
            var data = {
                name: allData[j].id === "" ? "未填写" : allData[j].id,
            }
            legendData.push(data)
        }
        let objData = this.array2obj(allData, 'id');
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
                data: legendData,
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
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                width: "100px",
                height: "100px",
                containLabel: true
            },
            color: ["rgb(0,150,250)", "rgb(134,195,87)", "rgb(235,131,87)"],
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
                            fontSize: '15',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: this.state.man, name: '男' },
                        { value: this.state.woman, name: '女' },
                        { value: this.state.unfilled, name: '未填写' },
                    ]
                }
            ]
        };
        return option
    }

    render() {

        return (
            <Card
                title={
                    <span className = "custom-font">用户性别占比</span>
                }
                loading={this.state.loading}
            >
                <div>
                    <ReactEcharts
                        option={this.getOptions()}
                        style={{ height: '85px', width: '100%' }}
                    />
                </div>
            </Card>
        )
    }
}