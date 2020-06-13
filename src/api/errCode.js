export const errorHanle = (status, cb) => {
    switch (status) {
        case "101":
            cb("账号或密码错误");
            break;
        case "Network Error":
            cb("网络出错");
            break;
    }
}