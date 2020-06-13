import React from "react";
import {
  Card,
  Tooltip,
  Progress,
  Row,
  Col
} from "antd";
import API from "../../api/index";
const _API = new API();

class Ageratio extends React.Component {
  dataInterval = [
    {
      age: "11-20",
      sum: 0,
      count: 0,
      man: 0,
      woman: 0,
      other: 0
    },
    {
      age: "21-30",
      sum: 0,
      count: 0,
      man: 0,
      woman: 0,
      other: 0
    },
    {
      age: "31-40",
      sum: 0,
      count: 0,
      man: 0,
      woman: 0,
      other: 0
    },
    {
      age: "41-50",
      sum: 0,
      count: 0,
      man: 0,
      woman: 0,
      other: 0
    },
    {
      age: "51-60",
      sum: 0,
      count: 0,
      man: 0,
      woman: 0,
      other: 0
    },
    {
      age: "60",
      sum: 0,
      count: 0,
      man: 0,
      woman: 0,
      other: 0
    },
    {
      age: "",
      sum: 0,
      count: 0,
      man: 0,
      woman: 0,
      other: 0
    }];

  constructor(props) {
    super(props);
    this.state = {
      agearray: [],
      totalNumber: null,
      allUser: null,
      loading: false
    }
  }

  compare = (sum) => {
    return function (a, b) {
      var value1 = a[sum];
      var value2 = b[sum];
      return value2 - value1;
    }
  }

  conversion = (obj) => {
    let { aData, sum } = obj;
    // console.log(obj,"-----","")
    aData["percentage"] = Math.floor((aData.sum / sum / 0.01)*100) /100;
  }

  getUserAgeDatas = (datas, value) => {
    return new Promise((resolve, reject) => {
      _API.getUserValueAggregateCount("age", { "gender": "" + value + "" }).then(ageNum => {
        if (value === "男") {
          for (let i = 0; i < ageNum.length; i++) {
            if (ageNum[i].id === "") {
              resolve({ datas, manCount: parseInt(ageNum[i].count) })
            }
          }
        } else {
          for (let i = 0; i < ageNum.length; i++) {
            if (ageNum[i].id === "") {
              resolve({ datas, womanCount: parseInt(ageNum[i].count) })
            }
          }
        }
      })
    })
  }

  componentDidMount() {
    let userAgeCount = _API.getUserValueAggregateCount("age");
    this.setState({ loading: true });

    /**
     * 获取用户年龄层占比
     * 1. 先获取所有用户的年龄
     * 2. 根据年龄获取当前年龄的男、女、其它的人数
     */
    userAgeCount.then(allData => {
      let sum = 0; //  用来统计用户总数
      for (let i = 0; i < allData.length; i++) {
        sum += parseInt(allData[i].count);
      }
      return { allData, sum }
    }).then(datas => {
      return this.getUserAgeDatas(datas, "男")
    }).then(datas => {
      return this.getUserAgeDatas(datas, "女")
    }).then(datas => {
      let { womanCount } = datas;
      let { allData, sum } = datas.datas.datas;
      let { manCount } = datas.datas;
      let { dataInterval } = this;
      for (let i = 0; i < allData.length; i++) {

        _API.getUserValueAggregateCount("gender", { age: "" + allData[i].id + "" }).then(genderNum => {
          let dataId = allData[i].id !== "" ? parseInt(allData[i].id) : "";  //  年龄
          let dataCount = parseInt(allData[i].count);  //  数量

          for (let j = 0; j < dataInterval.length; j++) {
            let Interval = dataInterval[j].age.split("-");
            let Interval_start = parseInt(Interval[0]);
            let Interval_end = parseInt(Interval[1]);
            if (dataId !== "") {
              if (Interval.length === 2) {
                if (dataId >= Interval_start && dataId <= Interval_end) {
                  dataInterval[j].sum += dataCount;
                  for (let i = 0; i < genderNum.length; i++) {
                    let genderCount = parseInt(genderNum[i].count);
                    if (genderNum[i].id === "男") {
                      dataInterval[j].man += genderCount;
                    } else if (genderNum[i].id === "女") {
                      dataInterval[j].woman += genderCount;
                    } else {
                      dataInterval[j].other = + genderCount;
                    }
                  }
                  this.conversion({ aData: dataInterval[j], sum });
                  break;
                }
              } else {
                if (Interval[0] !== "") {
                  if (dataId >= Interval_start) {
                    dataInterval[j].sum += dataCount;
                    for (let i = 0; i < genderNum.length; i++) {
                      let genderCount = parseInt(genderNum[i].count);
                      if (genderNum[i].id === "男") {
                        dataInterval[j].man += genderCount;
                      } else if (genderNum[i].id === "女") {
                        dataInterval[j].woman += genderCount;
                      } else {
                        dataInterval[j].other = + genderCount;
                      }
                    }
                    dataInterval[j].age = "61岁以上";//
                    this.conversion({ aData: dataInterval[j], sum });
                    break;
                  }
                }
              }
            } else {
              if (Interval[0] == "") {
                dataInterval[j].sum += dataCount;
                dataInterval[j].man = manCount;
                dataInterval[j].woman = womanCount;
                dataInterval[j].other = dataInterval[j].sum - (manCount + womanCount);
                dataInterval[j].age = "未填写";
                this.conversion({ aData: dataInterval[j], sum });
                break;
              }
            }
          }
          this.setState({
            agearray: dataInterval.sort(this.compare("sum")),
            loading: false
          })
        })

      }

    })
  }

  tooltipContainer = (opt) => {

    return (
      <div>
        <p>{`总计：${opt.sum}人`}</p>
        <p>{`男：${opt.man}人`}</p>
        <p>{`女：${opt.woman}人`}</p>
        <p>{`其他：${opt.other}人`}</p>
      </div>
    )
  }

  render() {
    const listColor = ["#4D7FF7", "#89CF4E", "#867CF7", "#5DB59B", "#C5708A", "#EB8357", "#ECB73F"];
    return (
      <Card
        title={
          <span className="custom-font">用户年龄层占比</span>
        }
        loading={this.state.loading}
      >
        {
          this.state.agearray.map((item, index) =>
            <Tooltip
              title={this.tooltipContainer(item)}
              color="#ffffff"
            >
              <Row gutter={5} style={{ marginTop: 20 }}>
                <Col span={1}>
                  <span>{index + 1}</span>
                </Col>
                <Col span={3}>
                  <span>{item.age}</span>
                </Col>
                <Col span={20}>
                  <Progress
                    percent={item.percentage}
                    strokeColor={listColor[index]}
                  />
                </Col>
              </Row>
            </Tooltip>
          )
        }
      </Card>
    )
  }
}

export default Ageratio