import moment from "moment";

const dateFormat = "YYYY-MM-DD";
//  今天
const today =  moment().format(dateFormat);
// 最近三天
const recentThree = [moment().subtract(29, 'days').format(dateFormat), moment().format(dateFormat)];
// 全年
const startYear = moment().startOf('year').format(dateFormat);
const endYear = moment().endOf('year').format(dateFormat);
//上周时间区间
const lastweek_firstday = moment().week(moment().week() - 1).startOf('week').add(1, 'd').format(dateFormat);
const lastweek_lastday = moment().week(moment().week() - 1).endOf('week').add(1, 'd').format(dateFormat);
// 本周时间区间
const thisweek_firstday = moment().week(moment().week()).startOf('week').add(1, 'd').format(dateFormat);
const thisweek_lastday = moment().week(moment().week()).endOf('week').add(1, 'd').format(dateFormat);
//昨天
const yesterday = moment().subtract(1, "d").format(dateFormat);

//  本月
const startMonth = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');

export default {
    today,
    startMonth,
    recentThree,
    startYear,
    endYear,
    lastweek_firstday,
    lastweek_lastday,
    thisweek_firstday,
    thisweek_lastday,
    yesterday
}