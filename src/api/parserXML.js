
'use strict';

import { DOMParser } from 'xmldom';

export const systemLogin = xml => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(xml, 'text/xml');
    let userIdChild = doc.getElementsByTagName('userId')[0].firstChild;
    let secTokenChild = doc.getElementsByTagName('securityToken')[0].firstChild;
    let userId = userIdChild === null ? '' : userIdChild.nodeValue;
    let secToken = secTokenChild === null ? '' : secTokenChild.nodeValue;
    return { userId, secToken };
};

export const parserRequestError = (xml) => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(xml, 'text/xml');
    let errorCodeChild = doc.getElementsByTagName('errorCode')[0].firstChild;
    let errorMsgChild = doc.getElementsByTagName('errorMsg')[0].firstChild;
    let errorCode = errorCodeChild === null ? '' : errorCodeChild.nodeValue;
    let errorMsg = errorMsgChild === null ? '' : errorMsgChild.nodeValue;
    return { errorCode, errorMsg };
};

// export const getDeviceCountStatsByApp = xml => {
//     let parser = new DOMParser();
//     let doc = parser.parseFromString(xml, 'text/xml');
//     let numberChild = doc.getElementsByTagName("number")
// }

export const getActiveUserStatsByDay = xml => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(xml, 'text/xml');
    let appIdIndex = doc.getElementsByTagName('appId')[0];
    let appIdChild = appIdIndex === undefined ? "" : appIdIndex.firstChild;
    let appId = appIdChild === undefined ? '' : appIdChild.nodeValue
    let statsElements = doc.getElementsByTagName('stats');
    let arr = [];

    for (let i = 0; i < statsElements.length; i++) {
        let dataElement = statsElements[i];
        let numberChild = dataElement.getElementsByTagName('number')[0].firstChild;
        let totalnumberChild = dataElement.getElementsByTagName('totalnumber')[0].firstChild;
        let dateChild = dataElement.getElementsByTagName('date')[0].firstChild;
        let number = numberChild === null ? '' : numberChild.nodeValue;
        let totalnumber = totalnumberChild === null ? '' : totalnumberChild.nodeValue;
        let date = dateChild === null ? '' : dateChild.nodeValue;
        let stasData = { number, totalnumber, date };
        arr.push(stasData);
    }
    return arr
}

export const getDeviceIsonlineStatsByDay = xml => {

    let parser = new DOMParser();
    let doc = parser.parseFromString(xml, 'text/xml');
    let appIdIndex = doc.getElementsByTagName('appId')[0];
    let appIdChild = appIdIndex === undefined ? "" : appIdIndex.firstChild;
    let appId = appIdChild === undefined ? '' : appIdChild.nodeValue
    let statsElements = doc.getElementsByTagName('stats');
    let arr = [];
    for (let i = 0; i < statsElements.length; i++) {
        let dataElement = statsElements[i];
        let onlineChild = dataElement.getElementsByTagName('online')[0].firstChild;
        let totalOnlineChild = dataElement.getElementsByTagName('totalOnline')[0].firstChild;
        let offlineChild = dataElement.getElementsByTagName('offline')[0].firstChild;
        let totalOfflineChild = dataElement.getElementsByTagName('totalOffline')[0].firstChild;
        let dateChild = dataElement.getElementsByTagName('date')[0].firstChild;
        let online = onlineChild === null ? '' : onlineChild.nodeValue;
        let totalOnline = totalOnlineChild === null ? '' : totalOnlineChild.nodeValue;
        let offline = offlineChild === null ? '' : offlineChild.nodeValue;
        let totalOffline = totalOfflineChild === null ? '' : totalOfflineChild.nodeValue;
        let date = dateChild === null ? '' : dateChild.nodeValue;
        let stasData = { online, totalOnline, offline, totalOffline, date };
        arr.push(stasData);
    }
    return arr
}


export const getDeviceCountStatsByApp = xml => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(xml, 'text/xml');
    let countIndex = doc.getElementsByTagName('count')[0];
    let countChild = countIndex === undefined ? "" : countIndex.firstChild;
    let count = countChild === undefined ? '' : countChild.nodeValue
    return { count }
}

