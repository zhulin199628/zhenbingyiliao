// import { Menu } from "antd";
// const { SubMenu } = Menu;
// const MenuItem = Menu.Item;

// const mapTree = (data) =>{
//     for (let i = 0; i < data.length; i++) {
//         for (let j = i + 1; j < data.length; j++) {
//           let obj1 = data[i];
//           let obj2 = data[j];
//           var compare = function (obj1, obj2) {
//             var val1 = obj1.typeName;
//             var val2 = obj2.typeName;
//             if (val1 < val2) {
//               return -1;
//             }
//             if (val1 > val2) {
//               return 1;
//             } else {
//               return 0;
//             }
//           };
//           return compare
//         }
//       }
// }

//  const renderTree = (data) => {
//     let that = this;
//     this.sortThree(data);
//     if (data !== undefined) {
//       return data.map((item, index) => {
//         if (item.childs.length == 0) {
//           return (
//             <MenuItem
//               className="fiveTree"
//               key={item.devId + "item2"}
//               onClick={that.stopOpen}
//             >
//               <Link
//                 onClick={event =>
//                   that.click_list(event, item)}
//               >
//                 {item.devId + " - " + item.typeName}
//               </Link>
//             </MenuItem>
//           )
//         } else {
//           return (
//             <SubMenu
//               key={item.devId + "sub2"}
//               title={
//                 <span>
//                   <span className="nav-text" onClick={that.stopOpen}>
//                     <Link
//                       onClick={event =>
//                         that.click_list(event, item)}
//                     >
//                       {item.devId + " - " + item.typeName}
//                     </Link>
//                   </span>
//                 </span>
//               }
//             >
//               {renderTree(item.childs)}
//             </SubMenu>

//           )
//         }
//       })
//     }
//   };

// export default renderTree