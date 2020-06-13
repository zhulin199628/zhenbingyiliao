import React from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import chinaJson from "../../utils/china.json";
import {
    Card,
    Row,
    Col,
    Progress
} from "antd";
import API from "../../api/index";
import { userArea } from "../../utils/dashboard-opt.js"
echarts.registerMap('china', chinaJson);
const _API = new API();
class UserAreaDistributed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mapData: [],
            loading: false
        }
    }

    compare = (count) => {
        return function (a, b) {
            var value1 = a[count];
            var value2 = b[count];
            return value2 - value1;
        }
    }

    //  测试数据有些地名是有空格的，app或后台没有做处理，这里做累加
    createNewData = (arr) => {
        var newArr = [];
        arr.forEach(item => {
            var dataItem = item
            if (newArr.length > 0) {
                var filterValue = newArr.filter(v => {
                    return v.id == dataItem.id
                })
                if (filterValue.length > 0) {
                    newArr.forEach(n => {
                        if (n.id == filterValue[0].id) {
                            n.count = filterValue[0].count + dataItem.count
                        }
                    })
                } else {
                    newArr.push(dataItem)
                }
            } else {
                newArr.push(dataItem)
            }

        })
        return newArr
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        let UserAggregateCountSort = _API.getUserValueAggregateCount("province");
        let suffix = ["市", "省", "维吾尔族自治区", "自治区", "回族自治区", "壮族自治区"];
        UserAggregateCountSort.then(data => {
            let sum = 0;
            data.forEach((value, index, array) => {
                if (value.id !== "") {
                    suffix.forEach(suValue => {
                        if (value.id.indexOf(suValue) !== -1) {  //  去掉行政单位后缀名
                            let reg = new RegExp(suValue);
                            value.id = value.id.replace(reg, "");
                        }
                    });
                    value.count = parseInt(value.count);
                    value.value = value.count;
                    value.id = value.id.trim();
                    value.name = value.id;
                    // sum += parseInt(value.count);
                } else {
                    value.id = "未填写";
                    // array.splice(index, 1)
                }
                sum += parseInt(value.count);
            });
            let newAreaData = this.createNewData(data);
            data.forEach((value) => {
                value["percentage"] = Math.floor((value.count / sum / 0.01)*100)/100;
            })
            this.setState({
                mapData: newAreaData.sort(this.compare("count")),
                loading: false
            })
        })
    }
    render() {
        const { mapData } = this.state;
        const listColor = ["#4D7FF7", "#89CF4E", "#867CF7", "#5DB59B", "#C5708A", "#EB8357", "#ECB73F"]
        const dataList = mapData.slice(0, 5).map((item, index) => (
            item.id !== ""
                ?
                <Row gutter={5} style={{ marginTop: 20 }}>
                    <Col span={1}>
                        <span>{index + 1}</span>
                    </Col>
                    <Col span={3}>
                        <span>{item.id}</span>
                    </Col>
                    <Col span={20}>
                        <Progress
                            percent={item.percentage}
                            strokeColor={listColor[index]}
                        />
                    </Col>
                </Row>
                :
                ""
        ))
        return (
            <Card
                title={
                    <span className="custom-font">用户分布</span>
                }
                className="card-modal user-area-card"
                loading={this.state.loading}
            >
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={10}>
                        <div>用户分布最多城市排行</div>
                        {
                            dataList
                        }
                    </Col>

                    <Col span={14}>
                        <div className="user-area">
                            <ReactEcharts
                                option={userArea(echarts, mapData)}
                                style={{ height: '500px', width: '100%' }}
                            />
                        </div>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default UserAreaDistributed