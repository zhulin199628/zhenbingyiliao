import React from 'react';
import './App.css';
import { Layout } from "antd";
import HeaderComponent from "./component/Header";
import SideMenu from "./component/SideMenu";
import Login from "./component/Login"
// class App extends React.Component {
//   constructor(props) {
//     super(props)
//   }

//   render() {
//     return (
//       <Layout>
//         <HeaderComponent />
//         <SideMenu />
//       </Layout>
//     )
//   }
// }
function App() {
  return (
    // <Layout>
    //   <HeaderComponent />
    //   <SideMenu />
    // </Layout>
    <Login />
  )
}

export default App;
