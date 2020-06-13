import React from "react"
import {
    HashRouter as Router, Route, Switch, Redirect
} from "react-router-dom"
import Dashboard from "../component/dashboard/Dashboard"
import Category from "../component/product-management/Category"
import ProductList from "../component/product-management/ProductList"
import AfterList from "../component/after-sale/AfterList"
import Customer from "../component/user-management/Customer"
import Operation from "../component/user-management/Operation"
import Pop from "../component/pop/Pop"
import Information from "../component/system-setting/information"
import config from "./config"


export default class myRouter extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        // const RouteMap = config.map(item => (
        //     item.childs.length > 0 ?
        //         (
        //             <Route
        //                 key={item.key}
        //                 path={item.key}
        //                 component={item.component}
        //             />
        //         )
        //         :
        //         (
        //             item.childs.map(children => (
        //                 <Route
        //                     key={children.key}
        //                     path={children.key}
        //                     component={children.component}
        //                 />
        //             ))
        //         )
        // ))

        // console.log(RouteMap)

        return (
            <Switch>
                <Route exact path="/zhenbing" render={
                    () => <Redirect to="/zhenbing/dashboard/index" />
                }></Route>

                <Route path="/zhenbing/dashboard/index" component={Dashboard} />
                <Route path="/zhenbing/product/category" component={Category} />
                <Route path="/zhenbing/product/proList" component={ProductList} />
                <Route path="/zhenbing/after-sale/afterList" component={AfterList} />
                <Route path="/zhenbing/user-management/customer" component={Customer} />
                <Route path="/zhenbing/user-management/Operation-management" component={Operation} />
                <Route path="/zhenbing/Notice/pop-management" component={Pop} />
                <Route path="/zhenbing/system/information" component={Information} />
            </Switch>
        )
    }
}
