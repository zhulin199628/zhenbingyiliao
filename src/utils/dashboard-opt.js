// export const pieIOptions = () =>{

//     //  color,  grid , {name: , type , radius, center, top, right, left,avoidLabelOverlap, hoverAnimation, data}
//     let opt = {
//         tooltip: {
//             trigger: 'item',
//             formatter: '{a} <br/>{b}: {c} ({d}%)'
//         },
//         legend: {
//             orient: 'vertical',
//             left: 10,
//             top: 10,
//             icon: "circle",
//             data: ['京东', '天猫'],
//         },
//         color: ["rgb(0,150,250)", "rgb(134,195,87)"],
//         grid: {
//             left: "3%",
//             right: "4%",
//             bottom: "3%",
//             width: "100px",
//             height: "100px",
//             containLabel: true
//         },
//         series: [
//             {
//                 name: '访问来源',
//                 type: 'pie',
//                 radius: ['30%', '60%'],
//                 center: ["80%", "30%"],
//                 top: 10,
//                 right: "10%",
//                 left: "50%",
//                 avoidLabelOverlap: false,
//                 // 取消鼠标移入图表中的放大效果
//                 hoverAnimation: false,
//                 label: {
//                     show: false,
//                     position: 'center'
//                 },
//                 emphasis: {
//                     label: {
//                         show: true,
//                         fontSize: '12',
//                         fontWeight: 'bold'
//                     }
//                 },
//                 labelLine: {
//                     show: false
//                 },
//                 data: [
//                     { value: jd, name: '京东' },
//                     { value: tm, name: '天猫' },
//                 ]
//             }
//         ]
//     }
// }

export const userArea = (echarts, mapData) => {
    let nameColor = " rgb(55, 75, 113)";
    let name_fontFamily = '等线';
    let subname_fontSize = 15;
    let name_fontSize = 18;
    let mapName = 'china';
    let data = mapData;

    let geoCoordMap = {};
    let mapArray = [];
    mapData.forEach(value => {
        mapArray.push({
            name: value.name,
            value: [
                {
                    name: "用户数量",
                    value: value.count
                }
            ]
        })
    });

    let toolTipData = mapArray;
    /*获取地图数据*/
    let mapFeatures = echarts.getMap(mapName).geoJson.features;
    mapFeatures.forEach(function (v) {
        // 地区名称
        let name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;

    });
    let convertData = function (data) {
        let res = [];
        for (let i = 0; i < data.length; i++) {
            let geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value),
                });
            }
        }
        return res;
    };
    const option = {
        title: {
            x: 'center',
            textStyle: {
                color: nameColor,
                fontFamily: name_fontFamily,
                fontSize: name_fontSize
            },
            subtextStyle: {
                fontSize: subname_fontSize,
                fontFamily: name_fontFamily
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                if (typeof (params.value)[2] == "undefined") {
                    let toolTiphtml = ''
                    for (let i = 0; i < toolTipData.length; i++) {
                        if (params.name == toolTipData[i].name) {
                            toolTiphtml += toolTipData[i].name + ':<br>'
                            for (let j = 0; j < toolTipData[i].value.length; j++) {
                                toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j].value + "<br>"
                            }
                        }
                    }
                    console.log(toolTiphtml)
                    // console.log(convertData(data))
                    return toolTiphtml;
                } else {
                    let toolTiphtml = ''
                    for (let i = 0; i < toolTipData.length; i++) {
                        if (params.name == toolTipData[i].name) {
                            toolTiphtml += toolTipData[i].name + ':<br>'
                            for (let j = 0; j < toolTipData[i].value.length; j++) {
                                toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j].value + "<br>"
                            }
                        }
                    }
                    console.log(toolTiphtml)
                    // console.log(convertData(data))
                    return toolTiphtml;
                }
            }
        },
        geo: {
            show: true,
            zoom:1.2,
            map: mapName,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#dddddd',
                    borderColor: '#dddddd',
                    borderWidth: 0
                },
                emphasis: {
                    areaColor: '#2B91B7',
                },
            }
        },
        series: [
            {
                type: 'map',
                map: mapName,
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#87CEFA',
                        borderColor: '#3B077',
                    },
                    emphasis: {
                        areaColor: '#ffffff'
                    }
                },
                animation: false,
                data: data
            },
            {
                name: 'pm2.5',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function (val) {
                    return val[2] * 2;
                },
                encode: {
                    value: 2
                },
                label: {
                    formatter: '{b}',
                    position: 'right',
                    show: true,
                    fontWeight:"bold",
                    color:"#4169E1"
                },
                itemStyle: {
                    normal: {
                        color: '#87CEFA',
                        opacity:0.5,
                        shadowBlur: 10,
                        shadowColor: '#8e8e8e'
                    }
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            },
        ]
    };
    return option
}