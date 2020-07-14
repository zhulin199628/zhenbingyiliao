// import React, { useEffect, useState } from "react";
// import {
//     Card,
//     Breadcrumb,
// } from "antd";
// import ProductRelease from "../forms/ProductRelease"
// import { useLocation } from "react-router-dom";

// const Release = () => {
//     const [state, setState] = useState();
//     const location = useLocation();
//     useEffect(() => {
//         if (location.query) {
//             window.sessionStorage.setItem('proediturl', JSON.stringify(location.query.data))
//             setState(location.query.data)
//         } else {
//             setState(JSON.parse(window.sessionStorage.proediturl))
//         }

//     }, [])

//     return (
//         <div>
//             <Breadcrumb>
//                 <Breadcrumb.Item>产品管理</Breadcrumb.Item>
//                 <Breadcrumb.Item>产品列表</Breadcrumb.Item>
//                 <Breadcrumb.Item>发布产品</Breadcrumb.Item>
//             </Breadcrumb>
//             <Card>
//                 <ProductRelease data={state} />
//             </Card>
//         </div>
//     )
// }
// export default Release