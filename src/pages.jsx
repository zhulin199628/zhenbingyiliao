import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Login from "./component/Login"
import Main from "./component/Pages"
export default class Page extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/login" push />} />
                    <Route path="/login" component={Login} />
                    <Route path="/zhenbing" component={Main} />
                </Switch>
            </Router>
        )
    }

}
