import { post } from "./http"
import { message } from "antd"
import * as parser from "./parserXML"
import { errorHanle } from "./errCode"

class API {
   async Login(name, password) {
      let data = await post("systemLogin", { name, password });
      try {
         if (data.errorCode) {
            throw data.errorCode
         } else {
            window.localStorage.setItem("sysSecToken", data.secToken);
            window.localStorage.setItem("name", name);
            window.localStorage.setItem("password", password)
         }
      } catch (error) {
         errorHanle(error, function (info) {
            message.error(info)
         });
      }
   }

   async getDeviceIsonlineStatsByDay(start, end) {
      let data = await post("getDeviceIsonlineStatsByDay", { sysSecToken: window.localStorage.sysSecToken, start, end });
      try {
         if (data.errorCode) {
            throw (data.errorCode);
         } else {
            return data;
         }
      } catch (error) {
         if (error === "109") {
            await this.Login(window.localStorage.name, window.localStorage.password);
            return this.getDeviceIsonlineStatsByDay(start, end);
         } else {
            errorHanle(error, function (info) {
               message.error(info)
            });
         }
      }
   }

   async getDeviceCountStatsByApp() {
      let data = await post("getDeviceCountStatsByApp", { sysSecToken: window.localStorage.sysSecToken });
      try {
         if (data.errorCode) {
            throw (data.errorCode);
         } else {
            return data;
         }
      } catch (error) {
         if (error === "109") {
            await this.Login(window.localStorage.name, window.localStorage.password);
            return this.getDeviceCountStatsByApp();
         } else {
            errorHanle(error, function (info) {
               message.error(info)
            });
         }
      }
   }


   async getActiveUserStatsByDay(start, end) {
      let data = await post("getActiveUserStatsByDay", { sysSecToken: window.localStorage.sysSecToken, start, end });
      try {
         if (data.errorCode) {
            throw (data.errorCode);
         } else {
            return data;
         }
      } catch (error) {
         if (error === "109") {
            await this.Login(window.localStorage.name, window.localStorage.password);
            return this.getActiveUserStatsByDay(start, end);
         } else {
            errorHanle(error, function (info) {
               message.error(info)
            });
         }
      }
   }

   async getUserCountStatsByApp() {
      let data = await post("getUserCountStatsByApp", { sysSecToken: window.localStorage.sysSecToken });
      try {
         if (data.errorCode) {
            throw (data.errorCode);
         } else {
            return data;
         }
      } catch (error) {
         if (error === "109") {
            await this.Login(window.localStorage.name, window.localStorage.password);
            return this.getUserCountStatsByApp();
         } else {
            errorHanle(error, function (info) {
               message.error(info)
            });
         }
      }
   }

   async getUserValueAggregateCount(name, condition) {
      let obj = {};
      if (condition === undefined) {
         obj = { sysSecToken: window.localStorage.sysSecToken, name };
      } else {
         obj = { sysSecToken: window.localStorage.sysSecToken, name, condition: JSON.stringify(condition)}
      }
      let data = await post("getUserValueAggregateCount", obj);
      try {
         if (data.errorCode) {
            throw (data.errorCode);
         } else {
            return data;
         }
      } catch (error) {
         if (error === "109") {
            await this.Login(window.localStorage.name, window.localStorage.password);
            return this.getUserValueAggregateCount(name);
         } else {
            errorHanle(error, function (info) {
               message.error(info)
            });
         }
      }
   }

   async getUserActiveTimeStatsByDay(start, end) {
      let data = await post("getUserActiveTimeStatsByDay", { sysSecToken: window.localStorage.sysSecToken, start, end });
      try {
         if (data.errorCode) {
            throw (data.errorCode);
         } else {
            return data;
         }
      } catch (error) {
         if (error === "109") {
            await this.Login(window.localStorage.name, window.localStorage.password);
            return this.getUserActiveTimeStatsByDay(start, end);
         } else {
            errorHanle(error, function (info) {
               message.error(info)
            });
         }
      }
   }

   async getDeviceTSAggregateSumByDay(start, end, name) {
      let data = await post("getDeviceTSAggregateSumByDay", { sysSecToken: window.localStorage.sysSecToken, start, end, name });
      try {
         if (data.errorCode) {
            throw (data.errorCode);
         } else {
            return data;
         }
      } catch (error) {
         if (error === "109") {
            await this.Login(window.localStorage.name, window.localStorage.password);
            return this.getDeviceTSAggregateSumByDay(start, end, name);
         } else {
            errorHanle(error, function (info) {
               message.error(info)
            });
         }
      }
   }

   async getDeviceCreateTimeStatsByDay(start, end) {
      let data = await post("getDeviceCreateTimeStatsByDay", { sysSecToken: window.localStorage.sysSecToken, start, end });
      try {
         if (data.errorCode) {
            throw (data.errorCode);
         } else {
            return data;
         }
      } catch (error) {
         if (error === "109") {
            await this.Login(window.localStorage.name, window.localStorage.password);
            return this.getDeviceCreateTimeStatsByDay(start, end);
         } else {
            errorHanle(error, function (info) {
               message.error(info)
            });
         }
      }
   }

   async getDeviceActiveTimeStatsByDay(start, end) {
      let data = await post("getDeviceActiveTimeStatsByDay", { sysSecToken: window.localStorage.sysSecToken, start, end });
      try {
         if (data.errorCode) {
            throw (data.errorCode);
         } else {
            return data;
         }
      } catch (error) {
         if (error === "109") {
            await this.Login(window.localStorage.name, window.localStorage.password);
            return this.getDeviceActiveTimeStatsByDay(start, end);
         } else {
            errorHanle(error, function (info) {
               message.error(info)
            });
         }
      }
   }
}
export default API