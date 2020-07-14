import React from "react";
import {
    Card,
    Row,
    Col,
    Form,
    Select,
    DatePicker
} from "antd";
import ReactEcharts from "echarts-for-react";
import Ageratio from "./Ageratio";
import moment from "moment";
import API from "../../api/index";
import times from "../../utils/time.js";
const _API = new API();
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const dateFormat = "YYYY-MM-DD";
const {thisweek_firstday, thisweek_lastday, today, startMonth, startYear, endYear}=  times;
class Sales extends React.Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            startTime: moment().format("YYYY-MM-DD"),
            endTime: moment().subtract(1, "d").format("YYYY-MM-DD"),
            seriesData: [],
            loading: false
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        _API.getDeviceCreateTimeStatsByDay(today, today).then(data => {
            this.mapData(data);
        })
    }

    mapData = (data) => {
        let pulsum = 0;
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].typeId === "188") {
                pulsum += parseInt(data[i].sum);
            }
        }
        arr.push({
            name: '脉冲理疗',
            type: 'bar',
            barWidth: '60%',
            data: [pulsum]
        })
        this.setState({
            seriesData: arr,
            loading: false,
        })
    }

    getOptions = () => {
        const { seriesData } = this.state;
        let option = {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ["脉冲理疗"],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: seriesData
        };
        return option
    }
    changeTime = (value) => {
        let resetStime = "";
        this.setState({ loading: true })
        if (value === "today") {
            resetStime = today;
            _API.getDeviceCreateTimeStatsByDay(today, today).then(data => {
                this.mapData(data);
            })
        }
        if (value === "week") {
            resetStime = thisweek_firstday;
            _API.getDeviceCreateTimeStatsByDay(thisweek_firstday, thisweek_lastday).then(data => {
                this.mapData(data);
            })
        }
        if (value === "month") {
            resetStime = startMonth;
            _API.getDeviceCreateTimeStatsByDay(startMonth, today).then(data => {
                this.mapData(data);
            })

        }
        if (value === "year") {
            resetStime = startYear;
            _API.getDeviceCreateTimeStatsByDay(startYear, today).then(data => {
                this.mapData(data);
            })
        }
        this.formRef.current.setFieldsValue({
            rangepicker: [moment(resetStime, dateFormat), moment(today, dateFormat)]
        })
    }

    changeDate = (dates) => {
        let startTime = dates[0].format(dateFormat);
        let endTime = dates[1].format(dateFormat);
        this.setState({ loading: true });
        if (startTime === endTime) {
            _API.getDeviceCreateTimeStatsByDay(startTime, startTime).then(data => {
                this.mapData(data);
            })
        } else {
            _API.getDeviceCreateTimeStatsByDay(startTime, endTime).then(data => {
                this.mapData(data);
            })
        }
    }

    salesEle = () => {
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };
        return (
            <Form
                layout="inline"
                initialValues={{
                    rangepicker: [moment(today, dateFormat), moment(today, dateFormat)]
                }}
                ref={this.formRef}
            >
                <FormItem>
                    <Select onChange={this.changeTime} defaultValue="today">
                        <Option value="today">今日</Option>
                        <Option value="week">本周</Option>
                        <Option value="month">本月</Option>
                        <Option value="year">全年</Option>
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

            <Row gutter={16} className="card-modal">
                <Col span={14}>
                    <Card
                        title={
                            <span className = "custom-font">销售量</span>
                        }
                        loading={this.state.loading}
                        extra={this.salesEle()}
                    >
                        <ReactEcharts
                            option={this.getOptions()}
                        />
                    </Card>
                </Col>
                <Col span={10}>
                    <Ageratio />
                </Col>
            </Row>

        )
    }
}

export default Sales