export const getUserCountStatsByApp = xml => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(xml, 'text/xml');
    let countIndex = doc.getElementsByTagName('count')[0];
    let countChild = countIndex === undefined ? "" : countIndex.firstChild;
    let count = countChild === undefined ? '' : countChild.nodeValue
    return { count }
}

export const getUserValueAggregateCount = xml => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(xml, 'text/xml');
    let aggregateElements = doc.getElementsByTagName('aggregate');
    let arr = [];
    for (let i = 0; i < aggregateElements.length; i++) {
        let aggregateElement = aggregateElements[i];
        let idChild = aggregateElement.getElementsByTagName("id")[0].firstChild;
        let countChild = aggregateElement.getElementsByTagName("count")[0].firstChild;
        let id = idChild === null ? "" : idChild.nodeValue;
        let count = countChild === null ? "" : countChild.nodeValue;
        let aggregateData = { id, count };
        arr.push(aggregateData)
    }
    return arr
}

export const getUserActiveTimeStatsByDay = xml => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(xml, 'text/xml');
    let statsElements = doc.getElementsByTagName('stats');
    let arr = [];
    for (let i = 0; i < statsElements.length; i++) {
        let obj = {};
        let statsAttributes = statsElements[i].attributes;
        let statsChildNodes = statsElements[i].childNodes
        for (let j = 0; j < statsAttributes.length; j++) {
            obj[statsAttributes[j].name] = statsAttributes[j].nodeValue;
        }
        obj["childs"] = [];
        for (let j = 0; j < statsChildNodes.length; j++) {
            let statsChildAttr = statsChildNodes[j].attributes;
            let childAttr = {};
            for (let k = 0; k < statsChildAttr.length; k++) {
                childAttr[statsChildAttr[k].name] = statsChildAttr[k].nodeValue;
            }
            obj.childs.push(childAttr)
        }
        arr.push(obj);
    }
    return arr
}

export const getDeviceTSAggregateSumByDay = xml => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(xml, 'text/xml');
    let aggregateElements = doc.getElementsByTagName('aggregate');
    let arr = [];
    for (let i = 0; i < aggregateElements.length; i++) {
        let aggregate = aggregateElements[i];
        let sumChild = aggregate.getElementsByTagName("sum")[0].firstChild;
        let dateChild = aggregate.getElementsByTagName("date")[0].firstChild;
        let sum = sumChild === null ? "" : sumChild.nodeValue;
        let date = dateChild === null ? "" : dateChild.nodeValue;
        let aggregateData = { sum, date };
        arr.push(aggregateData)
    }
    return arr
}

export const getDeviceCreateTimeStatsByDay = xml => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(xml, 'text/xml');
    let aggregateElements = doc.getElementsByTagName('aggregate');
    let arr = [];
    for (let i = 0; i < aggregateElements.length; i++) {
        let aggregate = aggregateElements[i];
        let sumChild = aggregate.getElementsByTagName("sum")[0].firstChild;
        let dateChild = aggregate.getElementsByTagName("date")[0].firstChild;
        let typeidChild = aggregate.getElementsByTagName("typeid")[0].firstChild;
        let sum = sumChild === null ? "" : sumChild.nodeValue;
        let date = dateChild === null ? "" : dateChild.nodeValue;
        let typeId = typeidChild === null ? "" : typeidChild.nodeValue;
        let aggregateData = { sum, date, typeId };
        arr.push(aggregateData)
    }
    return arr
}

export const getDeviceActiveTimeStatsByDay = xml => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(xml, 'text/xml');
    let statsElements = doc.getElementsByTagName('stats');
    let arr = [];
    for (let i = 0; i < statsElements.length; i++) {
        let obj = {};
        let statsAttributes = statsElements[i].attributes;
        let statsChildNodes = statsElements[i].childNodes
        for (let j = 0; j < statsAttributes.length; j++) {
            obj[statsAttributes[j].name] = statsAttributes[j].nodeValue;
        }
        obj["childs"] = [];
        for (let j = 0; j < statsChildNodes.length; j++) {
            let statsChildAttr = statsChildNodes[j].attributes;
            let childAttr = {};
            for (let k = 0; k < statsChildAttr.length; k++) {
                childAttr[statsChildAttr[k].name] = statsChildAttr[k].nodeValue;
            }
            obj.childs.push(childAttr)
        }
        arr.push(obj);
    }
    return arr
}